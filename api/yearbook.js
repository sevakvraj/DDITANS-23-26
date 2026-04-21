import clientPromise from '../src/lib/mongodb.js';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('Batch26');
    const collection = db.collection('yearbook_messages');

    // GET: Fetch messages for a specific classmate roll number
    if (req.method === 'GET') {
      const { rollNo } = req.query;
      
      if (!rollNo) {
        return res.status(400).json({ error: 'Roll number is required' });
      }

      const messages = await collection
        .find({ rollNo: parseInt(rollNo) })
        .sort({ created_at: -1 })
        .toArray();
      
      return res.status(200).json(messages);
    } 

    // POST: Save a new farewell message
    if (req.method === 'POST') {
      const { rollNo, author, text, nickname } = req.body;

      if (!rollNo || !author || !text) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newMessage = {
        rollNo: parseInt(rollNo),
        author,
        text,
        nickname: nickname || '', // Support for optional nickname
        created_at: new Date(),
      };

      const result = await collection.insertOne(newMessage);
      return res.status(201).json({ ...newMessage, id: result.insertedId });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to connect to database' });
  }
}
