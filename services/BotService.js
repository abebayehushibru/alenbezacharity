import  { Telegraf } from "telegraf";
import User from "../models/Users.js";
import MonthlyPaymentHistory from "../models/MonthlPaymentHistory.js";
import { getCurrentEthiopianMonth } from "../utils/ethiopianYear.js";



const startBot = (TOKEN) => {

const web_link = "https://alenbezacharity.netlify.app/";

  const bot = new Telegraf(TOKEN);

  let userPhoneNumbers = {};

  bot.start((ctx) => {
    ctx.reply("Welcome to Alenbeza Charity! Please select an option:", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Get Payment History", callback_data: "get_payment_history" },
            { text: "Go to Website", web_app: { url: web_link } },
          ],
        ],
      },
    });
  });

  bot.action("get_payment_history", async (ctx) => {
    const userId = ctx.from.id;

    if (userPhoneNumbers[userId]) {
      await fetchPaymentHistory(ctx, userPhoneNumbers[userId]);
    } else {
      await ctx.reply("Please share your phone number to fetch payment history", {
        reply_markup: {
          keyboard: [[{ text: "Share Phone Number", request_contact: true },]],
          one_time_keyboard: true,
        },
      });
    }
  });

  bot.on("contact", async (ctx) => {
    const phoneNumber = ctx.message.contact.phone_number;
    const userId = ctx.from.id;
    userPhoneNumbers[userId] = phoneNumber;
    await fetchPaymentHistory(ctx, phoneNumber);
  });

  // Fetch payment history directly in bot.js
  async function fetchPaymentHistory(ctx, phoneNumber) {
    try {
      // Adjust phone number formatting
      phoneNumber = "0" + phoneNumber.slice(-9);

      if (phoneNumber.length !== 10) {
        return await ctx.reply("Invalid phone number format. It must be 10 digits long.");
      }

      // Fetch user from database by phone number
      const user = await User.findOne({ phonenumber: phoneNumber });
      if (!user) {
        return await ctx.reply("User not found.");
      }

      // Fetch monthly payment history
      const monthlyPayment = await MonthlyPaymentHistory.findOne({ customId: user.customId });
      const amount = monthlyPayment ? monthlyPayment.amount : 0;
      const monthlyAmount = monthlyPayment?.monthlyAmount || user.monthlyamount;

      // Get current Ethiopian month
      const currentMonth = getCurrentEthiopianMonth();
      const totalMonthsPaid = Math.floor(amount / monthlyAmount);

      const ethiopianMonths = [
        "መስከረም / September",
        "ጥቅምት / October",
        "ህዳር / November",
        "ታኅሳስ / December",
        "ጥር / January",
        "የካቲት / February",
        "መጋቢት / March",
        "ሚያዝያ / April",
        "ግንቦት / May",
        "ሰኔ / June",
        "ሐምሌ / July",
        "ነሐሴ / August",
      ];

      const rows = ethiopianMonths.map((month, index) => {
        const monthIndex = index + 1;
        let status;

        if (monthIndex <= totalMonthsPaid) {
          status = "ተከፍሏል / Paid";
        } else if (monthIndex === currentMonth) {
          status = "አልተከፈለም / Unpaid";
        } else if (monthIndex > currentMonth) {
          status = "የሚከፈል / Pending";
        } else {
          status = "አልተከፈለም / Unpaid";
        }

        return { id: monthIndex, month, status };
      });

      const info = { message: "", color: "" };
      if (currentMonth <= totalMonthsPaid) {
        info.message = "Thank you for paying on time! ወራዊ ክፍያዎን በጊዜ ስለ ከፈሉ እናመሰናለን!";
        info.color = "green";
      } else {
        info.message =
          "Thank you for paying, and please pay " +
          Math.floor(currentMonth - totalMonthsPaid) +
          " unpaid months. \n ስለሚከፍሉ እናመሰግናለን፣ እባክዎን ያልተከፈሉትን የ" +
          Math.floor(currentMonth - totalMonthsPaid) +
          " ወር ይክፈሉ።";
        info.color = "yellow";
      }

      // Create message to send to user
      let message = "Alenbeza charity Monthly Payment History\n";
      message += "-----------------------------------------------\n";
      message += `*${user.firstname} ${user.lastname}*\n`;
      message += `Custom Id: ${user.customId || "N/A"}\n\n`;
      message += `Monthly Payment Amount: ${user.monthlyamount || "N/A"}\n`;
      message += "---------------------------------------------------\n \n";
      message += "| Month                                 | Status              \n";
      message += "|---------------------------------------|---------------------\n";

      rows.forEach((payment) => {
        message += `|${payment.month} ${payment.status}\n`;
      });

      if (info.message) {
        message += `\n${info.message}\n\n`;
      }

      // Send payment data to the user
      await ctx.reply(message);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      await ctx.reply("Failed to fetch payment history. Please try again later.");
    }
  }
  bot.launch().then(() => {
    console.log('Bot started');
  }).catch((err) => {
    console.error('Error launching bot:', err);
  });
};

 export default startBot;
