# local-gpt3-chat-app
An interactive AI chat bot for local environments using OpenAI's GPT-3.5 Turbo model.

This is a chat application that allows users to have conversations with an AI assistant powered by the OpenAI GPT-3.5 Turbo model.

The application provides the following features:

- User can enter messages and send them to the AI assistant by pressing Enter or clicking the send button.
- AI assistant responds to user messages and displays the response in the chat window.
- User API key can be saved and checked for availability.
- Messages are stored in the local storage for persistence across page reloads.
- Messages older than a certain retention period are automatically deleted.

## Getting Started

To run the chat application locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Open the `index.html` file in a web browser.
3. Interact with the chat application by entering messages in the input box and pressing Enter or clicking the send button.

## Usage

- Enter your message in the input box at the bottom of the chat window.
- Press Enter or click the send button to send the message to the AI assistant.
- The AI assistant's response will be displayed in the chat window.
- The API key can be saved by entering it in the designated input box and clicking the save button.
- The availability of the API key can be checked by clicking the save button.

## Customization

The chat application can be customized by modifying the CSS styles in the `styles.css` file. You can change the appearance, colors, fonts, and layout to fit your preferences or branding.

## Limitations

- The chat application relies on the OpenAI GPT-3.5 Turbo model for generating responses. Ensure that you have a valid API key and that the model is accessible and properly configured.
- The application stores messages in the local storage of the browser. Clearing the browser cache or using a different device or browser will result in the loss of message history.

## License

This project is licensed under the [MIT License](LICENSE).
