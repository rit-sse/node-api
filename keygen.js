import keypair from 'keypair';
import fs from 'fs';

var pair = keypair();
fs.writeFile('./keys/public.key', pair.public, () => console.log('Wrote public key to ./public.key'));
fs.writeFile('./keys/private.key', pair.private, () => console.log('Wrote private key to ./private.key'));