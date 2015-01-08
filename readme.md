Slack-Post
==========

Implements the basic api of Slack, so we can post things from scripts.  It can also do the rest too.

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

##API

Type `slack-post --help` for a list of available commands and their expected arguments.

### api.test: Test api
* arguments: error, foo


### auth.test: Verify authentication
* arguments: token


### chat.postMessage: Delete a message to a channel
* arguments: token, channel, text, username, parse, link_names, attachments, unfurl_links, unfurl_media, icon_url, icon_emoji
* required: token, channel, text

### chat.delete: Post a message to a channel
* arguments: token, ts, channel
* required: token, ts, channel

### chat.update: Update a message to a channel
* arguments: token, ts, channel, text
* required: token, ts, channel, text


### channels.history: Get recent messages in channel
* arguments: token, channel
* required: token, channel

### channels.info: Get info of channel
* arguments: token, channel

### channels.list: List all channels
* arguments: token
* required: token


### users.info: Get user info
* arguments: token, user
* required: token, user

### users.getPresence: Get user presence
* arguments: token, user
* required: token, user

### users.list: Get list of all users
* arguments: token
* required: token

### users.setActive: Set user active
* arguments: token
* required: token

### users.setPresence: Set user presence
* arguments: token, presence
* required: token, presence
