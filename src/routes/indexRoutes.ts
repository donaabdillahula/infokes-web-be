import { Router } from "express";
import folderRouter from "./folderRoutes";

const router = Router();

router.use("/folders", folderRouter);

export default router;