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
      .orderBy(['_id']);
    //.limit(10);
  })
  .then(data => {
    // TODO search transliteration for all words starting with H- may be more than one
    const out = [];
    data.forEach(row => {
      let transliterationSentence = row.gurmukhi.split(' ');
      let words = transliterationSentence.filter(w => w.startsWith(str));
      words.forEach(w => {
        row.word = w;
        out.push(row);
      });
    });
    return out;
  })
  .then(data = {
    let out =new Map();

    // TODO put into a map based on matching words to find unique
    // TODO sort map
    // TODO also spit out first occurrence of word entire Gurmukhi sentence

  })
  .then(data => {
    let fields = Object.keys(data[1]);
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