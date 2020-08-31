import Express from 'express';
const router = new Express.Router();

import { FileController } from 'src/modules/file/file.controller';
// import { StatsController } from 'src/modules/stats/stats.controller';

router.get('/', (req, res) => res.json({
  name: 'MUB',
  author: 'Miroslaw Shpak @bytesbay',
}))

router.use('/file', FileController);
// router.use('/gateway/stats', StatsController);

export { router }; 
