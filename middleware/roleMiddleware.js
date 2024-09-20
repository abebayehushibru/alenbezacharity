

// Middleware to check if the user has one of the required roles
const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
      // Check if the user has been authenticated
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. Please authenticate first.' });
      }
  
      // Check if the user's role is in the requiredRoles array
      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient privileges.' });
      }
  
      next(); // User has the correct role, proceed to the next middleware or route handler
    };
  };
  
  export default roleMiddleware;
  