const jwt     = require( 'jsonwebtoken' );
const config  = require( 'config' );

module.exports = ( req, res, next ) => {
  if ( req.method === 'OPTIONS' ) {
    return next();
  }

  try {
    const token = req.headers.authorozation.split( ' ' )[1]; // "Bearer TOKEN"

    if ( !token ) {
      return res.status( 401 ).json( { message: 'Not authorised' } );
    }

    // if token exist we need to decode them
    const decoded = jwt.verify( token, config.get( 'jwtSecret' ) );
    req.user = decoded;
    return next();
  }
  catch (error) {
    return res.status( 401 ).json( { message: 'Not authorised' } );
  }
}