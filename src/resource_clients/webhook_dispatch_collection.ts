import type { WebhookDispatch } from './webhook_dispatch.js';
import type { ApiClientSubResourceOptions } from '../base/api_client.js';
import { ResourceCollectionClient } from '../base/resource_collection_client.js';
import ow from '../ow.js';
import type { PaginatedList } from '../utils.js';

export class WebhookDispatchCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions) {
        super({
            resourcePath: 'webhook-dispatches',
            ...options,
        });
    }

    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches/webhook-dispatches-collection/get-list-of-webhook-dispatches
     */
    async list(options: WebhookDispatchCollectionListOptions = {}): Promise<PaginatedList<WebhookDispatch>> {
        ow(options, ow.object.exactShape({
            limit: ow.optional.number,
            offset: ow.optional.number,
            desc: ow.optional.boolean,
        }));

        return this._list(options);
    }
}

export interface WebhookDispatchCollectionListOptions {
    limit?: number;
    offset?: number;
    desc?: boolean;
}
