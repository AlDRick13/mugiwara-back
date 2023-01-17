const express = require('express')
const routesUsers = require('../src/routes/user.routes')
const routesPublications = require('../src/routes/publications_types.routes')
const routesCities = require('../src/routes/city.routes')
const routesVotes = require('../src/routes/vote.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/users', routesUsers)
  router.use('/publications', routesPublications)
  router.use('/cities', routesCities)
  router.use('/votes', routesVotes)
  // other models here
}

module.exports = routerModels