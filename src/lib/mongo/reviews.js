import clientPromise from ".";

let client;
let db;
let reviews;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db("test");
    reviews = await db.collection("reveiws");
  } catch (error) {
    throw new Error("Failed to connect ot db");
  }
}

async () => {
  await init();
};

export async function getReviews() {
  try {
    if (!reviews) await init();
    const result = await reviews
      .find({})
      .limit(20)
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();

    return { reviews: result };
  } catch (error) {
    return { error: "Failed to fetch reviews!!" };
  }
}
