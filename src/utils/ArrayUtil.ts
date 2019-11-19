import { KeysMatching } from './KeyMatching';

export class ArrayUtil {
    static filter<T>(entities: T[], key: KeysMatching<T, string>, search: string): T[] {
        return entities.filter((entity: T) => {
            const value = (entity[key] as unknown) as string;
            return value.toLowerCase().includes(search.toLowerCase());
        });
    }

    static sort<T>(entities: T[], key: KeysMatching<T, string>, reverse = false): T[] {
        const sortedEntities = entities.sort((entityA: T, entityB: T) => {
            const entityAValue = (entityA[key] as unknown) as string;
            const entityBValue = (entityB[key] as unknown) as string;
            return entityAValue.localeCompare(entityBValue);
        });

        if (reverse) {
            return sortedEntities.reverse();
        }

        return sortedEntities;
    }
}
