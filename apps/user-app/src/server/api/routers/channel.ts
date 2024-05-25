import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const channelRouter = createTRPCRouter({
  createChannel: publicProcedure
    .input(
      z.object({
        channelName: z.string(),
        description: z.string(),
        userId: z.number(),
        profilePictureUrl: z.string(),
        coverPhotoUrl: z.string(),
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

      const {
        channelName,
        description,
        userId,
        profilePictureUrl,
        coverPhotoUrl,
      } = input;

      try {
        const newChannel = await db.channel.create({
          data: {
            channelName,
            description,
            coverPhotoUrl,
            profilePictureUrl,
            userId,
          },
        });

        return {
          message: "comment added successfully",
          code: 201,
          data: newChannel,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),

  updateChannel: publicProcedure
    .input(
      z.object({
        channelName: z.string(),
        description: z.string(),
        userId: z.number(),
        profilePictureUrl: z.string(),
        coverPhotoUrl: z.string(),
        channelId: z.number(),
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

      const {
        channelName,
        description,
        userId,
        profilePictureUrl,
        coverPhotoUrl,
        channelId,
      } = input;

      try {
        const newChannel = await db.channel.update({
          data: {
            channelName,
            description,
            coverPhotoUrl,
            profilePictureUrl,
            userId,
          },

          where: {
            id: channelId,
          },
        });

        return {
          message: "comment added successfully",
          code: 201,
          data: newChannel,
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
