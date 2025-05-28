// icecream-api/swagger.js
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './docs/swagger_output.json';
const endpointsFiles = ['./routes/iceCreamRoutes.js', './routes/flavorRoutes.js'];

const doc = {
  info: {
    title: 'Ice Cream Shop API',
    description: 'API for managing ice creams and flavors in an ice cream shop.'
  },
  host: 'localhost:5500', // Adjust this when deploying to Render
  schemes: ['http'], // Use 'https' when deploying to Render
  // >>>>>>> ADD THIS LINE <<<<<<<
  basePath: '/api', // This tells Swagger that all your API routes start with /api
  tags: [
    { name: 'IceCreams', description: 'Operations about ice creams' },
    { name: 'Flavors', description: 'Operations about flavors' }
  ],
  definitions: {
    IceCream: {
      name: 'Vanilla Bean',
      flavor: '60d5ec49e4d0f62d1c8c4567', // Example ID, replace with a real flavor ID
      description: 'Classic vanilla ice cream with real vanilla beans.',
      price: 4.99,
      inStock: true,
      caloriesPerServing: 250,
      allergens: ['Dairy', 'Eggs']
    },
    Flavor: {
      name: 'Vanilla',
      description: 'Sweet and creamy classic vanilla flavor.'
    },
    NewIceCream: { // Example for POST body
      name: 'Chocolate Fudge',
      flavor: '60d5ec49e4d0f62d1c8c4568',
      description: 'Rich chocolate ice cream with fudge swirls.',
      price: 5.50,
      inStock: true,
      caloriesPerServing: 300,
      allergens: ['Dairy']
    },
    NewFlavor: { // Example for POST body
      name: 'Strawberry',
      description: 'Sweet and tangy strawberry flavor.'
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js'); // This will start your server after swagger doc is generated
});