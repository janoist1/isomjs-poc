## Isomorphic/Universal/Client+Server JavaScript web app
##### - built with Node & Express & Director & Handlebars & JSDOM - proof of concept -

### features

- runs on both server and client side
- implements a basic MVC pattern
  - sample controllers (index, details, 404 page)
  - sample data service (sampleItem)
  - sample Handlebars views for the controllers
- basic routing for both client and server side by wrapping the Director client/server router
- basic gulpfile to tie things together

### requirements

express.js v4

### usage

1. run 
    ```
    $ gulp server
    ```
2. in the browser open: http://localhost:8000
