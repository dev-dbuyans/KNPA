$(function () {

  // gnb호버 / 
  $("#gnb ul.depth1>li").hover(
    function () {
      if (!$(this).hasClass("noHover")) {
        $("body").addClass("no-scroll");
        $("#gnb>.dimmed").addClass("on")
      }
    },
    function () {
      if (!$(this).hasClass("noHover")) {
        $("body").removeClass("no-scroll");
        $("#gnb > .dimmed").removeClass("on");
      }
    }
  );



  //전체메뉴 
  $(".menuBtn").click(function (e) {
    e.stopPropagation();
    $("#allMenu").toggleClass("on");
    $("#allMenu .dimmed").toggleClass("on");

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
    $(document).off(".closeMenu");
  };



  //nav 접고 펼치기
  $(".btnbox").click(function () {
    $(this).closest("#navigation").toggleClass("hide");
    $(this).toggleClass("fold");
    $(this).find(".folding_btn").toggleClass("fold");

    // 접고펼치면 클래스 없애기
    $("#navigation ul.depth1 > li").removeClass("on")
    $(".nav_box").removeClass("on");
  });

  $("#navigation ul.depth1 > li").click(function () {
    if ($("#navigation").hasClass("hide")) {

      $("#navigation").removeClass("hide");
      $(".btnbox").removeClass("fold");
      $(".folding_btn").removeClass("fold");
    }
  });



  //nav 메뉴 드롭
  $("#navigation ul.depth1 > li").click(function () {
    const isActive = $(this).hasClass("on");

    $("#navigation ul.depth1 > li").removeClass("on");
    $(".nav_box").removeClass("on");

    if (!isActive) {
      $(this).addClass("on");
      $(this).next(".nav_box").addClass("on");
    }
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

document.addEventListener("DOMContentLoaded", () => {
  const labels = document.querySelectorAll('.label');

  labels.forEach((lb) => {
    lb.addEventListener('click', (e) => {
      const stBox = lb.parentNode;
      const optionList = lb.nextElementSibling;
      const optionItems = optionList.querySelectorAll('.opts');

      const isOpen = stBox.classList.contains('on');

      if (isOpen) {
        stBox.classList.remove('on');
        optionList.classList.remove('on');
        lb.classList.remove('on');

        optionItems.forEach((opt) => {
          opt.removeEventListener('click', () => {
            handleSelect(lb, opt);
          });
        });
      } else {
        stBox.classList.add('on');
        optionList.classList.add('on');
        lb.classList.add('on'); 

        optionItems.forEach((opt) => {
          opt.addEventListener('click', () => {
            handleSelect(lb, opt);
          });
        });
      }
    });
  });

  const handleSelect = (label, item) => {
    label.innerHTML = item.textContent;
    const stBox = label.parentNode;
    const optionList = label.nextElementSibling;

    stBox.classList.remove('on');
    optionList.classList.remove('on');
    label.classList.remove('on'); 
  };
});

