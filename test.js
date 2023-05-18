var myname="Job-Board-Platform-API";
console.log(myname);
console.log("aseel");
console.log("mira test");
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

app.get("/employer", getEmployer);

// Listen to port
app.listen(8081, () =>
  console.log("🚀 Server ready at: http://localhost:8081")
);
