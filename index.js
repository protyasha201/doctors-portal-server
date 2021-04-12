const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const port = 5000;

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ywip5.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const appointmentsCollection = client.db("DoctorsPortal").collection("appointments");
  
  app.post('/addAppointment', (req, res) => {
      const appointments = req.body;
      
      appointmentsCollection.insertOne(appointments)
      .then(result => {
          res.send(result.insertedCount > 0);
      })
      .catch(err => {
          console.log(err);
      })
  })
//   client.close();
});



app.listen(process.env.PORT || port)