const express = require('express');
const Sentry = require('@sentry/node');
const cors= require('cors');
const app =express();
const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://node_dev:rhino_dev@node-userauth-cluster.emumq.mongodb.net/<dbname>?retryWrites=true&w=majority',
{ useUnifiedTopology: true },()=>{
  console.log("Database connected");
});

Sentry.init({ dsn: 'https://21929be9396f4964b992d711c4269de7@o424182.ingest.sentry.io/5371900',
release: 'my-test-project@' + process.env.npm_package_version });


//Import Routes
const authRoute=require('./routes/auth');






//Middleware
app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(express.json());

//Route Middlewares
app.get('/', function rootHandler(req, res) {
  res.end('Hello world!');
});
app.use('/user',authRoute);
// throw new Error("my-error");




app.use(Sentry.Handlers.errorHandler());
app.listen(3000,()=>{
    console.log("Server Up and Running");
});