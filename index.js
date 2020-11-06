// Importing File System and Readline to take input and store credentials in file
const fs = require("fs");
const readline = require("readline");
var { google } = require("googleapis");
const http = require("http");
const destroyer = require("server-destroy");
const url = require("url");
const opn = require("open");

// Creating variable to control the set of resources
// and operations that an access token permits
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
];

// File name to store the token
const TOKEN_PATH = "token.json";

/*!
    First off, to use OAuth2 authentication, we will need access to
    a CLIENT_ID, CLIENT_SECRET, and REDIRECT_URL. Before proceeding any
    further, visit https://console.cloud.google.com/apis/credentials and
    obtain your credentials and save then in the working directory under
    the name of "credentials.json".
*/

// Getting the client secrets from the local file "credentials.json"
var content = fs.readFileSync("credentials.json");
const credentials = JSON.parse(content);
// Storing the credentials in variables
const { client_secret, client_id, redirect_uris } = credentials.web;
// Creating a new OAuth2 client using the user's login keys
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);
// Configuring googleapis tpo use aOAuth2 client
google.options({ auth: oAuth2Client });

// Creating the OAuth2 client and then executing the callback function
async function authenticate(scopes) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes.join(" "),
    });
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf("/oauth2callback") > -1) {
            const qs = new url.URL(req.url, "http://localhost:3000")
              .searchParams;
            res.end("Authentication successful! Please return to the console.");
            server.destroy();

            const { tokens } = await oAuth2Client.getToken(qs.get("code"));

            // Creating the credentials
            oAuth2Client.credentials = tokens;

            // Checking if user's toke is already stored
            fs.readFile(TOKEN_PATH, (err, token) => {
              if (err) {
                // Storing the obtained credentials into a file.
                fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), (err) => {
                  if (err) {
                    return console.error(err);
                  }
                  console.log(
                    "User access token stored offline to ",
                    TOKEN_PATH
                  );
                });
              }
            });
            resolve(oAuth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        opn(authorizeUrl, { wait: false }).then((cp) => cp.unref());
      });
    destroyer(server);
  });
}

// Function to format the mail headers and body
function makeBody(to, from, subject, message) {
  var str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    "to: ",
    to,
    "\n",
    "from: ",
    from,
    "\n",
    "subject: ",
    subject,
    "\n\n",
    message,
  ].join("");

  var encodedMail = new Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return encodedMail;
}

function sendMail(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  var raw = makeBody(
    "ToAddress@gmail.com", // To address
    "FromAddress@gmail.com", // From address (only the user's email id works)
    "Compose your subject here", // Subject of the mail
    "Compose your content of the mail here" // Content of the mail
  );

  let mail = gmail.users.messages.send(
    {
      auth: auth,
      userId: "me",
      resource: {
        raw: raw,
      },
    },
    function (err, response) {
      return err || response;
    }
  );

  return mail;
}

authenticate(SCOPES)
  .then((client) => sendMail())
  .catch(console.error);
