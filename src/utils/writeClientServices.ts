import { resolve } from 'path';

import type { Service } from '../client/interfaces/Service';
import type { HttpClient } from '../HttpClient';
import type { Indent } from '../Indent';
import { writeFile } from './fileSystem';
import { formatCode as f } from './formatCode';
import { formatIndentation as i } from './formatIndentation';
import { isDefined } from './isDefined';
import type { Templates } from './registerHandlebarTemplates';

/**
 * Generate Services using the Handlebar template and write to disk.
 * @param services Array of Services to write
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param httpClient The selected httpClient (fetch, xhr, node or axios)
 * @param useUnionTypes Use union types instead of enums
 * @param useOptions Use options or arguments functions
 * @param indent Indentation options (4, 2 or tab)
 * @param postfix Service name postfix
 * @param coreLocationSameLevel The location of the core packages
 * @param coreLocationUpALevel The location of the core packages
 * @param clientName Custom client class name
 */
export const writeClientServices = async (
    services: Service[],
    templates: Templates,
    outputPath: string,
    httpClient: HttpClient,
    useUnionTypes: boolean,
    useOptions: boolean,
    indent: Indent,
    postfix: string,
    coreLocationSameLevel: string,
    coreLocationUpALevel: string,
    exportReactQueryHook: boolean,
    clientName?: string,
    queryAsObject?: boolean
): Promise<void> => {
    for (const service of services) {
        const file = resolve(outputPath, `${service.name}${postfix}.ts`);
        const templateResult = templates.exports.service({
            ...service,
            httpClient,
            useUnionTypes,
            useOptions,
            postfix,
            exportClient: isDefined(clientName),
            coreLocationSameLevel,
            coreLocationUpALevel,
            exportReactQueryHook,
            queryAsObject,
        });
        await writeFile(file, i(f(templateResult), indent));
    }
    if (exportReactQueryHook) {
        for (const service of services) {
            const file = resolve(outputPath, `${service.name}Query${postfix}.ts`);
            const templateResult = templates.exports.serviceQuery({
                ...service,
                httpClient,
                useUnionTypes,
                useOptions,
                postfix,
                exportClient: isDefined(clientName),
                coreLocationSameLevel,
                coreLocationUpALevel,
                exportReactQueryHook,
                queryAsObject,
            });
            await writeFile(file, i(f(templateResult), indent));
        }
    }
};
