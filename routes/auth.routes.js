const { check, validationResult } = require( 'express-validator' );
const { Router }  = require( 'express' );
const bcryptjs    = require( 'bcryptjs' );
const jwt         = require( 'jsonwebtoken' );
const config      = require( 'config' );
const User        = require( '../models/User' );

const router      = Router();

// /api/auth/register
router.post(
  '/register',
  // middlewares. Validation input check
  [
    check( 'email', 'Incorrect email format').isEmail(),
    check( 'password', 'Password shoud be more than 5 symbols' ).isLength( { min: 6 } ),
  ],

  async ( req, res ) => {
    try {
      const errors = validationResult( req );

      // if error not empty sent back to from end errors
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( {
          errors: errors.array(),
          message: 'Registration data failure',
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne( { email } );

      // check if this email already occupied
      if ( candidate ) {
        return res.status( 400 ).json( { message: 'User with such email already exist' } );
      }

      // then we can register a new user with protected password
      const hashedPassword  = await bcryptjs.hash( password, 18 );
      const user            = new User( { email, password: hashedPassword } );

      res.status( 201 ).json( { message: 'User was created' } );
      return await user.save();
    }
    catch ( error ) {
      res.status( 500 ).json( { message: 'auth.routes.js -> An error occurred while register... please try again!' } );
      return error;
    }
  },
);

// /api/auth/login
router.post(
  '/login',

  [
    check( 'email', 'Please use correct email' ).normalizeEmail().isEmail(),
    check( 'password', 'Type password').exists(),
  ],

  async ( req, res) => {
    try {
      const errors = validationResult( req );

      // if error not empty sent back to from end errors
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( {
          errors: errors.array(),
          message: 'Login data failure',
        });
      }

      const { email, password } = req.body;

      // find user in database by email
      const user = await User.findOne( { email });

      if ( !user ) {
        return res.status( 400 ).json( { message: 'User with such email aren\'t exist' } );
      }

      // check if password from input match with registered user password
      const isMatch = await bcryptjs.compare( password, user.password );

      if ( !isMatch ) {
        return res.status( 400 ).json( { message: 'Wrong password, please try again' } );
      }

      // create token for clien <==> server communication
      const token = jwt.sign(
        { userID: user.id },
        config.get( 'jwtSecret' ),
        { expiresIn: '1h' },
      );

      // status by default 200, so less code ;)
      return res.json( { token, userID: user.id } );
    }
    catch ( error ) {
      return res.status( 500 ).json(
        { message: 'auth.routes.js -> An error occurred while register... please try again!' },
      );
    }
  },
);

module.exports = router;
