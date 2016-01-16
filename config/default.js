module.exports = {
  content: {
    host: process.env.PUNCH_API_HOST || '127.0.0.1',
    path: process.env.PUNCH_API_PATH || '/wordpress/wp-json/wp/v2',
    port: process.env.PUNCH_API_PORT || 7501,
  },
};
