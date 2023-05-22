import { PrismaClient } from "@prisma/client";
import express from 'express';
import { body, param, query } from "express-validator";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Database functions
const createEmployer = async (name, email, password) => {
    return await prisma.employer.create({
        data: {
            name: name,
            email: email,
            password: password
        },
    });
};
const updatePassword = async (id, password) => {


    return await prisma.employer.update({
        where: {
            id: parseInt(id),
        }, data: {
            password: password
        }

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

        const { name } = req.body.name;
        const { email } = req.body.email;
        const { password } = await bcrypt.hash(req.body.password, 10);
        const employer = await createEmployer(req.body.name, req.body.email, await bcrypt.hash(req.body.password, 10));
        res.send({
            success: true,
            employer: employer,
        });
    } catch (error) {
        res.status(404);
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
        res.status(404);
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
        const employer = await updateEmployer(id, req.body.name, req.body.email);
        if (employer) {
            res.send({
                success: true,
                employer: employer,
            });
        }
        else {
            res.status(404);
            res.send({
                success: fasle,
                employer: "No employer have this id",
            });
        }
    } catch (error) {
        res.status(404);
        res.send({
            success: false,
            error: error.message,
        });
    }
});
app.put("/changepassword/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const { password } = await bcrypt.hash(req.body.password, 10);
        const user = await updatePassword(id, await bcrypt.hash(req.body.password, 10));
        if (user) {
            res.send({
                success: true,
                NewPassword: await bcrypt.hash(req.body.password, 10),
            });
        }
        else {
            res.status(404);
            res.send({
                success: false,
                msg: "No one have this id",
            });
        }
    } catch (error) {
        res.status(404);
        res.send({
            success: false,
            error: error.message,
        });
    }
});

export default app


