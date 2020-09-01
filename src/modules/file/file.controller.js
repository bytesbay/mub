import Express from 'express';
import { authMiddleware } from 'src/middleware/auth.middleware';
import { FileService } from './file.service';
import Multer from 'multer';

const router = new Express.Router();
const upload = Multer({
  dest: '/data/mub/files',
  limits: {
    fileSize: process.env['MAX_FILESIZE'] || (50 * 1024 * 1024),
  }
});

// accept multipart/form-data
router.post('/', [
  authMiddleware, 
  upload.single('file'), 
  async function(req, res, next) {
    FileService.create(req.user_id, req.file)
      .then(data => res.json(data))
      .catch(next)
  },
]);

router.delete('/all', [
  authMiddleware, 
  function(req, res, next) {
    FileService.deleteAll(req.user_id)
      .then(() => res.end())
      .catch(next)
  }
]);

router.delete('/:file', [
  authMiddleware, 
  function(req, res, next) {
    FileService.delete(req.params.file, req.user_id)
      .then(() => res.end())
      .catch(next)
  },
]);

router.get('/', [
  authMiddleware, 
  function(req, res, next) {
    FileService.selectAll(req.user_id)
      .then(data => res.json(data))
      .catch(next)
  },
]);

export { router as FileController }
