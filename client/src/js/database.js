import { openDB } from 'idb';
const jateDB = await openDB('jate', 1);
const txW = jateDB.transaction('jate', 'readwrite');
const storeW = txW.objectStore('jate');
const txR = jateDB.transaction('jate', 'readwrite');
const storeR = txR.objectStore('jate');

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const request = storeW.add({content:content});
  const result = await request;
  console.log('text editor data stored to indexDB', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const request = storeR.getAll();
  const result = await request;
  console.log('all stored db data:', result);
};

initdb();
