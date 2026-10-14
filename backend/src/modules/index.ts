import express from "express";

import ApiError from "../common/api-error.js";

import type { Express, Request, Response, NextFunction } from "express";

export function createExpressApplication(): Express {
    const app = express();

    app.use(express.json());

    app.get("/health", (req, res) => res.json({
        healthy: true
    }))

    app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
        const isApiError = err instanceof ApiError;

        const statusCode = isApiError ? err.statusCode : 500;

        const message =
            err instanceof Error
                ? err.message
                : "Internal Server Error";

        const stack = err instanceof Error ? err.stack : undefined;

        console.error(
            `[Error] ${statusCode} - ${message}\nStack: ${stack ?? "Unavailable"}`
        );

        res.status(statusCode).json({
            success: false,
            status: statusCode,
            message:
                isApiError || process.env.NODE_ENV === "development"
                    ? message
                    : "Internal Server Error",
            ...(process.env.NODE_ENV === "development" && { stack }),
        });
    })

    return app;
}