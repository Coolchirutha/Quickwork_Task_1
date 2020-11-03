# Send emails using NodeJS and OAuth 2.0
Utilized Gmail REST API and OAuth 2.0 along with

<!-- ## Problem Statement
Build an API in NodeJS using express to send emails using the Gmail REST API.
Your application should -

1. Obtain a Gmail user's credentials using OAuth 2.0. The OAuth 2.0 process should be initiated by an API call to your server.
2. Store the obtained credentials in a file.
3. Have an API endpoint to execute send email using the credentials previously stored.
4. Include appropriate comments in your code on how to use the APIs written by you.
5. Upload the server code to your Github and share the repository link with us. There is no need for a visual interface, only the server code is needed. -->

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/Coolchirutha/Quickwork_Task_1.git
    $ cd PROJECT_TITLE
    $ yarn install

## Configure app

Open `a/nice/path/to/a.file` then edit it with your settings. You will need:

- To use OAuth2 authentication, we need access to a a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.  To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.;
- Another setting;
- One more setting;

## Running the project

    $ node index.js

