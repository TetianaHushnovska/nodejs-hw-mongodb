import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = getEnvVar('PORT') || 5543;

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    const logger = (
        pino({
            transport: {
                target: 'pino-pretty',
            }
        })
    );

    app.use(pinoHttp({ logger }));

    app.get('/', (req, res) => {
        res.json({
            message: "Hello, world!"
        });
    });

    app.use((req, res, next) => {
        res.status(404).json({
            status: 404,
            message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
            error: err.message,
        });
    });

    app.listen(PORT, (error) => {
        if (error) {
            throw error;
        }

        logger.info(`Server started on port ${PORT}`);
    });
};
