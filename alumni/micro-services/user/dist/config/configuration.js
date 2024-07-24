"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const yaml = require("js-yaml");
const YAML_CONFIG_FILENAME = '.config.yml';
exports.default = () => {
    return yaml.load((0, fs_1.readFileSync)(`${process.cwd()}/environments/${process.env.NEST_ENV}/${YAML_CONFIG_FILENAME}`, 'utf8'));
};
//# sourceMappingURL=configuration.js.map