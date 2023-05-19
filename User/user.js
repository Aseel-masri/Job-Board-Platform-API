import { PrismaClient } from "@prisma/client";
import express from 'express';
import { body, param, query } from "express-validator";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());


// Database functions
const createUser = async (username, password) => {
    return await prisma.user.create({
        data: {
            username: username,
            password: password
        },
    });
};

const getUser = async (req, res, next) => {
    try {
        const User = await prisma.user.findMany();
        res.send({
            success: true,
            User: User,
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
};

const deleteUser = async (id) => {
    return await prisma.user.delete({
        where: {
            id: id,
        },
    });
};
const updatePassword = async (id, password) => {


    return await prisma.user.update({
        where: {
            id: parseInt(id),
        }, data: {
            password: password
        }

    });
};
export const Login = async (username, password) => {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
    });
  
    if (user) {
        return user;
    } else {
        return null;
    }
  
    
  };
  
// Routes
app.get("", getUser);
app.get("/:username/:password",  async (req, res, next) => {
    try {

        const { username } = req.params;
        const { password } = req.params;
        const user = await Login(username, password);
        if (user){
        res.send({
            success: true,
            user: user,
        });}
        else{
            res.send({
                success: false,
                error: "Wrong in username or password",
            });
        }
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});
app.post("", async (req, res, next) => {
    try {

        const { username } = req.body;
        const { password } = req.body;
        const user = await createUser(username, password);
        res.send({
            success: true,
            user: user,
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
        await deleteUser(+id);
        res.send({
            success: true,
            message: "User deleted successfully",
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
        const {  password } = req.body;
        const user = await updatePassword(id,password);
        res.send({
            success: true,
            NewPassword: password,
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});

export default app


