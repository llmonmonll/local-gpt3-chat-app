var myApp = myApp || {};

myApp.init = (() => {
	// Private variables and functions
	let inputAPIKey = document.getElementById('apiKey');
	let userInput = document.getElementById('userInput');
	let saveApiKeyButton = document.getElementById('saveApiKey');
	let messagesContainer = document.getElementById('messages');
	let messagesHistory = JSON.parse(localStorage.getItem('messagesHistory')) || [];
	// Initialize app
	function init() {
		messagesContainer.addEventListener('click', (event) => {
			if (event.target === userInput || event.target === inputAPIKey) {
				return;
			}
		});
		document.addEventListener('keypress', myApp.app.handleKeyPress);
		saveApiKeyButton.addEventListener('click', myApp.app.handleMouseDown);
		myApp.app.apiKeyCheck();
		myApp.app.removeOldMessages();
	}
	// Public API
	return {
		init,
		messagesContainer,
		messagesHistory,
		inputAPIKey,
	};
})();

// Initialize app when page loads
window.addEventListener('DOMContentLoaded', () => {

	myApp.init.init();
	myApp.init.messagesHistory = myApp.init.messagesHistory || [];

	const saveMessages = JSON.parse(localStorage.getItem('messagesHistory')) || [];
	myApp.init.messagesHistory.length = 0;

	saveMessages.forEach((message) => {
		const existingMessage = myApp.init.messagesHistory.find((m) => m.content === message.content && m.isUserMessage === message.isUserMessage);
		if (!existingMessage) {
			myApp.init.messagesHistory.push(message);
		}
	});

	myApp.init.messagesHistory.forEach((message) => {
		myApp.app.showMessage(message.content, message.isUserMessage);
	});
});