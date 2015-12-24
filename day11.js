
function incPassword(password) {
  var chars = password.split('').map(function(c) {
  	return c.charCodeAt(0);
  });

  chars[chars.length-1]++;

  for (var i=chars.length-1; i > 0; --i) {
  	if (chars[i] > "z".charCodeAt(0)) {
  		chars[i-1]++;
  		chars[i] = "a".charCodeAt(0);
  	}
  }

  return chars.map(function(c) {
  	return String.fromCharCode(c);
  }).join("");
}

function passwordValid(password) {
	if (password.match(/i|o|l/)) {
		return false;
	}
	
	var res = password.match(/(.)\1+/g);
	if (!res || res.length < 2) {
		return false;
	}

	for (var i=0; i < password.length-2; ++i) {
		var c = password.charCodeAt(i);
		if (   password.charCodeAt(i+1) == c + 1
			&& password.charCodeAt(i+2) == c + 2) {
			return true;
		}
	}

	return false;
}

function nextPassword(password) {
	do {
		password = incPassword(password);
	}
	while(!passwordValid(password));

	return password;
}



var password = "hxbxwxbf";

password = nextPassword(password);
console.log(password);

password = nextPassword(password);
console.log(password);
