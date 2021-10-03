import { validate, validateOrReject } from "class-validator";
import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import errorHandler, { NotFoundError } from "../middlewares/errorHandler";
import expressAsyncHandler from "../middlewares/expressAsyncHandler";

const router = Router();

router.get("/", (req, res) =>
  res.json({
    message: "Hello Wegodev!",
    author: "sap471 <https://github.com/sap471>",
    repository: "https://github.com/sap471/wegodev-backend-challenge"
  })
);

router.post(
  "/users",
  expressAsyncHandler(async (req, res) => {
    let data = req.body as User;

    const userRepository = getRepository(User);
    let user = new User();
    Object.assign(user, data);

    await validateOrReject(user);

    const result = await userRepository.save(user);

    return res.json(result);
  })
);

router.get(
  "/users/:userId",
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const userRepository = getRepository(User);
    const result = await userRepository.findOne(userId);
    if (!result) throw new NotFoundError(`user.id "${userId}" is not found`);

    return res.json(result);
  })
);

router.use(errorHandler);

export default router;
