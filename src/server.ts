import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import config from "./config/config";
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const app: Express = express();
const port = config.port;
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/contacts", async (req: Request, res: Response) => {
  const contacts = await prisma.contacts.findMany();
  res.json(contacts);
});

// a function to send a notification email when a new contact get added to the database using nodemailer
const sendEmail = async (contact: any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email,
      pass: config.password,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: "olusegunsamson95@gmail.com",
    subject: "You just got a new contact",
    //design text using html and css to format the email
    html: `<section style="background-color: #f2f2f2; padding: 20px;"><h1 style="text-align: center;">You just got a new contact</h1><p style="text-align: center;">Name: ${contact.name}</p><p style="text-align: center;">Email: ${contact.email}</p><p style="text-align: center;">Phone: ${contact.phone}</p><p style="text-align: center;">Message: ${contact.message}</p></section>`,
  };
  await transporter.sendMail(mailOptions);
};

//check if new contact is added to the database, send an email
app.post("/contacts", async (req: Request, res: Response) => {
  const data = req.body;
  const contact = await prisma.contacts.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    },
  });
  await sendEmail(contact);
  res.send(contact);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
