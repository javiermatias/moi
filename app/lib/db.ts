import mysql from 'serverless-mysql';
//import mysql from ‘mysql2/promise’;
interface QueryProps {
    query: string;
    values: any[];
}
const port = parseInt(process.env.MYSQL_PORT || '3306', 10);
const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: port,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
});
export default async function executeQuery({ query, values }: QueryProps) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}