import express from 'express';
import MediaRouter from "./MediaRouter.js";
import { swaggerDocs } from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());




const mediaRouter = new MediaRouter();
app.use("/media", mediaRouter.getRouter());

// Swagger Documentation
swaggerDocs(app);




app.use("/",(req,res)=>{
  res.send("Bienvenue sur mon api mediaFlux")
})




app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
  });


export default app;
