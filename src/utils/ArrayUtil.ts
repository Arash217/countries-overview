import { KeysMatching } from './KeyMatching';

export class ArrayUtil {
    static filter<T, V>(entities: T[], key: KeysMatching<T, V>, search: string): T[] {
        return entities.filter((entity: T) => {
            const value = entity[key];

            if (typeof value === 'string') {
                return value.toLowerCase().includes(search.toLowerCase());
            }
        });
    }
}
