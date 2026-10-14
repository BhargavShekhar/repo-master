// import { Router } from "express";
// import * as controler from "./auth.controller.js";
// import validate from "../../common/middleware/validate.middleware.js";
// import RegisterDto from "./dto/register.dto.js";
// import LoginDto from "./dto/login.dto.js";
// import { authenticate } from "./auth.middleware.js";
// import { upload } from "../../common/middleware/multer.middleware.js";

// const router = Router();

// router.post("/register", validate(RegisterDto), controler.register);
// router.get("/verify-email", controler.verifyEmail);
// router.post("/login", validate(LoginDto),  controler.login);
// router.post("/forgot-password", controler.forgotPassword);
// router.post("/reset-password", controler.resetPassword);
// router.post("/logout", authenticate, controler.logout);

// router.post("/me", authenticate, controler.getMe);


// router.post("/avatar", authenticate, upload.single("avatar"), controler.uploadAvatar);

// export default router;