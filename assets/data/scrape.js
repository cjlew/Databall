const request = require('request');
const cheerio = require('cheerio');
const jsonfile = require('jsonfile');

const baseURL = 'https://www.basketball-reference.com/leagues/NBA_';

const YEARS = [];
for (let i = 2016; i >= 2000; i--){
  YEARS.push(i);
}

const TYPE = ['_per_game', "_totals"];
let DATA = [];

const makeFile = (data) => {
  // console.log(data);
  jsonfile.writeFile("assets/data/TOT2018.json", data);
};

const fetch = (createFile) => {
  request('https://www.basketball-reference.com/leagues/NBA_2018_totals.html',
            function(err, resp, body) {
          if (!err){
            const $ = cheerio.load(body);
            let headers = $('thead tr th');
            let stats = [];
            for (let i = 1; i < 30; i++) {
              // each stat is (headers[i].children[0].data);
              stats.push(headers[i].children[0].data);
            }
            stats[28] = 'PTS';
            let table = $('tr.full_table');
            // console.log(table[3].children[30].children[0].data);
            // console.log(table[11].children[4].children[0].children[0].data);
            //each stat is table[playernumber].children[statnumbr].children.data
            for (let rk = 0; rk < table.length; rk++) {
              let player = {};
              stats.forEach((stat,i) => {
                let value;
                if (i+1 === 1){
                  value = table[rk].children[i+1].attribs.csk;
                } else if (i+1 === 4) {
                  if (table[rk].children[i+1].children[0].children) {
                  value = table[rk].children[i+1].children[0].children[0].data;
                  }
                } else {
                  if (table[rk].children[i+1].children[0]) {
                  value = table[rk].children[i+1].children[0].data;
                  }
                }
                if (value) {
                  player[stat] = value;
                } else {
                  player[stat] = null;
                }
              });
              // console.log(player);
              DATA.push(player);
            }
            createFile(DATA);
        }
  });
};

fetch(makeFile);
