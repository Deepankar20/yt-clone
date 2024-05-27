import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { videoRouter } from "./routers/video";
import { userRouter } from "./routers/user";
import { subscriptionRouter } from "./routers/subscription";
import { playlistRouter } from "./routers/playlist";
import { likeRouter } from "./routers/like";
import { commentRouter } from "./routers/comment";
import { channelRouter } from "./routers/channel";
import { postRouter } from "./routers/post";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  video: videoRouter,
  user: userRouter,
  subscription: subscriptionRouter,
  playlist: playlistRouter,
  like: likeRouter,
  comment: commentRouter,
  channel: channelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
