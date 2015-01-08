var rest = require('restler'),
  _ = require('lodash'),
  queryString = require('querystring'),
  SlackPost = function (options) {
    options.call = options.call || options._[0];
    options.token = options.token || process.env.SLACK_TOKEN;
    this.options = options;
  };

_.mixin(require('lodash-deep'));

SlackPost.api = {
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
};

SlackPost.prototype = {
  withAuth: function (cb) {
    var options = this.options;
    return rest.get(SlackPost.api.auth.test.uri + '?' + queryString.stringify(_.pick(options, SlackPost.api.auth.test.args)))
      .on('success', function (data) {
        if (data.ok) {
          cb(null, data);
        } else {
          cb(new Error("Failed to authenticate: " + JSON.stringify(data)));
        }
      })
      .on('error', function (error) {
        cb(error);
      });
  },
  withCall: function (call, cb) {
    if (!call) {
      return cb(new Error("Missing call, i.e., slack-post auth.test"));
    }
    if (!_.all(options, call.requiredArgs)) {
      return cb(new Error("Missing required arguments " + JSON.stringify(call.requiredArgs)));
    }

    var options = this.options;
    var url = call.uri + '?' + queryString.stringify(_.pick(options, call.args));

    console.log(call, url, options);
    return rest.get(url)
      .on('success', function (data) {
        if (data.ok) {
          cb(null, data);
        } else {
          cb(new Error("Failed call: " + call + "\n" + JSON.stringify(data)));
        }
      })
      .on('error', function (error) {
        cb(error);
      });
  },

  addText: function (text) {
    var options = this.options;
    if (_.isString(options.text) && text) {
      options.text = options.text + text;
    } else if (text) {
      options.text = text;
    }
  }
};

module.exports = SlackPost;