const isProd = process.env.NODE_ENV === 'production'

console.info(`config mode = ${isProd ? process.env.NODE_ENV : 'dev'}`)

const mongo_host = process.env.MONGO_HOST || 'localhost'

const conf = {
  isProd,
  port: 8000,
  dbUrl: isProd
    ? `mongodb://${mongo_host}:27017/fth`
    : `mongodb://localhost:27017/fth_dev`,
}

module.exports = conf
