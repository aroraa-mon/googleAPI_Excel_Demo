const {google} = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize((err, tokens) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('connected');
    return gsRun(client);

}); 

async function gsRun(client) {
    const gsAPI = google.sheets({
        version:'v4',
        auth: client
    });

    const opt = {
        spreadsheetId: '1W8yWb7F5BzipEZVgWWCHAHsmZ70v0XYLM4OIyPsRKGc',
        range: 'January!A1:AX15'
    }

    try {
        const data = await gsAPI.spreadsheets.values.get(opt);
        console.log(JSON.stringify(data.data.values));
    } catch (error) {
        console.log(error);
    }
    
}