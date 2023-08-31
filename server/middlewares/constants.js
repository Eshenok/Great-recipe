const patternUrl = /(https?:\/\/)(w{3}\.)?([\w\-.]{1,})\.(ru|com|net|su|org)(\/\w{1}([\w\-/]{1,}))?(\.[a-z]{2,4})?$/;
const patternEmail = /([\w\-.]{1,})@([\w\-.]{1,})\.(ru|com)/;
const devSecurityKey = 'jwtkeysign27082023';

module.exports = {
  patternUrl, patternEmail, devSecurityKey
}
