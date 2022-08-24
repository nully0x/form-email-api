import { Request, Response, Router } from "express";
import { PrismaClient} from "@prisma/client"
import config from "../../config/config";
const nodemailer = require("nodemailer");

const router = Router();
const prisma = new PrismaClient();

// a function to send a notification email when a new contact get added to the database using nodemailer
const volunteerEmail = async (volunteer: any) => {
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
    subject: "You just got a new Volunteer",
    //design text using html and css to format the email
    html: `<section style="background-color: #f2f2f2; padding: 20px;"><h1 style="text-align: center;">You just got a new Volunteer</h1><p style="text-align: center;">Name: ${volunteer.full_name}</p><p style="text-align: center;">Email: ${volunteer.email}</p><p style="text-align: center;">Preferred Role: ${volunteer.prefered_role}</p><p style="text-align: center;">Portfolio Link: ${volunteer.portfolio_link}</p><p style="text-align: center;">Residence: ${volunteer.residence}</p><p style="text-align: center;">Resume_link: ${volunteer.resume_link}</p></section>`,
  };
  await transporter.sendMail(mailOptions);
};

router.post("/volunteers", async (req: Request, res: Response) => {
  if(req.body !== null){
    try {
      const data = req.body;
      const volunteers = await prisma.volunteers.create({
        data: {
          full_name: data.full_name,
          email: data.email,
          prefered_role: data.prefered_role,
          portfolio_link: data.portfolio_link,
          residence: data.residence,
          resume_link : data.resume_link,
        },
      });
      await volunteerEmail(volunteers);
      res.send(volunteers);
    } catch (error) {
      res.send(error)
    }
  }
  });

export const VolunteerRouter: Router = router;
