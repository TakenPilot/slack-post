var SlackPost = require('./lib'),
  stdin = require('get-stdin'),
  argv = require('minimist')(process.argv.slice(2)),
  slack = new SlackPost(argv),
  _ = require('lodash'),
  util = require('util');

_.mixin(require('lodash-deep'));


if (argv.help) {
  var apiStr = "";

  _.each(SlackPost.api, function (value, group) {
    _.each(value, function (value, name) {
      apiStr += "### " + group +  "." + name + ": " + value.description + "\n";
      apiStr += "* arguments: " + value.args.join(', ') + "\n";
      if (value.requiredArgs) {
        apiStr += "* required: " + value.requiredArgs.join(', ') + "\n";
      }
      apiStr += "\n";
    });
    apiStr += "\n";
  });

  console.log([
    "The following commands are available:",
    apiStr
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

      return slack.withCall(call, function (err, results) {
        if (err) {
          return console.error(err);
        }
        console.log(util.inspect(results, true, 5));
      })
    }
  });
});



