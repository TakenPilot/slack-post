Slack-Post
==========

Implements the basic api of Slack, so we can post things from scripts.  It can also

##Usage

Test your authentication:
```bash
export SLACK_TOKEN=<your key>
slack-post --channel C02JX4Z21 --username Bot chat.postMessage
```

Get message history of a channel:
```bash
export SLACK_TOKEN=<your key>
slack-post --channel C02JX4Z21 --username Bot channels.history
```

Get information of a channel:
```bash
export SLACK_TOKEN=<your key>
slack-post --channel C02JX4Z21 --username Bot channels.info
```

Post some message from a script:
```bash
export SLACK_TOKEN=<your key>
echo "I have perfected posting to Slack from the cli" | slack-post --channel C02JX4Z21 --username Bot chat.postMessage
```

##Install

```bash
npm install -g slack-post
```