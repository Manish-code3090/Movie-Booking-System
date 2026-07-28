import express from "express";
import {
  createShow,
  getAllShows,
  editShow,
  cancelShow,
  getShowById,
} from "../controller/shows.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorized from "../middlewares/authorized.middleware.js";
const show_router = express.Router();
// routes
show_router.post(
  "/create",
  authMiddleware,
  authorized("ADMIN", "SUPER_ADMIN", "THEATRE_OWNER"),
  createShow,
);
show_router.get("/", authMiddleware, getAllShows);
show_router.get("/:id", authMiddleware, getShowById);
show_router.patch(
  "/:id/edit",
  authMiddleware,
  authorized("ADMIN", "SUPER_ADMIN", "THEATRE_OWNER"),
  editShow,
);
show_router.patch(
  "/:id/cancel",
  authMiddleware,
  authorized("ADMIN", "SUPER_ADMIN", "THEATRE_OWNER"),
  cancelShow,
);
export default show_router;
