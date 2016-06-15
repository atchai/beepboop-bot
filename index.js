var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false
})

// Connect to Slack RTM 
controller.spawn({
  token: token
}).startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error(err)
  }
  console.log('Connected to Slack RTM')
})

// Say "I'm here" when we're invited to join a channel
controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})

// Say "Hello" when we hear "hi"
controller.hears(['hi'], ['ambient', 'direct_message','direct_mention','mention'], function (bot, message) {
  bot.reply(message, 'Hello.')
})