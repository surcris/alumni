/* eslint-disable prettier/prettier */
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const YAML_CONFIG_FILENAME = '.config.yml';

export default () => {
  return yaml.load(
    readFileSync(`${process.cwd()}/environments/${process.env.NEST_ENV}/${YAML_CONFIG_FILENAME}`, 'utf8'),
  ) as Record<string, any>;
};