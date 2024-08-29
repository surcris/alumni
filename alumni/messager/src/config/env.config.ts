import * as dotenv from 'dotenv';

let envPath: string;
let mergedConfig: any;

dotenv.config();

const defaultEnv = process.env;

switch (process.env.NODE_ENV) {
    case 'test':
        envPath = `${__dirname}/../../.env.test`;
        break;
    case 'production':
        envPath = `${__dirname}/../../.env.production`;
        break;
    default:
        envPath = `${__dirname}/../../.env`;
}
dotenv.config({
    path: envPath
});

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    const prodOrTestEnv = process.env;

    const envKeys = Object.keys(defaultEnv);
    const envKeysOnly = envKeys.filter((key: string) => prodOrTestEnv[key] === undefined);

    const onlyEnv: any = {};
    for(const key of envKeysOnly) {
        onlyEnv[key] = defaultEnv[key];
    }

    mergedConfig = {...prodOrTestEnv, ...onlyEnv};
} else {
    mergedConfig = process.env;
}

export const ENV = mergedConfig;
