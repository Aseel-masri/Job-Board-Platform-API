
import { PrismaClient } from "@prisma/client";
import express from 'express';
import { body, param, query } from "express-validator";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());


////////////////////////////////
// Database functions
const createSeeker = async (name, email, password) => {
    return await prisma.seekers.create({
      data: {
        name: name,
        email: email,
        password: password
      },
    });
  };
  
  const getSeeker = async (req, res, next) => {
    try {
      const seeker = await prisma.seekers.findMany();
      res.send({
        success: true,
        seeker: seeker,
      });
    } catch (error) {
      res.send({
        success: false,
        error: error.message,
      });
    }
  };
  
  const deleteSeeker = async (id) => {
      return await prisma.seekers.delete({
        where: {
          id: id,
        },
      });
    };
  
    
    const updateSeeker = async (id, name, email) => {


        return await prisma.seekers.update({
            where: {
                id: parseInt(id),
            }, data: {
                name: name,
                email: email
            }
    
        });
    };
    
    const updatePassword = async (id, password) => {


      return await prisma.seekers.update({
          where: {
              id: parseInt(id),
          }, data: {
              password: password
          }
  
      });
  }; 
    
  
  
  // Routes
  app.get("", getSeeker);

  app.post("", async (req, res, next) => {
    try {
      const { name } = req.body.name;
      const { email } = req.body.email;
      const { password } = await bcrypt.hash(req.body.password, 10);
      const seeker = await createSeeker(req.body.name, req.body.email, await bcrypt.hash(req.body.password, 10));
      res.send({
        success: true,
        seeker: seeker,
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
        await deleteSeeker(+id);
        res.send({
          success: true,
          message: "Seeker deleted successfully",
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
        const { id } = req.params;
        const { name,email } = req.body;
        const seeker = await updateSeeker(id, name, email);
        if(seeker){
        res.send({
          success: true,
          seeker: seeker,
        });}
        else{
          res.status(404);
          res.send({
              success: fasle,
              employer: "No seeker have this id",
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
          const { password } = String(await bcrypt.hash(req.body.password, 10));
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
