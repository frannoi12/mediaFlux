import express from 'express';
import MediaRouter from "./MediaRouter.js";
import { swaggerDocs } from "./swagger.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/",(req,res)=>{
  res.send("mon api")
})


const mediaRouter = new MediaRouter();
app.use("/media", mediaRouter.getRouter());

// Swagger Documentation
swaggerDocs(app);








app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
  });