const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() =>{
  console.log('connected to database');
}).catch((e) =>{
  console.log(e);
  console.log('failed connected to database');
});

