import { action, internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Upload recorded audio file and add DB entry for it

export const uploadRecording = action({
    args: {name: v.string(), base64String: v.string()},
    handler: async (ctx, args) => {
        // Convert base64 string into byte array
        const byteCharacters = atob(args.base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        // Make blob from byte array
        const blob = new Blob([byteArray], {type: "audio/x-m4a"});

        // Store blob
        const storageId = await ctx.storage.store(blob);

        // Write storageId in a document
        await ctx.runMutation(internal.recordings.addRecording, {
            name: args.name,
            storageId
        });

        return storageId;
    }
});

export const addRecording = internalMutation({
    args: {name: v.string(), storageId: v.id("_storage")},
    handler: async (ctx, args) => {
        const { name, storageId } = args;
        await ctx.db.insert("recordings", { name, storageId });
    }
});

// Send in text for model completion
export const getCompletion = action({
    args: {text: v.string()},
    handler: async (ctx, args) => {
        // Post to Trevor's Modal route
        const response = await fetch("https://tmychow--sts-web.modal.run/text_response", {
            method: "POST",
            body: JSON.stringify({
                text: args.text
            })
        });
        
        const completion = await response.text();
        console.log("Completion returned:", completion);

        return completion;
    }
})