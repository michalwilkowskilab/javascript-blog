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

  /*[DONE]get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);


  /*[DONE] find the correct article uisng the selector (value of 'herf' attribute) */

  const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

  /*[DONE] add class 'active' to the correct article */ 

  targetArticle.classList.add('active');
    console.log(targetArticle);
  }

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks()
{

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML="";
  console.log(titleList);
  
  /* for each article */

  const articles = document.querySelectorAll('.post');

    for(let article of articles){
      console.log(article);
    }

  /* get the article id */

  const articleId = optArticleSelector.getAttribute('id');
      console.log(articleId);

  /* find the title element */

  const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle)

  /* get the title from the title element */

  /* create HTML of the link */

  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTiltle + '</span></a></li>';
    console.log(linkHTML) 

  /* insert link into titleList */

  

}

function clearMessages(){
	document.getElementById('messages').innerHTML = '';
}

generateTitleLinks();

