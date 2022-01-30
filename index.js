const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.845tn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("Doctors-appoinments");
        const usersDetails = database.collection("users-details");
        const doctorsDetails = database.collection("doctors-details");
        const patientsDetails = database.collection("patients-details");
        const patientsAppoinments = database.collection("patients-appoinments");
        const patientsReviews = database.collection("patients-reviews");

        //all users
        app.post('/users', async (req, res) => {
            const usersData = req.body;
            const result = await usersDetails.insertOne(usersData);
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);
        });

        app.get('/users', async (req, res) => {
            const cursor = usersDetails.find({});
            const result = await cursor.toArray();
            res.json(result);
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        });

        //all doctors contact-details
        app.post('/doctors-contact-details', async (req, res) => {
            const usersData = req.body;
            const result = await doctorsDetails.insertOne(usersData);
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);
        });




        //all patients contact-details
        app.post('/patients-contact-details', async (req, res) => {
            const usersData = req.body;
            const result = await patientsDetails.insertOne(usersData);
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);
        });


        //all patients appoinments details
        app.post('/patients-appoinments', async (req, res) => {
            const usersData = req.body;
            const result = await patientsAppoinments.insertOne(usersData);
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);
        });

        app.get('/patients-appoinments', async (req, res) => {
            const cursor = patientsAppoinments.find({});
            const result = await cursor.toArray();
            res.json(result);
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        });

        app.post('/patients-reviews', async (req, res) => {
            const usersData = req.body;
            const result = await patientsReviews.insertOne(usersData);
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);
        });
        app.get('/patients-reviews', async (req, res) => {
            const cursor = patientsReviews.find({});
            const result = await cursor.toArray();
            res.json(result);
        });



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Node js, This is doctors appoinment project');
});

app.listen(port, () => {
    console.log('listening to port', port);
})
