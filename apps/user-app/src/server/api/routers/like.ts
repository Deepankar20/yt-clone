import { title } from "process";
import { object, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const likeRouter = createTRPCRouter({
  likeVideo: publicProcedure
    .input(
      z.object({
        videoId: z.number(),
        userId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.username) {
        return {
          message: "login before like",
          code: 403,
          data: null,
        };
      }

      const { videoId, userId } = input;

      try {
        const existingLike = await db.like.findFirst({
          where: {
            videoId,
            userId,
          },
        });

        if (existingLike) {
          const unlike = await db.like.delete({
            where: {
              id: existingLike.id,
            },
          });

          return {
            message: "video unliked",
            code: 201,
            data: existingLike,
          };
        }

        const like = await db.like.create({
          data: {
            userId,
            videoId,
          },
        });

        return {
          message: "liked video",
          code: 201,
          data: like,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),

  getAllLikedVideos: publicProcedure
    .input(
      z.object({
        userId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.username) {
        return {
          message: "unauthorized access",
          code: 403,
          data: null,
        };
      }

      const { userId } = input;
      try {
        const likes = await db.like.findMany({
          where: {
            userId,
          },
          include: {
            video: true,
          },
        });

        const videos = likes.map((like) => like.video);

        return {
          message: "fetched liked videos",
          code: 201,
          data: videos,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),
});
