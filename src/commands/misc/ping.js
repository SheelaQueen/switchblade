const { Command } = require('../../')

module.exports = class Ping extends Command {
  constructor (client) {
    super(client)
    this.name = 'ping'
    this.aliases = ['pang', 'peng', 'pong', 'pung']
  }

  run (message) {
    message.channel.send(':ping_pong: ...').then((newMessage) => {
      newMessage.edit(`:ping_pong: \`${(newMessage.createdAt - message.createdAt)}ms\``)
    })
  }
}