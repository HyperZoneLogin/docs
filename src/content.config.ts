import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        banner: z
          .object({
            destructive: z.boolean().optional(),
          })
          .optional(),
        version: z.string().optional(),
      }),
    }),
  }),
};
