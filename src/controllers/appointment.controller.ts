
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { scheduleReminders } from '../services/reminder.service';

const prisma = new PrismaClient();

export const bookAppointment = async (req: Request, res: Response) => {
    try {
        const { userId, doctorId, slot } = req.body;
        const slotDate = new Date(slot);
        const isValidAppointment = await validateAppointment(doctorId, slotDate);
        if (!isValidAppointment) {
            return res.status(400).json({ success: false, error: 'Invalid appointment' });
        }

        const appointment = await prisma.appointments.create({
            data: {
                userId,
                doctorId,
                slot: slotDate,
            },
        });

        scheduleReminders();

        return res.status(201).json({ success: true, appointment });
    } catch (error) {
        console.error('Error booking appointment:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const validateAppointment = async (doctorId: string, slot: Date) => {
    const doctor = await prisma.doctors.findUnique({ where: { id: doctorId } });
    if (!doctor) {
        return false;
    }
    if (!doctor.slots.some((s) => s.getTime() === slot.getTime())) {
        return false;
    }
    const existingAppointment = await prisma.appointments.findFirst({
        where: {
            doctorId,
            slot,
        },
    });
    if (existingAppointment) {
        return false;
    }
    return true;
};