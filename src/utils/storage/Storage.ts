import { KeyValue } from '../KeyValue';

export interface Storage<T> {
    getItems(): T[];
    setItems(items: T[]): void;
    addItem<K extends keyof T>(keyValue: KeyValue<T, K>, item: T): void;
    findItem<K extends keyof T>(keyValue: KeyValue<T, K>): T | undefined;
}
