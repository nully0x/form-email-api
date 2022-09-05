import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import config from "../../config/config";
const nodemailer = require("nodemailer");

const router = Router();
const prisma = new PrismaClient();

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
    to: process.env.EMAIL,
    subject: "New contact",
    //design text using html and css to format the email
    html: `<section style="background-color: #f2f2f\2; padding: 20px;"><h1 style="text-align: center;">New Contact Details</h1><p style="text-align: center;">Name: ${contact.name}</p><p style="text-align: center;">Email: ${contact.email}</p><p style="text-align: center;">Phone: ${contact.phone}</p><p style="text-align: center;">Message: ${contact.message}</p></section>`,
  };
  await transporter.sendMail(mailOptions);
};

router.post("/contacts", async (req: Request, res: Response) => {
  try {
    if (req.body && req.body !== null && req.body !== undefined) {
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
    }
  } catch (error) {
    res.send(error);
  }
});

export const ContactsRouter: Router = router;
