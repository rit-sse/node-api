import keypair from 'keypair';
import fs from 'fs';

export default function keygen() {
  const pair = keypair();
  fs.writeFile('./keys/public.key', pair.public, () => console.log('Wrote public key to ./keys/public.key')); // eslint-disable-line no-console
  fs.writeFile('./keys/private.key', pair.private, () => console.log('Wrote private key to ./keys/private.key')); // eslint-disable-line no-console
}

if (require.main === module) {
  keygen();
}
