import bcrypt from "bcryptjs";

import ApiError from "../../common/api-error.js";
import User from "./auth.models.js";
import { createAccessToken, createRefreshToken } from "./utils/token.js";

import type { signUpDto } from "./dto/register.dto.js";

export const register = async ({ email, password, username }: signUpDto) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) throw ApiError.conflict("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
        username
    });

    if (!user) {
        throw ApiError.internal("User creation failed");
    }

    const accessToken = createAccessToken({ id: user.id });
    const refreshToken = createRefreshToken({ id: user.id });

    return { user, accessToken, refreshToken };
}