/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * * `O` - O
 * * `P` - P
 * * `C` - C
 * @export
 */
export const StatusEnum = {
    O: 'O',
    P: 'P',
    C: 'C'
} as const;
export type StatusEnum = typeof StatusEnum[keyof typeof StatusEnum];


export function instanceOfStatusEnum(value: any): boolean {
    for (const key in StatusEnum) {
        if (Object.prototype.hasOwnProperty.call(StatusEnum, key)) {
            if (StatusEnum[key as keyof typeof StatusEnum] === value) {
                return true;
            }
        }
    }
    return false;
}

export function StatusEnumFromJSON(json: any): StatusEnum {
    return StatusEnumFromJSONTyped(json, false);
}

export function StatusEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatusEnum {
    return json as StatusEnum;
}

export function StatusEnumToJSON(value?: StatusEnum | null): any {
    return value as any;
}

