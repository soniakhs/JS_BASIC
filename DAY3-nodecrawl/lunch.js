const { Builder , By ,Key , until} = require('selenium-webdriver');
const fs = require('fs');
const chrome = require('selenium-webdriver/chrome'); //크롬 전용 실행 옵션

async function lunch(date){
    //크롬창이 안뜨고 됨
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
    try{
        await driver.get(`http://www.y-y.hs.kr/lunch.view?date=${date}`);
        
        let dom = await driver.findElement(By.css(".menuName > span"));
        let menu = await dom.getText();

        // await driver.wait(until.titleIs('양영디지털고등학교  - 식단 상세보기'),1000);
        let img = await driver.findElement(By.css(".calorie img"));
        let src = await img.getAttribute("src");

        return {menu , src};
    }finally{
        console.log("종료");
        //자동으로 크롬창도 닫힘
        driver.quit();
    }
}


//이 js 파일을 외부에서 사용할 수 있도록 익스포트 해줌
module.exports.lunch = lunch;