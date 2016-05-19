(function () {

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

/**
 * Get selected text.
 * @returns {string}
 */
function getSelectionText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}

/**
 * Get selection coords.
 * @return {{x: <Number>, y: <Number>}}
 */
function getSelectionCoords() {
    var sel = document.selection, range, rect;
    var x = 0, y = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                if (range.getClientRects().length>0){
                    rect = range.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                }
            }
            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                var span = document.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild( document.createTextNode("\u200b") );
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    var spanParent = span.parentNode;
                    spanParent.removeChild(span);
                    // Glue any broken text nodes back together
                    spanParent.normalize();
                }
            }
        }
    }
    return { x: x, y: y };
}

/**
 * Handle mouseup event.
 * @param event
 */
function handleMouseUp (event) {
  var selectedText = window.getSelection().toString();
  var selectedNumber = selectedText.replace( /^\D+/g, '');
  var number = parseInt(selectedNumber, 10);
  if (number) {
    var coords = getSelectionCoords();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    popupEl.style.top = ((coords.y + scrollTop) - 40) + 'px';
    popupEl.style.left = (coords.x) + 'px';
    popupEl.style.display = 'block';
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
  popupEl.style.position = 'absolute';
  popupEl.style.top = '0';
  popupEl.style.left = '0';
  popupEl.style.padding = '.35em .5em';
  popupEl.style.backgroundColor = '#000';
  popupEl.style.color = '#fff';
  popupEl.style.fontFamily = 'sans-serif';
  popupEl.style.zIndex = '1000000';
  popupEl.style.display = 'none';
  popupEl.style.whiteSpace = 'nowrap';
  popupEl.style.borderRadius = '3px';
  document.getElementsByTagName('BODY')[0].appendChild(popupEl);
  window.addEventListener('mouseup', handleMouseUp, false);
}

run();

})();
