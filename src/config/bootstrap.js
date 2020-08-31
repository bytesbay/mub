import Lodash from 'lodash'; global._ = Lodash;
import { config } from 'src/config/config'; global.$config = config;

import 'src/config/prefs';
import { start } from 'src/config/on-startup';

const up = async function () {
  await start();
}

up();