import { KeyValue } from '../utils/KeyValue';

export interface Repository<T> {
    get<K extends keyof T>(keyValue: KeyValue<T, K>): Promise<T>;
    getAll(): Promise<T[]>;
}
