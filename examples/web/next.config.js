const withTM = require("next-transpile-modules")([
  "react-image-error-handling",
]);

module.exports = withTM({
  reactStrictMode: true,
});
