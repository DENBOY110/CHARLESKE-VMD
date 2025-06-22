const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUpHTS9ra21WWG5WbGxhVUpZQ2h5NU9yWXY4ZTM5ZEJhbU91OW5jNnZGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU3FFM1pFRUFrd3ZGMjU1WCtpZUlXNEN0L1J5RDQxVkJBa3lnd05kSFRXWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRlhxcGxEd0FhRXE0R243QzFLeGdyTno3eFQyTGNHSVRXeE9hWTZrMUV3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuVHdxL0dyWHdueUNRbDd5UkdBTENMTGwwaktKT3REYU55NHU2REpTV0RNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9MalFsREoxWmlNamZTdERvZkNBOUhWZnFSUG41R0lmSlc5S0JSRm00Rnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFFeUE3YWV1R0xJUnhEQm9BYzVzU0tFSE1JNjJ5T1paRmFFOE90QmhrVWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNENSUklRVWk0UWx4TUQyYnFXekZNYmFpTXp3bGNYeUM0b1JUUWp6aG5XRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0xxVnlNU0F4SWIxK2hKMWF4R1dmdVo1b1FVaFhySWJJOUdrbER0b0tCQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkUyLzJyd2pTZURKWWRkcHVFb3I4MUlkMUgycEtlYi9MNm5CVnMzR0VucUhXSTRENUhid3Z5TEozN2p0T2h4UENrMVNyTnNZTVR4cHp2UzJoRk9iQ0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQsImFkdlNlY3JldEtleSI6IjEvZUVPZnpURHpEK1E4aE1tcXRtZTFaQmRyS2xWM1VBb1p0cEc0L1lid3M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzg5MDg1NTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjY2MkZGRDNFMDcyNDZCQjAwRTg1RkE3MkZEMTE0Q0I4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA2MzMyNTF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4OTA4NTUzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5MzY4MkMwNkQyRTMyODAzNjI0NDYyN0I0MTlBODFERiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwNjMzMjUyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxMjNMT1RVUyIsIm1lIjp7ImlkIjoiMjYzNzg5MDg1NTMzOjYyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkLfwnZC44oSV8J2QtfCdmYrwnZGMIiwibGlkIjoiMTIzOTE4Mzk2NDg1ODgyOjYyQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT2JPL1JZUWpaYml3Z1lZQ0NBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiN2Y4MFRPRWlyOXpwQWx6SlhwMVJXaE1KMEpqQXUrbUI1OWJaTXNxdTNoaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicjlhNU9nVlViWXo1dTZjeVEzT085enhDYmtRMmZIdDdjcmF5c3p6RG9XL1BWR0pHWHZUTThMOXlGRjdxeWZvRm04ZmVpbVJaWllqVzBVOENRVDBKQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IjRsYVNtcWwrSFEvU1lNbmUvWlJLSnpPZThPdjlrYk1XeStwU1czcHVEbHFLK3hWSjFTcVlBYVdnMUhXMGNVbjdEay9hMllVV0hHTlJDM0cwSUdlWEJRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg5MDg1NTMzOjYyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmUzL05FemhJcS9jNlFKY3lWNmRVVm9UQ2RDWXdMdnBnZWZXMlRMS3J0NFoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDYzMzI0MywibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQNU4ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®Denny",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263789085533",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'no',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
