const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/scrape', (req, res) => {

    let url = 'http://www.imdb.com/title/tt1229340/';

    request(url, (error, response, html) => {
        if(!error){
            let $ = cheerio.load(html);

            let title, release, rating;
            let json = { title : "", release : "", rating : ""};
            $('.title_wrapper > h1').filter(function(){
                let data = $(this);
                title = data.text();
                release = data.children().last().children().text();
                json.title = title.trim();
                json.release = release;
            });

            $('.ratingValue > strong').filter(function(){
                let data = $(this);

                rating = data.children().text();
                json.rating = rating;
            });

            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
                console.log('File successfully written! - Check your project directory for the output.json file');
            });

            res.send("check your console...");
        }
    });

});

app.listen(8081);

console.log("scraping happens on port 8081");

exports = module.exports = app;