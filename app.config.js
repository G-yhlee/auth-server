module.exports = {
  apps: [
    {
      name: "gps-server(9101)",
      script: "dist/index.js",
      // watch: true,
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
