module.exports = class Listening {
  constructor (song) {
    this.song = song

    this._members = new Map()
  }

  get members () {
    this.updateMembers()
    return this._members
  }

  updateMembers () {
    return null
  }

  removeMember (member) {
    this._members.delete(member.id)
  }

  addMember (member) {
    this._members.set(member.id, {
      startedAt: new Date()
    })
  }
}
