export interface KeyValue<T, K extends keyof T> {
    key: K;
    value: T[K];
}
