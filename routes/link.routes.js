const { Router }  = require( 'express' );
const config      = require( 'config' );
const shortID     = require( 'shortid' );
const Link        = require( '../models/Link' );
const authMidWR   = require( '../middleware/auth.middleware' );

const router      = Router();

// to generate a new short link by POST
router.post( '/generate', authMidWR, async ( req, res ) => {
  try {
    const baseURL = config.get( 'baseURL' );
    const { from } = req.body;

    const uniqueCode = shortID.generate();

    // check if we already have such short link
    const existingLink = await Link.findOne( { from } );

    if ( existingLink ) {
      return res.status( 200 ).json( { link: existingLink } );
    }

    const to = `${ baseURL }/t/${ uniqueCode }`;

    const newLink = new Link({
      uniqueCode, to, from, owner: req.user.userID,
    });

    await newLink.save();

    return res.status( 201 ).json({ newLink });
  }
  catch ( error ) {
    return res.status( 500 ).json(
      { message: 'link.routes.js -> An error occurred while "generate"... please try again!' },
    );
  }
});

// for getting all links
router.get( '/', authMidWR, async ( req, res ) => {
  try {
    // parse and find all links
    const links = await Link.find( { owner: req.user.userID } ); // Get data from frontend about User by JWT
    return res.json( links );
  }
  catch ( error ) {
    return res.status( 500 ).json(
      { message: 'link.routes.js -> An error occurred while "/"... please try again!' },
    );
  }
});

// get link by ID
router.get( '/:id', authMidWR, async ( req, res ) => {
  try {
    const link = await Link.findById( req.param.id );
    return res.json( link );
  }
  catch ( error ) {
    return res.status( 500 ).json(
      { message: 'link.routes.js -> An error occurred while "/:id"... please try again!' },
    );
  }
});

module.exports = router;
