const generateHtmlTemplate = (templateType, params) => {
  const baseStyles = `
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); border-radius: 5px; }
    .header { background-color: #2d2d2d; color: white; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; }
    .content { margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #2d2d2d; }
    .footer { text-align: center; padding: 10px; color: #777; font-size: 12px; border-top: 1px solid #eee; }
    .message-box { background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; font-size: 16px; margin: 10px 0; }
  `;
  
  if (templateType === 'template1') {
    return `
      <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style></head><body><div class="container">
      <div class="header">Alenbeza Charity</div><div class="content"><p>Hello Alenbeza Charity Leader,</p>
      <p>You have one new member<br>Name: <strong>${params.from_name}</strong><br>Phone: ${params.phonenumber}<br>Email: ${params.email}</p>
      <div class="message-box">${params.message}</div><p>Please review and respond.</p><p>Alenbeza Charity Website</p></div>
      <div class="footer">&copy; 2024 Alenbeza Charity. All Rights Reserved.</div></div></body></html>`;
  }

  if (templateType === 'template2') {
    return `
      <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style></head><body><div class="container">
      <div class="header">Alenbeza Charity</div><div class="content"><p>Hello <strong>Alenbeza Leader</strong>,</p>
      <p>You have received a new message from Website<br>Name: ${params.from_name}<br>Phone: ${params.phone}<br>Email: ${params.from_email}</p>
      <div class="message-box">${params.message}</div><p>Alenbeza Charity Website</p></div>
      <div class="footer"><a href="http://alenbezacharity.netlify.app/">Visit our Website</a><br>&copy; 2024 Alenbeza Charity. All Rights Reserved.</div></div></body></html>`;
  }

  if (templateType === 'template3') {
    return `
      <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles.replace('#2d2d2d', '#dc3545')}</style></head><body><div class="container">
      <div class="header">Alenbeza Charity Notification</div><div class="content"><p>Hello Leader,</p>
      <p>User <strong>${params.name}</strong> <br> Phone Number : (${params.phonenumber}) has requested a password reset.<br>New password: <strong>${params.newPassword}</strong></p>
      <p>Please review and take necessary actions or  sent for user.</p></div><div class="footer">&copy; 2024 Alenbeza Charity. All Rights Reserved.</div></div></body></html>`;
  }
  if (templateType === 'template4') {
    return `
      <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles.replace('#2d2d2d', '#dc3545')}</style></head><body><div class="container">
      <div class="header">Alenbeza Charity Notification</div><div class="content"><p>Hello ${params.name},</p>
      <p>you have requested a password reset.<br>New password: <strong>${params.newPassword}</strong></p>
  <div class="footer">&copy; 2024 Alenbeza Charity. All Rights Reserved.</div></div></body></html>`;
  }

  return '<p>Invalid template type provided.</p>';
};

export { generateHtmlTemplate };
