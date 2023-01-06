$(document).ready(function () {
  var pageFlag = 0; // 휠 이벤트의 중복 실행을 막아줄 플래그 변수
  var pageIndex = 0; // 페이지의 순서를 기록할 변수
  var pageCount = $('[id*=page]').length - 1; // 아이디에 page를 포함한 객체의 개수를 구한다.
  $(document).on('wheel', function(e){ // 문서에 휠 이벤트를 연결한다.
    // 휠 이벤트의 휠델타 값을 구한다.
    var delta = e.originalEvent.wheelDelta;
    // 델타 값이 양수 이면 윗쪽으로 이동
    if(delta>0&&pageFlag==0&&pageIndex>0) { // 플래그가 0이고 페이지 인덱스가 0보다 크면
      pageFlag = 1; // 플래그를 1로 바꾸어 휠 이벤트의 중복 실행을 막는다.
      pageIndex--; // 페이지가 감소하여 윗쪽으로 이동
      var pageOffset = $('#page'+pageIndex).offset().top; // 이전 페이지의 오프셋 위치를 구한다.
      // animate 메서드의 특성으로 html 객체를 애니메이션 할 때 반드시 0.6초 이상의 시간을 주어야한다.
      $('html').animate({scrollTop: pageOffset}, 600, zeroFlag()); //콜백 함수로 플래그를 초기화 시킨다.
    }

    // 델타 값이 음수이면 아랫쪽으로 이동
    if(delta<0&&pageFlag==0&&pageIndex<pageCount) { // 플래그가 0 이고 페이지 인덱스가 최고 값보다 작으면
      pageFlag = 1; //플래그를 1로 바꾸어 휠 이벤트의 중복 실행을 막는다.
      pageIndex++; // 페이지가 증가하여 아랫쪽으로 이동
      var pageOffset = $('#page'+pageIndex).offset().top; // 다음 페이지의 오프셋 위치를 구한다.
      // animate 메서드의 특성으로 html 객체를 애니메이션 할 때 반드시 0.6초 이상의 시간을 주어야한다.
      $('html').animate({scrollTop: pageOffset}, 600, zeroFlag()); //콜백 함수로 플래그를 초기화 시킨다.
    }
  });

  // 1로 바뀐 페이지 플래그를 0.4초 후에 다시 0으로 바꿔준다.
  function zeroFlag() {
    setTimeout(() => {
      pageFlag = 0;
    }, 400); // 0.4초 후에 실행
  }

  // 메뉴를 클릭하였을 때 해당 메뉴의 인덱스 번호를 페이지 번호에 대입한다.
  $('#gnb>li').click(function(){
    pageIndex = $(this).index();
  });
});