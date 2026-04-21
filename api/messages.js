import clientPromise from '../src/lib/mongodb.js';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('Batch26');
    const collection = db.collection('wall_messages');

    if (req.method === 'GET') {
      const messages = await collection
        .find({})
        .sort({ created_at: -1 })
        .limit(50)
        .toArray();
      
      return res.status(200).json(messages);
    } 

    if (req.method === 'POST') {
      const { author, message } = req.body;

      if (!author || !message) {
        return res.status(400).json({ error: 'Author and message are required' });
      }

      const newNote = {
        author,
        message,
        created_at: new Date(),
      };

      const result = await collection.insertOne(newNote);
      return res.status(201).json({ ...newNote, id: result.insertedId });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to connect to database' });
  }
}
