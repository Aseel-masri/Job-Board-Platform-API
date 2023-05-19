var myname="Job-Board-Platform-API";
console.log(myname);
console.log("aseel");
console.log("aseel linda mira");
const { PrismaClient } = require("@prisma/client");
const express = require('express');
const { body, param, query } = require('express-validator');
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());

// Database functions
const createEmployer = async (name) => {
  return await prisma.employer.create({
    data: {
      name: name,
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
  const updateEmployer = async (id, { id: _, name }) => {
    if (!name) {
      throw new Error("Name is required for update."+name+"+");
    }
  
    return await prisma.employer.update({
      where: {
        id: parseInt(id),
      }, data: {
        name: name
      }
      
    });
  };
  
  
  
  


// Routes
app.post("/employer", async (req, res, next) => {
  try {
    const { name } = req.body;
    const employer = await createEmployer(name);
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
app.delete("/employer/:id", async (req, res, next) => {
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
  

  app.put("/employer/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const employer = await updateEmployer(id, req.body);
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
  
  


app.get("/employer", getEmployer);

// Listen to port
app.listen(8081, () =>
  console.log("🚀 Server ready at: http://localhost:8081")
);

