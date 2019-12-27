const knex = require('knex')({ // sql statement library
  client: 'sqlite',
  connection: {
    filename: './iGurbani.sqlite'
  },
  useNullAsDefault: true
});
const { parse } = require('json2csv');
const fsPromises = require('fs').promises;
const os = require('os');

let tmp = process.argv[2] || undefined;
if (tmp === undefined) {
  throw new Error('You need to specify a letter to search with');
}
const str = tmp.trim();

const allWords = [];
Promise.resolve()
  .then(() => {
    return knex.select('_id', 'source_id', 'gurmukhi', 'transliteration', 'english_ssk')
      .where('gurmukhi', 'like', `% ${str}%`)
      .from('shabad')
      .orderBy(['_id']);
    //.limit(100);
  })
  .then(data => {
    // search transliteration for all words starting with H- may be more than one
    const out = [];
    data.forEach(row => {
      let transliterationSentence = row.gurmukhi.split(' ');
      let words = transliterationSentence.filter(w => w.startsWith(str));
      words.forEach(w => {
        row.word = w;
        allWords.push(w);
        out.push(row);
      });
    });
    return out;
  })
  .then(data => {
    console.log(`Returned ${data.length} rows of Gurbani containing a word beginning with ${str}`);

    // put into a map based on matching words to find unique entries for the word
    let out = new Map([]);

    data.forEach(row => {
      out.set(row.word, row);
    });

    // sort map
    var mapAsc = new Map([...out.entries()].sort());
    return Array.from(mapAsc.values());
  })
  .then(data => {
    const allUniqueWords = normaliseAllWords(allWords);
    console.log(`Found ${allUniqueWords.length} unique words beginning with ${str}`);

    // write to a csv
    const filename = `${os.tmpdir()}/letter-${str}_${new Date().toISOString()}.csv`;
    console.log('Writing csv to', filename);
    const fields = Object.keys(data[0]);
    const csv = parse(data, { fields });

    return fsPromises.writeFile(filename, csv);
  })
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

/**
 * get a unique sorted list of all words using maps
 * @param {array} allWords 
 */
const normaliseAllWords = allWords => {
  let out = new Map([]);

  allWords.forEach(row => {
    out.set(row, row);
  });

  // sort map
  var mapAsc = new Map([...out.entries()].sort());

  return [...mapAsc.values()];
};