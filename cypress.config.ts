import { defineConfig } from "cypress";

export default defineConfig({
    viewportWidth: 1300, /* window for testing*/
    viewportHeight: 1050,
    e2e: {
        supportFile: false,
        baseUrl: "http://localhost:3000"
    }
});
