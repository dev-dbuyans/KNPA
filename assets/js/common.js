document.addEventListener("DOMContentLoaded", () => {
  // header
  const header = document.querySelector("header#header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    lastScroll = currentScroll;
  });



  // ul>li -> select
  const labels = document.querySelectorAll(".st_box .label.st");
  const resetBtn = document.querySelector(".resetSelectBtn");

  labels.forEach((label) => {
    const box = label.closest(".st_box");
    const options = box.querySelectorAll(".opts");

    label.addEventListener("click", () => {
      document.querySelectorAll(".st_box.on").forEach((openBox) => {
        if (openBox !== box) openBox.classList.remove("on");
      });

      box.classList.toggle("on");
    });

    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        label.textContent = opt.textContent;
        box.classList.remove("on");
      });
    });
  });

  resetBtn?.addEventListener("click", () => {
    labels.forEach((label) => {
      const defaultText = label.dataset.default;
      if (defaultText) label.textContent = defaultText;
      label.closest(".st_box").classList.remove("on");
    });
  });
});



$(function () {
  $("#gnb ul.depth1 > li").hover(

    function () {
      if ($(this).hasClass("noHover")) return;
      $("#gnb ul.depth1 > li").removeClass("on").find(".dropMenu").removeClass("on");

      $(this).addClass("on");
      $(this).find(".dropMenu").addClass("on");
      $("#gnb .dimmed").addClass("on");
    },

  );

  // 마우스가 전체 GNB를 벗어나면 드롭메뉴 닫기
  $("#gnb").on("mouseleave", function () {
    $("#gnb ul.depth1 > li").removeClass("on").find(".dropMenu").removeClass("on");
    $("#gnb .dimmed").removeClass("on");
    $("body").removeClass("no-scroll")
  });


  //전체메뉴
  $(".menuBtn").click(function (e) {
    e.stopPropagation();
    $("#allMenu").toggleClass("on");
    $("#allMenu .dimmed").toggleClass("on");
    $(this).toggleClass("on")


    // gnb호버 제한
    if ($("#allMenu").hasClass("on")) {
      $("#gnb ul>.depth1 > li").off("mouseenter mouseleave");

      // ESC / 외부 클릭시 닫기
      $(document).on("click.closeMenu", function (e) {
        if (!$(e.target).closest("#allMenu,.menuBtn").length) {
          closeAllMenu();
        }
      });

      $(document).on("keydown.closeMenu", function (event) {
        if (event.key === "Escape") {
          closeAllMenu();
        }
      });
    } else {
      $(document).off(".closeMenu");
    }
  });

  function closeAllMenu() {
    $("#allMenu").removeClass("on");
    $("#allMenu .dimmed").removeClass("on");
    $(".menuBtn").removeClass("on");
    $(document).off(".closeMenu");
  }


  /*** 250730 : nav > .nav_box 닫히는 오류 수정 ***/ 
  // nav
  $(".btnbox").click(function () {
  $(this).closest("#navigation").toggleClass("hide");
  $(this).toggleClass("fold");
  $(this).find(".folding_btn").toggleClass("fold");

  // 접고펼치면 클래스 초기화
  $("#navigation ul.depth1 > li").removeClass("on");
  $(".nav_box").removeClass("on");
});

$("#navigation ul.depth1 > li").click(function (e) {
  if (!$(e.target).closest("li").is(this)) return;

  // 접힌 상태면 nav 펼치기
  if ($("#navigation").hasClass("hide")) {
    $("#navigation").removeClass("hide");
    $(".btnbox").removeClass("fold");
    $(".folding_btn").removeClass("fold");
  }

  const isActive = $(this).hasClass("on");

  // 모든 메뉴 초기화
  $("#navigation ul.depth1 > li").removeClass("on");
  $(".nav_box").removeClass("on");

  // 현재 li 활성화
  if (!isActive) {
    $(this).addClass("on");
    $(this).find(".nav_box").addClass("on");
  }
});

$(".nav_box").on("click", function (e) {
  e.stopPropagation();
});


});

/* 탭메뉴  */
function tabMenu(tabName, num) {
  const tablist = document.querySelectorAll(".tabMenu_" + tabName + " button");

  tablist.forEach((item, index) => {
    const tabcont = document.querySelector(".tabCont_" + tabName + index);

    if (index == num) {
      tabcont.classList.add("on");
      item.classList.add("on");
    } else {
      tabcont.classList.remove("on");
      item.classList.remove("on");
    }
  });
}

/*** 250731 : datepicker, 검색영역 추가 ***/ 
$(function(){
  $(".it.date").datepicker({
    dateFormat: "yy.mm.dd",
    prevText: "이전 달",
    nextText: "다음 달",
    monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    monthNamesShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    showMonthAfterYear: true,
    yearSuffix: "년",

    //  beforeShow: function(input, inst) {
    //   setTimeout(function() {
    //     const inputOffset = $(input).offset();
    //     const inputHeight = $(input).outerHeight();
        
    //     $(inst.dpDiv).css({
    //       top: inputOffset.top + inputHeight + 5 + "px", // 아래로 10px 띄움
    //       left: inputOffset.left + -82 + "px"
    //     });
    //   }, 0);
    // }
  });
});


// 검색버튼 클릭
$(function(){
  $(".btn.blueBtn.srch").click(function(){
    $(this).toggleClass("on");
    $(".sec_wrap2.bg").toggleClass("on");
  });
})


