import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import config from "../../config/config";
const nodemailer = require("nodemailer");

const router = Router();
const prisma = new PrismaClient();

// a function to send a notification email when a new contact get added to the database using nodemailer
const installationEmail = async (installation: any) => {
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
    subject: "You just got a new Installation Request", 
    //design text using html and css to format the email
    html: `<section style="background-color: #f2f2f2; padding: 20px;"><h1 style="text-align: center;">You just got a new Installation Request</h1><p style="text-align: center;">Name: ${installation.name}</p><p style="text-align: center;">Email: ${installation.email}</p><p style="text-align: center;">Area Capacity: ${installation.area_capacity}</p> <p style="text-align: center;">Estate Name: ${installation.estate_name}</p>
    <p style="text-align: center;">Country: ${installation.country}</p><p style="text-align: center;">State of Residence: ${installation.state_of_residence}</p><p style="text-align: center;">Other Info: ${installation.other_info}</p></section>`,
  };
  await transporter.sendMail(mailOptions);
};

router.post("/installation", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const installation = await prisma.installation.create({
      data: {
        name: data.name,
        email: data.email,
        other_info: data.other_info, 
        area_capacity : data.area_capacity,
        estate_name   : data.estate_name,
        country     : data.country,
        state_of_residence   : data.state_of_residence,
      },
    });
    await installationEmail(installation);
    res.send(installationEmail);
  } catch (error) {
    res.send(error)
  }
});

export const InstallationRouter: Router = router;
