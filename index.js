import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import tasksRouter from './routes/tasks.routes.js';
import * as dotenv from "dotenv"; 
dotenv.config();
const PORT = process.env.PORT || 8000;

// To parse json request body
app.use(express.json());
// For parsing form request body
app.use(bodyParser.urlencoded({extended:false}))
app.use("/tasks",tasksRouter)


app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})