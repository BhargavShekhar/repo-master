import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30,
        required: [true, "Email is required"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30,
        select: false,
    },
    googleId: {
        type: String,
        sparse: true,
        unique: [true, "Name is required"]
    },
    username: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: undefined
    },
    refreshToken: {
        type: String,
        select: false,
    },
    resetPasswordToken: {
        type: String,
        select: false,
    },
    resetPasswordExpires: {
        type: Date,
        select: false,
    },
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) return;

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.pre("validate", function () {
    if (!this.password && !this.googleId) {
        this.invalidate(
            "password",
            "A password or Google account is required"
        );
    }
});

userSchema.methods.comparePassword = async function (textPassword: string) {
    if (!this.password) return false;

    return bcrypt.compare(textPassword, this.password);
}

export default mongoose.model("User", userSchema);