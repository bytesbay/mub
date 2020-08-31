import File from './file.model';
import InvalidInputError from 'src/errors/invalid-input.error';
import Axios from 'axios';
import { Buffer } from 'buffer';
import FS from 'fs';

import Express from 'express';
import AuthMiddleware from 'src/middleware/auth.middleware';
import Multer from 'multer';

const router = new Express.Router();
const upload = Multer({
  dest: 'tmp/',
  limits: {
    fileSize: 50 * 1024 * 1024,
  }
});

// accept multipart/form-data
router.post('/', [
  AuthMiddleware.basic, 
  upload.single('file'), 
  function(req, res, next) {
    const file = new File({
      name: req.file.originalname,
      meta: {
        mimetype: req.file.mimetype,
        encoding: req.file.encoding,
        size: req.file.size
      },
      user: req.payload.user._id,
      path: req.file.path,
      tmp: req.file.filename
    });

    file
      .save()
      .then(item => {
        console.log(item);
        res.json({
          id: file._id
        });
      })
      .catch(next);
  },
]);


router.delete('/all', [
  AuthMiddleware.basic, 
  function(req, res, next) {
    File.find({ user: req.payload.user._id })
      .then(items => {
        items = items.map(n => {
          return n.remove();
        });

        Promise.all(items)
          .then(() => {
            res.end();
          })
          .catch(next);
      })
      .catch(next);
  }
]);

router.delete('/:file', [
  AuthMiddleware.basic, 
  function(req, res, next) {
    File.deleteOne({ _id: req.params.file })
      .then(items => {
        res.end();
      })
      .catch(next);
  },
]);

router.get('/', [
  AuthMiddleware.basic, 
  function(req, res, next) {
    File.find({ user: req.payload.user._id })
      .then(items => {
        res.json(items);
      })
      .catch(next);
  },
]);

export { router as FileController }
