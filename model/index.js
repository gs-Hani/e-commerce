const { DB } = require('./config');
const   Pool = require('pg').Pool;
const   pool = new Pool({
  user:     DB.user,
  host:     DB.host,
  database: DB.database,
  password: DB.password,
  port:     DB.dbport,
});

module.exports = {

    async query(text, params, cb) {
      const start    = Date.now()
      const res      = pool.query(text, params, cb)
      const duration = Date.now() - start
      console.log('executed query', { text, duration })
      return res
  }
};