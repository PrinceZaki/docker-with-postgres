import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from 'express';
import mongoose, { Mongoose } from "mongoose";
const client = new PrismaClient();

const app = express();
const PORT = 3000;





app.use(express.json());

app.get("/", (req, res) => {
  res.json({
      message: "Healthy server"
  })
})

app.post("/add-user", async (req, res) => {
  


  
  await client.user.create({
      data: {
          email: req.body.email,
          name: req.body.name
      }
  })

  res.json({
      message: "Done signing up!"
  })
})


// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Node.js + TypeScript CRUD API!');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
