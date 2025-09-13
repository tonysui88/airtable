import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const baseRouter = createTRPCRouter({

  createBase: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      return ctx.db.base.create({
        data: {
          name: "Untitled Base",
          createdBy: ctx.session.user.id,
        },
      });
    }),

  getBase: protectedProcedure
    .input(z.object({ baseId: z.string() }))
    .query(async ({ ctx, input }) => {
      const base = await ctx.db.base.findFirst({
        where: { id: input.baseId },
      });

    return base ?? null;
  }),

  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.base.findMany({
        where: { createdBy: ctx.session.user.id },
        orderBy: { createdAt: "desc" },
      });
  }),

  deleteBase: protectedProcedure
    .input(z.object({ baseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.base.delete({
        where: { id: input.baseId },
      });
  }),

  updateBase: protectedProcedure
    .input(z.object({ baseId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.base.update({
        where: { id: input.baseId },
        data: { name: input.name }
      });
  }),
});
