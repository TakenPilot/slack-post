var SlackPost = require('./lib'),
  stdin = require('get-stdin'),
  argv = require('minimist')(process.argv.slice(2)),
  slack = new SlackPost(argv),
  _ = require('lodash'),
  util = require('util');

_.mixin(require('lodash-deep'));


if (argv.help) {
  console.log([
    "The following commands are available:",
    util.inspect(SlackPost.api, true, 5)
  ].join('\n'));
  return;
}



stdin(function (text) {
  slack.addText(text);

  return slack.withAuth(function (err, auth) {
    if (err) {
      return console.error(err);
    }

    _.assign(argv, _.omit(auth, ['ok']));

    if (argv.call) {
      var call = _.deepGet(SlackPost.api, argv.call);
      if (!call) {
        return console.error("Missing call, i.e., slack-post auth.test");
      }
      if (!_.all(argv, call.requiredArgs)) {
        return console.error("Missing required arguments " + JSON.stringify(call.requiredArgs));
      }

      return slack.withCall(call, function (err, results) {
        if (err) {
          return console.error(err);
        }
        console.log(util.inspect(results, true, 5));
      })
    }
  });
});



