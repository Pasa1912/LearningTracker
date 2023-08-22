import {configDotenv} from "dotenv";
import mongoose from "mongoose";
import express from 'express';
import dataRoutes from './routes/data.js';
configDotenv()

let app = express()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use('/data', dataRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server has started on ${PORT}`))