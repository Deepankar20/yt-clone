import { title } from "process";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const videoRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        duration: z.number(),
        thumbnailUrl: z.string(),
        category: z.string(),
        status: z.string(),
        tags: z.array(z.string()),
        language: z.string(),
        channelId: z.number(),
        userId: z.number(),
        username: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        title,
        description,
        duration,
        thumbnailUrl,
        category,
        status,
        tags,
        language,
        channelId,
        userId,
        username,
      } = input;

      try {
        const video = await db.video.create({
          data: {
            title,
            description,
            duration,
            thumbnailUrl,
            category,
            status,
            tags,
            language,
            channelId,
            userId,
          },
        });

        if (ctx.username !== username) {
          return {
            message: "login before uploading",
            code: 403,
            data: null,
          };
        }

        if (!video) {
          return {
            message: "could not post video",
            code: 500,
            data: null,
          };
        }

        return {
          message: "video uploaded successfully",
          code: 201,
          data: video,
        };
      } catch (error) {
        return {
          message: "its not you, its us",
          code: 501,
          data: null,
        };
      }
    }),

  getVideoByTitle: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const title = input.title;

      if (!title) {
        return {
          message: "Give some input",
          code: 401,
          data: null,
        };
      }

      try {
        const videos = await db.video.findMany({
          where: {
            title: {
              contains: title,
            },
          },
        });

        if (!videos) {
          return {
            message: "video not found",
            code: 404,
            data: null,
          };
        }

        return {
          message: "successfully fetched some videos",
          code: 201,
          data: videos,
        };
      } catch (error) {
        return {
          message: "its not you, its us",
          code: 501,
          data: null,
        };
      }
    }),

  getVideoByTag: publicProcedure
    .input(z.object({ tag: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const tag = input.tag;

      if (!tag) {
        return {
          message: "Give some input",
          code: 401,
          data: null,
        };
      }

      try {
        const videos = await db.video.findMany({
          where: {
            tags: {
              has: tag,
            },
          },
        });

        if (!videos) {
          return {
            message: "video not found",
            code: 404,
            data: null,
          };
        }

        return {
          message: "successfully fetched some videos",
          code: 201,
          data: videos,
        };
      } catch (error) {
        return {
          message: "its not you, its us",
          code: 501,
          data: null,
        };
      }
    }),

  getVideoById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const id = input.id;

      if (!title) {
        return {
          message: "Give some input",
          code: 401,
          data: null,
        };
      }

      try {
        const video = await db.video.findMany({
          where: {
            id,
          },
        });

        if (!video) {
          return {
            message: "video not found",
            code: 404,
            data: null,
          };
        }

        return {
          message: "successfully fetched a video",
          code: 201,
          data: video,
        };
      } catch (error) {
        return {
          message: "its not you, its us",
          code: 501,
          data: null,
        };
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        description: z.string(),
        thumbnailUrl: z.string(),
        title: z.string(),
        status: z.string(),
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { description, thumbnailUrl, title, status, id } = input;

      try {
        const video = await db.video.update({
          data: {
            description,
            thumbnailUrl,
            title,
            status,
          },

          where: {
            id,
          },
        });

        if (!video) {
          return {
            message: "could not update",
            code: 400,
            data: null,
          };
        }

        return {
          message: "updated successfully",
          code: 201,
          data: video,
        };
      } catch (error) {
        return {
          message: "some error occcured",
          code: 501,
          data: null,
        };
      }
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      try {
        const video = await db.video.delete({
          where: {
            id,
          },
        });

        if (!video) {
          return {
            message: "could not delete",
            code: 400,
            data: null,
          };
        }

        return {
          message: "deleted successfully",
          code: 201,
          data: video,
        };
      } catch (error) {
        return {
          message: "some error occcured",
          code: 501,
          data: null,
        };
      }
    }),
});
