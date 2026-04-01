import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import { MongoClient } from 'mongodb';

// const uri = 'mongodb+srv://Vercel-Admin-yipDB:V2nm2OCdZMw8RMrI@yipdb.mnyosk9.mongodb.net/?retryWrites=true&w=majority&appName=yipDB';
const uri = "mongodb://Vercel-Admin-yipDB:V2nm2OCdZMw8RMrI@ac-zswjo8n-shard-00-00.mnyosk9.mongodb.net:27017,ac-zswjo8n-shard-00-01.mnyosk9.mongodb.net:27017,ac-zswjo8n-shard-00-02.mnyosk9.mongodb.net:27017/?ssl=true&replicaSet=atlas-zt8s2f-shard-0&authSource=admin&appName=yipDB"
try {
  const client = new MongoClient(uri);
  await client.connect();
  console.log('연결 성공!');
  await client.close();
} catch (e) {
  console.error('에러:', e.message);
  console.error('전체:', e);
}
