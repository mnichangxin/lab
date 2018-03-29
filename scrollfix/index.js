/* 修复滚动出界 */
// var ScrollFix = function(elem) {
// 	var startY, startTopScroll
	
//     elem = elem || document.querySelector(elem)
    
// 	if (!elem) {
//         return        
//     }

//     document.addEventListener('touchmove', function(event) {
//         event.preventDefault()
//     })

// 	// elem.addEventListener('touchstart', function(event) {
// 	// 	startY = event.touches[0].pageY
// 	// 	startTopScroll = elem.scrollTop
		
// 	// 	if (startTopScroll <= 0) {
// 	// 		elem.scrollTop = 1            
//     //     }

// 	// 	if (startTopScroll + elem.offsetHeight >= elem.scrollHeight) {
// 	// 		elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1            
//     //     }
// 	// }, false)
// }

var Overscroll = function(el) {
    el.addEventListener('touchstart', function() {
        var top = el.scrollTop
            , totalScroll = el.scrollHeight
            , currentScroll = top + el.offsetHeight;

        if (top === 0) {
            el.scrollTop = 1;
        } else if (currentScroll === totalScroll) {
            el.scrollTop = top - 1;
        }
    });
    el.addEventListener('touchmove', function(evt) {
        if (el.offsetHeight < el.scrollHeight)
            evt._isScroller = true;
    });
}

// overscroll(document.querySelector('.scroll'));

document.body.addEventListener('touchmove', function(evt) {
    if (!evt._isScroller) {
        evt.preventDefault();
    }
});