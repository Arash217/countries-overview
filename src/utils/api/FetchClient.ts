import fetch from 'node-fetch';
import { HttpClient, Response } from './HttpClient';

export class FetchClient implements HttpClient {
    constructor(public baseUrl: string) {}

    async get<T>(url: string): Promise<Response<T>> {
        const res = await fetch(`${this.baseUrl}${url}`);
        const data = await res.json();
        return new Response<T>(data);
    }
}
