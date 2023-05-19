import job from "./jobListingTable/jobListing.js";
import emp from "./employer/services.js";
import express from 'express';

const app = express();
console.log("dn");
app.use("/employer",emp);
app.use("/joblistings",job);
// Listen to port
app.listen(8081, () =>
  console.log("🚀 Server ready at: http://localhost:8081")
);

