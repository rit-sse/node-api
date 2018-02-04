# node-api

[![Circle CI](https://circleci.com/gh/rit-sse/node-api.svg?style=svg&circle-token=50819f36da32c91bfd2df83ccae75175c0ff9a6e)](https://circleci.com/gh/rit-sse/node-api)

The SSE new and improved unified API.

## Contents
* [Development](#development)
  * [API Reference](#api-reference)
  * [Authentication](#authentication)
    * [Configuring Google OAuth](#configuring-google-oauth)
    * [Obtaining a token](#obtaining-a-token)
  * [Configuring Google Calendar](#configuring-google-calendar)
  * [Configuring Mailgun](#configuring-mailgun)
* [Running the app](#running-the-app)
* [Additional notes](#additional-notes)
* [Testing](#testing)
---
## Development

### API Reference
[Apiary Docs](http://docs.sse.apiary.io)

### Authentication
The API uses Google OAuth for authentication. You'll need to create a Project using Google Developer Console to make use of the API's authenticated requests.

#### Configuring Google OAuth
The following steps walk you through configuring Google OAuth, with the assumption you are using it for development in conjunction with the [OneRepoToRuleThemAll](https://github.com/rit-sse/OneRepoToRuleThemAll) project. **If you are using another client, you will have to modify Step 6 to conform with that client's configuration.**

1. Navigate to [Google Developer Console](https://console.developers.google.com/project), making sure you are logged in to the Google account you would like associated with the OAuth Authentication.
2. Select the option to create a new project, naming it whatever you wish. Click 'Create'. You should be redirected to your Project's API Manager page.
3. Open the Credentials page by selecting it from the navigation pane on the left-hand side of the page.
4. On the Credentials page, select the option 'Create credentials', and then 'OAuth client ID'.
5. You should now see a warning that you must set a product name on the consent screen. Select the option to 'Configure consent screen'. You will now be taken to the 'OAuth consent screen' settings pane. On this page, fill in the 'Product name shown to users' field with a name identifiable to your users. `SSE Dev API` is a good choice. When you're ready, click 'Save'.
6. Next, you'll be guided through the process of creating your OAuth Client Credentials. First, select 'Web application' as the Application type. Next, fill in the following information on the form that appears:
    - **Name:** `SSE Dev API` (or however you'd like to refer to it internally)
    - **Authorized JavaScript origins:** `http://localhost:5000`
        - This is the default origin of the SSE website client development server.
    - **Authorized redirect URIs:** `http://localhost:5000/api/v2/auth`
        - The URL that your client expects authentication responses to redirect to.
7. After filling in the above information, press 'Save' and you should now see your newly created credentials in a list view. Download the newly created secret by clicking the 'Download JSON' button in the row of your client (It's the down arrow). A `.json` file should be downloaded to your computer.
8. Finally, rename the downloaded file to `google.json` and place it in the `keys/` directory of your project.

Your dev environment is now configured for authentication using Google OAuth! Follow the steps for [running the app](#running-the-app) below to get the server up and running.


#### Obtaining a token
*NOTE: The steps below assume you are using a web-based client. If you are using another type of client, you'll have to retrieve the token in a different manner.*

If you want to perform requests directly against the API (and not through the client), you'll need a valid token. Here's how to get one:
* Start up your client application and authenticate with your `g.rit.edu` RIT account.
* Open the network/requests pane of your browser's developer console and view the Request headers for any request against the `node-api`.
  * All of your requests against the API should include this `Authorization` header and data, i.e.&nbsp;"`Bearer YOUR_TOKEN_STRING`".

*You can also perform fake auth by setting all security too low then authing with Slack using the default username and password (hint - its hardcoded in the code)*


### Configuring Google Calendar
You only need to do this if you are working on mentoring-related endpoints.

* Create a new Google Calendar for the Mentor Schedule
* In the side bar, Click on the arrow next to your new calendar and go to calendar settings.
* On the Calendar Details screen, you will find your calendar ID in the *Calendar Address* section. You can store this value in `keys/google.json` under `web.calendars.mentor`, or use the ENV variable `MENTOR_GOOGLE_CALENDAR`.
* Go to the Share Calendar Tab and make the calendar public.
* Head back to [Google Developer Console](https://console.developers.google.com/apis/library). Go to the same project you created before. Go to Libraries and search for Google Calendar API. Enable that API.
* Next go to Credentials Tab. Click Create Credentials > API Key. You can store this key in `keys/google.json` under `web.api_key` or set the ENV variable `GOOGLE_API_KEY`.

### Google Calendar
Only need to do this if you are working on mentoring-related endpoints.

* Create a new Google Calendar for the Mentor Schedule
* In the side bar, Click on the arrow next to your new calendar and go to calendar settings.
* On the Calendar Details screen, you will find your calendar ID in the *Calendar Address* section. You can store this value in `keys/google.json` under `web.calendars.mentor`, or use the ENV variable `MENTOR_GOOGLE_CALENDAR`.
* Go to the Share Calendar Tab and make the calendar public.
* Head back to [Google Developer Console](https://console.developers.google.com/apis/library). Go to the same project you created before. Go to Libraries and search for Google Calendar API. Enable that API.
* Next go to Credentials Tab. Click Create Credentials > API Key. You can store this key in `keys/google.json` under `web.api_key` or set the ENV variable `GOOGLE_API_KEY`.

### Configuring Mailgun
Only need to do this if you are working on scoreboard-related endpoints.

* Create a [Mailgun](https://www.mailgun.com/) account or sign in to your existing account
* Mailgun creates a sandbox address for testing with each account (eg. `sandbox<random_string>.mailgun.org`)
* In order to send email from this sandbox, you have to add an authorized recipient. Click on the sandbox domain and click on the button 'Add Recipients'. Then invite a new recipient by typing in your email address.
* You'll receive an email from Mailgun asking you to confirm that you want to receive test emails from this Mailgun account. Accept this request.
* Set the ENV variable `MAILGUN_DOMAIN` with the sandbox domain, and set the ENV variable `MAILGUN_SECRET` with the API key for this sandbox.
* When testing scoreboard-related endpoints (i.e. approving memberships), make sure the test user you're using has your email associated with it, so that you'll receive the test emails.

### Running the app
1. `npm install`
2. `npm run keygen`
3. `npm run bootstrap -- --admin:firstName [YOUR NAME] --admin:lastName [YOUR LAST NAME] --admin:dce [YOUR DCE] --keygen --seed` - Creates and migrates the database. If you specify the admin args, a membership will be created for that
user with all permissions. If you specify keygen, all keys will be regenerated.
If you specify seed it will seed the database.
4. `npm start`

### Additional Notes
1. `PORT="2222" npm start` - Run the server on a different port.

### Testing
Testing requires a PostgreSQL database named `node_api_test` to exist. This means you'll have to [install and run PostgreSQL](https://www.postgresql.org/download/) on your development computer.

If you're using macOS, [Postgres.app](https://postgresapp.com) and [Postico](https://eggerapps.at/postico) are friendly, easy-to-use tools for running PostgreSQL.
