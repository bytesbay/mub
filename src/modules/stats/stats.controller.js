import Express from 'express';
const router = new Express.Router();

import { ActiveConnectionsService } from './services/active-connections.service'


router.get('/active/number', [
  (req, res, next) => {
    ActiveConnectionsService
      .getNumber()
      .then(num => res.json({
        num: num,
      }))
      .catch(next)
  }
]);

export { router as StatsController };