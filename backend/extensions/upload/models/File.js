'use strict';

const sharp = require('sharp');
const path = require('path');

module.exports = {
    lifecycles: {
        async beforeCreate(data) {
            let { url, formats } = data;
            let previewData;
            for (const format of Object.values(formats || {})) {
                if (format.url.startsWith('/')) {
                    format.url = strapi.config.get('server.url', 'http://localhost:1337') + url;
                }
            }
            if (url.startsWith('/')) {
                url = strapi.config.get('server.url', 'http://localhost:1337') + url
            }
            try {
                previewData = await sharp(path.join(__dirname, '../', '../', '../', 'public', 'uploads', data.hash + data.ext + ''))
                    .resize(36)
                    .jpeg({ quality: 80 })
                    .toBuffer();
            } catch (e) {
            }
            previewData && (data.previewUrl = `data:image/jpeg;base64,${previewData.toString('base64')}`);
            data.formats = formats;
            data.url = url;
        },
        async beforeUpdate(params, data) {
            let { url, formats } = data;
            for (const format of Object.values(formats || {})) {
                if (format.url && format.url.startsWith('/')) {
                    format.url = strapi.config.get('server.url', 'http://localhost:1337') + url;
                }
            }
            if (url && url.startsWith('/')) {
                url = strapi.config.get('server.url', 'http://localhost:1337') + url
            }
            formats && (data.formats = formats);
            url && (data.url = url);
            try {
                previewData = await sharp(path.join(__dirname, '../', '../', '../', 'public', 'uploads', data.hash + data.ext + ''))
                    .resize(36)
                    .jpeg({ quality: 80 })
                    .toBuffer();
                previewData && (data.previewUrl = `data:image/jpeg;base64,${previewData.toString('base64')}`);
            } catch (e) {
            }
        }
    }
};