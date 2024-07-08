const express = require('express');
const router = express.Router();
const mailSender = require('../utils/mailSender');

// Dummy handler for scheduling a meeting and sending emails
router.post('/schedule', async (req, res) => {
  const { date, time, clientEmail, coachEmail } = req.body;

  // HTML body for the email
  const emailBody = `
    <p>Hello,</p>
    <p>You've scheduled a meeting on ${date} at ${time}.</p>
    <p>Meeting URL: <a href="https://meet.google.com/chy-kicz-iwo">https://meet.google.com/chy-kicz-iwo</a></p>
    <p>Thank you!</p>
  `;

  try {
    await mailSender(clientEmail, 'Meeting Scheduled', emailBody);
    await mailSender(coachEmail, 'Meeting Scheduled', emailBody);

    res.status(200).send({ message: 'Meeting scheduled and emails sent' });
  } catch (error) {
    console.error('Error scheduling meeting and sending emails:', error);
    res.status(500).send({ message: 'Error scheduling meeting and sending emails' });
  }
});

module.exports = router;