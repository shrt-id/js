class ShortId {
  constructor(shard = 60, startDate = undefined) {
    this.shard = shard;
    this.startDate = startDate != undefined ? startDate : new Date(2010, 1, 1);
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
      output += this.alpha[digit];
    }

    return output.split("").reverse().join("");
  }

  stringToInt(string) {
    let number = 0;
    string.split("").map((char) => {
      number = number * this.alphaLen + this.alpha.indexOf(char);
    });
    return number;
  }

  stringFromDateTime = () => {
    const _dt = Math.round(
      (new Date().getTime() - this.startDate.getTime()) / 100
    );

    return this.intToString(_dt);
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
    const [_id, _] = this.idWithShard(l);
    return _id;
  };

  idWithShard = (l = this.DEFALT_LENGTH) => {
    let randIdLen;
    const timeId = this.stringFromDateTime();
    if (l < 7) {
      randIdLen = 2;
    } else {
      randIdLen = l - timeId.length;
    }

    let randId = this.randomString(randIdLen);
    let shard = this.stringToInt(randId) % this.shard;
    let finalId = timeId + randId;
    if (l < 7) {
      finalId = finalId.slice(-l);
    }
    return [finalId, shard];
  };

  decode(id) {
    let timeId, _dt, dt, randomString;
    if (id.length >= 7) {
      timeId = id.slice(0, 6);
      _dt = this.stringToInt(timeId) + this.startDate.getTime() / 100;
      dt = new Date(_dt * 100);
      randomString = id.slice(timeId.length);
    } else {
      randomString = id.slice(-2);
    }

    const randomSeq = this.stringToInt(randomString);
    const shardSeq = randomSeq % this.shard;
    return {
      id,
      shardSeq,
      dt,
      randomSeq,
      randomString,
    };
  }
}

module.exports = ShortId;
