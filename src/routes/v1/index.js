const express = require('express');
const healthCheckRoute = require('./healthCheck.route');
const parkingRoute = require('./parking.route');
const analyticRoute = require('./analytic.route');
const areaRoute = require('./area.route');

const router = express.Router();

const v1Routes = [
  {
    path: '/health',
    route: healthCheckRoute,
  },
  {
    path: '/parking',
    route: parkingRoute,
  },
  {
    path: '/analytic',
    route: analyticRoute,
  },
  {
    path: '/get/area',
    route: areaRoute,
  },
];

v1Routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
