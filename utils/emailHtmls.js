const  generateHtmlTemplate=(templateType, params)=> {
    if (templateType === 'template1') {
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #2d2d2d;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            margin: 20px 0;
            padding: 20px;
            background-color: #f9f9f9;
            border-left: 4px solid #2d2d2d;
          }
          .content p {
            margin: 0 0 10px;
          }
          .footer {
            margin-top: 20px;
            padding: 10px;
            background-color: #f4f4f4;
            text-align: center;
            color: #777;
            font-size: 12px;
          }
          .footer a {
            color: #2d2d2d;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .message-box {
            background-color: #fff;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-size: 16px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header Section -->
          <div class="header">
             Alenbeza Charity
          </div>
  
          <!-- Content Section -->
          <div class="content">
            <p>Hello Alenbeza Charity Leader,</p>
            <p>You have one  new member <br>
             Name <strong>${params.from_name}</strong> 
             <br>
              Phone Number  : (${params.phonenumber}):</p>
              Email Address  : (${params.email}):</p>
            
            <!-- Message Box -->
            <div class="message-box">
              ${params.message}
            </div>
  
            <p>Please review and respond at your earliest convenience.</p>
            
          
            <p>Alenbeza charity Website </p>
          </div>
  
          <!-- Footer Section -->
          <div class="footer">
            <p>&copy; 2024 Alenbeza Charity. All Rights Reserved.</p>
          </div>
        </div>
      </body>
      </html>
      `;
    } else if (templateType === 'template2') {
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #2d2d2d;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            margin: 20px 0;
            padding: 20px;
            background-color: #f9f9f9;
            border-left: 4px solid #2d2d2d;
          }
          .content p {
            margin: 0 0 10px;
          }
          .footer {
            margin-top: 20px;
            padding: 10px;
            background-color: #f4f4f4;
            text-align: center;
            color: #777;
            font-size: 12px;
          }
          .footer a {
            color: #4CAF50;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .message-box {
            background-color: #fff;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-size: 16px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header Section -->
          <div class="header">
            Alenbeza Charity
          </div>
  
          <!-- Content Section -->
          <div class="content">
            <p>Hello <strong>${params.to_name}</strong>,</p>
            <p>You have received a new message from Website </p>
            
            <!-- Message Box -->
            <div class="message-box">
              ${params.message}
            </div>
  
            <p>Alenbeza Charity Website</p>
          </div>
  
          <!-- Footer Section -->
          <div class="footer">
            <p>Thank you for supporting us!</p>
            <p><a href="http://alenbezacharity.netlify.app/">Visit our Website</a></p>
            <p>&copy; 2024 Alenbeza Charity. All Rights Reserved.</p>
          </div>
        </div>
      </body>
      </html>
      `;
    } else {
      return '<p>Invalid template type provided.</p>';
    }
  }
  export {generateHtmlTemplate}
  