var Promise = require('bluebird'),
  queryString = require('querystring'),
  rest = require('restler'),
  argv = require('minimist')(process.argv.slice(2)),
  _ = require('lodash'),
  util = require('util'),
  slack = {
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
        description: "Get info of channel"
      }
    }
  },
  token = "",
  countHistory = 10;

_.mixin(require('lodash-deep'));

argv.token = argv.token || process.env.SLACK_TOKEN;

function onComplete() {

}

function onError() {

}

function withAuth(cb) {
  return rest.get(slack.auth.test.uri + '?' + queryString.stringify(_.pick(argv, slack.auth.test.args)))
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
}

function withCall(call, cb) {
  var url = call.uri + '?' + queryString.stringify(_.pick(argv, call.args));
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
}

if (argv.help) {
  console.log([
    "The following commands are available:",
    util.inspect(slack, true, 5)
  ].join('\n  '));
  return;
}

withAuth(function (err, auth) {
  if (err) {
    return console.error(err);
  }
  console.log(util.inspect(auth, true, 5));

  _.assign(argv, _.omit(auth, ['ok']));

  console.log(argv);

  argv.call = argv.call || argv._[0];

  if (argv.call) {
    var call = _.deepGet(slack, argv.call);
    if (!call) {
      return console.error("Missing call, i.e., slack-post auth.test")
    }

    withCall(_.deepGet(slack, argv.call), function (err, results) {
      if (err) {
        return console.error(err);
      }
      console.log(util.inspect(results, true, 5));
    })
  }
});