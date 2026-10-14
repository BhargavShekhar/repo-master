import { z } from "zod";

class BaseDto {
    static schema = z.object({});

    static validate(data: unknown) {
        const result = this.schema.safeParse(data);

        if (!result.success) {
            const errors = result.error.issues.map(
                (issue) => issue.message
            );

            return {
                error: errors,
                value: null,
            };
        }

        return {
            error: null,
            value: result.data,
        };
    }
}

export default BaseDto;