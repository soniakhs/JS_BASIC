const request = require('request');

const client_id = 'jXo4LFaHBDG9h8eaa8WC';
const client_secret = 'U9EBh0N_tu';

let query = "좀비";

let api_url = `https://openapi.naver.com/v1/search/movie.json?query=${encodeURI(query)}&start=11&display=30`; // json 결과
    //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
var options = {
    url: api_url,
    headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
};

// request.get("주소","옵션","콜백") || request.get(옵션","콜백")
request.get(options,(error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log(body);
    } else {
         console.log('error = ' + response.statusCode);
    }
});
