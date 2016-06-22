window.onload = function() {
  var html = document.body.innerHTML;
  html = html.replace(/\s\s+/g,'');
  document.body.innerHTML = html;
};