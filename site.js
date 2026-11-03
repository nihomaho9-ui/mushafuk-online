document.querySelectorAll('.langs').forEach(function(l){var b=l.querySelector('.lbtn');b.onclick=function(e){e.stopPropagation();var o=l.classList.toggle('open');b.setAttribute('aria-expanded',o)}});
function closeL(){document.querySelectorAll('.langs.open').forEach(function(l){l.classList.remove('open');l.querySelector('.lbtn').setAttribute('aria-expanded','false')})}
document.addEventListener('click',function(e){if(!e.target.closest('.langs'))closeL()});document.addEventListener('keydown',function(e){if(e.key==='Escape')closeL()});
