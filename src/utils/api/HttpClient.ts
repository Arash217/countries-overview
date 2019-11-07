export interface Response<T> {
    data: T;
}

export class Response<T> implements Response<T> {
    constructor(public data: T) {}
}

export interface HttpClient {
    get<T>(url: string): Promise<Response<T>>;
}
