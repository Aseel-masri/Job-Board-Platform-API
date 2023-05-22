import { PrismaClient } from "@prisma/client";
import express from 'express';
import { body, param, query } from "express-validator";
import multer from "multer";
import fs from 'fs';
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const updateApp = async (id, resume, coverLetter) => {


  return await prisma.application.update({
      where: {
          id: parseInt(id),
      }, data: {
          resume: resume,
          coverLetter: coverLetter
      }

  });
};
// Route for submitting an application
const upload = multer({ dest: "./cv" });


app.put("/seeker/Application/:id", upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 }
]), async (req, res) => {
  try {
    const id = req.params.id;
    const resume = req.files['resume'][0];
    const coverLetter = req.files['coverLetter'][0];
    const resumePath = resume.path + ".pdf";
    const coverLetterPath = coverLetter.path + ".pdf";
    fs.renameSync(resume.path, resumePath);
    fs.renameSync(coverLetter.path, coverLetterPath);
    const application = await updateApp(id, resumePath, coverLetterPath);
    if (application) {
      res.send({
        success: true,
        application: application,
      });
    } else {
      res.status(404);
      res.send({
        success: false,
        error: "No application found with the given ID.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});
app.post('/seeker/Application/:seekerId/:jobListingId', upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 }
]), async (req, res) => {
  try {
    const { seekerId, jobListingId } = req.params;
    const resume = req.files['resume'][0];
    const coverLetter = req.files['coverLetter'][0];
    const resumePath = resume.path + ".pdf";
    const coverLetterPath = coverLetter.path + ".pdf";
    fs.renameSync(resume.path, resumePath);
    fs.renameSync(coverLetter.path, coverLetterPath);
    const application = await prisma.application.create({
      data: {
        seekerId: parseInt(seekerId),
        jobListingId: parseInt(jobListingId),
        resume: resume.path + ".pdf",
        coverLetter: coverLetter.path + ".pdf",
      },
    });

    res.json({ success: true, application: application });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get('/Application', async (req, res) => {
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
      id: id,
    },
  });
};
app.delete("/seeker/Application/:id", async (req, res, next) => {
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

export default app



