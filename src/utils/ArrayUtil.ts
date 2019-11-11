import { KeysMatching } from './KeyMatching';

export class ArrayUtil {
    static filter<T>(entities: T[], key: KeysMatching<T, string>, search: string): T[] {
        return entities.filter((entity: T) => {
            const value = (entity[key] as unknown) as string;
            return value.toLowerCase().includes(search.toLowerCase());
        });
    }
}
