import { PrismaClient } from "@prisma/client";
import express from 'express';
import { body, param, query } from "express-validator";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());


// Route for submitting an application
app.post('/application', async (req, res) => {
  try {
    const { seekerId, jobListingId, resume, coverLetter } = req.body;

    // Create a new application in the database
    const application = await prisma.application.create({
      data: {
        seekerId: parseInt(seekerId),
        jobListingId: parseInt(jobListingId),
        resume: resume,
        coverLetter: coverLetter,
      },
    });

    res.json({ success: true, application: application });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/application', async (req, res) => {
  try {
    const application = await prisma.application.findMany();
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the applications.' });
  }
});


//delete 
const deleteapplication = async (id) => {
  return await prisma.application.delete({
      where: {
          id:id,
      },
  });
};
app.delete("/application/:id", async (req, res, next) => {
  try {
      const id = req.params.id;
      await deleteapplication(+id);
      res.send({
          success: true,
          message: " deleted successfully",
      });
  } catch (error) {
      res.send({
          success: false,
          error: error.message,
      });
  }
});

// Start the server
app.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});
