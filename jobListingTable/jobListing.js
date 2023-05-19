import { PrismaClient } from "@prisma/client";
import express from 'express';
import { body, param, query } from "express-validator";
const prisma = new PrismaClient();
const app = express();
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

// Retrieve job listings by title
app.get("/:query", async (req, res) => {
  const { query } = req.params;

  try {
    const jobListings = await prisma.joblistings.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              
            },
          },
          {
            location: {
              contains: query,
            
            },
          },
        ],
      },
    });

    res.json(jobListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving job listings." });
  }
});



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
app.get("", getJobListings);
app.post("", async (req, res, next) => {
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
  
app.delete("/:id", async (req, res, next) => {
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
  
  app.put("/:id", async (req, res, next) => {
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


export default app

  