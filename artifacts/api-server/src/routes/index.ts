import { type IRouter, Router } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import userRouter from "./user";
import modulesRouter from "./modules";
import lessonsRouter from "./lessons";
import progressRouter from "./progress";
import puzzlesRouter from "./puzzles";
import activityRouter from "./activity";
import badgesRouter from "./badges";
import contentRouter from "./content";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/modules", modulesRouter);
router.use("/lessons", lessonsRouter);
router.use("/progress", progressRouter);
router.use("/puzzles", puzzlesRouter);
router.use("/activity", activityRouter);
router.use("/badges", badgesRouter);
router.use("/content", contentRouter);

export default router;
