import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "blog",
  password: "123456",
  port: 5432,
});
export default pool;
