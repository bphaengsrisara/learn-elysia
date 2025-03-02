import { Elysia, t } from "elysia";
import { prisma } from "../db";

export const postRoutes = new Elysia({ prefix: "/posts" })
  // GET all posts
  .get("/", async () => {
    return await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  })

  // GET post by ID
  .get(
    "/:id",
    async ({ params: { id } }) => {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          comments: {
            select: {
              id: true,
              content: true,
              createdAt: true,
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

      if (!post) {
        throw new Error("Post not found");
      }

      return post;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  // POST create post
  .post(
    "/",
    async ({ body }) => {
      return await prisma.post.create({
        data: body,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
        published: t.Optional(t.Boolean()),
        authorId: t.String(),
      }),
    }
  )

  // PUT update post
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      const existingPost = await prisma.post.findUnique({
        where: { id },
      });

      if (!existingPost) {
        throw new Error("Post not found");
      }

      return await prisma.post.update({
        where: { id },
        data: body,
        include: {
          author: {
            select: {
              id: true,
              name: true,
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
        title: t.String(),
        content: t.String(),
        published: t.Boolean(),
        authorId: t.String(),
      }),
    }
  )

  // PATCH partial update post
  .patch(
    "/:id",
    async ({ params: { id }, body }) => {
      const existingPost = await prisma.post.findUnique({
        where: { id },
      });

      if (!existingPost) {
        throw new Error("Post not found");
      }

      return await prisma.post.update({
        where: { id },
        data: body,
        include: {
          author: {
            select: {
              id: true,
              name: true,
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
        title: t.Optional(t.String()),
        content: t.Optional(t.String()),
        published: t.Optional(t.Boolean()),
        authorId: t.Optional(t.String()),
      }),
    }
  )

  // DELETE post
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      const existingPost = await prisma.post.findUnique({
        where: { id },
      });

      if (!existingPost) {
        throw new Error("Post not found");
      }

      await prisma.post.delete({
        where: { id },
      });

      return { message: "Post deleted successfully" };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
