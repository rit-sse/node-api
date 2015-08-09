# node-api

The SSE new and improved unified API

## Development

### Authentication
To generate the necessary client id and secret, head to the [Google Developer Console](https://console.developers.google.com/project), create a project, select 'APIs & Auth > Credentials', and finally click 'Create a new Client ID'.  After you do this, download the json.  Move it to `keys/google.json`.


## Running the application
1. `npm install`
2. `npm run bootstrap -- --admin:firstName [YOUR NAME] --admin:lastName [YOUR LAST NAME] --admin:dce [YOUR DCE] --keygen` - Migrates and seed the database. If you specify the admin args, a membership will be created for that user with all permissions. If you specify keygen, all keys will be regenerated.
3. `npm start`