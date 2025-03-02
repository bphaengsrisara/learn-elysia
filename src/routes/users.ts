import { Elysia, t } from "elysia";
import { prisma } from "../db";

export const userRoutes = new Elysia({ prefix: "/users" })
  // GET all users
  .get("/", async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            posts: true,
            comments: true,
          },
        },
      },
    });
  })

  // GET user by ID
  .get(
    "/:id",
    async ({ params: { id } }) => {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          posts: {
            select: {
              id: true,
              title: true,
              createdAt: true,
            },
          },
          _count: {
            select: {
              posts: true,
              comments: true,
            },
          },
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  // POST create user
  .post(
    "/",
    async ({ body }) => {
      return await prisma.user.create({
        data: body,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )

  // PUT update user
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new Error("User not found");
      }

      return await prisma.user.update({
        where: { id },
        data: body,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )

  // PATCH partial update user
  .patch(
    "/:id",
    async ({ params: { id }, body }) => {
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new Error("User not found");
      }

      return await prisma.user.update({
        where: { id },
        data: body,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.Optional(t.String()),
        email: t.Optional(t.String()),
        password: t.Optional(t.String()),
      }),
    }
  )

  // DELETE user
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new Error("User not found");
      }

      await prisma.user.delete({
        where: { id },
      });

      return { message: "User deleted successfully" };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
