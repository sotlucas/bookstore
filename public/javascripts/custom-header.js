$(document).ready(function() {
  $('.menu').click(function() {
    $('nav').toggleClass('active');
    $(this).find('i').toggleClass('fa-bars fa-times');
  })
});
