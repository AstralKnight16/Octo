// Optional: pnpm configuration file
// This file can be used to configure pnpm behavior

module.exports = {
  hooks: {
    readPackage(pkg) {
      // You can modify package.json here if needed
      return pkg;
    },
  },
};
