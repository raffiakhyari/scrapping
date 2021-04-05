const request = require('request');
const axios = require('axios');
// const { html } = require('cheerio');
const cheerio = require('cheerio');
const fs = require('fs');

const urlMain = 'https://www.cermati.com/artikel';
const url = 'https://www.cermati.com/artikel/terbang-sepuasnya-keliling-indonesia-dan-asean-cuma-rp-16-juta-begini-caranya';

  (async () => {
    try {
        const response = await axios.get(url);
        const mainresponse = await axios.get(urlMain);

        const html = response.data;
        const mainhtml = mainresponse.data;

        const $ = cheerio.load(html);
        const main$ = cheerio.load(mainhtml);
        
        const contentBody = $(".content-body");
        const mainContent = main$(".content-body");
        
        const items = [];
        // mainContent.each(function(){items.push(this)});
        contentBody.each(function(){items.push(this)});
        
        const listArticle = [];

        for (const item of items) {
            const urlMain = main$(item).find("a[itemprop=url]").attr("href");
            
            const title  = $(item).find("h1.post-title[itemprop=headline]").text();
            const Author = $(item).find("div.post-info > span.post-author > span.author-name[itemprop=author]").text();
            const postingDate = $(item).find("div.post-info > span.post-date > span[itemprop=datePublished]").text();
            const urlRelatedArtikel = $(item).find("div.side-list-panel > ul.panel-items-list > li> a").attr("href");
            const titleRelatedArtikel = $(item).find("div.side-list-panel >ul.panel-items-list> li > a > h5.item-title ").text();
            
            listArticle.push({
                    url : urlMain,
                    title : title,
                    author : Author,
                    postingDate : postingDate,
                    relatedArticle: {
                        url: urlRelatedArtikel,
                        title: titleRelatedArtikel,
                    },
                
            })
        }
        JSON.stringify(console.log(listArticle));
    } catch (err) {
        console.error(err);
    }
  })
();
   
        
        
