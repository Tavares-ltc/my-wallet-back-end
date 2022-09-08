import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
import joi from 'joi';
import { stripHtml } from "string-strip-html";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const mongoClient = (process.env.MONGO_URI);
let db;
mongoClient.connect().then(()=> db = mongoClient.db('mywallet'));