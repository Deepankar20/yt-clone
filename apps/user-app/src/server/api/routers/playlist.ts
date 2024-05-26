import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const playlistRouter = createTRPCRouter({
  createPlaylist: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        userId: z.number(),
        privacyStatus: z.string(),
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

      const { title, description, userId, privacyStatus } = input;

      try {
        const newPlaylist = await db.playlist.create({
          data: {
            title,
            description,
            userId,
            privacyStatus,
          },
        });

        return {
          message: "playlist created successfully",
          code: 201,
          data: newPlaylist,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),

  addToPlaylist: publicProcedure
    .input(
      z.object({
        videoId: z.number(),
        playlistId: z.number(),
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

      const { playlistId, videoId } = input;

      const videoExistInPlaylist = await db.playlistItem.findFirst({
        where: {
          playlistId,
          videoId,
        },
      });

      if (videoExistInPlaylist) {
        return {
          message: "video already in playlist",
          code: 402,
          data: videoExistInPlaylist,
        };
      }

      try {
        const highestPosition = await db.playlistItem.findFirst({
          where: { playlistId },
          orderBy: { position: "desc" },
          select: { position: true },
        });

        const newPosition = highestPosition ? highestPosition.position + 1 : 1;

        const playlistVideo = await db.playlistItem.create({
          data: {
            playlistId,
            videoId,
            position: newPosition,
          },
        });

        if (!playlistVideo) {
          return {
            message: "error adding video",
            code: 401,
            data: null,
          };
        }

        return {
          message: "video added to playlist",
          code: 201,
          data: playlistVideo,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),

  getAllPlaylistVideos: publicProcedure
    .input(
      z.object({
        playlistId: z.number(),
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

      const { playlistId, userId } = input;

      try {
        const allPlaylistVideos = await db.playlist.findMany({
          where: {
            id: playlistId,
            userId,
          },
          include: {
            playlistItems: true,
          },
          orderBy: {
            playlistItems: {
              //@ts-ignore
              position: "asc",
            },
          },
        });

        if (!allPlaylistVideos) {
          return {
            message: "error fetching videos ...",
            code: 401,
            data: null,
          };
        }

        return {
          message: "fetched all playlist videos",
          code: 201,
          data: allPlaylistVideos,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),

  removeVideo: publicProcedure
    .input(
      z.object({
        videoId: z.number(),
        playlistId: z.number(),
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

      const { videoId, playlistId } = input;

      try {
        const videoToRemove = await db.playlistItem.findFirst({
          where: {
            videoId,
          },
        });

        const removedPosition = videoToRemove?.position;

        const removeVideo = await db.playlistItem.delete({
          //@ts-ignore
          where: {
            videoId,
            playlistId,
          },
        });

        const handlePositions = await db.playlistItem.updateMany({
          where: {
            playlistId,
            position: {
              gt: removedPosition,
            },
          },
          data: {
            position: {
              decrement: 1,
            },
          },
        });

        return {
          message: "video removed",
          code: 201,
          data: null,
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
