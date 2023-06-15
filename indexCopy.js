// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const app = express();
// const port = process.env.PORT || 5000;
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// // middlewire
// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.suexuc8.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     const serviceCollection = client.db('module69').collection('services');
//     const bookingCollection = client.db('module69').collection('bookings');

//     app.get('/services', async (req, res) => {
//       const result = await serviceCollection.find().toArray();
//       res.send(result);
//     })

//     app.get('/services/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       // const options = { projection: { title: 1, price: 1, service_id: 1 }, };
//       const result = await serviceCollection.findOne(query);
//       res.send(result);
//     })

//     app.post('/checkOut', async(req, res) => {
//       const booking = req.body;
//       console.log(booking);
//       const result = await bookingCollection.insertOne(booking);
//       res.send(result);
//     })

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged to MongoDB!");
    
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);



// app.get('/', (req, res) => {
//   res.send('doctor is on dourrrr')
// })

// app.listen(port, () => {
//   console.log(`doctor ${port} e douray`);
// })