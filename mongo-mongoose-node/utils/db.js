const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-node', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
});

// Add one data
/*
const contact1 = new Contact({
    name: 'John',
    phone: '08123456789',
    email: 'john@gmail.com'
});
*/

// Save to collection
/*
contact1.save().then((contact) => console.log(contact));
*/