const { APIWrapper } = require('../')
const snekfetch = require('snekfetch')

const API_URL = 'http://ws.audioscrobbler.com/2.0/'

module.exports = class LastFM extends APIWrapper {
  constructor () {
    super()
    this.name = 'lastfm'
    this.envVars = ['LASTFM_KEY', 'LASTFM_SECRET']
  }

  getUserInfo (user) {
    return this.request('user.getInfo', { user })
  }

  loveTrack (track, artist, sessionKey) {
    const api_sig = this.signature({ sk: sessionKey, track, artist, method: 'track.love' })
    return this.request('track.love', { track, artist, api_sig, sk: sessionKey }, true)
  }

  signature (signatureParams) {
    signatureParams.api_key = process.env.LASTFM_KEY
    const params = Object.keys(signatureParams).sort()
    let sigString = ''
    params.forEach(p => sigString += p + signatureParams[p])
    console.log(sigString + process.env.LASTFM_SECRET)
    return md5(sigString + process.env.LASTFM_SECRET)
  }

  request (method, queryParams = {}, write) {
    queryParams.method = method
    queryParams.api_key = process.env.LASTFM_KEY
    console.log(write)
    if (!write) return snekfetch.get(API_URL).query(queryParams).then(r => r.body)
    console.log(queryParams)
    console.log(snekfetch.post(API_URL).query(queryParams))
    return snekfetch.post(API_URL).query(queryParams).then(r => r.body)
  }
}
