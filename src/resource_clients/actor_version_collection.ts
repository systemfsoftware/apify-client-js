import type { ActorVersion, FinalActorVersion } from './actor_version.js';
import type { ApiClientSubResourceOptions } from '../base/api_client.js';
import { ResourceCollectionClient } from '../base/resource_collection_client.js';
import ow from '../ow.js';
import type { PaginatedList } from '../utils.js';

export class ActorVersionCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions) {
        super({
            resourcePath: 'versions',
            ...options,
        });
    }

    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-collection/get-list-of-versions
     */
    async list(options: ActorVersionCollectionListOptions = {}): Promise<ActorVersionListResult> {
        ow(options, ow.object.exactShape({
            limit: ow.optional.number,
            offset: ow.optional.number,
            desc: ow.optional.boolean,
        }));

        return this._list(options);
    }

    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-collection/create-version
     */
    async create(actorVersion: ActorVersion): Promise<FinalActorVersion> {
        ow(actorVersion, ow.optional.object);

        return this._create(actorVersion);
    }
}

export interface ActorVersionCollectionListOptions {
    limit?: number;
    offset?: number;
    desc?: boolean;
}

export type ActorVersionListResult = Pick<PaginatedList<FinalActorVersion>, 'total' | 'items'>
