angular.module('customFilters', [])

.filter("linkFormat", function(){
  return function(link) {
    if (!link || link.length === 0 || link === "undefined") {
      return "";
    }
    if (link.slice(0,4)!=="http") {
      link = "http://" + link;
    }
    return link;
  }
});
