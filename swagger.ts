
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './src/routes/index.ts'
]; // root file where the route starts.

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./src/server.ts');    // Your project's root file
})