import busboy from 'busboy';

export function formParser() {
  const supports = ['POST', 'PUT', 'DELETE'];

  return function (req, res, next) {
    if (supports.indexOf(req.method) === -1 || req.headers['content-type'].indexOf('multipart/form-data') !== 0) {
      return next();
    }
    const bb = busboy({ headers: req.headers });
    const files = [];
    bb.on('file', (name, file, info) => {
      const { filename: fileName, encoding, mimeType } = info;
      let buf = '';
      file.setEncoding('base64');
      file
        .on('data', (data) => {
          buf += data;
        })
        .on('close', () => {
          const buffer = Buffer.from(buf, 'base64');
          const fileObj = {
            fieldName: name,
            fileName,
            encoding,
            mimeType,
            buffer,
          };
          files.push(fileObj);
        });
    });
    bb.on('field', (name, val, info) => {
      req.body = req.body ?? {};
      const body = req.body;
      body[name] = body[name] !== undefined ? [].concat(body[name], val) : val;
    });
    bb.on('close', () => {
      req.files = files;
      next();
    });
    req.pipe(bb);
  };
}
