var myApp = myApp || {};


myApp.app = (() => {
	// Define namespace for app code
	const { inputAPIKey, messagesContainer } = myApp.api;
	let { userMessage } = myApp.api;
	const { messagesHistory } = myApp.init;

	// Store API keys in local storage
	function saveApiKey() {
		const apiKey = inputAPIKey.value;
		if (inputAPIKey.value === '') {
			apiKeyCheck();
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

	// Check local storage API keys
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


	// Handle key press event
	function handleKeyPress(event) {
		const isEnterKey = event.key === 'Enter';
		const isAPIKeyInput = document.activeElement === inputAPIKey;

		if (isEnterKey) {
			if (isAPIKeyInput) {
				saveApiKey();
			} else {
				sendMessage();
			}
		}
	}

	function handleMouseDown(event) {
		const isEnterKey = event.type === 'click';
		const isAPIKeyInput = document.getElementById('saveApiKey');

		if (isEnterKey) {
			if (isAPIKeyInput) {
				saveApiKey();
			} else {
				sendMessage();
			}
		}
	}

	function validateUserInput(message) {
		if (message.trim() === '') {
			return false;
		}
		const maxMessageLength = 200;
		if (message.length > maxMessageLength) {
			return false;
		}
		return true;
	}

	// Send user message to AI and display the response
	async function sendMessage() {
		const message = userInput.value;
		if (!validateUserInput(message)) {
			return;
		}
		userMessage = message;
		userInput.value = '';
		const apiKey = localStorage.getItem('apiKey');
		if (!apiKey) {
			userInput.placeholder = '✖API Key not found';
			const userMessageElement = messagesContainer.querySelector('.user-message');
			if (userMessageElement) {
				messagesContainer.removeChild(userMessageElement);
			}
			return;
		}
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
		let isError = false;
		try {
			showMessage(message, true);
			// Show loading message
			showLoadingMessage();
			const response = await fetch(endpointUrl, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(data)
			});
			if (!response.ok) {
				isError = true;
				const userMessageElement = messagesContainer.querySelector('.user-message');
				if (userMessageElement) {
					messagesContainer.removeChild(userMessageElement);
				}
				throw new Error('!!! Something went wrong. Please try again later. !!!');
			} else {
				const responseData = await response.json();
				const aiMessage = responseData.choices[0].message.content;
				showMessage(aiMessage, false);
				// Remove loading message
				removeLoadingMessage();
			}
		} catch (error) {
			alert('!!! Something went wrong. Please try again later. !!!');
			// Remove loading message on error
			removeLoadingMessage();
			isError = true;
			if (!isError) {
				const existingMessage = messagesHistory.find((m) => m.content === userMessage && m.isUserMessage === true);
				if (!existingMessage) {
					messagesHistory.push({ content: userMessage, isUserMessage: true, timestamp: Date.now() });
					localStorage.setItem('messagesHistory', JSON.stringify(messagesHistory));
				}
				if (!existingMessage) {
					messagesHistory.push({ content: userMessage, isUserMessage: false, timestamp: Date.now() });
					localStorage.setItem('messagesHistory', JSON.stringify(messagesHistory));
				}
			}
		}
	}

	// Display message in the chat container
	function showMessage(message, isUserMessage) {
		const messageElement = createMessageElement(message, isUserMessage);
		appendMessageElement(messageElement);
		adjustScrollPosition();
		saveMessageHistory(message, isUserMessage);
		removeOldMessages();
	}

	function createMessageElement(message, isUserMessage) {
		const messageElement = document.createElement('p');
		messageElement.className = isUserMessage ? 'user-message' : 'ai-message';

		const logoContainer = document.createElement('div');
		logoContainer.className = 'logo-container';

		// Add logo to message block
		const logo = document.createElement('img');
		logo.setAttribute('alt', 'LocalChatGPT');
		logo.setAttribute('src', './template/chatgpt-icon.svg'); // Free .svg icons
		logo.setAttribute('class', 'message-logo');
		logo.setAttribute('viewBox', '0 0 41 41');
		logo.setAttribute('fill', 'none');
		logo.setAttribute('width', '32px');
		logo.setAttribute('height', '32px');
		if (!isUserMessage) {
			logoContainer.appendChild(logo);
		} else {
			appendMessageElement(messageElement);
		}
		// Add message content to message block
		const content = document.createElement('span');
		content.innerHTML = formatMessage(message);
		messageElement.appendChild(logoContainer);
		messageElement.appendChild(content);

		return messageElement;
	}

	function appendMessageElement(messageElement) {
		messagesContainer.appendChild(messageElement);
	}

	function adjustScrollPosition() {
		const userInputRect = userInput.getBoundingClientRect();
		const userInputBottom = userInputRect.top + userInputRect.height;
		const messagesContainerRect = messagesContainer.getBoundingClientRect();
		const messagesContainerTop = messagesContainerRect.top;
		const aiMessages = messagesContainer.getElementsByClassName('ai-message');
		if (userInputBottom > messagesContainerTop) {
			messagesContainer.scrollTop += userInputBottom - messagesContainerTop;
		}

		// Scroll to the bottom of the messages container
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	}

	function saveMessageHistory(message, isUserMessage) {
		const existingMessage = messagesHistory.find((m) => m.content === message);
		if (!existingMessage) {
			messagesHistory.push({ content: message, isUserMessage, timestamp: Date.now() });
		}
		localStorage.setItem('messagesHistory', JSON.stringify(messagesHistory));
	}

	// Deleting old messages
	function removeOldMessages() {
		const currentTime = Date.now();
		// Message retention period (in milliseconds) 1 week
		const messageRetentionPeriod = 7 * 24 * 60 * 60 * 1000;
		const updatedMessages = messagesHistory.filter(message => currentTime - message.timestamp <= messageRetentionPeriod);
		messagesHistory.splice(0, messagesHistory.length, ...updatedMessages);
		localStorage.setItem('messagesHistory', JSON.stringify(messagesHistory));
	}
	// Show loading message
	function showLoadingMessage() {
		const loadingMessage = document.createElement('p');
		loadingMessage.id = 'loading-message';
		loadingMessage.textContent = 'Loading...';
		userInput.disabled = true;
		userInput.placeholder = 'Loading...';
		previousPlaceholder = userInput.placeholder;

		messagesContainer.insertAdjacentElement('beforeend', loadingMessage);
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	}

	// Remove loading message
	function removeLoadingMessage() {
		const loadingMessage = document.getElementById('loading-message');
		if (loadingMessage) {
			loadingMessage.remove();
			userInput.disabled = false;
			userInput.placeholder = 'Send your message...';
			userInput.focus();
		}
	}

	function formatMessage(message) {
		const codeBlockRegex = /```([\s\S]+?)```/g;
		const bulletListRegex = /(.+)(?:\n\s*- )(.+)/g;
		const emphasisRegex = /`([^`]+)`/g;
		const colonRegex = /([^：:]):([^：:])/g;

		const formattedMessage = message
			.replace(codeBlockRegex, (match, code) => {
				const escapedCode = escapeHTML(code.trim());
				return `<pre class="code-block">${escapedCode}</pre>`;
			})
			.replace(bulletListRegex, (match, precedingText, listItem) => {
				return `${precedingText}\n- ${listItem}`;
			})
			.replace(emphasisRegex, (match, text) => {
				return `<code>${text}</code>`;
			})
			.replace(colonRegex, (match, precedingText, followingText) => {
				return `${precedingText}：${followingText}`;
			});

		return formattedMessage.replace(/\n/g, '<br>');
	}

	function escapeHTML(text) {
		return text.replace(/[&<>"']/g, (match) => {
			switch (match) {
				case '&':
					return '&amp;';
				case '<':
					return '&lt;';
				case '>':
					return '&gt;';
				case '"':
					return '&quot;';
				case "'":
					return '&#039;';
			}
		});
	}

	return {
		apiKeyCheck,
		handleKeyPress,
		handleMouseDown,
		removeOldMessages,
		showMessage,
	};
})();