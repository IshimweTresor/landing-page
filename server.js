const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-request', async (req, res) => {
  const { company, contact, email, phone, space } = req.body;

  // Configure your email transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tunganawe@gmail.com', // Your Gmail address
      pass: 'Tunga@410' // Use Gmail App Password, not your regular password
    }
  });

  let mailOptions = {
  from: 'tunganawe@gmail.com',
  to: 'tunganawe@gmail.com',
  subject: 'New Private Presentation Request',
  text: `New request from landing page:\n\nCompany: ${company}\nContact Person: ${contact}\nEmail: ${email}\nPhone: ${phone}\nSpace Requirements: ${space}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
