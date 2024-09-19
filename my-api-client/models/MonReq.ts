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

import { mapValues } from '../runtime';
import type { StatusEnum } from './StatusEnum';
import {
    StatusEnumFromJSON,
    StatusEnumFromJSONTyped,
    StatusEnumToJSON,
} from './StatusEnum';
import type { VehicleTypeEnum } from './VehicleTypeEnum';
import {
    VehicleTypeEnumFromJSON,
    VehicleTypeEnumFromJSONTyped,
    VehicleTypeEnumToJSON,
} from './VehicleTypeEnum';

/**
 * 
 * @export
 * @interface MonReq
 */
export interface MonReq {
    /**
     * 
     * @type {number}
     * @memberof MonReq
     */
    readonly pk: number;
    /**
     * 
     * @type {StatusEnum}
     * @memberof MonReq
     */
    status: StatusEnum;
    /**
     * 
     * @type {string}
     * @memberof MonReq
     */
    readonly statusDisplay: string;
    /**
     * 
     * @type {string}
     * @memberof MonReq
     */
    shippingCompany: string;
    /**
     * 
     * @type {string}
     * @memberof MonReq
     */
    origin: string;
    /**
     * 
     * @type {string}
     * @memberof MonReq
     */
    destination: string;
    /**
     * 
     * @type {VehicleTypeEnum}
     * @memberof MonReq
     */
    vehicleType: VehicleTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof MonReq
     */
    cargoDescription: string;
    /**
     * 
     * @type {number}
     * @memberof MonReq
     */
    cargoValue: number;
}



/**
 * Check if a given object implements the MonReq interface.
 */
export function instanceOfMonReq(value: object): value is MonReq {
    if (!('pk' in value) || value['pk'] === undefined) return false;
    if (!('status' in value) || value['status'] === undefined) return false;
    if (!('statusDisplay' in value) || value['statusDisplay'] === undefined) return false;
    if (!('shippingCompany' in value) || value['shippingCompany'] === undefined) return false;
    if (!('origin' in value) || value['origin'] === undefined) return false;
    if (!('destination' in value) || value['destination'] === undefined) return false;
    if (!('vehicleType' in value) || value['vehicleType'] === undefined) return false;
    if (!('cargoDescription' in value) || value['cargoDescription'] === undefined) return false;
    if (!('cargoValue' in value) || value['cargoValue'] === undefined) return false;
    return true;
}

export function MonReqFromJSON(json: any): MonReq {
    return MonReqFromJSONTyped(json, false);
}

export function MonReqFromJSONTyped(json: any, ignoreDiscriminator: boolean): MonReq {
    if (json == null) {
        return json;
    }
    return {
        
        'pk': json['pk'],
        'status': StatusEnumFromJSON(json['status']),
        'statusDisplay': json['status_display'],
        'shippingCompany': json['shipping_company'],
        'origin': json['origin'],
        'destination': json['destination'],
        'vehicleType': VehicleTypeEnumFromJSON(json['vehicle_type']),
        'cargoDescription': json['cargo_description'],
        'cargoValue': json['cargo_value'],
    };
}

export function MonReqToJSON(value?: Omit<MonReq, 'pk'|'status_display'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': StatusEnumToJSON(value['status']),
        'shipping_company': value['shippingCompany'],
        'origin': value['origin'],
        'destination': value['destination'],
        'vehicle_type': VehicleTypeEnumToJSON(value['vehicleType']),
        'cargo_description': value['cargoDescription'],
        'cargo_value': value['cargoValue'],
    };
}

