## Isomorphic/Universal/Client+Server JavaScript web app
##### - built with Node & Express & Director & Handlebars & JSDOM - proof of concept -

### features

- runs on both sides by sharing application code with the server and the client
- implements a basic MVC pattern
  - sample controllers (index, details, 404 page)
  - sample data service (sampleItem)
  - sample Handlebars views for the controllers
- basic routing for both client and server side by wrapping the Director client/server router
- basic gulpfile to tie things together

### requirements

- node.js
- express.js v4
- gulp

### usage

1. install components 
    ```
    $ npm i
    ```
2. start server
    ```
    $ gulp server
    ```
3. in the browser open: http://localhost:8000
