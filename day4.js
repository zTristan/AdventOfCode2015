var crypto = require('crypto');

var number = 0;

function test(number) {
  var md5sum = crypto.createHash('md5');
  md5sum.update("iwrupvqb"+number);
  var digest = md5sum.digest("hex");

  var res = digest.match(/^000000(.*)$/);

  if (res) {
    return true;
  }
  else {
    return false;
  }
}

while(!test(number)) {
  number++;
}

console.log(number);
