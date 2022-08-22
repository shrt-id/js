class ShortId {
  constructor(shard = 60, startDate = undefined) {
    this.shard = shard;
    this.startDate = startDate != undefined ? startDate : new Date(2010, 1, 1);
    this.startDateTimestampBlock = this.startDate.getTime() / 100;
    this.alpha =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    this.alphaLen = this.alpha.length;
    this.DEFALT_LENGTH = 8;
  }

  divmod = (x, y) => [Math.floor(x / y), x % y];

  intToString(number) {
    let output = "",
      digit;
    while (number) {
      [number, digit] = this.divmod(number, this.alphaLen);
      output = this.alpha[digit] + output;
    }

    return output;
  }

  stringToInt(string) {
    let number = 0;
    string.split("").map((char) => {
      number = number * this.alphaLen + this.alpha.indexOf(char);
    });
    return number;
  }

  intFromDatetime = () => {
    const _dt = Math.round(
      (new Date().getTime() - this.startDate.getTime()) / 100
    );
    return _dt;
  };

  randomString(l) {
    let result = "";
    while (l) {
      let ridx = Math.floor(Math.random() * this.alphaLen);
      l -= 1;
      result += this.alpha[ridx];
    }
    return result;
  }

  id = (l = this.DEFALT_LENGTH) => {
    let randStringLen, _id;
    const timtString = this.intToString(this.intFromDatetime());

    if (l < 7) {
      randStringLen = 2;
    } else {
      randStringLen = l - timtString.length;
    }

    let randString = this.randomString(randStringLen);
    _id = timtString + randString;

    if (l < 7) {
      _id = _id.slice(-l);
    }
    return _id;
  };

  idWithShard = (l = this.DEFALT_LENGTH) => {
    const _id = this.id(l);
    const _shardString = _id.slice(-Math.min(l, 3));
    const _shard = this.stringToInt(_shardString) % this.shard;
    return [_id, _shard];
  };

  decode(id) {
    let timeString, _dt, dt, randomString, _shardString, shardSeq;

    if (id.length >= 7) {
      timeString = id.slice(0, 6);
      _dt = this.stringToInt(timeString) + this.startDateTimestampBlock;
      dt = new Date(_dt * 100);
      randomString = id.slice(timeString.length);
    } else {
      randomString = id.slice(-2);
    }

    const randomSeq = this.stringToInt(randomString);

    _shardString = id.slice(-Math.min(id.length, 3));
    shardSeq = this.stringToInt(_shardString) % this.shard;
    return {
      id,
      shardSeq,
      dt,
      randomSeq,
      randomString,
    };
  }
}

module.exports.shrtId = new ShortId().id;
module.exports.ShortId = ShortId;
