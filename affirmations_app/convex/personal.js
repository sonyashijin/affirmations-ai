import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addQuizResponses = mutation({
    args: {responses: v.object()},
    handler: async (ctx, args) => {
        await ctx.db.insert("personal", args.responses)
    }
});