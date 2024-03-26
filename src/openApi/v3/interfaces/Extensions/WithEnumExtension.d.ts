import { OpenApiReference } from '../OpenApiReference';

export interface WithEnumExtension {
    'x-enum-varnames'?: string[];
    'x-enum-descriptions'?: string[];
}

export interface WithEnumConstValueExtension {
    'x-enum-const-value'?: EnumConstValueExtensionValue;
}

export interface EnumConstValueExtensionValue {
    value: string;
    type: OpenApiReference;
}
