const app = require('./express_app')
const { initializeDatabase } = require('./database')
const mainConf = require('./conf/config')

const port = mainConf.port

initializeDatabase()

app.listen(port, () => {
  console.info(`Application is running is at http://localhost:${port}`)
})
