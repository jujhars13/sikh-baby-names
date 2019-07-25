# Sikh Baby Names

Returns a CSV of all Gurbani(scripture) words beginning with the letter you specify.  Used to find Sikh baby names.

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

# or to use output in a spreadsheet

node index.js r >/tmp/rarra.csv
```
