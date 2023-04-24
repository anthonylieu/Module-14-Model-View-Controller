// Import the express Router module
const router = require('express').Router();
// Import API routes
const apiRoutes = require('./api');
// Import home routes
const homeRoutes = require('./home-routes.js');
// Import dashboard routes
const dashboardRoutes = require('./dashboard-routes.js');

// Mount the API routes on the '/api' path
router.use('/api', apiRoutes);

// Mount the home routes on the root ('/') path
router.use('/', homeRoutes);

// Mount the dashboard routes on the '/dashboard' path
router.use('/dashboard', dashboardRoutes);

// Add a catch-all route handler for 404 (Not Found) errors
router.use((req, res) => {
  res.status(404).end();
});

// Export the configured router for use in other modules
module.exports = router;