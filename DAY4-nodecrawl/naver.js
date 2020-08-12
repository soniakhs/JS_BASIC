
// ajax = 웹페이지의 이동없이 서버를 전송해주는 것,html 한페이지에서 계속 있는거임 ㅇㅇ 유튜브같은거. 
// ajax로 되어있는 사이트는 jsoup으로 파싱할 수가 없음.
// 왜냐하면 jsoup의 경우에는 html만 갖고와서 딱 뜯어오는건데. ajax로 만든 사이트는 스크립트가 실행을 해야함.
//이걸 보완해준게 셀레니움


//1. npm i selenium-webdriver
//2.... => 도움말 => 정보 => 업데이트 정보확인
//3.크롬 버전에 따라 chrome webdriver 다운 ㄱㄱ

const { Builder , By ,Key , until} = require('selenium-webdriver');
//자첵적인 드라이버 매니저가 셀레니움
//빌더 == 셀레니움과 크롬과 연결해주는 친구
//바이 == 여러가지 선택할 수 있는 메서드를 가지고 있는 객체 값을 가져오는 방식을 달리할 수 있음
//키 == 키 입력을 위해서 만들어놈

async function test(){
    //크롬 웹브라우저를 위한 드라이버를 로드함.
    //빌드 하는 순간 연결하는 순간 driver에 값이 들어오고 크롬을 재어할 수 있음.
    let driver = await new Builder().forBrowser('chrome').build();
    const fs = require('fs');
    
    try{
        await driver.get('http://www.naver.com');
        
        //키를 보내는 것.
        //리턴이 엔터임
        //리턴을 엔터키라고 부름 
        await driver.findElement(By.css("#query")).sendKeys("안녕하세요" , Key.RETURN );
        
        await driver.wait(until.titleIs('안녕하세요 : 네이버 통합검색'),1000); //타이틀이 이렇게 바뀔때까지 기다려 라는 뜻.
        let moreBtn = await driver.findElement(By.css(".sp_website .go_more"));
        moreBtn.click();

        // await driver.wait(until.titleIs('안녕하세요 : 네이버 웹사이트검색'),1000); 얘 대신 사용가능한것은
        //이 엘리먼트가 올때까지 기다리라는 뜻.
        await driver.wait(until.elementLocated(By.css("#nxfr_htp")),1000);

        let news = await driver.findElement(By.css("#nxfr_htp"));
        let img = await news.takeScreenshot();
        fs.writeFile('out.png',img,'base64',err=>{
            console.log(err);
        });
    }finally{
        console.log("종료");
    }
}
test();