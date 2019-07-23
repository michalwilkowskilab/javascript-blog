'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!', event);

  /*[DONE] remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /*[DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles){
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

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';


function generateTitleLinks(customSelector = '') {
  console.log(customSelector);
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  console.log(titleList);

  /* for each article */



  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  let html = '';

  for (let article of articles) {
    console.log(article);


    /* get the article id */

    const articleId = article.getAttribute('id')
    console.log(articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle)

    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML)

    /* insert link into titleList */

    titleList.insertAdjacentHTML('afterbegin', linkHTML)
    console.log(titleList)

    html = html + linkHTML;
    console.log(html)
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links)

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function clearMessages() {
  document.getElementById('messages').innerHTML = '';
}




const optArticleTagsSelector = '.post-tags .list';
const optArticleTagsElementSelector = '.post-tags .list li';


function generateTags(){
  
  /*[DONE] find all articles */
 const articles = document.querySelectorAll(optArticleSelector);
 console.log(articles);

  /*[DONE] START LOOP: for every article: */
  for(let article of articles){
  console.log(article);

    /*[DONE] find tags wrapper */
      const tagLinks = article.querySelector(optArticleTagsSelector);
      console.log(tagLinks);
  
    /*[DONE] make html variable with empty string */
      let html = '';

    /*[DONE]get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
  
    /*[DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-'+ tag +'">'+ tag +'</a></li>';
      console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagLinks.insertAdjacentHTML('beforeend', html)
    console.log(tagLinks)
    
    /* END LOOP: for every article: */
  }
 
}

generateTags();



function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const link = clickedElement.querySelector('a[href^="#tag-"]');
  console.log(link);

  const href = link.getAttribute('href');
  console.log('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active');
  console.log(activeTagLinks);

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
    console.log(activeTagLink);
  /* END LOOP: for each active tag link */
  }  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefLinks = document.querySelectorAll(href);
  console.log(hrefLinks);

  /* START LOOP: for each found tag link */
  for(let hrefLink of hrefLinks){

    /* add class active */
    hrefLink.classList.add('active')
    console.log(hrefLink);
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag +'"]');
}



function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll(optArticleTagsElementSelector)
  console.log('TAGI', links);

  /* START LOOP: for each link */
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler)
    console.log(link);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

const optArticleAuthorSelector = ".post-author "

function generateAutors(){

  /* find class active in "article"*/
  const activeArticles = document.querySelectorAll('.post.active')
  console.log(activeArticles);

  /* make LOOP for articles and add class active*/
  for(let activeArticle of activeArticles){
    activeArticle.classList.add('active');
    console.log(activeArticle);
  }

  /* find authors text in html */
  const names = document.querySelectorAll(optArticleAuthorSelector);
  console.log(names);

  /* make a LOOP and remove authors from html*/
  for(let name of names){
    name.innerHTML = '';
  }
  
  /*find all articles*/
  const authors = document.querySelectorAll(optArticleSelector);
  console.log(authors);
  
  /*LOOP for all articles*/
  for(let author of authors){

    /*find authors wraper*/
    const authorsWraper = author.querySelector(optArticleAuthorSelector);
    console.log(authorsWraper);

    /*[DONE] make html variable with empty string */
    let html = '';

    /*get tags from data-auhtor attribute */
    const dataAuthor = author.getAttribute('data-author');
    console.log(dataAuthor);

    /* generate HTML of the link */
    const linkHTML = '<span>by</span><a href="'+ dataAuthor +'">'+ dataAuthor +'</a>';
    console.log(linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log(html);

    /*inser link into authors wraper*/
    authorsWraper.insertAdjacentHTML('afterbegin', html);
    console.log(authorsWraper);
    
  }
}

generateAutors();

const optAuthorLinkSelector =  '.post-author a';

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Auhtor was clicked', clickedElement);

  /*get attribute 'href' from clickedElement*/
  const href = clickedElement.getAttribute('href');
  console.log(href);

  generateTitleLinks('[data-author~="' + href + '"]');
}
  

function addClickListenersToAuthors(){
  /* find links to authors*/
  const authors = document.querySelectorAll(optAuthorLinkSelector);
  console.log('AUTORZY', authors)

  /*start LOOP for all links*/
  for(let author of authors){
    author.addEventListener('click', authorClickHandler);
    console.log(author);

    /*end LOOP for each link*/
  }
}

addClickListenersToAuthors();