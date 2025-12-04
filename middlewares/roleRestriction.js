const roleRestriction = (...roles) => {
  return (req, res, next) => {
    // console.log(req.userAuth.role);
    if (!roles.includes(req.adminAuth.role)) {
      throw new Error("You do not have permission to perform this action");
    }
    next();
  };
};

module.exports = roleRestriction;
