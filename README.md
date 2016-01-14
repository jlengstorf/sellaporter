# Sellaporter Static Sales Page Generator

Using the WordPress REST API, this app loads page data and renders it as static files.

It's built using [Punch](http://laktek.github.io/punch/), and it requires that the [WP REST API plugin](http://v2.wp-api.org/) is installed on your WordPress site.

## Development

To get this running locally:

    # Clone the repo
    git clone git@github.com:jlengstorf/sellaporter.git

    # Move into the cloned repo
    cd sellaporter/

    # Install dependencies
    npm install

    # Start the development server
    npm run develop

### Site Assets

The scripts and styles in this project are built using [webpack](https://webpack.github.io).

#### Alternative Asset Pipelines

Using webpack is entirely optional. You can use whatever asset pipeline you like; just make sure that your final assets are placed in the `templates/` directory.

#### Including Assets in Templates

Access assets using their absolute path from `templates/`. For example, if your main stylesheet is at `templates/css/main.css`, you would load this in your markup with:

    <link rel="stylesheet" href="/css/main.css">
