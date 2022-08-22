# Fastest way to create Short Id

## How we create short id

Under writing

## Installation

Open your terminal and run:

```shell
npm install shrt-id
```

Then, at the top of each of your Javascript script, you should be able to import the module:

```js
const { ShortId, shrtId } = require("shrt-id");
```

## Use shrt_id

Simple use

```js
const id = shrtId(); // default length is 8
console.log(id);
// ev60bb7Q
```

Custom length

```js
const id = shrtId(10)
console.log(id)
# wiwdhx8V7x
```

Get Id and shard at same time

```js
const [id, shard] = new ShortId().idWithShard(10);
console.log(id, shard);
// euiOXu9QYt 55
```

Decode id for datetime and shard

```js
const myShortId = new ShortId(10, 4); // length = 10 and has 4 shards
const [id, shard] = myShortId.idWithShard();
console.log(id, shard);
// eujbNU000A 2
console.log(myShortId.decode(id));
// {
//  id: 'eujbNU000A',
//  shardSeq: 2,
//  dt: 2022-08-22T12:22:10.800Z,
//  randomSeq: 12596194,
//  randomString: '000A'
// }
```

## Thanks
