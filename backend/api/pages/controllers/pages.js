'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async findOne(ctx) {
        const { path } = ctx.params;

        const entity = await strapi.services.pages.findOne({ path });
        return sanitizeEntity(entity, { model: strapi.models.pages });
    },
};
