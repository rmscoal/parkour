const express = require('express');
const healthCheckRoute = require('./healthCheck.route');
const parkingRoute = require('./parking.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/health',
    route: healthCheckRoute,
  },
  {
    path: '/parking',
    route: parkingRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
