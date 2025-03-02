import { Elysia, t } from "elysia";
import { prisma } from "../db";

export const commentRoutes = new Elysia({ prefix: "/comments" })
  // GET all comments
  .get("/", async () => {
    return await prisma.comment.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  })

  // GET comment by ID
  .get(
    "/:id",
    async ({ params: { id } }) => {
      const comment = await prisma.comment.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          post: {
            select: {
              id: true,
              title: true,
              author: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!comment) {
        throw new Error("Comment not found");
      }

      return comment;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  // POST create comment
  .post(
    "/",
    async ({ body }) => {
      return await prisma.comment.create({
        data: body,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });
    },
    {
      body: t.Object({
        content: t.String(),
        postId: t.String(),
        authorId: t.String(),
      }),
    }
  )

  // PUT update comment
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      const existingComment = await prisma.comment.findUnique({
        where: { id },
      });

      if (!existingComment) {
        throw new Error("Comment not found");
      }

      return await prisma.comment.update({
        where: { id },
        data: body,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        content: t.String(),
        postId: t.String(),
        authorId: t.String(),
      }),
    }
  )

  // PATCH partial update comment
  .patch(
    "/:id",
    async ({ params: { id }, body }) => {
      const existingComment = await prisma.comment.findUnique({
        where: { id },
      });

      if (!existingComment) {
        throw new Error("Comment not found");
      }

      return await prisma.comment.update({
        where: { id },
        data: body,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        content: t.Optional(t.String()),
        postId: t.Optional(t.String()),
        authorId: t.Optional(t.String()),
      }),
    }
  )

  // DELETE comment
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      const existingComment = await prisma.comment.findUnique({
        where: { id },
      });

      if (!existingComment) {
        throw new Error("Comment not found");
      }

      await prisma.comment.delete({
        where: { id },
      });

      return { message: "Comment deleted successfully" };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
