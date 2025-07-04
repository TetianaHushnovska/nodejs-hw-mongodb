import 'dotenv/config';

import {setupServer} from './server.js';

async function bootstrap() {
    setupServer();
}

bootstrap().catch((error) => console.error(error));