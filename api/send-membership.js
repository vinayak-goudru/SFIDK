// Vercel Serverless Function: /api/send-membership
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { name, email, memberId, college, taluk, course, year, date } = req.body;

  if (!email || !name || !memberId) {
    return res.status(400).json({ success: false, error: "Missing required member details" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "sfidk19@gmail.com";

  if (!apiKey || apiKey.includes("PLACEHOLDER")) {
    console.log("Brevo API key is placeholder. Returning mock success.");
    return res.json({ success: true, mock: true, message: "Email queued (Placeholder API Key set)." });
  }

  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 500px; margin: 0 auto; background: #141b2d; border-radius: 16px; border: 1px solid rgba(229, 57, 53, 0.4); overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #e53935 0%, #b71c1c 100%); padding: 24px 20px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; font-weight: 800; }
          .header p { margin: 5px 0 0; font-size: 13px; opacity: 0.9; }
          .body { padding: 24px 20px; }
          .row { display: table; width: 100%; margin-bottom: 16px; }
          .col { display: table-cell; width: 50%; vertical-align: top; }
          .label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; display: block; }
          .val { font-size: 14px; font-weight: 600; color: #f8fafc; }
          .red-text { color: #ef4444; font-weight: 700; }
          .footer-msg { text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px dashed rgba(255,255,255,0.1); font-style: italic; color: #e53935; font-size: 15px; font-weight: bold; }
          .welcome { text-align: center; padding: 15px; background: rgba(229, 57, 53, 0.1); border-radius: 8px; margin-bottom: 20px; font-size: 14px; line-height: 1.5; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>SFI MEMBERSHIP CARD</h1>
              <p>Dakshina Kannada District Unit</p>
          </div>
          <div class="body">
              <div class="welcome">
                  <strong>Revolutionary Greetings Comrade!</strong><br>
                  Welcome to the Students' Federation of India. Your membership registration is successfully completed.
              </div>
              <div class="row">
                  <div class="col">
                      <span class="label">Member Name</span>
                      <span class="val">${name}</span>
                  </div>
                  <div class="col">
                      <span class="label">Membership No.</span>
                      <span class="val red-text">#${memberId}</span>
                  </div>
              </div>
              <div class="row">
                  <div class="col">
                      <span class="label">College</span>
                      <span class="val">${college}</span>
                  </div>
                  <div class="col">
                      <span class="label">Taluk</span>
                      <span class="val">${taluk}</span>
                  </div>
              </div>
              <div class="row">
                  <div class="col">
                      <span class="label">Course & Year</span>
                      <span class="val">${course} | ${year}</span>
                  </div>
                  <div class="col">
                      <span class="label">Registration Date</span>
                      <span class="val">${date}</span>
                  </div>
              </div>
              <div class="footer-msg">
                  "Study and Struggle!"
              </div>
          </div>
      </div>
  </body>
  </html>
  `;

  try {
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey.trim()
      },
      body: JSON.stringify({
        sender: { name: "SFI Dakshina Kannada", email: senderEmail.trim() },
        to: [{ email: email.trim(), name: name.trim() }],
        subject: `SFI Membership Card - ${name} (${memberId})`,
        htmlContent: htmlBody
      })
    });

    const responseData = await brevoResponse.json();

    if (!brevoResponse.ok) {
      console.error("Brevo API Error Details:", responseData);
      return res.status(brevoResponse.status).json({
        success: false,
        error: responseData.message || responseData.code || "Brevo API call failed"
      });
    }

    console.log("Brevo Email sent successfully:", responseData);
    res.json({ success: true, messageId: responseData.messageId });
  } catch (error) {
    console.error("Server Error sending email:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to send email" });
  }
};

