const nodeMailer = require("nodemailer");

const config = require("../config/config");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: config.smpt.mailService,
    auth: {
      user: config.smpt.mailId,
      pass: config.smpt.mailPassword,
    },
  });

  const mailOptions = {
    from: config.smpt.mailId,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
