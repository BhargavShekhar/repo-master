import "dotenv/config";

import z from "zod";

const EnvSchema = z.object({
    PORT: z.coerce.number().default(8080),
    NODE_ENV: z.enum(["development", "production"])
});

function validateEnv() {
    const result = EnvSchema.safeParse(process.env);

    if (!result.success) {
        const error = z.treeifyError(result.error);
        console.error("Could not validate env:", error);
        throw new Error("Could not validate env");
    }

    return result.data;
}

export const env = validateEnv();