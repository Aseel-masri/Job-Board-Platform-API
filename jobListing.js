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

// Middleware
// Database functions
const createJobListings = async (jobListings) => {
  const jobListingsData = jobListings.map((listing) => ({
    title: listing.title,
    description: listing.description,
    requirements: listing.requirements,
    salary: listing.salary,
    location: listing.location,
  }));

  return await prisma.joblistings.createMany({
    data: jobListingsData,
    skipDuplicates: true,
  });
};


const getJobListings = async (req, res, next) => {
  try {
    const jobListings = await prisma.joblistings.findMany();
    res.send({
      success: true,
      jobListings: jobListings,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
};

const deleteJobListing = async (id) => {
    return await prisma.joblistings.delete({
      where: {
        id: id,
      },
    });
  };



  const updateJobListing = async (id, { title, description, requirements, salary, location }) => {
  if (!title) {
    throw new Error("Title is required for update.");
  }

  return await prisma.joblistings.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: title,
      description: description,
      requirements: requirements,
      salary: salary,
      location: location,
    },
  });
};

// Routes
app.post("/joblistings", async (req, res, next) => {
  try {
    const jobListings = req.body;
    const createdJobListings = await createJobListings(jobListings);
    res.send({
      success: true,
      jobListings: createdJobListings,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});
  // app.get("/joblistings", getJobListings);
  
app.delete("/joblistings/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteJobListing(+id);
      res.send({
        success: true,
        message: "Job listing deleted successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        error: error.message,
      });
    }
  });
  
  app.put("/joblistings/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, requirements, salary, location } = req.body;
      const jobListing = await updateJobListing(id, { title, description, requirements, salary, location });
      res.send({
        success: true,
        jobListing: jobListing,
      });
    } catch (error) {
      res.send({
        success: false,
        error: error.message,
      });
    }
  });


 
app.get("/joblistings", getJobListings);

// Listen to port
app.listen(8081, () =>
  console.log("🚀 Server ready at: http://localhost:8081")
);

  