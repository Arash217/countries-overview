import { Storage } from './Storage';
import { KeyValue } from '../KeyValue';

export class MemoryStorage<T> implements Storage<T> {
    items: T[] = [];

    getItems(): T[] {
        return this.items;
    }

    findItem<K extends keyof T>(keyValue: KeyValue<T, K>): T | undefined {
        return this.items.find((item: T) => item[keyValue.key] === keyValue.value);
    }

    setItems(items: T[]): void {
        this.items = items;
    }

    addItem<K extends keyof T>(keyValue: KeyValue<T, K>, item: T): void {
        const index = this.items.findIndex(item => item[keyValue.key] === keyValue.value);
        index === -1 ? this.items.push(item) : (this.items[index] = item);
    }
}
