

////////////////////////////////////////
const { PrismaClient } = require("@prisma/client");
const express = require('express');
const { body, param, query } = require('express-validator');
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());


////////////////////////////////
// Database functions
const createSeeker = async (name) => {
    return await prisma.seekers.create({
      data: {
        name: name,
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
    const updateSeeker = async (id, { id: _, name }) => {
      if (!name) {
        throw new Error("Name is required for update."+name+"+");
      }
    
      return await prisma.seekers.update({
        where: {
          id: parseInt(id),
        }, data: {
          name: name
        }
        
      });
    };
    
    
    
    
  
  
  // Routes
  app.post("/seekers", async (req, res, next) => {
    try {
      const { name } = req.body;
      const seeker = await createSeeker(name);
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
  app.delete("/seekers/:id", async (req, res, next) => {
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
    
  
    app.put("/seekers/:id", async (req, res, next) => {
      try {
        const { id } = req.params;
        const { name } = req.body;
        const seeker = await updateSeeker(id, req.body);
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
    
    
  
  
  app.get("/seekers", getSeeker);
  
  // Listen to port
  app.listen(8081, () =>
    console.log("🚀 Server ready at: http://localhost:8081")
  );