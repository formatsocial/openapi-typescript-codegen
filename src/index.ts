import { HttpClient } from './HttpClient';
import { Indent } from './Indent';
import { parse as parseV2 } from './openApi/v2';
import { parse as parseV3 } from './openApi/v3';
import {
    generateCoreLocationSameLevelFromOutput,
    generateCoreLocationUpLevelFromOutput,
} from './utils/generateCoreLocation';
import { getOpenApiSpec } from './utils/getOpenApiSpec';
import { getOpenApiVersion, OpenApiVersion } from './utils/getOpenApiVersion';
import { isString } from './utils/isString';
import { postProcessClient } from './utils/postProcessClient';
import { registerHandlebarTemplates } from './utils/registerHandlebarTemplates';
import { writeClient } from './utils/writeClient';

export { getServices } from './openApi/v3/parser/getServices';
export { HttpClient } from './HttpClient';
export { Indent } from './Indent';

export type Options = {
    input: string | Record<string, any>;
    output: string;
    httpClient?: HttpClient;
    clientName?: string;
    useOptions?: boolean;
    useUnionTypes?: boolean;
    exportCore?: boolean;
    exportServices?: boolean;
    exportModels?: boolean;
    exportSchemas?: boolean;
    exportReactQueryHook?: boolean;
    indent?: Indent;
    postfixServices?: string;
    postfixModels?: string;
    request?: string;
    write?: boolean;
    coreLocation?: string;
    queryAsObject?: boolean;
};

/**
 * Generate the OpenAPI client. This method will read the OpenAPI specification and based on the
 * given language it will generate the client, including the typed models, validation schemas,
 * service layer, etc.
 * @param input The relative location of the OpenAPI spec
 * @param output The relative location of the output directory
 * @param httpClient The selected httpClient (fetch, xhr, node or axios)
 * @param clientName Custom client class name
 * @param useOptions Use options or arguments functions
 * @param useUnionTypes Use union types instead of enums
 * @param exportCore Generate core client classes
 * @param exportServices Generate services
 * @param exportModels Generate models
 * @param exportSchemas Generate schemas
 * @param exportReactQueryHook Generate schemas
 * @param indent Indentation options (4, 2 or tab)
 * @param postfixServices Service name postfix
 * @param postfixModels Model name postfix
 * @param request Path to custom request file
 * @param write Write the files to disk (true or false)
 * @param coreLocation The location of an alternative core package to be used when creating multiple APIs forces exportCore = false
 */
export const generate = async ({
    input,
    output,
    httpClient = HttpClient.FETCH,
    clientName,
    useOptions = false,
    useUnionTypes = false,
    exportCore = true,
    exportServices = true,
    exportModels = true,
    exportSchemas = false,
    indent = Indent.SPACE_4,
    postfixServices = 'Service',
    postfixModels = '',
    request,
    write = true,
    coreLocation = undefined,
    exportReactQueryHook = false,
    queryAsObject = false,
}: Options): Promise<void> => {
    const openApi = isString(input) ? await getOpenApiSpec(input) : input;
    const openApiVersion = getOpenApiVersion(openApi);
    const templates = registerHandlebarTemplates({
        httpClient,
        useUnionTypes,
        useOptions,
    });

    let coreLocationSameLevel;
    let coreLocationUpALevel;
    if (coreLocation && coreLocation !== '') {
        exportCore = false;
        coreLocationSameLevel = generateCoreLocationSameLevelFromOutput(coreLocation, output);
        coreLocationUpALevel = generateCoreLocationUpLevelFromOutput(coreLocation, output);
    } else {
        coreLocationUpALevel = '../core';
        coreLocationSameLevel = './core';
    }

    switch (openApiVersion) {
        case OpenApiVersion.V2: {
            const client = parseV2(openApi);
            const clientFinal = postProcessClient(client);
            if (!write) break;
            await writeClient(
                clientFinal,
                templates,
                output,
                httpClient,
                useOptions,
                useUnionTypes,
                exportCore,
                exportServices,
                exportModels,
                exportSchemas,
                indent,
                postfixServices,
                postfixModels,
                coreLocationSameLevel,
                coreLocationUpALevel,
                exportReactQueryHook,
                clientName,
                request
            );
            break;
        }

        case OpenApiVersion.V3: {
            const client = parseV3(openApi);
            const clientFinal = postProcessClient(client);
            if (!write) break;
            await writeClient(
                clientFinal,
                templates,
                output,
                httpClient,
                useOptions,
                useUnionTypes,
                exportCore,
                exportServices,
                exportModels,
                exportSchemas,
                indent,
                postfixServices,
                postfixModels,
                coreLocationSameLevel,
                coreLocationUpALevel,
                exportReactQueryHook,
                clientName,
                request,
                queryAsObject
            );
            break;
        }
    }
};

export default {
    HttpClient,
    generate,
};
