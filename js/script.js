'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!',event);

  /*[DONE] remove class 'active' from all article links */

const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /*[DONE] add class 'active' to the clicked link */
  
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /*[DONE] remove class 'active' from all articles */

const activeArticles = document.querySelectorAll('.post.active');

for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}

  /*[DONE]get 'href' attribute frorm the clicked link */

const articleSelector = clickedElement.getAttribute('href')
  console.log(articleSelector)


  /*[DONE] find the correct article uisng the selector (value of 'herf' attribute) */

const targetArticle = document.querySelector(articleSelector)
  console.log(targetArticle)

  /* add class 'active' to the correct article */ 

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}