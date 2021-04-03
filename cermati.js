const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.cermati.com/artikel/terbang-sepuasnya-keliling-indonesia-dan-asean-cuma-rp-16-juta-begini-caranya';

const funcauthor = async (newlink) => {
    const response = await axios(newlink);
    const html = response.data;
    const $ = cheerio.load(html);
    console.log($(".content-body").find("div.post-info > span.post-author > span.author-name[itemprop=author]").text());
    return $(".content-body").find("div.post-info > span.post-author > span.author-name[itemprop=author]").text();
  };
  
  
  const funcrelatedarticle = async (newlink) => {
    const response = await axios(newlink);
    const $ = cheerio.load(response.data);
    console.log($(this).find("a").attr("href"));
    console.log($(this).find("a").attr("href"));
    return {
        url : $(this).find("a").attr("href"),
        title : $(this).find("a").attr("href")
    };
  }
  
  (async () => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
     
        const content = $(".list-of-articles > div.article-list-item");
        
        const items = [];
        content.each(function() { items.push(this) });
        
        const listArticle = [];
  
        for (const item of items) {
            const mainurl = $(item).find("a[itemprop=url]").attr("href");
            const maintitle = $(item).find("div.item-text-holder > h3[itemprop=headline].item-title").text();
            const newlink = defaults+mainurl;
  
            const mainauthor = await funcauthor(newlink);
            console.log("Main Author");
            console.log(mainauthor.body);
            const mainpostingDate = $(item).find("div.item-description > span.item-publish-date > span[itemprop=datePublished]").text();
            
            listArticle.push({
                url : defaults+mainurl,
                title : maintitle,
                author : mainauthor,
                postingDate : mainpostingDate
            });
        }
  
        console.log(listArticle);
    } catch (err) {
        console.error(err);
    }
  })();