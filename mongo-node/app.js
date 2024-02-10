const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'mongo-node';

const client = new MongoClient(url);

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('students');

    // Insert One document
    // try {
    //     const insertOneResult = await collection.insertOne({ 
    //         name: 'Michael',
    //         faculty: 'Physichology',
    //     });
    //     console.log(insertOneResult);
    // } catch (err) {
    //     console.error(err);
    // }

    // Insert Many documents
    // try {
    //     const insertManyResult = await collection.insertMany([
    //         {
    //             name: 'Mark',
    //             faculty: 'Math'
    //         },
    //         {
    //             name: 'William',
    //             faculty: 'Biology'
    //         }
    //     ]);
    //     console.log(insertManyResult);
    // } catch (err) {
    //     console.error(err);
    // }

    // Find One document
    // const findOneResult = await collection.findOne({ name: 'Michael' });
    // console.log(findOneResult);

    // Find Many documents
    // const findManyResult = await collection.find({}).toArray();
    // console.log(findManyResult);

    // Update One document
    // const updateOneResult = await collection.updateOne(
    //     { name: 'Doe' },
    //     { $set: { faculty: 'Business' } }
    // );
    // console.log(updateOneResult);

    // Update Many documents
    // const updateManyResult = await collection.updateMany(
    //     { faculty: 'Computer Science' },
    //     { $set: { faculty: 'Software Engineering' } }
    // );
    // console.log(updateManyResult);

    // Delete One document
    const deleteOneResult = await collection.deleteOne({ name: 'Mark' });
    console.log(deleteOneResult);
    
    return 'done.';
}

main()
.then(console.log)
.catch(console.error)
.finally(() => client.close());