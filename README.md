# ChatGPT API Example（ChatGPT APIの利用例）

これはOpenAI GPT-3.5 Turboモデルを使用したシンプルなWebアプリケーションです。ユーザーは入力フィールドにメッセージを入力して、AIアシスタントと対話できます。AIは適切な応答を返します。

## 前提条件

このアプリケーションを使用するには、OpenAIからAPIキーを取得する必要があります。APIキーがない場合は、OpenAIのウェブサイトでサインアップして取得してください。

## 始め方

1. このリポジトリをローカルマシンにクローンしてください。
2. `index.html` ファイルをウェブブラウザで開いてください。
3. "API Key" フィールドにAPIキーを入力し、"Save" ボタンをクリックしてブラウザのローカルストレージにキーを保存してください。
4. 入力フィールドにメッセージを入力し、Enterキーを押すことでAIアシスタントと対話を始められます。

## 特徴

- AIアシスタントとリアルタイムで対話できます。
- メッセージはチャットコンテナに表示されます。
- ユーザーのメッセージは青色で表示され、AIの応答は灰色で表示されます。
- メッセージはローカルストレージに保存されるため、ページをリフレッシュしても会話を続けることができます。
- 古いメッセージは1週間後に自動的に削除され、チャット履歴が管理しやすくなります。

## スタイル

このアプリケーションは、以下のCSSスタイルを使用してクリーンで使いやすいインターフェースを提供します：

- フォント：Google FontsからPoppinsとZen Maru Gothicを使用します。
- スムーズなスクロールとボックスシャドウエフェクトがあるメッセージコンテナ。
- ユーザーメッセージは青色で表示され、AIの応答は灰色で表示されます。両方とも角丸です。

## 貢献方法

ご意見や問題点がある場合は、Issueをオープンしたり、Pull Requestを送信したりしてください。

## ライセンス

このプロジェクトは [MITライセンス](LICENSE) のもとで公開されています。


# ChatGPT API Example

This is a simple web application that demonstrates the usage of the OpenAI GPT-3.5 Turbo model using the ChatGPT API. Users can interact with the AI assistant by typing their messages in the input field, and the AI will respond accordingly.

## Prerequisites

To use this application, you need an API key from OpenAI. If you don't have one, you can sign up and obtain the key from the OpenAI website.

## Getting Started

1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser.
3. Input your API key in the "API Key" field and click the "Save" button to store the key in your browser's local storage.
4. Start chatting with the AI assistant by typing your messages in the input field and pressing Enter.

## Features

- Chat with the AI assistant and receive responses in real-time.
- Messages are displayed in the chat container.
- User messages are shown in blue, and AI responses are shown in gray.
- Messages are persisted in the local storage, so you can continue your conversation even after refreshing the page.
- Old messages are automatically removed after one week to keep the chat history manageable.

## Styling

The application uses the following CSS styles to present a clean and user-friendly interface:

- Font: Poppins and Zen Maru Gothic from Google Fonts.
- Messages container with smooth scrolling and a box-shadow effect.
- User messages in blue and AI responses in gray, both with rounded corners.

## Contributing

If you have suggestions or find any issues, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
