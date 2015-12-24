b = a.split("")
f=0
b.forEach(function(c, i) {
if (c == "(") {
  f++
}
else {
  f--
}
if (f == -1) {
  console.log(i + 1)
}
})
