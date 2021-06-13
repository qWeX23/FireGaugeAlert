

module.exports = async function (context, req) {
  const MongoClient = require('mongodb').MongoClient;
  const uri = process.env["Mongo"]
  const client = new MongoClient(uri);

  await client.connect();
  const db = client.db("fireGauge");
  const levelCol = db.collection("level");

  const level = await levelCol.findOne({});
  const ass = level["level"];
  context.res = {
    body: { "level": level["level"] }
  }

}