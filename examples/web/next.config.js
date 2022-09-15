const withTM = require("next-transpile-modules")(["react-image-hooks"]);

module.exports = withTM({
  reactStrictMode: true,
});
