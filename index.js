const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 500;
const app = express();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.suexuc8.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)

        const myToyCollection = client.db("shashuri").collection("bou");
        const myAddedToysCollection = client.db("jamai").collection("bou");
        
        // await client.connect();    
        
        app.post('/toy', async(req, res) => {
            const toyDetail = req.body;
            console.log(toyDetail);
            const result = await myToyCollection.insertOne(toyDetail);
            res.send(result);
        })

        app.get('/toy', async(req, res) => {
            const toyDetailFromMongo = myToyCollection.find().sort({"name" : -1});
            const result = await toyDetailFromMongo.toArray();
            res.send(result);
        })
        
        app.delete('/toy/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id : new ObjectId(id) };
            const deletedToy = await myToyCollection.deleteOne(query);
            res.send(deletedToy);
        })

        app.post('/addToy', async(req, res) => {
            const addedToy = req.body;
            console.log(addedToy);
            const result = await myAddedToysCollection.insertOne(addedToy);
            res.send(result);
        })

        app.get('/addToy', async(req, res) => {
            const addedToy = myAddedToysCollection.find();
            const result = await addedToy.toArray();
            res.send(result);
        })

        app.delete('/addToy/:id', async(req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) };
            const deleteToy = await myAddedToysCollection.deleteOne(query);
            console.log(deleteToy, id);
            res.send(deleteToy);
        })

        app.put('/addToy/:id', async(req, res) =>{
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const options = {upsert : true};
            const updatedToy = req.body;
            const toy = {
                $set:{
                     ame : updatedToy.ame,
                     mg : updatedToy.mg,
                     ating : updatedToy.ating,
                     rice : updatedToy.rice,
                     uantity : updatedToy.uantity,
                     escription : updatedToy.escription,
                     ategory : updatedToy.ategory,
                     ellerName : updatedToy.ellerName,
                     ellerEmail : updatedToy.ellerEmail
                },
            }
            const result = await myAddedToysCollection.updateOne(filter, toy, options);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged to MongoDB!");
    }

    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log('Server is running on :', port);
})