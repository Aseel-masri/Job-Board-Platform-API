import axios from 'axios';
import express from 'express';

const app = express();
app.use(express.json());

const options = {
  method: 'GET',
  url: 'https://remote-jobs-api.p.rapidapi.com/jobs',
  params: { company: 'shopify' },
  headers: {
    'X-RapidAPI-Key': 'fcb0794006msh1506e0590dbd0adp15c2d4jsn6f26f2163c47',
    'X-RapidAPI-Host': 'remote-jobs-api.p.rapidapi.com'
  }
};

app.get("/jobSearch", async (req, res, next) => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.setHeader('Content-Type', 'application/json'); // Set the response header
    res.send({
      sucsses:true,
      response:response.data

    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


export default app

