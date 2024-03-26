import type { WithEnumExtension, WithEnumConstValueExtension } from './Extensions/WithEnumExtension';

/**
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#serverVariableObject
 */
export interface OpenApiServerVariable extends WithEnumExtension, WithEnumConstValueExtension {
    enum?: (string | number)[];
    default: string;
    description?: string;
}
