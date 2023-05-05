[**Mongo Data Relationships**](#) || [MongoDB](mongodb.md)

One to Few( two to a hundred)

Store data directly in parent schema.

> model(child schema) stored in Service (parent schema)

```json
[
  {
    _id: ObjectId("6265a2217613198b4afdd0ff"),
    name: 'Air Conditioner Installation',
    price: 20,
    description: 'Complete installation of the ac of your choice',
    model: [
      {
        mName: 'Daikin Air Conditioner Model m-233',
        mPrice: 240,
        mDescription: 'The authentic daikin airconditioner imported directly from the UK',
        _id: ObjectId("6265a2217613198b4afdd100")
      },
      {
        mName: 'Mitsubishi Air Conditioner Model m-929',
        mPrice: 200,
        mDescription: 'The authentic Mitsubishi airconditioner imported directly from Japan',
        _id: ObjectId("6265a7faa55d0b75830fe202")
      }
    ],
    __v: 1
  }
]
```

```javascript
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

const Service = new mongoose.model("Service", serviceSchema);

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

addModel("6265a2217613198b4afdd0ff");
```

---

One to Bejillion

```json
{
    tweetText: 'This might be the one i need`,
    tags: ['hopeful', 'miracle', 'nosurrender', 'nogivingup'],
    user: ObjectId('212123213')
}

```

```json


Request: {
    name: "John Snow",
    email: "uknownth@gmail.com"
    phone: "09912912"
    address: "no 13, road st"
    service:
}


Service - > Request - > Customer

1 Service has 1 or multiple models
1 Request has 1 Service

check request for spam

request pending : {
    make unqiue customer:{
        extract name, email, phone, address from request and make a profile
    }
    (or)
    default customers
}

1 Customer has many Requests



get Service data -> display services -> show service -> (**pass service data with selected model**) make Request


```

```javascript
app.get("/services", (req, res) => {
  const services = Service.findMany({});
  res.render("services", { services });
});

app.get("/services/:id/model", (req, res) => {
  const { id } = req.params;
  const service = Service.findById(id);
  const models = service.model;
  res.render("service-models", { models });
});

app.get("/services/:id&:modelID/request"),
  (res, res) => {
    const { id, modelID } = req.params;
    const service = Service.findById(id);
    const model = service.models.forEach((el) => {
      return el.id === modelID;
    });
    res.render("request", { service }, { model });
  };
```

```json


const serviceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  variants: [
    {
      vname: String,
      vprice: Number,
      vdescription: String,
    },
  ],
});
const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  service: {
    name: {
      type: String,
      required: true,
    },
    vname: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    variantId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    vprice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  description: String,
  note: String,
  cost: Number,
  requestDate: Date,
  confirm: {
    type: Boolean,
    default: false,
  },
});
```
