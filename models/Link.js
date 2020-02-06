const { Schema, model, Types }   = require( 'mongoose' );

/**
 * Our user has name, password and own list of links array
 */
const schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  date: { tyep: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: 'User' },
});

module.exports = model( 'Link', schema );
