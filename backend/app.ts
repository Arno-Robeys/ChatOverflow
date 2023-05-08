import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRouter from "./controller/user.routes"
import profileRouter from "./controller/profile.routes"
import messageRouter from "./controller/message.routes"
import notificationRouter from "./controller/notification.routes"
import chatRouter from "./controller/chat.routes"
import { expressjwt } from "express-jwt";

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end",
      version: "1.0.0",
    },
  },
  apis: ["./controller/*.routes.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/status", (req, res) => {
  res.json({ message: "Back-end is running..." });
});

app.use(expressjwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}).unless({path: ["/user/login", "/user/registreer", "/profile/createprofile", "/status", /^\/api-docs\/.*/]}));

app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/message", messageRouter);
app.use("/notification", notificationRouter);
app.use("/chat", chatRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request , res: Response, next: NextFunction) => {
  if(err.name === 'UnauthorizedError') {
    res.status(401).json({
      status: 'error',
      message: err.message,
    });
  }
});

app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});