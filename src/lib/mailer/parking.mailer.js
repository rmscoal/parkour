const mailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const config = require('../../config/config');
const logger = require('../../config/logger');

// TODO: Make class

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
 * the email. It uses data to display dynamic data on to
 * the email.
 * @param {Object} data
 */
const mailerNotifier = async (data) => {
  const transporter = mailer.createTransport({
    service: config.mailer.service,
    auth: {
      user: config.mailer.user, // generated ethereal user
      pass: config.mailer.pass, // generated ethereal password
    },
  });

  // Options for handlebars
  const options = {
    viewEngine: {
      extName: '.hbs',
      layoutsDir: 'src/views/mail',
      defaultLayout: 'template.v1.hbs',
    },
    viewPath: 'src/views/mail',
    extName: '.hbs',
  };

  transporter.use('compile', hbs(options));

  const mailBody = {
    from: `"Parkour Application 🚗" ${config.mailer.user}`,
    to: config.mailer.recipient,
    subject: 'Parking Warning To Admin',
    template: 'template.v1',
    context: data,
  };

  send(transporter, mailBody);
};

module.exports = mailerNotifier;
