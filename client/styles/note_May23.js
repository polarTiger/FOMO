
/* BL

var longestPalindrome = function (string) {
+  var longest = '';
+  string = string.split('');
+
+  var checkPalindrome = function (subArr) {
+    if (subArr.join('') === subArr.reverse().join('')) {
+      return true;
+    }
+    return false;
+  }
+
+  for (var i = 0; i < string.length; i++) {
+    for (var j = i + longest.length; j < string.length; j++) {
+        if (checkPalindrome(string.slice(i, j))) {
+          longest = string.slice(i, j).join('');
+        }
+    }
+  }
+
+  return longest;
 };    };

 */


 /* TC

 +var isPalindrome = function(string, i, j) {
+  i = i || 0;
+  j = j !== undefined ? j : string.length-1;
+  for (var k = 0; k<=Math.ceil((j-i)/2); k++) {
+    if (string[i+k] !== string[j-k]) {
+      return false;
+    }
+  }
+  return true;
+}
+
 var longestPalindrome = function (string) {     var longestPalindrome = function (string) {
+  longest = -Infinity;
+  bestStartEnd = [0,0];
+  for (var i=0; i<string.length; i++) {
+    for (var j = i; j <string.length; j++){
+      if (isPalindrome(string, i, j) && j-i + 1 > longest) {
+        longest = j - i + 1;
+        bestStartEnd = [i,j];
+      }
+    }
+  }
+  return string.substring(bestStartEnd[0], bestStartEnd[1] + 1);
 };    };

 */

 /* JP

 var longestPalindrome = function (string) {
+  var expandString;
+  if (string === '') {
+    expandString = '^$';
+  } else {
+    expandString = '^#'+string.toLowerCase().split('').join('#')+'#$';
+  }
+  var center = 0, right = 0;
+  var P = [];
+  for (var i=1; i<expandString.length-1; i++) {
+    var i_mirror = 2*center - i;
+    P[i] = right > i ? Math.min(right - i, P[i_mirror]) : 0;
+
+    // Attempt to expand palindrome
+    while (expandString[i+1+P[i]] === expandString[i-1-P[i]])
+      P[i]++;
+
+    // If palindrome expands past R, adjust center
+    if (i + P[i] > right) {
+      center = i;
+      right = i + P[i];
+    }
+  }
+
+  var maxLen = 0;
+  var centerIndex = 0;
+  for (var j=1; j<expandString.length-1; j++) {
+    if (P[j] > maxLen) {
+      maxLen = P[j];
+      centerIndex = j;
+    }
+  }
+
+  return string.substr((centerIndex-1-maxLen)/2, maxLen);
 };    };
+
+console.log(longestPalindrome("My dad is a racecar athlete"));
*/



