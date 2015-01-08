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
      args: ['token', 'channel', 'text', 'username'],
      requiredArgs: ['token', 'channel', 'text'],
      description: "Post a message to a channel"
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
      description: "Get info of channel"
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
    var options = this.options;
    var url = call.uri + '?' + queryString.stringify(_.pick(options, call.args));
    console.log(call, url);
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