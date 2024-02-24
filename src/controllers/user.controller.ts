import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.users.findMany();
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { phone, name } = req.body;
        const user = await prisma.users.create({
            data: {
                phone,
                name,
            },
        });
        return res.status(201).json({ success: true, user });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id, phone, name } = req.body;

        const existingUser = await prisma.users.findUnique({ where: { id } });
        if (!existingUser) {
            return res.status(400).json({ success: false, error: 'User not found' });
        }

        const user = await prisma.users.update({
            where: {
                id,
            },
            data: {
                phone,
                name,
            },
        });
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existingUser = await prisma.users.findUnique({ where: { id } });
        if (!existingUser) {
            return res.status(400).json({ success: false, error: 'User not found' });
        }

        await prisma.users.delete({
            where: {
                id,
            },
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

