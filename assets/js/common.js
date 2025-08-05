document.addEventListener("DOMContentLoaded", () => {
  // header
  const header = document.querySelector("header#header");
  const nav = document.querySelector("#navigation");
  const btnbox = document.querySelector(".btnbox");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add("hide");
      nav.classList.add("up");
      btnbox.classList.add("up");
    } else {
      header.classList.remove("hide");
      nav.classList.remove("up");
      btnbox.classList.remove("up");
    }

    lastScroll = currentScroll;
  });

  /*** 250801 : 전체체크박스 추가 ***/
  document.querySelectorAll(".checkAll").forEach((checkAll) => {
    const group = checkAll.closest(".tbl2");
    const rowChecks = group.querySelectorAll(".row-check");

    checkAll.addEventListener("change", function () {
      rowChecks.forEach((cb) => (cb.checked = this.checked));
    });

    rowChecks.forEach((cb) => {
      cb.addEventListener("change", () => {
        const allChecked = Array.from(rowChecks).every((chk) => chk.checked);
        checkAll.checked = allChecked;
      });
    });
  });
});

$(function () {
  $("#gnb ul.depth1 > li").hover(function () {
    if ($(this).hasClass("noHover")) return;
    $("#gnb ul.depth1 > li")
      .removeClass("on")
      .find(".dropMenu")
      .removeClass("on");

    $(this).addClass("on");
    $(this).find(".dropMenu").addClass("on");
    $("#gnb .dimmed").addClass("on");
    $("header#header").css({borderColor:'#ffffff'})
  });

  // 마우스가 전체 GNB를 벗어나면 드롭메뉴 닫기
  $("#gnb").on("mouseleave", function () {
    $("#gnb ul.depth1 > li")
      .removeClass("on")
      .find(".dropMenu")
      .removeClass("on");
    $("#gnb .dimmed").removeClass("on");
    $("body").removeClass("no-scroll");
  });

  //전체메뉴
  $(".menuBtn").click(function (e) {
    e.stopPropagation();

    $("#allMenu").toggleClass("on");
    $("#allMenu .dimmed").toggleClass("on");
    $(this).toggleClass("on");

    // gnb호버 제한
    if ($("#allMenu").hasClass("on")) {
      $("#gnb ul>.depth1 > li").off("mouseenter mouseleave");
      $("#util .user").addClass("noHover");

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
    $("#util .user").removeClass("noHover");
  }

  /*** 250730 : nav > .nav_box 닫히는 오류 수정 ***/
  // nav
  $(".btnbox").click(function () {
    $(this).closest("#navigation").toggleClass("hide");
    $(this).toggleClass("fold");
    $(this).find(".folding_btn").toggleClass("fold");
    $(".sec_wrap").toggleClass("full");
    $(".sec_wrap2").toggleClass("full");
    $(".main_inner").toggleClass("full");

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
      $(".sec_wrap").removeClass("full");
      $(".sec_wrap2").removeClass("full");
      $(".main_inner").removeClass("full");
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
$(function () {
  $(".it.date").datepicker({
    dateFormat: "yy.mm.dd",
    prevText: "이전 달",
    nextText: "다음 달",
    monthNames: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ],
    monthNamesShort: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    showMonthAfterYear: true,
    yearSuffix: "년",
  });
});

// 검색버튼 클릭
$(function () {
  $(".btn.blueBtn.srch").click(function () {
    $(this).toggleClass("on");
    $(".sec_wrap2.bg").toggleClass("on");
  });
});

/*** 250801 : 검색결과 추가 ***/
function resetToggle() {
  $(".sec .moreBtn").removeClass("show");
  $(".sec .sec_item").removeClass("on");
}

$(function () {
  resetToggle();

  $("header.underLine").click(function () {
    const sec = $(this).closest(".sec");

    $(this).toggleClass("show");

    if ($(this).hasClass("show")) {
      sec.find(".sec_item").addClass("on");
    } else {
      sec.find(".sec_item").removeClass("on");
    }
  });
});

// 검색영역 select 
$(document).ready(function () {
  if ($(".st.type2").length) {
    $(".st.type2").niceSelect();
  }
});
