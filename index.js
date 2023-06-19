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
                    name : updatedToy.ame,
                    img : updatedToy.mg,
                    rating : updatedToy.ating,
                    price : updatedToy.rice,
                    quantity : updatedToy.uantity,
                    description : updatedToy.escription,
                    category : updatedToy.ategory,
                    sellerName : updatedToy.ellerName,
                    sellerEmail : updatedToy.ellerEmail
                },
            }
            const result = await myAddedToysCollection.updateOne(filter, toy, options);
            res.send(result);
        })
        
            app.get('/allToy', async(req, res) => {
                res.send([
                    {   
                        "serial": 1,
                        "name": "Arcee",
                        "img": "https://i.ibb.co/L9KtqDN/arcee.jpg" ,
                        "price":  "$ 87",
                        "quantity":  45,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 2,
                        "name": "Arcee",
                        "img": "https://i.ibb.co/C5CDLLM/arcee2.jpg" ,
                        "price":  "$ 84",
                        "quantity":  345,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 3,
                        "name": "Arcee",
                        "img": "https://i.ibb.co/KyWgrWD/arcee3.webp" ,
                        "price":  "$ 89",
                        "quantity":  34,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 4,
                        "name": "Blackarachnia",
                        "img": "https://i.ibb.co/k8vMvNM/blackarachnia1.jpg" ,
                        "price":  "$ 54",
                        "quantity":  34,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4.2,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 5,
                        "name": "Blackarachnia",
                        "img": "https://i.ibb.co/VJfsJYm/blackarachnia2.jpg" ,
                        "price":  "$ 23",
                        "quantity":  43,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4.2,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 6,
                        "name": "Blackarachnia",
                        "img": "https://i.ibb.co/pvbnksH/blackarachnia3.jpg" ,
                        "price":  "$ 34",
                        "quantity":  42,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4.2,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 7,
                        "name": "Bumblebee",
                        "img": "https://i.ibb.co/c1xrLm2/bumblebee1.jpg" ,
                        "price":  "$ 34",
                        "quantity":  34,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 8,
                        "name": "Bumblebee",
                        "img": "https://i.ibb.co/8ctwTzC/bumblebee2.jpg" ,
                        "price":  "$ 43",
                        "quantity":  122,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4.4,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 9,
                        "name": "Bumblebee",
                        "img": "https://i.ibb.co/Zfkq2QZ/bumblebee3.jpg" ,
                        "price":  "$ 43",
                        "quantity":  56,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4.4,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 10,
                        "name": "Cliffjumper",
                        "img": "https://i.ibb.co/pPXrDyQ/cliffjjumper1.jpg" ,
                        "price":  "$ 67",
                        "quantity":  45,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.2 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 11,
                        "name": "Cliffjumper",
                        "img": "https://i.ibb.co/998Y6yB/cliffjjumper2.webp" ,
                        "price":  "$ 67",
                        "quantity": 567 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  3.2,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 12,
                        "name": "Cliffjumper",
                        "img": "https://i.ibb.co/LhxDTtc/cliffjjumper3.jpg" ,
                        "price":  "$ 67",
                        "quantity":  112,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  3.2,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 13,
                        "name": "Cyclonous",
                        "img": "https://i.ibb.co/3z3s9G4/cyclonous.jpg" ,
                        "price":  "$ 54",
                        "quantity":  32,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.2 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 14,
                        "name": "Cyclonous",
                        "img": "https://i.ibb.co/Dkfwc0D/cyclonous2.webp" ,
                        "price":  "$ 45",
                        "quantity":  34,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4.2,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 15,
                        "name": "Cyclonous",
                        "img": "https://i.ibb.co/bP6ZS4X/cyclonous3.webp" ,
                        "price":  "$ 61",
                        "quantity":  32,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4.2,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 16,
                        "name": "Grimlock",
                        "img": "https://i.ibb.co/G3cWXpZ/grimlock.webp" ,
                        "price":  "$ 48",
                        "quantity":  37,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 17,
                        "name": "Grimlock",
                        "img": "https://i.ibb.co/tJnnyjY/grimlock2.jpg" ,
                        "price":  "$ 45",
                        "quantity": 67 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  3.8,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 18,
                        "name": "Grimlock",
                        "img": "https://i.ibb.co/pW3gd6T/grimlock3.webp" ,
                        "price":  "$ 52",
                        "quantity":  99,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 19,
                        "name": "Chromia",
                        "img": "https://i.ibb.co/XVvDsfD/chromia1.jpg" ,
                        "price":  "$ 76",
                        "quantity":  34,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 20,
                        "name": "Chromia",
                        "img": "https://i.ibb.co/bRh3bnQ/chromia2.webp" ,
                        "price":  "$ 26",
                        "quantity":  85,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 21,
                        "name": "Chromia",
                        "img": "https://i.ibb.co/z8FbZrY/chromia3.jpg" ,
                        "price":  "$ 75",
                        "quantity":  72,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 22,
                        "name": "Greenlight",
                        "img": "https://i.ibb.co/R2bVwbp/greenlight.jpg" ,
                        "price":  "$ 67",
                        "quantity":  61,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 23,
                        "name": "Greenlight",
                        "img": "https://i.ibb.co/Hg5VJ3d/greenlight2.jpg" ,
                        "price":  "$ 95",
                        "quantity": 36 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 24,
                        "name": "Greenlight",
                        "img": "https://i.ibb.co/5YyK25b/greenlight3.jpg" ,
                        "price":  "$ 83",
                        "quantity":  45,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 25,
                        "name": "HotRod",
                        "img": "https://i.ibb.co/J2Hvt15/hotRod.jpg" ,
                        "price":  "$ 48",
                        "quantity":  83,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating":  4.1,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 26,
                        "name": "HotRod",
                        "img": "https://i.ibb.co/PcQbwdN/hotRod2.jpg" ,
                        "price":  "$ 29",
                        "quantity":  423,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.1 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 27,
                        "name": "HotRod",
                        "img": "https://i.ibb.co/KyhZDVg/hotRod3.jpg" ,
                        "price":  "$ 27",
                        "quantity":  45,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.1 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 28,
                        "name": "Ironhide",
                        "img": "https://i.ibb.co/6sZSNmH/ironhide.webp" ,
                        "price":  "$ 34",
                        "quantity":  67,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 29,
                        "name": "Ironhide",
                        "img": "https://i.ibb.co/zRsTYrz/ironhide2.jpg" ,
                        "price":  "$ 26",
                        "quantity": 23 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 30,
                        "name": "Ironhide",
                        "img": "https://i.ibb.co/1J2BXnh/ironhide3.jpg" ,
                        "price":  "$ 85",
                        "quantity": 132 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 31,
                        "name": "Jazz",
                        "img": "https://i.ibb.co/4WRL8Cv/jazz.jpg" ,
                        "price":  "$ 78",
                        "quantity": 43 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.9 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 32,
                        "name": "Jazz",
                        "img": "https://i.ibb.co/fCPmbgd/jazz2.jpg" ,
                        "price":  "$ 63",
                        "quantity": 40 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.9 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 33,
                        "name": "Jazz",
                        "img": "https://i.ibb.co/8j115HB/jazz3.jpg" ,
                        "price":  "$ 32",
                        "quantity":  98,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.9 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 34,
                        "name": "Jetfire",
                        "img": "https://i.ibb.co/yWD9KDy/jetfire.jpg" ,
                        "price":  "$ 77",
                        "quantity": 234 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.5 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 35,
                        "name": "Jetfire",
                        "img": "https://i.ibb.co/yNFt2Hr/jetfire3.webp" ,
                        "price":  "$ 43",
                        "quantity": 77 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.5 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 36,
                        "name": "Jetfire",
                        "img": "https://i.ibb.co/J3vk6JC/jetfire2.jpg" ,
                        "price":  "$ 88",
                        "quantity": 33 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.5 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 37,
                        "name": "Lancer",
                        "img": "https://i.ibb.co/CwN648w/lancer.jpg" ,
                        "price":  "$ 44",
                        "quantity":  12,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 38,
                        "name": "Lancer",
                        "img": "https://i.ibb.co/7rtVr4B/lancer2.jpg" ,
                        "price":  "$ 74",
                        "quantity": 33 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMELE"
                    },
                    {   
                        "serial": 39,
                        "name": "Lancer",
                        "img": "https://i.ibb.co/vXn5NhP/lancer3.webp" ,
                        "price":  "$ 32",
                        "quantity": 44 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 40,
                        "name": "Megatron",
                        "img": "https://i.ibb.co/rM72bZd/megatron1.jpg" ,
                        "price":  "$ 92",
                        "quantity": 35 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 41,
                        "name": "Megatron",
                        "img": "https://i.ibb.co/LnTRB1d/megatron2.jpg" ,
                        "price":  "$ 45",
                        "quantity": 64 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 42,
                        "name": "Megatron",
                        "img": "https://i.ibb.co/DzmShpv/megatron3.webp" ,
                        "price":  "$ 36",
                        "quantity": 46 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 43,
                        "name": "Mirage",
                        "img": "https://i.ibb.co/6H7K8n7/mirage.jpg" ,
                        "price":  "$ 22",
                        "quantity": 32 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.7 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 44,
                        "name": "Mirage",
                        "img": "https://i.ibb.co/Wpm4zDk/mirage2.webp" ,
                        "price":  "$ 22",
                        "quantity": 43 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.7 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 45,
                        "name": "Mirage",
                        "img": "https://i.ibb.co/yXWzKgz/mirage3.webp" ,
                        "price":  "$ 25",
                        "quantity": 64 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.7 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 46,
                        "name": "Moonracer",
                        "img": "https://i.ibb.co/XymqwsN/moonracer.jpg" ,
                        "price":  "$ 89",
                        "quantity": 74 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE" 
                    },
                    {   
                        "serial": 47,
                        "name": "Moonracer",
                        "img": "https://i.ibb.co/BBMzvrq/moonracer2.jpg" ,
                        "price":  "$ 34",
                        "quantity": 78 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 48,
                        "name": "Moonracer",
                        "img": "https://i.ibb.co/CbVgj4N/moonracer3.jpg" ,
                        "price":  "$ 22",
                        "quantity": 77 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 49,
                        "name": "Novastar",
                        "img": "https://i.ibb.co/YT3fxXw/novastar.jpg" ,
                        "price":  "$ 36",
                        "quantity": 43 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 2.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 50,
                        "name": "Novastar",
                        "img": "https://i.ibb.co/VDFvQGS/novastar2.jpg" ,
                        "price":  "$ 36",
                        "quantity": 77 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 2.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 51,
                        "name": "Novastar",
                        "img": "https://i.ibb.co/6v3fv2n/novastar3.webp" ,
                        "price":  "$ 53",
                        "quantity": 67 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 2.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 52,
                        "name": "Optimus_Prime",
                        "img": "https://i.ibb.co/QNVrvmx/Opotimus-Prime.jpg" ,
                        "price":  "$ 77",
                        "quantity": 47 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 53,
                        "name": "Optimus_Prime",
                        "img": "https://i.ibb.co/ZNch2M1/Opotimus-Prime2.jpg" ,
                        "price":  "$ 88",
                        "quantity": 45 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 54,
                        "name": "Optimus_Prime",
                        "img": "https://i.ibb.co/RYL9HS7/optimus-Prime3.jpg" ,
                        "price":  "$ 77",
                        "quantity": 44 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4.8 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 55,
                        "name": "Perceptor",
                        "img": "https://i.ibb.co/pzNsjv8/perceptor.jpg" ,
                        "price":  "$ 44",
                        "quantity": 67 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 56,
                        "name": "Perceptor",
                        "img": "https://i.ibb.co/P5FVdqX/perceptor3.jpg" ,
                        "price":  "$ 66",
                        "quantity": 45 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 57,
                        "name": "Perceptor",
                        "img": "https://i.ibb.co/Dg5F7fH/perceptor2.jpg" ,
                        "price":  "$ 64",
                        "quantity": 34 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 58,
                        "name": "Prowl",
                        "img": "https://i.ibb.co/9pPKPpq/prowl.webp" ,
                        "price":  "$ 34",
                        "quantity": 34 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 59,
                        "name": "Prowl",
                        "img": "https://i.ibb.co/mzN3VQR/prowl2.webp" ,
                        "price":  "$ 33",
                        "quantity": 88 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 60,
                        "name": "Prowl",
                        "img": "https://i.ibb.co/p4W3pgv/prowl3.jpg" ,
                        "price":  "$ 33",
                        "quantity": 66 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 61,
                        "name": "Ratchet",
                        "img": "https://i.ibb.co/JFN71F7/ratchet3.jpg" ,
                        "price":  "$ 54",
                        "quantity": 76 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 62,
                        "name": "Ratchet",
                        "img": "https://i.ibb.co/6P3b613/ratchet2.webp" ,
                        "price":  "$ 66",
                        "quantity": 64 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 63,
                        "name": "Ratchet",
                        "img": "https://i.ibb.co/L0M3WKK/ratchet.webp" ,
                        "price":  "$ 22",
                        "quantity": 54 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 64,
                        "name": "Shockwave",
                        "img": "https://i.ibb.co/85JnK4X/shockwave.jpg" ,
                        "price":  "$ 22",
                        "quantity": 667 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 65,
                        "name": "Shockwave",
                        "img": "https://i.ibb.co/ZMQJvqT/shockwave3.png" ,
                        "price":  "$ 55",
                        "quantity": 55 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 66,
                        "name": "Shockwave",
                        "img": "https://i.ibb.co/9v5KzRb/shockwave2.webp" ,
                        "price":  "$ 47",
                        "quantity": 45 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 67,
                        "name": "Sideswipe",
                        "img": "https://i.ibb.co/N2Rz4YY/sideswipe2.jpg" ,
                        "price":  "$ 34",
                        "quantity": 37 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 68,
                        "name": "Sideswipe",
                        "img": "https://i.ibb.co/pjmW5Rk/sideswipe3.jpg" ,
                        "price":  "$ 77",
                        "quantity": 45 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 69,
                        "name": "Sideswipe",
                        "img": "https://i.ibb.co/nzn7w3D/sideswipe1.jpg" ,
                        "price":  "$ 45",
                        "quantity": 45 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 70,
                        "name": "Soundwave",
                        "img": "https://i.ibb.co/HzyfLZP/soundwave1.jpg" ,
                        "price":  "$ 68",
                        "quantity": 56 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 71,
                        "name": "Soundwave",
                        "img": "https://i.ibb.co/4R61Hm9/soundwave2.jpg" ,
                        "price":  "$ 37",
                        "quantity":  55,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 72,
                        "name": "Soundwave",
                        "img": "https://i.ibb.co/zPWR7XN/soundwave3.jpg" ,
                        "price":  "$ 74",
                        "quantity": 35 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 73,
                        "name": "Starscream",
                        "img": "https://i.ibb.co/cN7jZfx/starscream2.webp" ,
                        "price":  "$ 73",
                        "quantity": 35 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 74,
                        "name": "Starscream",
                        "img": "https://i.ibb.co/M1128sk/starscream.jpg" ,
                        "price":  "$ 36",
                        "quantity": 45 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 75,
                        "name": "Starscream",
                        "img": "https://i.ibb.co/R9j31Yx/starscream3.webp" ,
                        "price":  "$ 76",
                        "quantity": 34 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 76,
                        "name": "Ultra_Magnus",
                        "img": "https://i.ibb.co/QbH9mL2/ultra-Magnus2.webp" ,
                        "price":  "$ 66",
                        "quantity": 44 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 77,
                        "name": "Ultra_Magnus",
                        "img": "https://i.ibb.co/rcS3v2h/ultra-Magnus.webp" ,
                        "price":  "$ 67",
                        "quantity": 62 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 78,
                        "name": "Ultra_Magnus",
                        "img": "https://i.ibb.co/BrdCft3/ultra-Magnus3.jpg" ,
                        "price":  "$ 26",
                        "quantity": 42 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 4 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "FEMALE"
                    },
                    {   
                        "serial": 79,
                        "name": "Wheeljack",
                        "img": "https://i.ibb.co/9W0dYTL/wheeljack2.webp" ,
                        "price":  "$ 75",
                        "quantity": 353 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.6 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 80,
                        "name": "Wheeljack",
                        "img": "https://i.ibb.co/LJ8qpL7/wheeljack.webp" ,
                        "price":  "$ 65",
                        "quantity": 53 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.6 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    },
                    {   
                        "serial": 81,
                        "name": "Wheeljack",
                        "img": "https://i.ibb.co/jLzSvNJ/wheeljack3.jpg" ,
                        "price":  "$ 73",
                        "quantity": 35 ,
                        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quas illum alias magnam necessitatibus, quasi accusamus? Inventore officia recusandae deleniti maxime enim quia, quae placeat excepturi vel mollitia beatae modi sapiente quod perferendis corrupti ex molestias distinctio dolores laboriosam et officiis est, explicabo laborum! Impedit excepturi recusandae itaque rem animi.",
                        "rating": 3.6 ,
                        "seller_name": "N/A" ,
                        "seller_email": "N/A" ,
                        "sub_category": "MALE"
                    }
                ]);
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