# Send emails using NodeJS and OAuth 2.0
Utilized Gmail REST API and OAuth 2.0 and NodeJS to create a node app that will be able to send e-mails in Gmail after the user has authenticated using Google Cloud Console.

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

  You can install nodejs and npm in Ubuntu easily with apt install. Just run the following 2 commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following commands.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, open the command line again and be happy.

    $ npm install npm -g

###
---

## Install

    $ git clone https://github.com/Coolchirutha/Quickwork_Task_1.git
    $ cd Quickwork_Task_1
    $ npm install

## Configure app


For using this project, you will need a `CLIENT_ID`, `CLIENT_SECRET`,and `REDIRECT_URL`. You can find these pieces of information after , clicking your project --> APIs & auth --> credentials.

1. Go to the [Google Cloud Console](http://console.cloud.google.com/) and log in using your google account

2. From the projects list, select the project you want to use(or create a new one).

3. If the APIs & services page isn't already open, open the console left side menu and select **APIs & services**, and then select **Library**.

4. Search for the **Gmail API** and click **ENABLE**.

5. Now once again open the console left side menu and under **APIs & Services**, select **Credentials**.

6. If this is your first time creating credentials in this project, use the sub-steps below to setup the OAuth consent page; otherwise, skip to the next step.
   - Click **CONFIGURE CONSENT SCREEN**.
   - Select **External** as the **User Type**
   - Enter a name in the **App name** field.
   - Fill out the rest of the fields as needed.
   - Click **Save**.

7. In the **Create credentials** drop-down list, select OAuth client ID.

8. Select **Web application** as the **Application type**.

9. In **Name**, enter a name for your client ID.

10. Under **Authorized redirect URIs** click on ***ADD URI** and add the value  `http://localhost:3000/oauth2callback` (or applicable value for your scenario)

11. Click **Create** and **Ok** on the following screen

12. Click the **Download icon** next to your newly created OAuth2 Client Id

Make sure to store this file in the root directory as `credentials.json`

## Running the project
To edit the contents and details of the mail to be sent. Edit
[This snippet of code.](https://github.com/Coolchirutha/Quickwork_Task_1/blob/e56886a2df2346613632cc0a60548222dff53fad/index.js#L135-L138) I've commented the code appropriately.

After editing the code as per your requirements. Run the following command in the terminal to run the code and follow the on-screen instructions to give consent for the app.

    $ node index.js

