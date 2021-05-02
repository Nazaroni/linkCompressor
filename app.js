const path          = require( 'path' )
const express       = require( 'express' )
const config        = require( 'config' )
const mongoose      = require( 'mongoose' )
const myAuthRoutes  = require( './routes/auth.routes' )
const myLinkRouter  = require( './routes/link.routes' )
const myRedirect    = require( './routes/redirect.routes' )

const app   = express();
const PORT  = config.get( 'port' ) || 5000

// middlewares
app.use( express.json( { extended: true } ) )

app.use( '/api/auth', myAuthRoutes )
app.use( '/api/link', myLinkRouter )
app.use( '/t', myRedirect )

if ( process.env.NODE_ENV === 'production' ) {
  app.use( '/', express.static( path.join( __dirname, 'client', 'build') ) )

  app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html') )
  })
}

/**
 * start the server with MongoDB
 */
const start = async () => {
  try {
    await mongoose.connect( config.get( 'mongoURL' ), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen( PORT, () => { console.log( `App has been started on port ${ PORT }...` ) })
  }
  catch ( errStart ) {
    console.log( 'App.js -> start -> Server error...', errStart.message )
    process.exit( 1 )
  }
};

start()
