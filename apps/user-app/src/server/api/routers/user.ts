import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    register:publicProcedure
    .input(z.object({
        email:z.string().email(),
        username:z.string(),
        password:z.string()
    }))
    .mutation(async ({ctx,input}) => {
        
    })
});
