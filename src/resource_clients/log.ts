import type { Readable } from 'node:stream';

import { ApifyApiError } from '../apify_api_error.js';
import type { ApiClientSubResourceOptions } from '../base/api_client.js';
import { ResourceClient } from '../base/resource_client.js';
import type { ApifyRequestConfig } from '../http_client.js';
import {
    cast,
    catchNotFoundOrThrow,
} from '../utils.js';

export class LogClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions) {
        super({
            resourcePath: 'logs',
            ...options,
        });
    }

    /**
     * https://docs.apify.com/api/v2#/reference/logs/log/get-log
     */
    async get(): Promise<string | undefined> {
        const requestOpts: ApifyRequestConfig = {
            url: this._url(),
            method: 'GET',
            params: this._params(),
        };

        try {
            const response = await this.httpClient.call(requestOpts);
            return cast(response.data);
        } catch (err) {
            catchNotFoundOrThrow(err as ApifyApiError);
        }

        return undefined;
    }

    /**
     * Gets the log in a Readable stream format. Only works in Node.js.
     * https://docs.apify.com/api/v2#/reference/logs/log/get-log
     */
    async stream(): Promise<Readable | undefined> {
        const params = {
            stream: true,
        };

        const requestOpts: ApifyRequestConfig = {
            url: this._url(),
            method: 'GET',
            params: this._params(params),
            responseType: 'stream',
        };

        try {
            const response = await this.httpClient.call(requestOpts);
            return cast(response.data);
        } catch (err) {
            catchNotFoundOrThrow(err as ApifyApiError);
        }

        return undefined;
    }
}
