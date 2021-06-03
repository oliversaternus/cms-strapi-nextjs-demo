var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../backend/.tmp/data.db');

const baseUrl = 'http://localhost:1337/';
const targetUrl = 'https://sample.com/';

db.serialize(function () {

    // updates base urls
    db.each("SELECT * FROM 'upload_file'", (err, result) => {
        if (result) {
            if (typeof result.url === 'string' && typeof result.formats === 'string') {
                const url = result.url.replace(new RegExp(baseUrl, 'g'), targetUrl);
                const formats = result.formats.replace(new RegExp(baseUrl, 'g'), targetUrl);
                db.run("UPDATE upload_file SET url = ?, formats = ? WHERE id = ?", url, formats, result.id);
            } else if (typeof result.url === 'string') {
                const url = result.url.replace(new RegExp(baseUrl, 'g'), targetUrl);
                db.run("UPDATE upload_file SET url = ? WHERE id = ?", url, result.id);
            }
        }
    });
});

setTimeout(() => db.close(), 5000);