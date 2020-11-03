# Send emails using NodeJS and OAuth 2.0
Utilized Gmail REST API and OAuth 2.0 along with NodeJS to create a node app which will be able to send e-mails in Gmail after the user has authenticated using Google Cloud Console.

<!-- ## Problem Statement
Build an API in NodeJS using express to send emails using the Gmail REST API.
Your application should -

1. Obtain a Gmail user's credentials using OAuth 2.0. The OAuth 2.0 process should be initiated by an API call to your server.
2. Store the obtained credentials in a file.
3. Have an API endpoint to execute send email using the credentials previously stored.
4. Include appropriate comments in your code on how to use the APIs written by you.
5. Upload the server code to your Github and share the repository link with us. There is no need for a visual interface, only the server code is needed. -->

## Requirements

For development, you will only need Node.js and a node global package installed in your environment.

### Node
- #### Node installation on Windows

  Just go on to the  [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm in Ubuntu easily with apt install, just run the following 2 commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following commands.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open the command line again and be happy.

    $ npm install npm -g

###
---

## Install

    $ git clone https://github.com/Coolchirutha/Quickwork_Task_1.git
    $ cd Quickwork_Task_1
    $ npm install

## Configure app


For using this project, you will need a `CLIENT_ID`, `CLIENT_SECRET` and `REDIRECT_URL`. You can find these pieces of information by going to the [Developer Console][devconsole], clicking your project --> APIs & auth --> credentials.

- Go to the Cloud Console API Library.
- From the projects list, select the project you want to use(or create a new one).
- In the API Library, select the Gmail API.
- If you need help finding the API, use the search field and/or the filters.
- On the Gmail API page, click ENABLE.

- Navigate to the Cloud Console and [Create a new OAuth2 Client Id](https://console.cloud.google.com/apis/credentials/oauthclient)
- Select `Web Application` for the application type
- Add an authorized redirect URI with the value `http://localhost:3000/oauth2callback` (or applicable value for your scenario)
- Click `Create`, and `Ok` on the following screen
- Click the `Download` icon next to your newly created OAuth2 Client Id

Make sure to store this file in the root directory as `credentials.json`

## Running the project

    $ node index.js

