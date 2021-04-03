const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


axios.get('https://www.cermati.com/artikel/terbang-sepuasnya-keliling-indonesia-dan-asean-cuma-rp-16-juta-begini-caranya')
    .then((response)=>{
        if(response.status === 200){
            const html = response.data;
                const $ = cheerio.load(html);
                let cermatiList = [];
                $('.content-body').each(function(i, elem){
                    cermatiList[i]={
                        
                        title: $(this).find("h1.post-title[itemprop=headline]").text(),
                        author: $(this).find("div.post-info > span.post-author > span.author-name[itemprop=author]").text(),
                        postingDate: $(this).find("div.post-info > span.post-date > span[itemprop=datePublished]").text(),

                    }
                });


                const cermatiListTrim = cermatiList.filter(n => n != undefined)
                fs.writeFile('data/cermatiList.json',
                    JSON.stringify(cermatiListTrim, null, 4), (err)=>{
                        console.log('Write Scraping is Success!')
                    });
                }
    }), (error)=> console.log(err)