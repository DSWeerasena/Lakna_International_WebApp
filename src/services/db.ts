import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || '',
  database: process.env.DB_NAME || 'LaknaInternationalDB',
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let poolPromise: Promise<sql.ConnectionPool> | null = null;

export async function getDb() {
  if (!poolPromise) {
    if (!process.env.DB_SERVER) {
      console.warn("DB_SERVER is not defined. Using mock data for development.");
      return null;
    }
    poolPromise = sql.connect(config);
  }
  return poolPromise;
}

export { sql };
