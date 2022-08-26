import { Router, Request, Response } from "express";
import { ContactsRouter } from "./contacts.routes";


const router: Router = Router();

router.use("/", ContactsRouter);

router.get("/", async (req: Request, res: Response) => {
    res.send("Hello");
  });


export const IndexRouter: Router = router;