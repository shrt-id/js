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
const ShortId = require("shrt-id");
```

## Use shrt_id

Simple use

```js
const id = new ShortId().id(); // default length is 8
console.log(id);
// ev60bb7Q
```

Custom length

```python
const id = new ShortId().id(10)
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
const myShortId = new ShortId();
const [id, shard] = myShortId.idWithShard();
console.log(id, shard);
// euiO6cRd 29
console.log(myShortId.decode(id));
// { id: 'euiO6cRd', shardSeq: 29, dt: 2022-08-22T09:56:43.000Z, randomSeq: 2669, randomString: 'Rd'}
```

## Thanks
