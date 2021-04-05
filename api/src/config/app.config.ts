export default () => ({
  jwt: {
    secret:
      process.env.JWT_SECRET || '8vWggB9FHrYnb6HKtaH2aUqqQqnejxlxAN3PmdJ34nE',
    signOptions: { expiresIn: '8h' },
  },
  database: {
    uri: process.env.DB_URI,
    authSource: 'admin',
    dbName: 'community',
    auth: {
      user: process.env.DB_AUTH_USER,
      password: process.env.DB_AUTH_PASS,
    },
  },
});
