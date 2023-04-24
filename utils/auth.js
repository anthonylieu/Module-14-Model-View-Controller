// Define a middleware function to check if the user is authenticated
const withAuth = (req, res, next) => {
  // If there's no user_id in the session, the user is not authenticated
  if (!req.session.user_id) {
    // Redirect the user to the login page
    res.redirect('/login');
  } else {
     // If the user is authenticated, proceed to the next middleware or route handler
    next();
  }
};

// Export the withAuth middleware function for use in other modules
module.exports = withAuth;
