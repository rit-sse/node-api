import keypair from 'keypair';
import fs from 'fs';

export default function keygen() {
  const pair = keypair();
  fs.writeFile('./keys/public.key', pair.public, () => console.log('Wrote public key to ./keys/public.key'));
  fs.writeFile('./keys/private.key', pair.private, () => console.log('Wrote private key to ./keys/private.key'));
}

if (require.main === module) {
  keygen();
  if (!fs.existsSync('./keys/google.json')) {
    const testData = { web: { client_id: 'a dumb token', client_secret: 'shhhhh' } };
    fs.writeFile('./keys/google.json', JSON.stringify(testData), () => console.log('Created dumb google.json'));
  }
}
