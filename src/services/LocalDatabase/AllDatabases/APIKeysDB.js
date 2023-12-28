import { InitDatabase } from "../LocalDatabase.js";

export async function APIKeysDB({
  reset,
}) {

  // tableName is the name of the Sqlite table you want to create/start 
  const tableName = 'APIKeys';

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
   */
  const columns = [
    // is the API key active or not ?
    // since the user is a real OG who paid his dues, 
    // then he's allowed in my (your ;-) kingdom
    // true = 1, false = 0 or null
    { name: 'active', type: 'INTEGER' },

    // the hashed API key
    { name: 'hashedAPIKey', type: 'TEXT' },

    // the email address of your beautful customer
    { name: 'customerEmail', type: 'TEXT' },

    // the type of API subscription the user purchased
    { name: 'subscriptionType', type: 'TEXT' },

    // the API credits of this fresh user.
    // The fresh user gets 5000 credits 
    // to begin his/her creative journey 
    { name: 'APICredits', type: 'REAL' },
  ];

  // Initialize the database
  const db = await InitDatabase({ tableName, columns, reset });

  return db;
}
