import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        username: z.string().min(3),
        password: z.string().min(4),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { username, email, password } = input;

      try {
        const userPresent = await db.user.findFirst({
          where: {
            username,
          },
        });

        if (userPresent) {
          return {
            message: "user already present",
            code: 401,
            data: null,
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });

        if (!newUser) {
          return {
            message: "error in db",
            code: 501,
            data: null,
          };
        }

        const payload = {
          username,
          email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string);

        return {
          message: "user registered successufully",
          code: 201,
          data: token,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),

  login: publicProcedure
    .input(
      z.object({
        usernameOrEmail: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { usernameOrEmail, password } = input;

      try {
        const userExist = await db.user.findFirst({
          where: {
            OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
          },
        });

        if (!userExist) {
          return {
            message: "user not registered",
            code: 404,
            data: null,
          };
        }

        const checkPassword = bcrypt.compare(password, userExist.password);

        if (!checkPassword) {
          return {
            message: "password incorrect",
            code: 403,
            data: null,
          };
        }

        const payload = {
          username: userExist.username,
          email: userExist.email,
          id: userExist.id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string);

        return {
          message: "login successful",
          code: 201,
          data: token,
        };
      } catch (error) {
        return {
          message: "internal server error",
          code: 501,
          data: null,
        };
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        country: z.string(),
        avatarUrl: z.string(),
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

      const { country, avatarUrl } = input;

      try {
        const updatedUser = await db.user.update({
          data: {
            country,
            avatarUrl,
          },
          where: {
            username: ctx.username,
          },
        });

        if (!updatedUser) {
          return {
            message: "error in db",
            code: 500,
            data: null,
          };
        }

        return {
          message: "successfully updated",
          code: 201,
          data: updatedUser,
        };
      } catch (error) {
        return {
          message: "internnal server error",
          code: 501,
          data: null,
        };
      }
    }),
});
