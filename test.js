import job from "./jobListingTable/jobListing.js";
import search from "./jobListingTable/jobSearch.js";
import emp from "./employer/services.js";
import seek from "./seek/seek.js";
import log from "./User/user.js"
import apps from "./Application/Application.js"
import express from 'express';


const app = express();
app.use("/employer",emp);
app.use("",job);
app.use("/seekers",seek);
app.use("",log);
app.use("",apps);
app.use("",search);

// Listen to port
app.listen(8081, () =>
  console.log("🚀 Server ready at: http://localhost:8081")
);
