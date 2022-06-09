import { openDB } from 'idb';

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
  const jateDB = await openDB('jate', 1);
  const text = jateDB.transaction('jate', 'readwrite');
  const save = text.objectStore('jate');
  const request = save.put({
    id: 1,
    value: content,
  });
  const result = await request;
  console.log('Data has been saved to the db', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  const jateDB = await openDB('jate', 1);
  const text = jateDB.transaction('jate', 'readonly');
  const save = text.objectStore('jate');
  const request = save.get(1);
  const result = await request;
  return result.value;
};

initdb();
