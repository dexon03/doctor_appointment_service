import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/users.routes';
import doctorRoutes from './routes/doctors.routes';
import appointmentRoutes from './routes/appointments.routes';
import { errorHandler } from './middlewares/errors';
import { scheduleReminders } from './services/reminder.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', doctorRoutes);
app.use('/api', appointmentRoutes);

app.use(errorHandler);

scheduleReminders();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});