var myApp = myApp || {};

myApp.init = (function () {
	// Initialize app
	function init() {
		myApp.app.init();
	}
	// Public API
	return {
		init
	};
})();

// Initialize app when page loads
window.addEventListener('DOMContentLoaded', function () {
	myApp.init.init();
});