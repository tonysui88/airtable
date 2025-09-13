import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tableRouter = createTRPCRouter({
  createTable: protectedProcedure
    .input(z.object({ baseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const count = await ctx.db.table.count({
        where: { baseId: input.baseId }
      })
      const tableName = `Table ${count + 1}`;
      const table = await ctx.db.table.create({
        data: {
          name: tableName,
          baseId: input.baseId,
        },
      });
      const defaultColumns = ["Name", "Notes", "Assignee", "Status", "Attachments"];
      const columns = await Promise.all(
        defaultColumns.map(col => 
            ctx.db.column.create({
                data: {
                    name: col,
                    tableId: table.id,
                    type: "text",
                }
            })
        )
      )
      await Promise.all(
      Array.from({ length: 3 }).map(async () => {
        const row = await ctx.db.row.create({ data: { tableId: table.id } });
        await Promise.all(
          columns.map(column => 
            ctx.db.cell.create({
              data: {
                rowId: row.id,
                colId: column.id,
                value: "",
              },
            })
          )
        );
      })
    );
      return table
    }),

  deleteTable: protectedProcedure
    .input(z.object({ tableId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.table.delete({
        where: { id: input.tableId },
      });
  }),

  getTableData: protectedProcedure
    .input(z.object({ baseId: z.string() }))
    .query(async ({ ctx, input }) => {
        return ctx.db.table.findMany({
            where: { baseId: input.baseId },
            include: {
                columns: true,
                rows: {
                    include: { cells: true }
                }
            }
        })
  }),
  
  addColumn: protectedProcedure
    .input(z.object({ tableId: z.string(), name: z.string(), type: z.string() }))
    .mutation(async ({ ctx, input }) => {
        return await ctx.db.column.create({
            data: {
                name: input.name,
                tableId: input.tableId,
                type: input.type,
            }
        })
  }),

  deleteColumn: protectedProcedure
    .input(z.object({ columnId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        return await ctx.db.column.delete({
            where: { id: input.columnId },
        })
  }),

  addRow: protectedProcedure
    .input(z.object({ tableId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        return await ctx.db.row.create({
            data: {
                tableId: input.tableId
            }
        })
    }),

  deleteRow: protectedProcedure
    .input(z.object({ rowId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        return await ctx.db.row.delete({
            where: { id: input.rowId },
        })
  }),

  updateCell: protectedProcedure
    .input(z.object({ cellId: z.string(), value: z.string() }))
    .mutation(async ({ ctx, input }) => {
        return await ctx.db.cell.update({
            where: { id: input.cellId },
            data: { value: input.value },
        })
  }),
});
