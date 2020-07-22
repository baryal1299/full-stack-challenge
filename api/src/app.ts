import express from 'express';
import cors from "cors";
import parser from 'body-parser';
import compression from 'compression';
import logger from './utils/logger';
import Controller from './interfaces/controller.interface';
import swaggerUi from "swagger-ui-express";
import path from 'path';
import fs from 'fs';
import jsYaml from 'js-yaml';

class App {
    public app: express.Application;
    public port: number;
    private openApiDocument = jsYaml.load(
        fs.readFileSync(path.resolve(__dirname,'./config/swagger.yaml'), 'utf-8')
    );

    constructor(controllers: Array<Controller>, port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandlers();
    }

    private initializeMiddlewares(){
        // Handle Cross-origin resource sharing
        this.app.use(cors({
            credentials: true,
            origin: true
        }));

        // Parse only urlencoded request bodies as json
        this.app.use(parser.urlencoded(({extended: true})));
        this.app.use(parser.json());

        // Compress response bodies
        this.app.use(compression())

    }

    private initializeControllers(controllers: Array<Controller>){
        // Load the routers
        controllers.forEach((controller: Controller) => {
            this.app.use('/api/v1', controller.router);
        });

        // Serve swagger ui in Home page
        this.app.use("/", swaggerUi.serve, swaggerUi.setup(this.openApiDocument));
    }

    private initializeErrorHandlers(){
        // Handle client errors
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            const status = err.status || err.statusCode || 500;
            const message = err.message || "Oops! something went wrong"
            res.status(status).send({status, message});
        });
    }

    public listen(){
        this.app.listen(this.port, () => {
            logger.info({
                message: `Server is running http://localhost:${this.port}...`,
            })
        });
    }
}

export default App;