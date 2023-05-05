[Express](../../express.md)

## Mini Subreddit

1. Install the necessary node modules (express, ejs)
2. Put data.json file in the root directory
3. Require the [json data](#json-data) in the app
4. Create subreddit route and define a path parameter
5. We cannot extract the data from subData(json) with dot(.), thus we have to [use `[]` to access the data](../../../../../Javascript/js.md#accessing-data-out-of-objects).
   > subData = {Object{...},Object{...},Object{...}} . [More explanation](../../../../../Javascript/explanations.md#e3)
6. [Spread](../../../../../Javascript/js.md#spread-in-objects-literals) the `data` Object, so we dont have to write data.name, data.subscribers in ejs. Instead we can just use name, description.

```javascript
const express = require("express");
const path = require("path");
const app = express();

// #3
const subData = require("./data.json");

const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("landing");
});

// #4
app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;

  // #5
  const data = subData[subreddit];
  if (data) {
    // #6
    res.render("subreddit", { ...data });
  } else {
    res.send(`<h1>Subreddit ${subreddit} Does Not Exist</h1>`);
  }
});

app.get("*", (req, res) => {
  res.send("<h1>NOTHING TO SEE HERE</h1>");
});

app.listen(port, () => {
  console.log(`Mini Subreddit on Port ${port}`);
  console.log(subData);
});
```

### JSON data

```json
{
  "soccer": {
    "name": "Soccer",
    "subscribers": 800000,
    "description": "The football subreddit. News, results and discussion about the beautiful game.",
    "posts": [
      {
        "title": "Marten de Roon to make pizza for more than 1,000 people in Bergamo if Atalanta win the Champions league.",
        "author": "joeextreme"
      },
      {
        "title": "Stephan Lichtsteiner has retired from professional football",
        "author": "odd person"
      },
      {
        "title": "OFFICIAL: Dani Parejo signs for Villareal.",
        "author": "joeextreme"
      }
    ]
  },
  "chickens": {
    "name": "Chickens",
    "subscribers": 23956,
    "description": "A place to post your photos, video and questions about chickens!",
    "posts": [
      {
        "title": "Naughty chicken hid under a shed for 3 weeks and came home with 25 chicks today!",
        "author": "joeextreme",
        "img": "https://preview.redd.it/pcn8u4j7c9z61.jpg?width=960&crop=smart&auto=webp&s=e114976dde1108b9556555d2db36a3cb6211798d"
      },
      {
        "title": "Had to kill my first chicken today. Does it get any easier?",
        "author": "sad boi"
      },
      {
        "title": "My five year old chicken set and hatched one baby. I guess she wanted to be a mama one more time.",
        "author": "tammythetiger",
        "img": "https://preview.redd.it/lervkuis3me51.jpg?width=640&crop=smart&auto=webp&s=6a18ab3c4daa80eccf3449217589b922fa443946"
      }
    ]
  },
  "mightyharvest": {
    "name": "Mighty Harvest",
    "subscribers": 44002,
    "description": "Feeding many villages and village idiots for 10s of days.",
    "posts": [
      {
        "title": "My first meyer lemon ripened today. Im so proud of the little guy. Banana for scale",
        "author": "proudmamma",
        "img": "https://preview.redd.it/1bz6we4j54941.jpg?width=640&crop=smart&auto=webp&s=a036ea99299f7737efde9f6c3bfa43893f5eaa00"
      },
      {
        "title": "I think I overestimated the harvest basket size I needed.",
        "author": "grower123",
        "img": "https://preview.redd.it/4h99osd25i351.jpg?width=640&crop=smart&auto=webp&s=d651250a345bbceeba7a66632e8c52a02d71bc73"
      }
    ]
  }
}
```
