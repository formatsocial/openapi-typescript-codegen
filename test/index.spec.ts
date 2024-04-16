import { readFileSync } from 'fs';
import { sync } from 'glob';

import { generate, HttpClient } from '../';

describe('v2', () => {
    it('should generate', async () => {
        await generate({
            input: './test/spec/v2.json',
            output: './test/generated/v2/',
            httpClient: HttpClient.FETCH,
            useOptions: false,
            useUnionTypes: false,
            exportCore: true,
            exportSchemas: true,
            exportModels: true,
            exportServices: true,
        });

        sync('./test/generated/v2/**/*.ts').forEach(file => {
            const content = readFileSync(file, 'utf8').toString();
            expect(content).toMatchSnapshot(file);
        });
    });
});

describe('v3', () => {
    it('should generate', async () => {
        await generate({
            input: './test/spec/v3.json',
            output: './test/generated/v3/',
            httpClient: HttpClient.FETCH,
            useOptions: false,
            useUnionTypes: false,
            exportCore: true,
            exportSchemas: true,
            exportModels: true,
            exportServices: true,
        });

        sync('./test/generated/v3/**/*.ts').forEach(file => {
            const content = readFileSync(file, 'utf8').toString();
            expect(content).toMatchSnapshot(file);
        });
    });
});

describe('v3WithCustomCoreLocation', () => {
    it('should generate', async () => {
        await generate({
            input: './test/spec/v3.json',
            output: './test/generated/v3WithCustomCoreLocation/',
            httpClient: HttpClient.FETCH,
            useOptions: false,
            useUnionTypes: false,
            exportCore: true,
            exportSchemas: true,
            exportModels: true,
            exportServices: true,
            postfixModels: 'Dto',
            coreLocation: './test/generated/v3/core',
        });

        sync('./test/generated/v3WithCustomCoreLocation/**/*.ts').forEach(file => {
            const content = readFileSync(file, 'utf8').toString();
            expect(content).toMatchSnapshot(file);
        });
    });
});

describe('changeQueryParametersToObj', () => {
    it('should generate', async () => {
        await generate({
            input: './test/spec/changeQueryParametersToObj.yaml',
            output: './test/generated/changeQueryParametersToObj/',
            httpClient: HttpClient.FETCH,
            useOptions: false,
            useUnionTypes: false,
            exportCore: true,
            exportSchemas: true,
            exportModels: true,
            exportServices: true,
            postfixModels: 'Dto',
            coreLocation: './test/generated/v3/core',
            queryAsObject: true,
        });
        sync('./test/generated/changeQueryParametersToObj/**/*.ts').forEach(file => {
            const content = readFileSync(file, 'utf8').toString();
            expect(content).toMatchSnapshot(file);
        });
    });
});

describe('constEnumValue', () => {
    it('should generate', async () => {
        await generate({
            input: './test/spec/constEnumValue.yaml',
            output: './test/generated/constEnumValue/',
            httpClient: HttpClient.FETCH,
            useOptions: false,
            useUnionTypes: false,
            exportCore: true,
            exportSchemas: true,
            exportModels: true,
            exportServices: true,
            postfixModels: 'Dto',
            coreLocation: './test/generated/v3/core',
            queryAsObject: true,
        });
        sync('./test/generated/constEnumValue/**/*.ts').forEach(file => {
            const content = readFileSync(file, 'utf8').toString();
            expect(content).toMatchSnapshot(file);
        });
    });
});

describe('allOfCombined', () => {
    it('should generate', async () => {
        await generate({
            input: './test/spec/allOfCombined.yaml',
            output: './test/generated/allOfCombined/',
            httpClient: HttpClient.FETCH,
            useOptions: false,
            useUnionTypes: false,
            exportCore: true,
            exportSchemas: true,
            exportModels: true,
            exportServices: true,
            postfixModels: 'Dto',
            coreLocation: './test/generated/v3/core',
            queryAsObject: true,
        });
        sync('./test/generated/allOfCombined/**/*.ts').forEach(file => {
            const content = readFileSync(file, 'utf8').toString();
            expect(content).toMatchSnapshot(file);
        });
    });
});
