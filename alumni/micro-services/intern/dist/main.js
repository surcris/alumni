"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3100,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (errors) => {
            common_1.Logger.log(errors);
        },
        skipNullProperties: true,
        skipMissingProperties: true,
        skipUndefinedProperties: true,
    }));
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map