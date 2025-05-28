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

console.log('Starting Swagger documentation generation...'); // Add this line
console.log('Output file:', outputFile); // Add this line
console.log('Endpoint files:', endpointsFiles); // Add this line

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generation process completed. Checking output file...'); // Add this line
    // You might need to add a small delay here if file writing is asynchronous
    // but the .then() should indicate it's done.

    // A simple check if the file is generated with content (optional, but good for debugging)
    const fs = require('fs');
    if (fs.existsSync(outputFile)) {
        const content = fs.readFileSync(outputFile, 'utf8');
        console.log('Content of swagger_output.json (first 200 chars):', content.substring(0, 200));
        if (content.includes('/icecreams')) {
            console.log('SUCCESS: /icecreams path found in generated JSON!');
        } else {
            console.error('WARNING: /icecreams path NOT found in generated JSON, despite "Success" message.');
        }
    } else {
        console.error('ERROR: swagger_output.json file was not found after generation.');
    }

    require('./server.js'); // This will start your server after swagger doc is generated
  })
  .catch(err => {
    console.error('ERROR during Swagger documentation generation:', err); // Add this line
    process.exit(1); // Exit if generation fails
  });