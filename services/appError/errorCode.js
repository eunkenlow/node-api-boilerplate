const HttpStatus = require('./httpStatus');

const error = (code, message, status = HttpStatus.InternalServerError) => (
  { code, message, status }
);

module.exports = {
  General: {
    InternalServerError: error(1, 'Internal server error.'),
    InvalidParameters: error(2, 'Invalid parameters.', HttpStatus.BadRequest),
  },
  Social: {
    General: error(10, 'Something went wrong.'),
    BadToken: error(11, 'Invalid social token.', HttpStatus.BadRequest),
    MissingEmail: error(12, 'Permissions not granted.', HttpStatus.BadRequest),
  },
  Auth: {
    General: error(20, 'Something went wrong.'),
    BadToken: error(21, 'Invalid token.', HttpStatus.Unauthorized),
  },
};
