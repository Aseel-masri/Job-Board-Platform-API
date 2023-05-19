
import emp from "./employer/services.js";
import express from 'express';
const app = express();
app.use("/employer",emp);
// Listen to port
app.listen(8081, () =>
  console.log("🚀 Server ready at: http://localhost:8081")
);

