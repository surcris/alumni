"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor() {
        this._interns = [];
        this._populate();
    }
    getHelloR() {
        return 'Hello RENAUD!!!!!!!!!!!';
    }
    findOne(id) {
        const result = this._interns.find((intern) => intern.id == id);
        return result ? result : null;
    }
    _populate() {
        this._interns.push({
            id: 1,
            lastname: 'momo',
            firstname: 'azer',
            company: {
                id: 1,
                name: 'AU BG BARBER',
            },
            poe: {
                id: 1,
                name: 'POEC Dev Mob',
                beginAt: new Date(2024, 5, 24),
                endAt: new Date(2024, 8, 24),
            },
        });
        this._interns.push({
            id: 2,
            lastname: 'lolo',
            firstname: 'tyui',
            occupation: 'kebabier',
            company: {
                id: 2,
                name: 'Chez le bon pote',
            },
            poe: {
                id: 1,
                name: 'POEC Dev Mob',
                beginAt: new Date(2024, 5, 24),
                endAt: new Date(2024, 8, 24),
            },
        });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map