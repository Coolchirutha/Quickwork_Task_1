// Importing File System and Readline to take input and store credentials in file
const fs = require('fs');
const readline = require('readline');
var { google } = require('googleapis');

// Creating variable to control the set of resources
// and operations that an access token permits
const SCOPES = [
	'https://www.googleapis.com/auth/gmail.readonly',
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/userinfo.profile',
];

// File name to store the token
const TOKEN_PATH = 'token.json';

/*!
    First off, to use OAuth2 authentication, we will need access to
    a CLIENT_ID, CLIENT_SECRET, and REDIRECT_URL. Before proceeding any
    further, visit https://console.cloud.google.com/apis/credentials and
    obtain your credentials and save then in the working directory under
    the name of "credentials.json".
*/

// Getting the client secrets from the local file "credentials.json"
fs.readFile('credentials.json', (err, content) => {
	// Handling errors (if any)
	if (err) return console.log('Error parsing credentials file:', err);

    // Calling the authorize function to authorize the client's credentials,
    // then use the callback function to send an email
	authorize(JSON.parse(content), sendMail);
});

// Creating the OAuth2 client and then executing the callback function
function authorize(credentials, callback) {
	// Storing the credentials in variables
	const { client_secret, client_id, redirect_uris } = credentials.web;

	// Creating a new OAuth2 client using the user's login keys
	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	);

	// Configuring googleapis tpo use authentication credentials
	google.options({ auth: oauth2Client });

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		// If we have previously set a token we will
		// need to overwrite it and create a new one.
		if (err) return getNewToken(oAuth2Client, callback);

		// Else creating the credentials
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}

/*
    Getting the user token after getting user authorization and storing
    the toke in the file under TOKEN_PATH variable name. Then executing the callback function with the now authorized OAuth2 Client
*/
function getNewToken(oAuth2Client, callback) {
	// Generating the authorization URL with offline access and respective scope
	const authUrl = oAuth2Client.generateAuthUrl({
		// Here we have offline access which uses a refresh token
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log(
		'You must authorize this app to access your credentials by visiting this url: ',
		authUrl
	);

	// Getting user input of the accessToken
	const input = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	input.question(
		'Enter the access token from the redirected page: ',
		(code) => {
			input.close();
			oAuth2Client.getToken(code, (err, token) => {
				// Handling error (if any) while getting token from API
				if (err) {
					return console.error('Error receiving access token', err);
				}
				// Creating the credentials
				oAuth2Client.setCredentials(token);
				// Storing the obtained credentials into a file.
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
					if (err) {
						return console.error(err);
					}
					console.log(
						'User access token stored offline to ',
						TOKEN_PATH
					);
				});
				callback(oAuth2Client);
			});
		}
	);
}

async function sendMail(auth) {
	const gmail = google.gmail({ version: 'v1', auth });
	gmail.users.labels.list(
		{
			userId: 'me',
		},
		(err, res) => {
			if (err) return console.log('The API returned an error: ' + err);
			const labels = res.data.labels;
			if (labels.length) {
				console.log('Labels:');
				labels.forEach((label) => {
					console.log(`- ${label.name}`);
				});
			} else {
				console.log('No labels found.');
			}
		}
	);
}
