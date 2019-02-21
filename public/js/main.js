$("document").ready(function() {
  $(".cat").hover(
    function() {
      var imgSrc =
        "img/" +
        $(this)
          .children("a")
          .attr("title") +
        "-white.svg";
      $(this)
        .children("a")
        .children("img")
        .attr("src", imgSrc);
    },
    function() {
      var imgSrc =
        "img/" +
        $(this)
          .children("a")
          .attr("title") +
        "-black.svg";
      $(this)
        .children("a")
        .children("img")
        .attr("src", imgSrc);
    }
  );

  $(".sb").click(function() {
    var menu = $(".small-menu");
    menu.addClass("small-menu-show");
    menu.removeClass("hidden");
    menu.slideToggle("slow");
  });
});
