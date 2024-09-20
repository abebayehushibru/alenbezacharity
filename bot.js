const { Telegraf, Markup } = require("telegraf");
const axios = require("axios");

const TOKEN = "1443815030:AAEyAeJWI9YK2dduAGDApb4ZqvnKDs67s08"; // Replace with your bot token
const bot = new Telegraf(TOKEN);

// Define the website link
const web_link = "https://alenbezacharity.netlify.app/";

// Store user phone numbers (in-memory storage for demo purposes)
let userPhoneNumbers = {};

// Start command: Show inline buttons
bot.start((ctx) =>
  ctx.reply("Welcome to Alenbeza Charity! Please select an option:", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Get Payment History", callback_data: "get_payment_history" },
          { text: "Go to Website", web_app: { url: web_link } },
        ],
      ],
    },
  })
);

// Handle button clicks
bot.action("get_payment_history", async (ctx) => {
  const userId = ctx.from.id;

  // Check if the user has already shared their phone number
  if (userPhoneNumbers[userId]) {
    // If phone number is already stored, fetch payment history
    await fetchPaymentHistory(ctx, userPhoneNumbers[userId]);
  } else {
    // Ask the user to share their phone number
    await ctx.reply("Please share your phone number to fetch payment history", {
      reply_markup: {
        keyboard: [
          [
            { text: "Share Phone Number", request_contact: true },
          ],
        ],
        one_time_keyboard: true,
      },
    });
  }
});

// Handle phone number sharing
bot.on("contact", async (ctx) => {
  const phoneNumber = ctx.message.contact.phone_number;
  const userId = ctx.from.id;

  // Store the user's phone number
  userPhoneNumbers[userId] = phoneNumber;

  // Fetch and display the payment history
  await fetchPaymentHistory(ctx, phoneNumber);
});

// Fetch payment history from API
async function fetchPaymentHistory(ctx, phoneNumber) {
  try {
    // Make a request to the API using the phone number as a query parameter
    const response = await axios.get('https://alenbezacharity.onrender.com/donations/getMyDonationFormBot', {
      params: { phoneNumber }  // Use params for query parameters
    });

    const paymentData = response.data;

    // Check if payment data contains the expected message or user is not found
    if (paymentData.message === "user Not Found") {
      await ctx.reply("No payment history found.");
      return;
    }
// Create the formatted message
let message = "Alenbeza charity Monthly Payment History\n";
message += "-----------------------------------------------\n";
message += `*${paymentData.userData.firstname} ${paymentData.userData.lastname}*\n`;
message += `Custom Id: ${paymentData.userData.customId || "N/A"}\n\n`;
message += `Monthly Payment Amount : ${paymentData.userData.monthlyamount || "N/A"}\n`;
message += "---------------------------------------------------\n \n";
    // Format the payment data by month and status
    // Create a header for the table
  
    message += "| Month                                 | Status              \n";
    message += "|---------------------------------------|---------------------\n";
  // Format the payment data as a table
paymentData.paymentStatus.forEach((payment) => {
  message += `|${payment.month}|${payment.status} \n`;
});

   
   

    // Append additional info if available
    if (paymentData.info && paymentData.info.message) {
      message += `\n${paymentData.info.message}\n\n`;
    }

    // Send the formatted payment data to the user
    await ctx.reply(message);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    await ctx.reply("Failed to fetch payment history. Please try again later.");
  }
}


// Start the bot
bot.launch();

