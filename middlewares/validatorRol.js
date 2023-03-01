const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.userAuthenticated) {
    return res.status(500).json({
      msg: "Role Verification Without Token Review",
    });
  }

  const { role, name } = req.userAuthenticated;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `\'${name}\' is not Admin - Insufficient permissions`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.userAuthenticated) {
      return res.status(500).json({
        msg: "Role Verification Without Token Review",
      });
    }

    //console.log(roles, req.userAuthenticated.role);

    if (!roles.includes(req.userAuthenticated.role)) {
      return res.status(401).json({
        msg: `Insufficient permissions for \'${req.userAuthenticated.name}\'. One of these roles is required: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
