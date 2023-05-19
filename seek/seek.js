
import { PrismaClient } from "@prisma/client";
import express from 'express';
import { body, param, query } from "express-validator";
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());


////////////////////////////////
// Database functions
const createSeeker = async (name, email) => {
    return await prisma.seekers.create({
      data: {
        name: name,
        email: email
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
    
    
    
  
  
  // Routes
  app.get("", getSeeker);

  app.post("", async (req, res, next) => {
    try {
      const { name } = req.body;
      const { email } = req.body;

      const seeker = await createSeeker(name,email);
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
    });
    
    
  
    export default app
