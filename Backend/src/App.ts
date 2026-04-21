import express, {type Request, type Response} from "express"

const App = express();

//Middlewares(build-it)
App.use(express.json());
App.use(express.urlencoded({extended: true}));
App.use(express.static("public"));

// Health Check Route
App.get('/health', (_req: Request, res:Response) => {
    res.json({message : 'All Okay'});
})

export default App;