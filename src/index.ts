import { Elysia } from "elysia";
import { config } from "./config";

const app = new Elysia().get("/", () => "Hello Elysia").listen(config.port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
