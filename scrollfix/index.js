/* 修复滚动出界 */
var ScrollFix = function(elem) {
	var startY, startTopScroll
	
    elem = elem || document.querySelector(elem)
    
	if (!elem) {
        return        
    }

    document.addEventListener('touchmove', function(event) {
        event.preventDefault()
    })

	// elem.addEventListener('touchstart', function(event) {
	// 	startY = event.touches[0].pageY
	// 	startTopScroll = elem.scrollTop
		
	// 	if (startTopScroll <= 0) {
	// 		elem.scrollTop = 1            
    //     }

	// 	if (startTopScroll + elem.offsetHeight >= elem.scrollHeight) {
	// 		elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1            
    //     }
	// }, false)
}