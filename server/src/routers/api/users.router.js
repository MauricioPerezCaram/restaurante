import { Router } from "express";
import { users } from "../../dao/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

const usersRouter = Router();

usersRouter.post("/", isAdmin, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await users.read({});
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readOne(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.put("/:uid", isAdmin, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await users.update(uid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.delete("/:uid", isAdmin, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.destroy(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;