# spring-react-boilerplate

An example application that uses a Spring Java backend with a REST React
frontend.

## Another Boilerplate?

It's inspired by the
[spring-react-boilerplate](https://github.com/pugnascotia/spring-react-boilerplate)
project, but uses:

- node 7.4.0
- [create-react-app](https://github.com/facebookincubator/create-react-app) to create the react app with no build configuration. Supports: webpack to bundle all the
  JavaScript and dependencies, plus babel, LESS + CSS, eslint and hot module reloading handling.
- [Redux](https://github.com/rackt/redux) to manage state, both in the
  client and when rendering on the server.
- [react-router](https://github.com/rackt/react-router) for page routing,
  on client and server. Note that this is version 4, with a very different (and
  simpler) API to previous versions.

## Other Goodies

You also get:

- [Jackson](https://github.com/FasterXML/jackson) to serialize model data
  before rendering on the server. For more information, see
  [this OpenJDK thread on the subject](http://mail.openjdk.java.net/pipermail/nashorn-dev/2013-September/002006.html),
  but summary is Nashorn won't (and actually can't) string-ify POJOs via
  `JSON.stringify`, meaning it can't be used to serialise the Redux state.

## Caveats

This isn't necessarily the best way to write a React application. Pull requests welcome!

## Running the code

Execute `mvn` if you have Maven already installed, or `./mvnw` if you don't. You'll need
[Java8 installed](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) either way at
a minimum version of `1.8.0_65`. Older versions have a bug that makes rendering
brutally slow.

Run Webpack in hot-module reloading mode with: `npm start`.

## Conventions

Controllers that render views are suffixed with `Controller`. REST endpoints are
suffixed with `Resource`, and handle requests under `/api`.
