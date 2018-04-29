import Rebase from 're-base';
import firebase from 'firebase';

export const HN_DATABASE_URL = 'https://hacker-news.firebaseio.com';
export const HN_API_VERSION = 'v0';

const app = firebase.initializeApp(
  { databaseURL: `${HN_DATABASE_URL}${HN_API_VERSION}` },
  'hackernews'
);

//const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const db = Rebase.createClass(app.database());

export default db;
