import { z } from "zod";
import BaseDto from "../../../common/dto/dto.js";

class RegisterDto extends BaseDto {
    static schema = z.object({
        email: z.email(),
        password: z.string().min(8).max(30),
        username: z.string()
    });
}

export type signUpDto = z.infer<typeof RegisterDto.schema>; 

export default RegisterDto;