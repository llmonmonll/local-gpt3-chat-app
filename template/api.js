var myApp = myApp || {};

myApp.api = (() => {
	let inputAPIKey = document.getElementById('apiKey');
	let userInput = document.getElementById('userInput');
	let messagesContainer = document.getElementById('messages');
	let saveApiKeyButton = document.getElementById('saveApiKey');
	let userMessage = '';
	function init() {
		messagesContainer.addEventListener('click', (event) => {
			if (event.target === userInput || event.target === inputAPIKey) {
				return;
			}
		});
		document.addEventListener('keypress', myApp.app.handleKeyPress);
		saveApiKeyButton.addEventListener('click', myApp.app.handleMouseDown);
		myApp.app.removeOldMessages();
	}
	function saveApiKey() {
		const apiKey = inputAPIKey.value;
		if (inputAPIKey.value === '') {
			myApp.api.init();
		} else {
			if (validateApiKey(apiKey)) {
				localStorage.setItem('apiKey', apiKey);
				inputAPIKey.value = '';
				inputAPIKey.placeholder = '✅API Key found';
			} else {
				inputAPIKey.value = '';
				inputAPIKey.placeholder = '✖Invalid API Key';
			}
		}
	}
	function apiKeyCheck() {
		const apiKey = localStorage.getItem('apiKey');
		if (apiKey) {
			if (validateApiKey(apiKey)) {
				inputAPIKey.placeholder = '✅API Key found';
			} else {
				inputAPIKey.placeholder = '✖Invalid API Key';
			}
		} else {
			inputAPIKey.placeholder = '✖API Key not found';
		}
	}
	function validateApiKey(apiKey) {
		const keyFormat = /^sk-[A-Za-z0-9]+$/;
		return keyFormat.test(apiKey);
	}
	return {
		init,
		saveApiKey,
		apiKeyCheck,
		messagesContainer,
		inputAPIKey,
		userInput,
		userMessage,
	};
})();

window.addEventListener('DOMContentLoaded', () => {
	myApp.api.init();
	myApp.api.apiKeyCheck();
});