import { PrismaClient, Prisma } from '@prisma/client';
import { CronJob } from 'cron';
import winston from 'winston';
import moment from 'moment';

const prisma = new PrismaClient();

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'reminders.log' }),
  ],
});

export const scheduleReminders = () => {
  new CronJob('0 0 12 * * *', async () => {
    try {
      const tomorrow = moment().add(1, 'days').startOf('day').toDate();
      const appointments = await prisma.appointments.findMany({
        where: {
          slot: {
            gte: tomorrow,
            lt: moment(tomorrow).add(1, 'days').toDate(),
          },
        },
        include: {
          doctor: true,
          user: true,
        },
      });
      
      for (const appointment of appointments) {
        const currentDate = moment().format('YYYY-MM-DD HH:mm');
        const appointmentDate = moment(appointment.slot).format('YYYY-MM-DD HH:mm');
        const message = `${currentDate} | Привет ${appointment.user.name}! Напоминаем что вы записаны к ${appointment.doctor.spec} завтра в ${appointmentDate}`;
        logger.info(message);
      }
    } catch (error) {
      console.error('Error scheduling reminder:', error);
    }
  }, null, true, 'Europe/Kiev');

  new CronJob('0 0 10,14,18 * * *', async () => {
    try {
      const twoHoursFromNow = moment().add(2, 'hours').toDate();
      const appointments = await prisma.appointments.findMany({
        where: {
          slot: {
            gte: twoHoursFromNow,
            lt: moment(twoHoursFromNow).add(2, 'hours').toDate(),
          },
        },
        include: {
          doctor: true,
          user: true,
        },
      });
      
      for (const appointment of appointments) {
        const currentDate = moment().format('YYYY-MM-DD HH:mm');
        const appointmentDate = moment(appointment.slot).format('YYYY-MM-DD HH:mm');
        const message = `${currentDate} | Привет ${appointment.user.name}! Вам через 2 часа к ${appointment.doctor.spec} в ${appointmentDate}`;
        logger.info(message);
      }
    } catch (error) {
      console.error('Error scheduling reminder:', error);
    }
  }, null, true, 'Europe/Kiev');
};
