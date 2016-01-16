module.exports = {

  // Punch config.
  template_dir: 'templates',
  output_dir: 'build',
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 7500,
  },
  plugins: {
    content_handler: './generator/content-handlers/wp_rest_api_content_handler',
    template_engine: './generator/template-engines/jade_engine',
  },

  // WP REST API config — this is your blog endpoint.
  content: {
    host: process.env.PUNCH_API_HOST || '127.0.0.1',
    path: process.env.PUNCH_API_PATH || '/wordpress/wp-json/wp/v2',
    port: process.env.PUNCH_API_PORT || 7501,
  },

};
