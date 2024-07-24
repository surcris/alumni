"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user/entities/user.entity");
const config_1 = require("@nestjs/config");
const envfile = "environments/" + process.env.NEST_ENV + "/.config.yml";
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: configService.get('TYPE'),
                    host: configService.get('HOST'),
                    port: configService.get('PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('PASSWORD'),
                    database: configService.get('DATABASE'),
                    synchronize: true,
                    entities: [user_entity_1.UserEntity],
                }),
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [envfile],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map