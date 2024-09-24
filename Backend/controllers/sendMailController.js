import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "jiraclonetask@gmail.com",
    pass: "kzwzjbwwpahphggi",
  },
});

export const sendMail = async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await transporter.sendMail({
      to: to,
      subject: subject,
      html: message
    });

    console.log("Message sent");
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.log("Error sending email:", error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
};
