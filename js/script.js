'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!',event);

  /*remove class 'active' from all article links */
  /* add class 'active' to the clicked link */
  /* remove class 'active' from all articles */
  /* get 'href' attribute frorm the clicked link */
  /* find the correct article uisng the selector (value of 'herf' attribute) */
  /* add class 'active' to the correct article */ 
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}