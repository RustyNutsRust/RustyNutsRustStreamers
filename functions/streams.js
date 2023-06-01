const qs = require('querystring');
const axios = require('axios');
const { streamers } = require('./data/streamers.json');

exports.handler = async (event, context, callback) => {
  const opts = {
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scopes: '',
  }

  const streamerList = streamers.length ? streamers : process.env.STREAMERS.split(',');
  const params = qs.stringify(opts);
  const { data } = await axios.post(`https://id.twitch.tv/oauth2/token?${params}`);
  const url = `https://api.twitch.tv/helix/streams?user_login=${streamerList.join('&user_login=')}`;


  const {
    data: { data: streams },
  } = await axios.get(url,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  )

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ streams }),
  });
  
}
