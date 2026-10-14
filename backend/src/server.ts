import http from "node:http";

import { createExpressApplication } from "./modules/index.js";
import { env } from "./common/env.js";

async function main() {
    const { NODE_ENV, PORT } = env;
    const app = createExpressApplication();

    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT} at ${NODE_ENV} environment`);
    });
}

main()
    .catch(err => {
        console.error(err);
        process.exit(1);
    })