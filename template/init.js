var myApp = myApp || {};

myApp.init = (() => {
	// Private variables and functions
	let messagesHistory = JSON.parse(localStorage.getItem('messagesHistory')) || [];
	// Initialize app when page loads
	window.addEventListener('DOMContentLoaded', () => {

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
	return {
		messagesHistory,
	}
})();