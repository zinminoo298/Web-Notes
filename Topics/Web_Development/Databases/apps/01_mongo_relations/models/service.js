const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/relationDemo")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

const serviceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  model: [
    {
      mName: String,
      mPrice: Number,
      mDescription: String,
    },
  ],
});

const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
});

const Service = new mongoose.model("Service", serviceSchema);
const Request = new mongoose.model("Request", requestSchema);

const makeService = async () => {
  const service = new Service({
    name: "Air Conditioner Installation",
    price: 20,
    description: "Complete installation of the ac of your choice",
    model: [
      {
        mName: "Daikin Air Conditioner Model m-233",
        mPrice: 240,
        mDescription:
          "The authentic daikin airconditioner imported directly from the UK",
      },
    ],
  });
  const res = await service.save();
  console.log(res);
};

const addModel = async (id) => {
  const service = await Service.findById(id);
  service.model.push({
    mName: "Mitsubishi Air Conditioner Model m-929",
    mPrice: 200,
    mDescription:
      "The authentic Mitsubishi airconditioner imported directly from Japan",
  });
  const res = await service.save();
  console.log(res);
};

const makeRequest = async () => {
  const service = await Service.findOne({
    name: "Air Conditioner Installation",
  });
  const newRequest = new Request({
    name: "Pyae Sone",
    email: "pst@gmail.com",
  });

  newRequest.service = service;
  const res = await newRequest.save();
  console.log(res);
};

// makeRequest();

const findRequest = async (id) => {
  const foundRequest = await Request.findById(id).populate("service");
  console.log(foundRequest.service);
};

findRequest("6265c12a972f18a1e69a9b11");

// Model.find().populate({
//   path: "users",
//   populate: [
//     { path: "Hobbies" },
//     {
//       path: "Football",
//       populate: {
//         path: "favouritePlayers",
//         populate: "playerNames",
//       },
//     },
//   ],
// });
