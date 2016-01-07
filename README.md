# node-api

[![Circle CI](https://circleci.com/gh/rit-sse/node-api.svg?style=svg&circle-token=50819f36da32c91bfd2df83ccae75175c0ff9a6e)](https://circleci.com/gh/rit-sse/node-api)

The SSE new and improved unified API

[Apiary Docs](http://docs.sse.apiary.io)

## Development

### Authentication
To generate the necessary client id and secret, head to the [Google Developer Console](https://console.developers.google.com/project), create a project, select 'APIs & Auth > Credentials', and finally click 'Create a new Client ID'.  After you do this, download the json.  Move it to `keys/google.json`.


### Running the app
1. `npm install`
2. `npm run keygen`
3. `npm run bootstrap -- --admin:firstName [YOUR NAME] --admin:lastName [YOUR LAST NAME] --admin:dce [YOUR DCE] --keygen --seed` - Creates and migrates the
database. If you specify the admin args, a membership will be created for that
user with all permissions. If you specify keygen, all keys will be regenerated.
If you specify seed it will seed the database.
4. `npm start`
