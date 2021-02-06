$(document).ready(function() {


  $(document).mousemove(function(e) {

  const cursor = $('#cursor');
  const target = $(event.target);

  // update position of cursor
  cursor.css('left', e.pageX-50).css('top', e.pageY-50);

  const isLinkTag = target.hasClass('circ') != target.hasClass('banner') != target.hasClass('button') != target.hasClass('button-light') != target.hasClass('id') != target.is('a') != target.is('img');
  const isHovered = cursor.hasClass('hoveredCursor');

  // toggle the cursor class if necessary
  if(isLinkTag && !isHovered) {

    cursor.addClass('hoveredCursor');

  } else if(!isLinkTag && isHovered) {

    cursor.removeClass('hoveredCursor');

  }

});

$(document).mouseleave(function(e) {

  const cursor = $('#cursor');
  cursor.hide()

});

$(document).mouseenter(function(e) {

  const cursor = $('#cursor');
  cursor.show()

});



  });
