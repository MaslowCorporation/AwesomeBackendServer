import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { APIKeysDB } from './AllDatabases/APIKeysDB.js';

// tableName is the name of the Sqlite table you want to create/start 
// const tableName = 'students_test'; 

/**
 * 
 * columns is an array of objects 
 * that allows you to initialize a Sqlite TABLE
 *
 * each object is a { name, type } duo representing a table row
 *
 * name is the name of the row
 *
 * type is the data type of this row: 
 * TEXT (string), 
 * INTEGER (an integer), 
 * REAL (a decimal/floating number)
 * 

Below is an example columns array,
that creates 3 rows named 'age', 'studentName', and 'grade'

As you can guess, it represents a student in a database of students


const columns = [
  { name: 'age', type: 'INTEGER' },
  { name: 'studentName', type: 'TEXT' },
  { name: 'grade', type: 'REAL' },
  // Add more columns as needed
];

// Initialize the database
//const db = await InitDatabase({ tableName, columns });
*/

// Initialise database
export async function InitDatabase({ tableName, columns, reset }) {
  try {

    const db = await open({
      filename: '/tmp/database.db',
      driver: sqlite3.Database
    });

    if (reset) {
      await DeleteTable({db, tableName})
    }

    columns.push({ name: 'uniqueId', type: 'TEXT' });
    let columnsQuery = columns.map(column => `${column.name} ${column.type}`).join(', ');
    await db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnsQuery})`);

    return db;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Create a document
export async function CreateDatabaseDocument({ tableName, documentData, uniqueId }) {
  if (!uniqueId) {
    console.log('You gave an invalid uniqueId');
    return null;
  }
  try {
    const db = await GetDatabaseByName({tableName});
    
    const keys = Object.keys(documentData);
    const values = Object.values(documentData);

    keys.push('uniqueId');
    values.push(uniqueId);

    const statement = await db.prepare(`INSERT INTO ${tableName}(${keys.join(', ')}) VALUES(${new Array(keys.length).fill('?').join(', ')})`);
    await statement.run(values);

    // Finalize the statement before closing the connection
    await statement.finalize();

    await db.close();

    return uniqueId;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Read a document by uniqueId
export async function GetDatabaseDocument({ tableName, uniqueId }) {
  if (!uniqueId) {
    console.log('You gave an invalid uniqueId');
    return null;
  }

  try {
    const db = await GetDatabaseByName({tableName});
    
    const statement = await db.get(`SELECT * FROM ${tableName} WHERE uniqueId = ?`, uniqueId);

    await db.close();

    return statement;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Update a document by uniqueId
export async function UpdateDatabaseDocument({ tableName, updateData, uniqueId }) {
  if (!uniqueId) {
    console.log('You gave an invalid uniqueId');
    return null;
  }

  try {
    const setQuery = Object.keys(updateData).map(key => `${key} = ?`).join(', ');

    const db = await GetDatabaseByName({tableName});
    
    const statement = await db.prepare(`UPDATE ${tableName} SET ${setQuery} WHERE uniqueId = ?`);
    await statement.run([...Object.values(updateData), uniqueId]);

    // Finalize the statement before closing the connection
    await statement.finalize();

    await db.close();

    return true;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Delete a document by uniqueId
export async function DeleteDatabaseDocument({ tableName, uniqueId }) {
  if (!uniqueId) {
    console.log('You gave an invalid uniqueId');
    return null;
  }

  try {
    const db = await GetDatabaseByName({tableName});

    const statement = await db.prepare(`DELETE FROM ${tableName} WHERE uniqueId = ?`);
    await statement.run(uniqueId);

    // Finalize the statement before closing the connection
    await statement.finalize();

    await db.close();

    return true;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Get all documents
export async function GetAllDatabaseDocuments({  tableName }) {
  try {
    const db = await GetDatabaseByName({tableName});
    const statement = await db.all(`SELECT * FROM ${tableName}`);

    await db.close();

    return statement;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Delete all documents
export async function DeleteAllDatabaseDocuments({ tableName }) {
  try {
    const db = await GetDatabaseByName({tableName});
    const statement = await db.run(`DELETE FROM ${tableName}`);

    await db.close();

    return true;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function DeleteTable({tableName}) {
  try {
    const db = await GetDatabaseByName({tableName});

    await db.run(`DROP TABLE IF EXISTS ${tableName}`);

    await db.close();

    return true; // Indicates successful deletion
  } catch (err) {
    console.log(err);
    return false; // Indicates failure
  }
}


export async function GetDatabaseByName({ tableName, reset }) {

  let db;

  switch (tableName) {

      case "APIKeys":
          db = await APIKeysDB({ reset });

          break;
      // add more databases below by adding more case/break's
      default:
      // Unhandled event type
  }

  return db;
}

