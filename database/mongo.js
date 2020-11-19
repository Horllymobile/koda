const mongoose = require('mongoose');

module.exports = async function() {
    try {
        const con = await mongoose.connect('mongodb://localhost/koda',
        {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true});
        if(con){
            console.log('Connected');
        }
    } catch (error) {
        console.log(error.message);
    }
}