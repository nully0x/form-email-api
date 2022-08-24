import { Router, Request, Response } from "express";
import { ContactsRouter } from "./contacts.routes";
import { InstallationRouter } from "./installation.routes";
import { VolunteerRouter } from "./volunteer";

const router: Router = Router();

router.use("/", ContactsRouter);
router.use("/", InstallationRouter)
router.use("/", VolunteerRouter)

router.get("/", async (req: Request, res: Response) => {
    res.send("Hello");
  });


export const IndexRouter: Router = router;