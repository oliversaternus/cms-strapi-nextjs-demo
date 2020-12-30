'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async findOne(ctx) {
        const { identifier } = ctx.params;

        const entity = await strapi.services.post.findOne({ identifier });
        return sanitizeEntity(entity, { model: strapi.models.post });
    },
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.post.search(ctx.query);
            entities = entities.map(entity => {
                const { content, ..._entity } = entity;
                return _entity;
            });
        } else {
            entities = await strapi.services.post.find(ctx.query, [
                'id',
                'identifier',
                'author',
                'tags',
                'title',
                'subtitle',
                'image',
                'duration',
                'topic'
            ]);
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.post }));
    },
};
