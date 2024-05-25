import { title } from "process";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const commentRouter = createTRPCRouter({
  addComment: publicProcedure
    .input(
      z.object({
        commentText: z.string(),
        videoId: z.number(),
        userId: z.number(),
        parentCommentId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.username) {
        return {
          message: "unauthourized access",
          code: 403,
          data: null,
        };
      }

      const { commentText, userId, videoId, parentCommentId } = input;

      try {
        const comment = await db.comment.create({
          data: {
            commentText,
            userId,
            videoId,
            parentCommentId,
          },
        });

        return {
          message: "comment added successfully",
          code: 201,
          data: comment,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),

  getCommentsByVideo: publicProcedure
    .input(
      z.object({
        videoId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { videoId } = input;

      try {
        const comments = await db.comment.findMany({
          where: {
            videoId,
          },
          include: {
            childComments: {
              include: {
                childComments: true,
              },
            },
          },
        });

        return {
          message: "fetched all comments",
          code: 201,
          data: comments,
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
