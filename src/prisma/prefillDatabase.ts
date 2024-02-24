// prefillDatabase.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const prefillDatabase = async () => {

    // check if the database is already pre-filled
    const usersCount = await prisma.users.count();
    const doctorsCount = await prisma.doctors.count();

    let users = []
    let doctors = []
    for (let i = 0; i < 5; i++) {
        users.push({ phone: `+380${i}1111111`, name: `User ${i}` })
        let slots = []
        for (let j = 10; j < 19; j++) {
            slots.push(new Date(`2024-02-2${i}T${j}:00:00Z`))
            // slots.push(`2024-02-2${i}T0${j}:00:00Z`)
        }
        doctors.push({ name: `Doctor ${i}`, spec: `Specialization ${i}`, slots: slots })
    }


    try {
        // Pre-fill users
        if (usersCount === 0) {
            await prisma.users.createMany({
                data: users
            });
        }

        // Pre-fill doctors with slots
        if (doctorsCount === 0) {
            await prisma.doctors.createMany({
                data: doctors
            });
        }

        console.log('Database prefilling completed successfully.');
    } catch (error) {
        console.error('Error prefilling database:', error);
    } finally {
        await prisma.$disconnect();
    }
};

prefillDatabase();
