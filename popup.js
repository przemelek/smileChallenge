function $(id) { return document.getElementById(id); }

function load() {
  var currentChallanges = localStorage["challanges"];
  var challanges = currentChallanges?currentChallanges.split("|"):[];
  return challanges;
}

function doIt(event) {
  var idx = event.srcElement.getAttribute("idx");
  console.log(idx);
  chrome.extension.sendRequest({cmd:"accepted",idx:idx},function(response) { show(); });
}

function show() {
  var challanges = load();
  var str = "";
  for (var i=0; i<challanges.length; i++) {
    var challange = challanges[i].split(",");
    str+="<div>Smile by <b>"+challange[1]+"</b> seconds.   <button idx='"+i+"'>Accepted!</button></div>";
  }
  $("content").innerHTML = str;
  setTimeout(function() {
    var buttons = document.getElementsByTagName("button");
    for (var i=0; i<buttons.length; i++) {
      buttons[i].onclick=doIt;
    }
  },100);
}



show();