import { Elysia } from "elysia";
import { config } from "./config";
import { swagger } from "@elysiajs/swagger";
import { apiRoutes } from "./routes";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia API",
          version: "1.0.0",
          description: "A RESTful API built with Elysia.js",
        },
      },
    })
  )
  .get(
    "/",
    () =>
      "Welcome to Elysia API - Use /api for the REST endpoints or /swagger for API documentation"
  )
  .use(apiRoutes)
  .onError(({ code, error, set }) => {
    console.error(`Error [${code}]:`, error);

    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        error: "Not Found",
        message: "The requested resource was not found",
      };
    }

    if (code === "VALIDATION") {
      set.status = 400;
      return {
        error: "Validation Error",
        message: error.message || "Validation failed",
      };
    }

    // Check if error is an Error object with a message property
    if (error instanceof Error && typeof error.message === "string") {
      if (error.message.includes("not found")) {
        set.status = 404;
        return { error: "Not Found", message: error.message };
      }
    }

    set.status = 500;
    return {
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    };
  })
  .listen(config.port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
