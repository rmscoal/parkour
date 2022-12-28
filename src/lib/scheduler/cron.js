const cron = require('node-cron');
const logger = require('../../config/logger');

const taskToStart = cron.schedule('* * * * *', () => {
  logger.info('Scheduler worked');
}, {
  scheduled: false,
  timezone: 'Asia/Jakarta',
});

module.exports = taskToStart;
