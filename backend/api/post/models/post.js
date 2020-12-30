'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        async beforeCreate(data) {
            let { title, content } = data;
            const identifier = title.toLowerCase() + '-' + Date.now();
            const duration = Math.ceil(content.length / 1600);
            data.identifier = identifier;
            data.duration = duration;
        },
        async beforeUpdate(params, data) {
            let { title, content, identifier } = data;
            if (title) {
                let timestamp = identifier && identifier.split('-').pop();
                if (isNaN(timestamp)) {
                    timestamp = Date.now();
                }
                const _identifier = title.toLowerCase() + '-' + timestamp;
                data.identifier = _identifier;
            }
            if (content) {
                const duration = Math.ceil(content.length / 1600);
                data.duration = duration;
            }
        }
    }
};
