function Pager(nowPage, totalCnt , pn=10 , cn=10){
    let endPage = Math.ceil(nowPage/cn) * cn;
    //page nation을 그리기 위한 모든 자료. 
    let returnData = {
         endPage: endPage, // 한 챕터의 마지막 페이지 번호
         startPage: endPage - cn + 1, //한 챕터의 첫번째 페이지 번호
         totalPage: Math.ceil(totalCnt/pn), //총 페이지 번호.
         nowPage: nowPage , //현재 보이는 페이지
         next:true, //다음 챕터로 가는 버튼
         before:false //이전 챕터로 가는 버튼
     };

     if(returnData.startPage != 1){
         returnData.before = true;
     }
     if(returnData.totalPage <= returnData.endPage){
         returnData.next = false;
         returnData.endPage = returnData.totalPage;

     }

     return returnData;
}

module.exports.Pager = Pager;