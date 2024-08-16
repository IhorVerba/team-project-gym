const cron = require('node-cron');
const { sendReportToAllUsers } = require('./monthReportService');

/**
 * @function scheduleMonthReportEmail
 * @description Schedule the sending of the monthly report email to all users on the 28th-31st of each month at 12:00.
 * @returns {void}
 * @throws {Error} - if an error occurs while sending the email
 */
function scheduleMonthReportEmail() {
  cron.schedule(
    '0 12 28-31 * *',
    async () => {
      try {
        console.log('Sending daily report email');
        await sendReportToAllUsers();
      } catch (error) {
        console.error('Error sending email:', error);
      }
    },
    {
      scheduled: true,
      timezone: 'Europe/Kiev',
    },
  );
}

module.exports = {
  scheduleMonthReportEmail,
};
