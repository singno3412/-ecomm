import mysql from 'mysql2';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'next-js-registration-login-example',
});

export default connection;
