import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await prisma.doctors.findMany();
        return res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const createDoctor = async (req: Request, res: Response) => {
    try {
        const { name, spec, slots } = req.body;
        const dates: Date[] = slots.map((slot: string) => new Date(slot));
        const doctor = await prisma.doctors.create({
            data: {
                name,
                spec,
                slots: dates,
            },
        });
        return res.status(201).json({ success: true, doctor });
    } catch (error) {
        console.error('Error creating doctor:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


export const updateDoctor = async (req: Request, res: Response) => {
    try {
        const { id, name, spec, slots } = req.body;

        const existingDoctor = await prisma.doctors.findUnique({ where: { id } });
        if (!existingDoctor) {
            return res.status(400).json({ success: false, error: 'Doctor not found' });
        }

        const doctor = await prisma.doctors.update({
            where: {
                id,
            },
            data: {
                name,
                spec,
                slots,
            },
        });
        return res.status(200).json({ success: true, doctor });
    } catch (error) {
        console.error('Error updating doctor:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const deleteDoctor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existingDoctor = await prisma.doctors.findUnique({ where: { id } });
        if (!existingDoctor) {
            return res.status(400).json({ success: false, error: 'Doctor not found' });
        }

        await prisma.doctors.delete({
            where: {
                id,
            },
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


