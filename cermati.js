let axions = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axions.get('https://www.cermati.com/artikel/waspada-penipuan-akun-layanan-konsumen-palsu-kenali-ciri-cirinya')
    .then((response) => {
        if(response.status === 200){
            const html = response.data;
                const $ = cheerio.load(html);
                let cermatiList = [];
                $('#body sec').each(function(i, elem){
                    cermatiList[i] ={
                        judul: $(this).find(h1).text().trim(),
                        url: $(this).find('a').attr('href'),
                        author: $(this).find('.author-name').text().trim(),

                    }
                });
                const cermatiTrim = cermatiList.filter(n => n!= undefined)
                fs.writeFile('data/cermatiList.json',
                JSON.stringify(cermatiTrim, null, 4), (err)=>{
                    console.log('Write Scraping Is Success')
                })
        }
    }), (error) => console.log(err);
