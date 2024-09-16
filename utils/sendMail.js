import nodemailer from "nodemailer";
const sendMail=async (mailOptions)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Example using Gmail
        auth: {
          user:"abeaba64@gmail.com", 
          pass: "zyer pijb plms lkrr", 
        },
      });

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
   
  } catch (error) {
   console.log(error);
   
  }
}
export default sendMail