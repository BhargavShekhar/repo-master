import { z } from "zod";

import BaseDto from "../../../common/dto/dto.js";

class LoginDto extends BaseDto {
    static schema = z.object({
        email: z.email().toLowerCase(),
        password: z.string().min(8).max(30),
    });
}

export type signInDto = z.infer<typeof LoginDto.schema>;

export default LoginDto;