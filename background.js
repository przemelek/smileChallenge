
var times = [10, 30, 45, 60, 120, 300];
function challange() {
  var time = new Date()*1;
  var idx = Math.floor(times.length*Math.random());
  var challanges = load();
  challanges.push(time+","+times[idx]);
  store(challanges);
	setTimeout(challange,Math.round(Math.random()*60*60+30)*1000);
}
setTimeout(challange,Math.round(Math.random()*60*60+30)*1000);

function store(challanges) {
  var count = challanges.length;
  if (count>0) {
    chrome.browserAction.setBadgeText({text:(""+count)});
  } else {
    chrome.browserAction.setBadgeText({text:("")});
  }
  var str = "";
  for (var i=0; i<challanges.length; i++) {
    str+=challanges[i]+(((i+1)<challanges.length)?"|":"");
  }
  localStorage["challanges"]=str;
}

function load() {
  var currentChallanges = localStorage["challanges"];
  var challanges = currentChallanges?currentChallanges.split("|"):[];
  var count = challanges.length;
  if (count>0) {
    chrome.browserAction.setBadgeText({text:(""+count)});
  } else {
    chrome.browserAction.setBadgeText({text:("")});
  }
  return challanges;
}

var accepted = 0;
var interval;

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {	
    var challanges =load();
    var idx = request.idx*1;
    var challange = challanges[idx];
    accepted+=challange.split(",")[1]*1;
    if (!interval) {
      interval=setInterval(function() {
        chrome.browserAction.setBadgeText({text:(""+accepted+" s")});
        accepted--;
        if (accepted==0) {
          clearInterval(interval);
          interval = undefined;
          load();
        }
        
      },1000);
    }
    var newChallanges = [];
    for (var i=0; i<challanges.length; i++) {
      if (idx!=i) newChallanges.push(challanges[i]);
    }
    store(newChallanges);
    sendResponse({});
  }
);