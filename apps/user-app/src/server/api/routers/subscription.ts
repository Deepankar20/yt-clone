import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const subscriptionRouter = createTRPCRouter({
  subscribeToChannel: publicProcedure
    .input(
      z.object({
        userId: z.number(),
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

      const { userId, channelId } = input;

      try {
        const subscribe = await db.subscription.create({
          data: {
            subscribedToChannelId: channelId,
            subscriberUserId: userId,
          },
        });

        if (!subscribe) {
          return {
            message: "error subscribing",
            code: 401,
            data: null,
          };
        }

        return {
          message: "subscribed to channel successfully",
          code: 201,
          data: subscribe,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),

  getAllSubscriptions: publicProcedure
    .input(
      z.object({
        userId: z.number(),
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

      const { userId } = input;

      try {
        const channels = await db.subscription.findMany({
          where: {
            subscriberUserId: userId,
          },
          include: {
            subscribedToChannel: true,
          },
        });

        return {
          message: "successfully fetched channels",
          code: 201,
          data: channels,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),

  unSubscribeToChannel: publicProcedure
    .input(
      z.object({
        userId: z.number(),
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

      const { userId, channelId } = input;

      try {
        const subscribe = await db.subscription.delete({
          //@ts-ignore
          data: {
            subscribedToChannelId: channelId,
            subscriberUserId: userId,
          },
        });

        if (!subscribe) {
          return {
            message: "error unsubscribing",
            code: 401,
            data: null,
          };
        }

        return {
          message: "unsubscribed to channel successfully",
          code: 201,
          data: subscribe,
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
