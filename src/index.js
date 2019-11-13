const path = require('path');
const sharp = require('sharp');
const loaderUtils = require('loader-utils');

module.exports = function (content, map, meta) {
  const callback = this.async();
  const image = sharp(content);
  const query = this.resourceQuery[0] === '?' ?  loaderUtils.parseQuery(this.resourceQuery) : {};
  const p = path.parse(this.resourcePath);
  const that = this;

  image.metadata(function(err, metadata) {
    if (err) throw err;

    let w = null;
    let h = null;

    if (query.w) {
      w = Number(query.w);
    }

    if (query.h) {
      h = Number(query.h);
    }

    if (w || h) {
      if (!w) {
        w = Math.round(metadata.width * (h / metadata.height));
      }

      if (!h) {
        h = Math.round(metadata.height * (w / metadata.width));
      }

      image.resize(w, h);
      p.name += ('-' + w + 'x' + h);
    }

    if (query.format) {
      image.toFormat(query.format);
      p.ext = '.' + query.format;
    }

    that.resourcePath = path.format({ dir: p.dir, name: p.name, ext: p.ext });

    image.toBuffer(function (err, data) {
      if (err) throw err;
      callback(null, data, map, meta);
    });
  });
};
module.exports.raw = true;
