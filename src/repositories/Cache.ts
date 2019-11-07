import { Repository } from './Repository';
import { Storage } from '../utils/storage/Storage';
import { DateUtil } from '../utils/DateUtil';
import { KeyValue } from '../utils/KeyValue';

export interface CacheOptions {
    expires: Date;
}

export class Cache<T> implements Repository<T> {
    private cached = false;

    constructor(private repository: Repository<T>, private storage: Storage<T>, private options: CacheOptions) {}

    async get<K extends keyof T>(keyValue: KeyValue<T, K>): Promise<T> {
        const cachedItem = this.storage.findItem(keyValue);

        if (cachedItem) {
            const expires = Reflect.getMetadata('expires', cachedItem);

            if (DateUtil.getTime() < expires) {
                return cachedItem;
            }
        }

        const item = await this.repository.get(keyValue);
        Reflect.defineMetadata('expires', this.options.expires.getTime(), item);
        this.storage.addItem(keyValue, item);

        return item;
    }

    async getAll(): Promise<T[]> {
        if (this.cached) {
            return this.storage.getItems();
        }

        const items = await this.repository.getAll();
        this.cached = true;
        this.storage.setItems(items);

        return items;
    }
}
