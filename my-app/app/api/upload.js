import connection from '@/utils/db';

const prom = connection.promise();

prom.query(`SELECT * FROM users`)
