import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
    const { contactId } = req.parems;
    if (!isValidObjectId(contactId)) {
        throw createHttpError(404, 'Bad request');
    }

    next();
};