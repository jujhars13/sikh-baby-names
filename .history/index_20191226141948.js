const knex = require('knex')({ // sql statement library
  client: 'sqlite',
  connection: {
    filename: './iGurbani.sqlite'
  },
  useNullAsDefault: true
});
const { parse } = require('json2csv');
let str = process.argv[2].trim() || null;

Promise.resolve()
  .then(() => {
    return knex.select('_id', 'source_id', 'gurmukhi', 'transliteration', 'english_ssk')
      .where('gurmukhi', 'like', `% ${str}%`)
      .from('shabad')
      .orderBy(['source_id', '_id'])
      .limit(10);
  })
  .then(data => {
    let fields = Object.keys(data[0]);
    // todo search transliteration for all words starting with H- may be more than one
    // put into a map to find unique
    // sort
    // also spit out first occurrence of word entire Gurmukhi sentence
    const csv = parse(data, { fields });
    console.log(csv);
    return Promise.resolve(data);
  })
  .then(data => {
    // console.log('rows returned', data.length);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
