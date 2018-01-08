var faker = require('faker');
var cheerio = require('cheerio');
var _ = require('underscore');
var pageMapper = {login:{page:'login',titles:['login'], inputs:['username','login']  }};




function AI(){
    this.data;
    this.getPageData = function(data){
        this.data  = data;
        var pageTypes = _.keys(pageMapper);
            _.map(pageTypes,function(page){     })

    }
    this.decidePage = function(){
        return pageType;
    }
}

function getPageInformation(browser,callback,url=false){
    let data = {};
    if(url){
        browser.url(url)
    }
    browser.waitForElementVisible('body', 1000)
    browser.source(function (result) {
        browser.pause(1000);
        console.log(result.value);
        $ = cheerio.load(result.value);
        // Source will be stored in result.value

        data.title= $('title').text();
        console.log($('title').text());
        console.log($('input').length);
        data.inputs =  _.map($('input'),function(input){  console.log(input);  return input.attribs;    })
        data.links =  _.map($('a'),function(href){ return href.attribs; });
        callback(data);

    })

    browser.pause(2000);
}

function dates(inputs) {

    var arr = [];
    inputs.forEach(function (input) {
        var exp = /([r]?(Start|End)?Date)/g;
        var id = input.id;

        if (exp.test(id)) {
            var isStart = /(Start)/g;
            if(typeof(arr[id.charAt(0)])!='object')
                arr[id.charAt(0)] = {};
            if(isStart.test(id))
                arr[id.charAt(0)].start = id;
            else
                arr[id.charAt(0)].end = id;
        }

    });

}





module.exports = {
    'Login test': function (browser) {
        var url = 'http://localhost:9000';
            browser
                .url(url)
                .waitForElementVisible('body', 1000)
                .assert.title('Valley Login')
                .assert.visible('input[type=text]')
                .setValue('input[name="name"]', 'jlyman')
                .setValue('input[name="password"]', '@Password1')
                .waitForElementVisible('input[type="submit"]', 1000)
                .click('input[type=submit]')
                .pause(1000)
                .assert.title('Dashboard')
                .waitForElementVisible('body', 5000)

            getPageInformation(browser,function(data){
                var ai = new AI();
                var reportsPages = _.filter(data.links,function(link){ return link.href.indexOf('report')>-1; })
                _.each(reportsPages ,function(link){

                        //console.log(browser);
                        getPageInformation(browser,function(d){

                            /*
                                console.log(data);
                                browser.element('css selector','#vin_dates',function(result){
                                    var dateInputs = _.filter(data.inputs,function(input){ return input.id!=undefined && input.id.indexOf('Date')>=0   } );
                                    console.log(data);
                                    dates(dateInputs);
                                    if(result){
                                        browser.click('#vin_dates');
                                    }else{
                                        console.log('element does not exist');
                                    }

                                });

                            */


                            },url+link.href)

                })
                browser.end();
            });


    }

}
