[**MongoDB**](mongodb.md) || [Mongo Data Relationships](./mongo-data-relationships.md)|| [Mongoose](../node.js/frameworks_and_libraries/Express/mongoose.md) || [Express](../node.js/frameworks_and_libraries/Express/express.md)

## Mongo DB

1. [Installation](#installation-on-windows)
2. [JSON - BSON ?](#bson)
3. [Mongo Shell](#mongo-shell)
   - [Create database](#making-database)
   - [Insert document](#insert-document)
   - [Find document](#finding-with-mongo)
   - [Update document](#updating-with-mongo)
   - [Delete document](#mongo-delete)

### Installation on Windows

1.  Download the mongo installation package from community server - [link](https://www.mongodb.com/try/download/community)
2.  Installation steps
    - Choose custom
    - Change the root folder into C:\Mongodb
    - Untick the service (since we want to start mongo by ourself)
    - Can leave out the mongo compass. (save you space and installation time)
    - After the installation, create data/db dir where mongo data will live. C:\data\db
    - Then go to C:\Mongodb folder or where you choose to install the mongodb.
    - Go to bin - C:\MongoDB\bin expected path
    - copy the path to bin - C:\MongoDB\bin
    - Open up the - Edit the system enviroment variable
    - Open Enviroment variables
    - Under System Variables; find path and select it, then edit.
    - New - paste the path -C:\MongoDB\bin
    - Now we can access mongo and mongod from anywhere in our computer
3.  After following the steps above, you can now **start mongo server** by typing **mongod** in powershell or git bash and let it run.
    ```termnial
    $mongod
    ```
4.  Then we can open up another git bash or powershell and type **mongo** to **acess mongo shell**.

        ```terminal
        $mongo
        > show dbs
        admin   0.000GB
        config  0.000GB
        local   0.000GB
        >
        ```

> Remember to run mongo server first with mongod.

---

### BSON

##### [Start](#)

<br>

JSON and BSON are close cousins, as their nearly identical names imply, but you wouldn’t know it by looking at them side-by-side.

JSON's ubiquity made it obivious choice for representing data structures in MongoDB's [document data model](https://www.mongodb.com/document-databases).

However, there are several issues that make JSON less than ideal for usage inside of a database.

1. JSON is a text-based format, and text parsing is very slow.
2. JSON’s readable format is far from space-efficient, another database concern
3. JSON only supports a limited number of basic data types

**BSON** simply stands for "Binary JSON" and it is a more compact version of JSON.

1. Parsed more quickly.
2. Extended to add some optional non-JSON-native data types, like dates and binary data.
3. Allows for comparisons and calculations to happen directly on data in ways that simplify consuming application code.

|      | Encoding     | Data Support                                                                     | Readability     |
| ---- | ------------ | -------------------------------------------------------------------------------- | --------------- |
| JSON | UTF-8 String | String, Boolean, Number, Array                                                   | Machine & Human |
| BSON | Binary       | String, Boolean, Number(int, float, long, decimal128...)Array, Date, Raw, Binary | Machine         |
|      |

### Mongo Shell

##### [Start](#)

<br>

- First, start the mongo server by typing mongod in the termnial.
- Open another terminal and type mongo to run the mongo shell.
- You can type in most of the javascript code in mongo shell (which is why mongo is great to work with).
- Type help in mongo shell for various commands (such as show dbs, show collections).

1. [Creating Database](#making-database)
2. [Inserting documents](#insert-document)
3. [Find documents](#finding-with-mongo)
4. [Update documents](#updating-with-mongo)
5. [Delete documents](#mongo-delete)

---

#### Making Database

##### [Start](#) / [Mongo Shell](#mongo-shell)

<br>

Make a new database for an app.

1. We can make a new database by typing "`use <database>`" in the mongo shell. If we use '`use`' on existing database; mongo will change to that database.
   > mongo will switch from our current database to newly created database
   ```terminal
    > use summonersWar
   switched to db summonersWar
   ```
2. Check our current database by typing "`db`". And we won't see our new db in dbs list till we insert some data in it.

   ```termnial
   > db
   summonersWar
   > show dbs
   admin   0.000GB
   config  0.000GB
   local   0.000GB

   ```

---

### Insert Document

##### [Start](#) / [Mongo Shell](#mongo-shell)

<br>

Follow the [docs](https://www.mongodb.com/docs/manual/tutorial/insert-documents/).

In a single mongoDB we can have as many collections as we want. In our summonersWar db, we might have fire_monsters collection, water_monster collection and wind_monster collection.

**Creating a Collection** :

    If the collection does not currently exist, insert operations will create the collection.

Ways to Insert Data

1. `db.collection.insertOne()` - One document
2. `db.collection.insertMany()` - An array of documents
3. `db.collection.insert()` - Can insert both one or many

> If the document does not specify an **\_id field**, MongoDB adds the **\_id field** with an ObjectId value to the new document.

`insertOne()`

```powershell
summonersWar>db.fireMons.insertOne({name: "Inugami", type: "Attack", grade: 3, secondary: true})
{
  acknowledged: true,
  insertedId: ObjectId("6243506480289c98f1ef8e1f")
}

summonersWar>show collections
fireMons

summonersWar>db.fireMons.find()
[
  {
    _id: ObjectId("6243506480289c98f1ef8e1f"),
    name: 'Inugami',
    type: 'Attack',
    grade: 3,
    secondary: true
  }
]

```

`insert()`

```powershell
summonersWar> db.waterMons.insert([{name:"Hell Lady", type:"Attack", grade:5},{name:"Sylph", type:"Support", grade:4}])
DeprecationWarning: Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite.
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("6243525d36602097a1009098"),
    '1': ObjectId("6243525d36602097a1009099")
  }
}
summonersWar> show collections
fireMons
waterMons
summonersWar> db.waterMons.find()
[
  {
    _id: ObjectId("6243525d36602097a1009098"),
    name: 'Hell Lady',
    type: 'Attack',
    grade: 5
  },
  {
    _id: ObjectId("6243525d36602097a1009099"),
    name: 'Sylph',
    type: 'Support',
    grade: 4
  }
]
```

---

### Finding with Mongo

##### [Start](#) / [Mongo Shell](#mongo-shell)

<br>

Follows the [doc](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/)

We can pass in query in `db.collections.find()` method. [query operators](https://www.mongodb.com/docs/manual/reference/operator/query/)

> `db.waterMons.find() = db.waterMons.find({})`

```powershell
summonersWar> db.waterMons.find({type:"Attack"})
[
  {
    _id: ObjectId("6243525d36602097a1009098"),
    name: 'Hell Lady',
    type: 'Attack',
    grade: 5
  },
  {
    _id: ObjectId("6243562436602097a100909a"),
    name: 'Joker',
    type: 'Attack',
    grade: 4
  }
]
summonersWar> db.waterMons.find({grade: 4})
[
  {
    _id: ObjectId("6243525d36602097a1009099"),
    name: 'Sylph',
    type: 'Support',
    grade: 4
  },
  {
    _id: ObjectId("6243562436602097a100909a"),
    name: 'Joker',
    type: 'Attack',
    grade: 4
  }
]
summonersWar> db.waterMons.find({grade: 7})

summonersWar> db.waterMons.find({type:"Support"})
[
  {
    _id: ObjectId("6243525d36602097a1009099"),
    name: 'Sylph',
    type: 'Support',
    grade: 4
  }
]

```

Finding with multiple queries

```powershell
summonersWar> db.waterMons.find({type:'Attack', grade:5})
[
  {
    _id: ObjectId("6243525d36602097a1009098"),
    name: 'Fairy King',
    type: 'Attack',
    grade: 5,
    unsummon: false,
    awaken: true,
    aname: 'Psamathe',
    lastChange: ISODate("2022-03-29T19:55:42.640Z")
  }
]
```

$in Operator

```powershell
>db.waterMons.find({name: {$in :["Fairy King", "Joker"]}})
```

---

### Updating with Mongo

##### [Start](#) / [Mongo Shell](#mongo-shell)

<br>

Follows the [doc](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/)

To update, we can use these methods but we need to pass in 2 arguments "query and the [update operator expression](https://www.mongodb.com/docs/manual/reference/operator/update/#std-label-update-operators)"

- [`db.collection.updateOne()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/)
- [`db.collection.updateMany()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/)

> `db.collection.updateOne({query}, {update operator: {value}})`

```powershell
summonersWar> db.waterMons.updateOne({grade:5},{$set:{unsummon:false, name:"Fairy King"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```

And if the value does not exist, it will be added to the document.

> unsummon value is added through update

```powershell
summonersWar> db.waterMons.find({name:"Fairy King"})
[
  {
    _id: ObjectId("6243525d36602097a1009098"),
    name: 'Fairy King',
    type: 'Attack',
    grade: 5,
    unsummon: false
  }
]

```

Add awaken value to all monsters.

```powershell

summonersWar> db.waterMons.updateMany({}, {$set:{awaken:false}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 3,
  modifiedCount: 3,
  upsertedCount: 0
}
summonersWar> db.waterMons.find()
[
  {
    _id: ObjectId("6243525d36602097a1009098"),
    name: 'Fairy King',
    type: 'Attack',
    grade: 5,
    unsummon: false,
    awaken: false
  },
  {
    _id: ObjectId("6243525d36602097a1009099"),
    name: 'Sylph',
    type: 'Support',
    grade: 4,
    awaken: false
  },
  {
    _id: ObjectId("6243562436602097a100909a"),
    name: 'Joker',
    type: 'Attack',
    grade: 4,
    awaken: false
  }
]
```

Multiple operator

```powershell
summonersWar> db.waterMons.updateOne({name:"Fairy King"}, {$set:{awaken:true, aname:"Psamathe"}, $currentDate:{lastChange: true}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
summonersWar> db.waterMons.find()
[
  {
    _id: ObjectId("6243525d36602097a1009098"),
    name: 'Fairy King',
    type: 'Attack',
    grade: 5,
    unsummon: false,
    awaken: true,
    aname: 'Psamathe',
    lastChange: ISODate("2022-03-29T19:55:42.640Z")
  } ...
```

---

### Mongo delete

##### [Start](#) / [Mongo Shell](#mongo-shell)

<br>

[doc](https://www.mongodb.com/docs/manual/tutorial/remove-documents/)

Deleting things is simple. We can pass in operators as well.

- db.collection.deleteOne(query)
- db.collection.deleteMany(query)

```powershell
summonersWar> db.waterMons.deleteOne({aname:"Psamathe"})
{ acknowledged: true, deletedCount: 1 }
summonersWar> db.waterMons.deleteMany({grade: 4})
{ acknowledged: true, deletedCount: 2 }
summonersWar> db.fireMons.deleteMany({})
{ acknowledged: true, deletedCount: 1 }
```

---

{name: "Beast Monk", type: "HP", grade: 5},{name: "Reaper", type: "HP", grade: 3, secondary: true},{name: "Were Wolf", type: "HP", grade: 3, secondary: true},{name: "Joker", type: "Attack", grade: 4},{name: "Vagabond", type: "Attack", grade: 2, secondary: true}
