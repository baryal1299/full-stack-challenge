import path from 'path';
import fs from 'fs';
import jsYaml from 'js-yaml';
import { OpenApiValidator } from "express-openapi-validate";

const openApiDocument = jsYaml.load(
    fs.readFileSync(path.resolve(__dirname,'../config/swagger.yaml'), 'utf-8')
);

const validator = new OpenApiValidator(openApiDocument,
    {
        ajvOptions: {
            allErrors: true,
            removeAdditional: "all"
        }
    }
);

export default validator;