const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/relationDemo")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = new mongoose.model("User", userSchema);
const Tweet = new mongoose.model("Tweet", tweetSchema);

const makeUser = async () => {
  const user = new User({
    username: "GooxBump",
    age: 23,
  });
  const res = await user.save();
  console.log(user);
};

const makeTweet = async () => {
  //   await makeUser();
  const foundUser = await User.findOne({ name: "GooxBump" });
  const tweet = new Tweet({
    text: "This is so damn exhausting",
    likes: 0,
  });
  tweet.user = foundUser;
  const res = tweet.save();
  console.log(res);
};

// makeTweet();

const findTweet = async () => {
  const foundTweet = await Tweet.findOne({}).populate("user", "username");
  console.log(foundTweet);
};

findTweet();
