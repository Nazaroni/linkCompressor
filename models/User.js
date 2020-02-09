const { Schema, model, Types }   = require( 'mongoose' );

/**
 * Our user has name, password and own list of links array
 */
const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
});

module.exports = model( 'User', schema );
