'use strict';

const util = require('util');
const http = require('http');
const config = require('getconfig');

module.exports = {
  isSection: basepath => basepath === '/',

  negotiateContent: (basepath, file_extension, options, callback) => {
    if (basepath === '/index' || basepath === '/200') {
      return callback(null, {}, null, {});
    }

    const slug = basepath.substr(1);

    // Check the query string for a `phase` parameter and modify the request.
    let spOptions = '';
    if (options.query.hasOwnProperty('phase')) {
      spOptions = '&sellaporter[phase]=' + options.query['phase'];
    }

    const reqOptions = {
      method: 'GET',
      host: config.content.host,
      port: config.content.port,
      path: util.format('%s/%s?filter[name]=%s%s',
        config.content.path,
        config.content.type,
        slug,
        spOptions
      ),
    };

    const req = http.request(reqOptions, res => {
      let full_body = '';

      res.setEncoding('utf-8');

      res.on('data', chunk => {
        full_body += chunk;
      });

      res.on('end', () => {
        const pageData = {
          slug: slug,
          fields: JSON.parse(full_body).shift(),
        };
        if (pageData.fields !== 'undefined') {
          return callback(null, pageData, {}, new Date().getTime());
        }
      });
    });

    req.on('error', error => {
      return callback(util.format('[Error: %s]', error.message), null, null, {});
    });

    req.end();
  },
};
