# Sikh Baby Names

Returns a CSV of all Gurbani(scripture) words beginning with unique instances of the letter you specify.  Used to find Sikh baby names.

**NB** The software simply returns the last instance of a word which doesn't work for synonyms eg
`grB` and `grB` which can mean womb and ego respectively depending on context.

Uses the [http://beta.igurbani.com/]() database to search in:
- Guru Granth Sahib Jee
- Bhai Gurdas' Vaaran
- Dasam Granth

## install

```bash
# the sqlite3 node-gyp build may give you some jip, so be prepared to Google
npm install
```

## Usage

```bash
# node index.js <letter>
# eg if you've got a letter ਰ from the hukamnama

node index.js r

# will return the following output
Returned 25466 rows of Gurbani containing a word beginning with r
Found 1950 unique words beginning with r
Writing csv to /tmp/letter-r_2019-11-27T11:33:29.723Z.csv

```
Now you can open the CSV in the spreadsheet of your choice.
