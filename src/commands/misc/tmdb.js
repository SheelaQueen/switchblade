const { CanvasTemplates, CommandStructures, Constants, SwitchbladeEmbed } = require('../../')
const { Command, CommandRequirements } = CommandStructures
const { Attachment } = require('discord.js')

module.exports = class TMDBCommand extends Command {
  constructor (client) {
    super(client)
    this.name = 'tmdb'
    this.subcommands = [
      new Movie(client, this),
      new Serie(client, this)
    ]

    this.requirements = new CommandRequirements(this, { apis: ['tmdb'] })
  }

  async run ({ t, author, prefix, alias, channel, }) {
    const embed = new SwitchbladeEmbed(author)
    embed.setDescription(this.subcommands.map(subcmd => {
      return `**${prefix}${subcmd.fullName}** - ${t(`commands:${subcmd.tPath}.commandDescription`)}`
    }).join('\n'))
    channel.send(embed)
  }
}

class Movie extends Command {
  constructor (client, parentCommand) {
    super(client, parentCommand)
    this.name = 'movie'
    this.aliases = [ 'mov', 'm' ]
  }

  async run ({ t, author, channel }) {
    channel.startTyping()



    channel.send('corno filme').then(() => channel.stopTyping())
  }
}

class Serie extends Command {
  constructor (client, parentCommand) {
    super(client, parentCommand)
    this.name = 'serie'
    this.aliases = [ 's' ]
  }

  async run ({ t, author, channel }) {
    channel.send('corno serie').then(() => channel.stopTyping())
  }
}
