import Mongoose from 'mongoose';
import FS from 'fs';
import Crypto from 'crypto';
import Jimp from 'jimp';
import { Buffer } from 'buffer';

const TIME_TO_EXPIRE = 24 * 60 * 60 * 1000;

const FileScheme = new Mongoose.Schema({
  name: { type: String, required: true },
  meta: Object,
  user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
  path: { type: String, required: true },
  tmp: { type: String, required: true },
}, {
  timestamps: true
});


FileScheme.methods.cp = function (path) {
  return new Promise((resolve, reject) => {
    path = path.replace(/^\/|\/$/g, '');
    const name = Crypto.randomBytes(20).toString('hex');
    const full = '/public/storage/' + path + '/' + name;
    const full_dir = '/public/storage/' + path;
    const url = '/storage/' + path + '/' + name;

    if(!FS.existsSync(full_dir)) {
      FS.mkdirSync(full_dir, {
        recursive: true,
        mode: '0775',
      });
    }

    FS.copyFile(this.path, full, err => {
      if(err) throw err;
      resolve({
        path: full,
        url: url,
        name: name,
      });
    });
  });
}


FileScheme.methods.isImage = function () {
  return (this.meta.mimetype && [
    'image/png',
    'image/jpeg',
    'image/jpg',
  ].includes(this.meta.mimetype))
}

// delete later
FileScheme.methods.delete = function () {
  return this.model('File').deleteOne({ _id: this._id }).then(() => {
    this.purge();
  });
}


FileScheme.methods.resizeImage = async function (params, ext = 'jpeg') {

  const copy = await this.cp(params.path);
  const model = this.model('File');

  const image_instance = await Jimp.read(copy.path);

  const urls = {};
  
  for (let i = 0; i <= params.resize_times; i++) {
    
    if(i === 0) {
      urls['original'] = copy.url;
    } else {
      urls['x' + i] = copy.url + `@x${i}.${ext}`
    }
    
  }

  if(!params.size) {
    params.size = [
      image_instance.bitmap.width, 
      image_instance.bitmap.height
    ];
  }

  let i = 1;
  for (const key in urls) {
    image_instance
      .cover(params.size[0] / i, params.size[1] / i)
      .write(model.urlToPath(urls[key]));
    i++;
  }

  return urls; 
}


FileScheme.statics.purgeExpired = async function () {
  
  const past_date = new Date(Date.now() - TIME_TO_EXPIRE);

  const files = await this.find({ createdAt: { $lt: past_date } });

  files.forEach(n => n.remove());
}


FileScheme.statics.urlToPath = function (url) {
  return 'public' + url;
}

FileScheme.statics.pathToUrl = function (path) {
  return path.replace('public', '');
}


FileScheme.pre('save', async function (next) {
  this.wasNew = this.isNew;
  next();
});


FileScheme.post('save', async function () {
  if(this.wasNew) {
    setTimeout(() => {
      this.purge();
    }, TIME_TO_EXPIRE);
  }
});


FileScheme.post('remove', async function () {
  this.purge();
});


FileScheme.statics.genRandName = function () {
  return Crypto.randomBytes(20).toString('hex');
}


FileScheme.methods.purge = function () {
  if(FS.existsSync(this.path)) {
    FS.unlinkSync(this.path);
  }
}, 

FileScheme.statics.saveRecording = function(image) {
  let buf = new Buffer(image, 'base64');
  FS.writeFile("tmp/test.jpeg", buf ,function(err) {
    if(err) {
      console.log("err", err);
    } else {
      console.log({'status': 'success'});
    }
    FS.readFile("tmp/test.jpeg", (err, data) => {
      if(err) { 
        console.log(err) } else {
          console.log(data)
        }
      } )
  }); 
}

const File = Mongoose.model('File', FileScheme);

export { File } 
