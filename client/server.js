// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel

require('dotenv').load();
const express = require('express')
const next = require('next')
const baseURL = process.env.baseURL
const apiPort = parseInt(process.env.apiPort, 10) || 3000
const clientPort = parseInt(process.env.clientPort, 10) || 3001

const devProxy = {
    '/graphql': {
      target: baseURL + ':' + apiPort + '/graphql/',
      pathRewrite: {'^/api': '/'},
      changeOrigin: true
    }
  }


const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
    dir: '.', // base directory where everything is, could move to src later
    dev
})
const handle = app.getRequestHandler()

let server
app
  .prepare()
  .then(() => {
    server = express()

    // Set up the proxy.
    if (dev && devProxy) {
      const proxyMiddleware = require('http-proxy-middleware')
      Object.keys(devProxy).forEach(function (context) {
        server.use(proxyMiddleware(context, devProxy[context]))
      })
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res))

    server.listen(clientPort, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${clientPort} [${env}]`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })