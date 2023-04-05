import { Transform } from 'stream';

export class BufferTransform extends Transform {
  constructor(transform) {
    super({
      objectMode: true,
      transform(file, enc, callback) {
        if (file.isBuffer()) {
          file.contents = Buffer.from(transform(new String(file.contents)));
        }
        if (file.isStream()) {
          console.log('stream file', file.path);
        }
        return callback(null, file);
      },
    });
    return this;
  }
}
