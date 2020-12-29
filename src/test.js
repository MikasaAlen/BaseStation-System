mapParam= {
  "centerLat": "30",
    "centerLng": "120",
    "zoom": "12"
}
var str = JSON.stringify(mapParam)

var object = JSON.parse(str)
console.log([object.centerLng,object.centerLat])
