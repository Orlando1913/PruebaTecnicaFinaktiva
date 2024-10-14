const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://root:root@cluster0.anlfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' ,
 ).then(() => console.log("MongoDB Conected"))
 .catch(err => console.log(err));


 const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API for Event Log Application',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

 const eventRoutes = require('./routes/eventRoutes');
 app.use('/api/events' , eventRoutes);

 const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});