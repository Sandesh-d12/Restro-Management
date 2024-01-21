const { connectToDatabase, client } = require('./config');

async function example() {
  try {
    await connectToDatabase();

    // Your CRUD operations using the 'client' object
    const database = client.db();
    const collection = database.collection('formik');

    // Insert a document
    await collection.insertOne({ name: 'John Doe', age: 30 });

    // Find documents
    const documents = await collection.find({}).toArray();
    console.log('Documents:', documents);

    // Update a document
    await collection.updateOne({ name: 'John Doe' }, { $set: { age: 31 } });

    // Delete a document
    await collection.deleteOne({ name: 'John Doe' });

    console.log('MongoDB CRUD operations completed successfully.');
  } catch (error) {
    console.error('Error performing MongoDB CRUD operations:', error);
  } finally {
    // Close the connection when done
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Run the CRUD operations
example();