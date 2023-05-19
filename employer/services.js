import { PrismaClient } from "@prisma/client";
import express from 'express';
import { body, param, query } from "express-validator";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Database functions
const createEmployer = async (name, email) => {
    return await prisma.employer.create({
        data: {
            name: name,
            email: email
        },
    });
};

const getEmployer = async (req, res, next) => {
    try {
        const employers = await prisma.employer.findMany();
        res.send({
            success: true,
            employers: employers,
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
};

const deleteEmployer = async (id) => {
    return await prisma.employer.delete({
        where: {
            id: id,
        },
    });
};
const updateEmployer = async (id, name, email) => {


    return await prisma.employer.update({
        where: {
            id: parseInt(id),
        }, data: {
            name: name,
            email: email
        }

    });
};


// Routes
app.get("", getEmployer);
app.post("", async (req, res, next) => {
    try {

        const { name } = req.body;
        const { email } = req.body;
        const employer = await createEmployer(name, email);
        res.send({
            success: true,
            employer: employer,
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});

app.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteEmployer(+id);
        res.send({
            success: true,
            message: "Employer deleted successfully",
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});

app.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, email } = req.body;
        const employer = await updateEmployer(id, name, email);
        res.send({
            success: true,
            employer: employer,
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});

export default app


