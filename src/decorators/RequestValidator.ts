import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...keys: string[]) {
    return function(target: any, key: string, desc: PropertyDescriptor): void {
        Reflect.defineMetadata(MetadataKeys.bodyValidator, keys, target, key);
    };
}

export function paramsValidator(...keys: string[]) {
    return function(target: any, key: string, desc: PropertyDescriptor): void {
        Reflect.defineMetadata(MetadataKeys.paramsValidator, keys, target, key);
    };
}

export function queryValidator(...keys: string[]) {
    return function(target: any, key: string, desc: PropertyDescriptor): void {
        Reflect.defineMetadata(MetadataKeys.queryValidator, keys, target, key);
    };
}