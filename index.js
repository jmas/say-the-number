(function () {

var isActive = false;
var popupEl = null;

/**
 * Convert number to words.
 * @param num {Number} Number for convert to words.
 */ 
function convertNumberToWords (num) {
  var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  if ((num = num.toString()).length > 9) return 'overflow';
  n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; var str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
  return str;
}

function handleMouseMove (event) {
  if (! isActive || ! popupEl) {
    return;
  }
  var x = event.clientX;
  var y = event.clientY;
  var mouseOverEl = document.elementFromPoint(x, y);
  var elementNumber = mouseOverEl.innerText.replace( /^\D+/g, '');
  var number = parseInt(elementNumber, 10);
  if (number) {
    popupEl.style.top = (y - 5) + 'px';
    popupEl.style.left = (x + 25) + 'px';
    popupEl.style.display = '';
    popupEl.innerHTML = convertNumberToWords(number);
  } else {
    popupEl.style.display = 'none';
  }
}

/**
 * Run
 */
function run () {
  popupEl = document.createElement('DIV');
  popupEl.style.position = 'fixed';
  popupEl.style.top = '0';
  popupEl.style.left = '0';
  popupEl.style.padding = '.35em .5em';
  popupEl.style.backgroundColor = '#000';
  popupEl.style.color = '#fff';
  popupEl.style.fontFamily = 'sans-serif';
  popupEl.style.zIndex = '1000000';
  popupEl.style.display = isActive ? 'block': 'none';
  popupEl.style.whiteSpace = 'nowrap';
  popupEl.style.borderRadius = '3px';
  document.getElementsByTagName('BODY')[0].appendChild(popupEl);
  window.addEventListener('mousemove', handleMouseMove, false);
}

function askBackgroundScriptAboutState () {
  chrome.extension.sendRequest({}, function(response) {
    isActive = response.isActive;
    run();
  });
}

askBackgroundScriptAboutState();
window.__numberToTextChromeExtensionSskBackgroundScriptAboutState = askBackgroundScriptAboutState;

})();
