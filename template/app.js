// Define namespace for app code
var myApp = myApp || {};

myApp.app = (() => {
	// Store API keys in local storage
	function saveApiKey() {
		const apiKeyInput = document.getElementById('apiKey');
		if (apiKeyInput.value === '') {
			apiKeyCheck();
		} else {
			const apiKey = apiKeyInput.value;
			localStorage.setItem('apiKey', apiKey);
			apiKeyInput.value = '';
			apiKeyInput.placeholder = '✅API Key found';
		}
	}

	// Check local storage API keys
	function apiKeyCheck() {
		const apiKeyInput = document.getElementById('apiKey');
		const apiKey = localStorage.getItem('apiKey');

		if (apiKey) {
			if (validateApiKey(apiKey)) {
				apiKeyInput.placeholder = '✅API Key found';
			} else {
				apiKeyInput.placeholder = '✖Invalid API Key';
			}
		} else {
			apiKeyInput.placeholder = '✖API Key not found';
		}
	}

	function validateApiKey(apiKey) {
		const keyFormat = /^sk-[A-Za-z0-9]+$/;
		return keyFormat.test(apiKey);
	}


	function handleAPIKeyPress(event) {
		if (event.key === 'Enter') {
			saveApiKey();
		}
	}

	// Handle key press event
	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			sendMessage();
		}
	}

	// Send user message to AI and display the response
	async function sendMessage() {
		const message = userInput.value;
		showMessage(message, true);
		userInput.value = '';

		const apiKey = localStorage.getItem('apiKey');
		const endpointUrl = 'https://api.openai.com/v1/chat/completions';
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${apiKey}`
		};
		const data = {
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{ role: 'user', content: message }
			]
		};

		try {
			// Show loading message
			showLoadingMessage();

			const response = await fetch(endpointUrl, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(data)
			});

			const responseData = await response.json();
			const aiMessage = responseData.choices[0].message.content;
			showMessage(aiMessage, false);

			// Remove loading message
			removeLoadingMessage();
		} catch (error) {
			console.error('Error:', error);
			// Remove loading message on error
			removeLoadingMessage();
		}
	}

	// Display message in the chat container
	function showMessage(message, isUserMessage) {
		const messageElement = document.createElement('p');
		messageElement.className = isUserMessage ? 'user-message' : 'ai-message';
		messageElement.innerHTML = formatMessage(message);

		myApp.init.messagesContainer.appendChild(messageElement);


		// Adjust scroll position
		const userInputRect = userInput.getBoundingClientRect();
		const userInputBottom = userInputRect.top + userInputRect.height;
		const messagesContainerRect = myApp.init.messagesContainer.getBoundingClientRect();
		const messagesContainerTop = messagesContainerRect.top;

		if (userInputBottom > messagesContainerTop) {
			myApp.init.messagesContainer.scrollTop -= userInputBottom - messagesContainerTop;
		}

		// Message retention period (in milliseconds) 1 week

		// Scroll to the bottom
		myApp.init.messagesContainer.scrollTop = myApp.init.messagesContainer.scrollHeight;
		myApp.init.messagesHistory.push({ content: message, isUserMessage, timestamp: Date.now() });
		localStorage.setItem('messagesHistory', JSON.stringify(myApp.init.messagesHistory));

		removeOldMessages();
	}

	// Deleting old messages
	function removeOldMessages() {
		const currentTime = Date.now();
		const messageRetentionPeriod = 7 * 24 * 60 * 60 * 1000;
		const updatedMessages = myApp.init.messagesHistory.filter((message) => {
			return currentTime - message.timestamp <= messageRetentionPeriod;
		});
		myApp.init.messagesHistory = updatedMessages;
		localStorage.setItem('messagesHistory', JSON.stringify(myApp.init.messagesHistory));
	}
	// Show loading message
	function showLoadingMessage() {
		const loadingMessage = document.createElement('p');
		loadingMessage.id = 'loading-message';
		loadingMessage.textContent = 'Loading...';
		myApp.init.messagesContainer.appendChild(loadingMessage);

		// Scroll to the bottom
		myApp.init.messagesContainer.scrollTop = myApp.init.messagesContainer.scrollHeight;
	}

	// Remove loading message
	function removeLoadingMessage() {
		const loadingMessage = document.getElementById('loading-message');
		if (loadingMessage) {
			loadingMessage.remove();
		}
	}

	// Format message to include line breaks for bullet points
	function formatMessage(message) {
		const bulletPointRegex = /^\s*-\s*/;
		const lines = String(message).split('\n');
		const formattedLines = lines.map(line => {
			if (bulletPointRegex.test(line)) {
				return `<li>${line.replace(bulletPointRegex, '')}</li>`;
			}
			return line;
		});

		if (formattedLines.some(line => line.startsWith('<li>'))) {
			return `<ul>${formattedLines.join('')}</ul>`;
		}

		return formattedLines.join('<br>');
	}
	return {
		handleAPIKeyPress,
		handleKeyPress,
		saveApiKey,
		apiKeyCheck,
		removeOldMessages,
	};
})();