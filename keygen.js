'use strict';

import keypair from 'keypair';
import fs from 'fs';
import { randomBytes } from 'crypto';

export default function keygen() {
  const pair = keypair();
  const str = randomBytes(48).toString('hex');
  fs.writeFile('./keys/public.key', pair.public, () => console.log('Wrote public key to ./keys/public.key'));
  fs.writeFile('./keys/private.key', pair.private, () => console.log('Wrote private key to ./keys/private.key'));
  fs.writeFile('./keys/slack-secret', str, () => console.log('Wrote slack secret to ./keys/slack-secret'));
}

if (require.main === module) {
  keygen();
}
