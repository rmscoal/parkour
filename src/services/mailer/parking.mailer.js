const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const logger = require('../../config/logger');

/**
 * @typedef {Object} MailAdminData
 * @property {Number} count - length of mapped array
 * @property {Array<String>} licensePlates - array of license plates
 */

/**
 * @class
 * A class for sending mails.
 */
class Mailer {
  /**
   * Create a mail transport, data to send, template to chose form, and
   * recipients of the mail.
   * @param {Object} configs defines the configuration for nodemailer
   * @param {MailAdminData} data defines the data to be inserted in the mail
   * @param {Array<String>} recipient defines the reciever of the mail
   * @param {String} template defines the template of the mail
   */
  constructor(configs, data, recipient, template) {
    /** @private */
    this.configs = configs;
    /** @private */
    this.data = data;
    /** @private */
    this.recipients = recipient;
    /** @private */
    this.template = template;

    // Define the transporter
    /** @private */
    this.transporter = nodemailer.createTransport({
      service: this.configs.service,
      auth: {
        user: this.configs.user,
        pass: this.configs.pass,
      },
    });

    /**
     * @private
     * Define the options for handlebars
    */
    this.options = {
      viewEngine: {
        extName: '.hbs',
        layoutsDir: 'src/views/mail',
        defaultLayout: this.template.concat('.hbs'),
      },
      viewPath: 'src/views/mail',
      extName: '.hbs',
    };

    // Use handlebars in the transporter
    this.transporter.use('compile', hbs(this.options));
  }

  /**
   * @method send
   * Sends the mail using the class transporter constructor.
   */
  send() {
    this.transporter.sendMail({
      from: `"Parkour Application 🚗" ${this.configs.user}`,
      to: this.recipients.join(','),
      subject: 'Parking Warning To Admin',
      template: 'template.v1',
      context: this.data,
    }, (err, info) => {
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
  }
}

module.exports = Mailer;
