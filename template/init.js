var myApp = myApp || {};

myApp.init = (() => {
	// Private variables and functions
	let inputAPIKey = document.getElementById('apiKey');
	let userInput = document.getElementById('userInput');
	let saveApiKeyButton = document.getElementById('saveApiKey');
	let messagesContainer = document.getElementById('messages');
	let messagesHistory = [];
	// Initialize app
	function init() {
		inputAPIKey.addEventListener('keypress', myApp.app.handleAPIKeyPress);
		userInput.addEventListener('keypress', myApp.app.handleKeyPress);
		saveApiKeyButton.addEventListener('click', myApp.app.saveApiKey);
		myApp.app.apiKeyCheck();
		myApp.app.removeOldMessages();
	}
	// Public API
	return {
		init,
		messagesContainer,
		messagesHistory,
	};
})();

// Initialize app when page loads
window.addEventListener('DOMContentLoaded', () => {
	myApp.init.init();
	myApp.init.messagesHistory = myApp.init.messagesHistory || [];
});