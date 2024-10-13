const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://root:root@cluster0.anlfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' ,
 ).then(() => console.log("MongoDB Conected"))
 .catch(err => console.log(err));


 const eventRoutes = require('./routes/eventRoutes');
 app.use('/api/events' , eventRoutes);

 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));