import { PrismaClient } from "@prisma/client";
import express from 'express';
import bcrypt from 'bcrypt';
import { body, param, query } from "express-validator";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
export const seekerLogin = async (email, password) => {
    const user = await prisma.seekers.findFirst({
      where: {
        email: email,
      },
    });
    if(user && await bcrypt.compare(password, user.password)) {
        return user;
      } else {
        return null;
      }
  
    
  };
  export const employerLogin = async (email, password) => {
    const user = await prisma.employer.findFirst({
      where: {
        email: email,
      },
    });
    if(user && await bcrypt.compare(password, user.password)) {
        return user;
      } else {
        return null;
      }
  
    
  };
  
// Routes
// log in as employer
app.post("/employer/login",  async (req, res, next) => {
    try {
        const user = await employerLogin(req.body.email, req.body.password);
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
        res.status(500).res.send({
            success: false,
            error: error.message,
        });
    }
});
//log in as seeker
app.post("/seeker/login",  async (req, res, next) => {
    try {
        const user = await seekerLogin(req.body.email, req.body.password);
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
        res.status(500).res.send({
            success: false,
            error: error.message,
        });
    }
});


export default app


