const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

const getVideoToken = (req, res) => {
  const { identity, roomName } = req.query;
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    {
      ttl: MAX_ALLOWED_SESSION_DURATION,
    }
  );
  token.identity = identity;
  const videoGrant = new VideoGrant({ room: roomName });
  token.addGrant(videoGrant);
  res.json({ token: token.toJwt() });
};

export default getVideoToken;
