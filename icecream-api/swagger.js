
// icecream-api/swagger.js
const swaggerAutogen = require('swagger-autogen')();
const path = require('path'); // Add path module

const outputFile = './docs/swagger_output.json';
// Use a more explicit path for endpointsFiles
const endpointsFiles = [
    path.resolve(__dirname, './routes/iceCreamRoutes.js'),
    path.resolve(__dirname, './routes/flavorRoutes.js')
];

const doc = {
    info: {
        title: 'Ice Cream Shop API',
        description: 'API for managing ice creams and flavors in an ice cream shop.'
    },
    host: 'localhost:5500',
    schemes: ['http'],
    basePath: '/api',
    tags: [
        { name: 'IceCreams', description: 'Operations about ice creams' },
        { name: 'Flavors', description: 'Operations about flavors' }
    ],
    definitions: {
        IceCream: {
            name: 'Vanilla Bean',
            flavor: '60d5ec49e4d0f62d1c8c4567',
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
        NewIceCream: {
            name: 'Chocolate Fudge',
            flavor: '60d5ec49e4d0f62d1c8c4568',
            description: 'Rich chocolate ice cream with fudge swirls.',
            price: 5.50,
            inStock: true,
            caloriesPerServing: 300,
            allergens: ['Dairy']
        },
        NewFlavor: {
            name: 'Strawberry',
            description: 'Sweet and tangy strawberry flavor.'
        }
    }
};

console.log('Starting Swagger documentation generation...');
console.log('Output file:', outputFile);
console.log('Endpoint files (resolved paths):', endpointsFiles); // Log resolved paths

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generation process completed. Checking output file...');
    const fs = require('fs');
    if (fs.existsSync(outputFile)) {
        const content = fs.readFileSync(outputFile, 'utf8');
        console.log('Content of swagger_output.json (first 500 chars):', content.substring(0, 500)); // Increased chars
        if (content.includes('/icecreams') && content.includes('/flavors')) {
            console.log('SUCCESS: All expected paths found in generated JSON!');
        } else {
            console.error('WARNING: Expected paths NOT found in generated JSON, despite "Success" message.');
        }
    } else {
        console.error('ERROR: swagger_output.json file was not found after generation.');
    }
    require('./server.js');
  })
  .catch(err => {
    console.error('ERROR during Swagger documentation generation:', err);
    process.exit(1);
  });