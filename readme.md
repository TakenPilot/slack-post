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

##API

Type `slack-post --help` for a list of available commands and their expected arguments.

```json
{
  api: {
    test: {
      uri: "https://slack.com/api/api.test",
      args: ['error', 'foo'],
      description: "Test api"
    }
  },
  auth: {
    test: {
      uri: "https://slack.com/api/auth.test",
      args: ['token'],
      description: "Verify authentication"
    }
  },
  chat: {
    postMessage: {
      uri: "https://slack.com/api/chat.postMessage",
      args: ['token', 'channel', 'text', 'username', 'parse', 'link_names', 'attachments', 'unfurl_links',
        'unfurl_media', 'icon_url', 'icon_emoji'],
      requiredArgs: ['token', 'channel', 'text'],
      description: "Delete a message to a channel"
    },
    delete: {
      uri: "https://slack.com/api/chat.delete",
      args: ['token', 'ts', 'channel'],
      requiredArgs: ['token', 'ts', 'channel'],
      description: "Post a message to a channel"
    },
    update: {
      uri: "https://slack.com/api/chat.update",
      args: ['token', 'ts', 'channel', 'text'],
      requiredArgs: ['token', 'ts', 'channel', 'text'],
      description: "Update a message to a channel"
    }
  },
  channels: {
    history: {
      uri: "https://slack.com/api/channels.history",
      args: ['token', 'channel'],
      requiredArgs: ['token', 'channel'],
      description: "Get recent messages in channel"
    },
    info: {
      uri: "https://slack.com/api/channels.info",
      args: ['token', 'channel'],
      description: "Get info of channel"
    },
    list: {
      uri: "https://slack.com/api/channels.list",
      args: ['token'],
      requiredArgs: ['token'],
      description: "List all channels"
    }
  },
  users: {
    info: {
      uri: "https://slack.com/api/users.info",
      args: ['token', 'user'],
      requiredArgs: ['token', 'user'],
      description: "Get user info"
    },
    getPresence: {
      uri: "https://slack.com/api/users.getPresence",
      args: ['token', 'user'],
      requiredArgs: ['token', 'user'],
      description: "Get user presence"
    },
    list: {
      uri: "https://slack.com/api/users.list",
      args: ['token'],
      requiredArgs: ['token'],
      description: "Get list of all users"
    },
    setActive: {
      uri: "https://slack.com/api/users.setActive",
      args: ['token'],
      requiredArgs: ['token'],
      description: "Set user active"
    },
    setPresence: {
      uri: "https://slack.com/api/users.setPresence",
      args: ['token', "presence"],
      requiredArgs: ['token', "presence"],
      description: "Set user presence"
    }
  }
}
```
