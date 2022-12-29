const mailer = require('nodemailer');
const config = require('../../config/config');
const logger = require('../../config/logger');

/**
 * @private
 * Sends the email and responsible for giving errors on
 * unsuccessful mailing and info on successful mailing.
 * @param {mailer.Transporter<SMTPTransport.SentMessageInfo>} transporter
 * @param {Object} mailBody
 */
const send = async (transporter, mailBody) => {
  transporter.sendMail(mailBody, (err, info) => {
    if (err) {
      logger.error(`\n----------- MAILER -----------\n
    There occured an error.

    Error: ${err.message}\n`);
    } else {
      logger.info(`\n----------- MAILER -----------\n
    Successfully sent message

    Message ID: ${info.messageId}
    Sender: ${info.envelope.from}
    Accepted Recipients: ${info.envelope.to.join(', ')}`);
    }
  });
};

/**
 * @public
 * mailerNotifier created the mailing transporter and the
 * message body. Once created, it calls send() on sending
 * the email.
 * @param {*} queryData
 */
const mailerNotifier = async () => {
  const transporter = mailer.createTransport({
    service: config.mailer.service,
    auth: {
      user: config.mailer.user, // generated ethereal user
      pass: config.mailer.pass, // generated ethereal password
    },
  });

  const mailBody = {
    from: `"Parkour Application 👻" ${config.mailer.user}`, // sender address
    to: config.mailer.recipient, // list of receivers
    subject: '', // Subject line
    text: 'Hello world?', // plain text body
    html: `<html>
    <body>
     Hello and welcome
    </body>
   </html>`, // html body
  };

  send(transporter, mailBody);
};

module.exports = mailerNotifier;
