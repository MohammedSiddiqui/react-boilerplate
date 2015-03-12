# React Boilerplate

A boilerplate for use compiling static applications consisting of ES6 source
using Babel and Webpack. Comes pre-configured to use React, React Router, Marty,
Bootstrap, and LESS.

## Build

In order to build the project you will first need to install all necessary node
modules:

```
npm install
```

To build a development version of the project execute:

```
npm run build
```

To build a production version of the project execute:

```
npm run build:production
```

## Development Server

To launch the development server with hot module swap enabled execute:

```
npm run start
```

This will allow you to edit your LESS and React components and immediately see
your changes take place within your browser without having to reload.

## Production vs Development

The Webpack configuration files supplied with React Boilerplate make available
a global `NODE_ENV` variable within the compiled React application. This is done
through the use of the `webpack.DefinePlugin`.

## Project Layout

All source code resides in the *src* directory, the compiled static application
will reside in the *build* directory.

### Initialization

The *src/init.jsx* file configures the application's environment, includes the
application's routes, and runs the React Router on `document.body`.

### Routing

This configuration uses React Router for all routing needs, you must specify
your routes within *src/routes.jsx*.

### React Components

All of the application's React components reside within *src/components*. The
root of *src/components* is meant for the application's route handlers while the
*shared* directory is meant to hold any components that are reused throughout
the application.

### LESS

React Boilerplate is configured to store LESS files alongside the components
they style and to import them using Webpack from within the JSX source. Most
React components that represent a UI element will have a corresponding LESS
file, and shared LESS files are imported and configured within *src/init.less*.

*src/init.less* imports both Bootstrap and it's theme. You may override the
default Bootstrap variables by editing *src/less/variables.less*.

### Marty

Flux is handled by Martyjs in React Boilerplate and it's files reside in
multiple locations; all data stores reside in *src/stores*; all actions reside
in *src/actions*; and all constants reside in *src/constants*.

In this example I use immutable data for my Flux store, but it is not necessary,
if is merely a suggested practice by [Marty](http://martyjs.org/guides/stores/immutable-data-collections.html), feel free to remove this if required.

## License

React Boilerplate is [BSD licensed](./LICENSE).