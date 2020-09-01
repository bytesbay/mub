import Chain from 'middleware-chain'

import { File } from 'src/modules/file/file.model'

const start = function () {

  Chain({}, [

    // Remove all files that are expired
    async function (context, next) {
      setInterval(() => {
        File.purgeExpired();
      }, 60 * 60 * 24 * 1000)
      next();
    },
  ]);
}

export { start };