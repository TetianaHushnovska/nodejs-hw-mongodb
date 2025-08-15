import express from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import {ctrlWrapper } from '../utils/ctrlWrapper.js';
import { confirmOAuthShema, loginUser, registerUser, requestPasswordResetSchema, resetPasswordSchema } from '../validation/auth.js';
import {
    confirmOAuthController,
    getOAuthController,
    loginUserController,
    logoutUserController,
    refreshUserController,
    registerUserController,
    reqestPasswordResetController,
    resetPasswordController
} from '../controllers/auth.js';

const router = express.Router();

router.post(
    '/register',
    validateBody(registerUser),
    ctrlWrapper(registerUserController),
);

router.post(
    '/login',
    validateBody(loginUser),
    ctrlWrapper(loginUserController),
);

router.post(
    '/logout',
    ctrlWrapper(logoutUserController),
);

router.post(
    '/refresh',
    ctrlWrapper(refreshUserController),
);

router.post(
    '/send-reset-email',
    validateBody(requestPasswordResetSchema),
    ctrlWrapper(reqestPasswordResetController),
);

router.post(
    '/reset-pwd',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
);

router.get(
    '/get-oauth-url',
    ctrlWrapper(getOAuthController),
);

router.post(
    '/confirm-oauth',
    validateBody(confirmOAuthShema),
    ctrlWrapper(confirmOAuthController),
);

export default router;