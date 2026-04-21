import App from "./App.ts";
import { config } from "./Config/config.ts";
import { connectDB } from "./Database/index.ts";

const StartServer = async () => {
    try {
        await connectDB();
        App.listen(config.PORT, () => {
        console.log(`Server is running at ${config.APP_URL}`);
        console.log(`Environment : ${config.nodeEnv}`)
    })
    } catch (error) {
        console.error("Failed to start server", error)
        process.exit(1);
    }
}

StartServer();