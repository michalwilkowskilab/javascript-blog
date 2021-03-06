'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optAuthorCloudSelector = '.list.authors li a',
  optTagsCloudSelector = '.list.tags li',
  optArticleTagsSelector = '.post-tags .list',
  optArticleTagsElementSelector = '.post-tags .list li',
  optAuthorLinkSelector =  '.post-author a',
  optArticleAuthorSelector = ".post-author ";

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
  
  /*[DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /*[DONE]get 'href' attribute from the clicked link */

  const clickedArticleSelector = clickedElement.getAttribute('href'); 

  /*[DONE] find the correct article uisng the selector (value of 'herf' attribute) */

  const targetArticle = document.querySelector(clickedArticleSelector); 

  /*[DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id')

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */

    titleList.insertAdjacentHTML('afterbegin', linkHTML)

    html = html + linkHTML;
  }

  titleList.innerHTML= html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  
  /*[DONE] find all articles */
 const articles = document.querySelectorAll(optArticleSelector);

  /*[DONE] START LOOP: for every article: */
  for(let article of articles){

    /*[DONE] find tags wrapper */
      const tagLinks = article.querySelector(optArticleTagsSelector);
  
    /*[DONE] make html variable with empty string */
      let html = '';

    /*[DONE]get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
  
    /*[DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagLinks.insertAdjacentHTML('beforeend', html)
    
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

  const href = link.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active');

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefLinks = document.querySelectorAll(href);

  /* START LOOP: for each found tag link */
  for(let hrefLink of hrefLinks){

    /* add class active */
    hrefLink.classList.add('active')
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag +'"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll(optArticleTagsElementSelector)

  /* START LOOP: for each link */
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler)
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAutors(){

  /* find class active in "article"*/
  const activeArticles = document.querySelectorAll('.post.active')

  /* make LOOP for articles and add class active*/
  for(let activeArticle of activeArticles){
    activeArticle.classList.add('active');
  }

  /* find authors text in html */
  const names = document.querySelectorAll(optArticleAuthorSelector);

  /* make a LOOP and remove authors from html*/
  for(let name of names){
    name.innerHTML = '';
  }
  
  /*find all articles*/
  const authors = document.querySelectorAll(optArticleSelector);
  
  /*LOOP for all articles*/
  for(let author of authors){

    /*find authors wraper*/
    const authorsWraper = author.querySelector(optArticleAuthorSelector);

    /*[DONE] make html variable with empty string */
    let html = '';

    /*get tags from data-auhtor attribute */
    const dataAuthor = author.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTMLData = {id: dataAuthor, title: dataAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);

    /* add generated code to html variable */
    html = html + linkHTML;

    /*inser link into authors wraper*/
    authorsWraper.insertAdjacentHTML('afterbegin', html); 
  }
}

generateAutors();

function calculateTagsParams(tags){
console.log(tags);

  const params = {max: '0', min: '999999'}
  console.log(params)

  for(let tag in tags){
  console.log(tag + ' is used ' + tags[tag] + ' times ');

    if(tags[tag] > params.max){
    params.max = tags[tag];
    }
    else if(tags[tag] < params.min){
    params.min = tags[tag];
    }
  }
  return params;  
}

function calculateTagClass(count, params){
console.log(count, params);

const optCloudClassCount = 5;
const normalizedCount = count - params.min;
const normalizedMax = params.max - params.min;
const percentage = normalizedCount / normalizedMax;
const classNumber = Math.floor(percentage * (optCloudClassCount -1) + 1);
console.log(classNumber);
return classNumber
}

function generateTagsCloud(){

  const optCloudClassPrefix = 'tag-size-' 
   /* [NEW] create a new variable allTags with an empty object */
   let allTags = {};
 
   /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
   console.log(articles); 
 
   /* START LOOP: for every article: */
    for(let article of articles){
     console.log(article);
 
     /* find tags wrapper */
     const tagLinks = article.querySelector('.post-tags .list');
     console.log(tagLinks);
 
     /* get tags from data-tags attribute */
     const dataTags = article.getAttribute('data-tags');
     console.log(dataTags);
 
     /* split tags into array */
     const dataTagsArray = dataTags.split(' ');
     console.log(dataTagsArray);
 
     /* START LOOP: for each tag */
     for(let tag of dataTagsArray){
 
       /* [NEW] check if this link is NOT already in allTags */
       if(!allTags.hasOwnProperty(tag)){
         /* [NEW] add generated code to allTags object */
         allTags[tag] = 1;
       } else {
         allTags[tag]++;
       }
     }
   }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    console.log(tagList);

    /* [NEW] add calculate tags parameters */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
 
    /* [NEW] create variable for all links in HTML code */
    let allTagsData = {tags: []};
 
    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
 
      const tagLinkHTML = '<li><a class="'+ optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) +'" href ="#tag-'+ tag +'">' + tag + '</a>(' + allTags[tag] + ')</li> ';
      console.log('tagLinkHTML:', tagLinkHTML);
 
      /*[NEW] generate code of a link and add it to allTagsHTML*/
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
      /*[NEW] END LOOP: for each tag in allTags: */
    }
    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(tagList);
 }

generateTagsCloud();

function generateAuthorsCloud(){

  const optCloudClassPrefix = 'tag-size-' 

  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles); 
  
  for(let article of articles){
    const tag = article.getAttribute('data-author');
    console.log(tag)

    if(!allTags.hasOwnProperty(tag)){
      allTags[tag] = 1
    } else {
      allTags[tag]++;
        }  
  }
  
  const authorsList = document.querySelector('.list.authors');
  console.log(authorsList);
 
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  
  let allTagsData = {tags: []};

  for(let tag in allTags){

    const tagLinkHTML = '<li><a class="'+ optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) +'" href ="'+ tag +'">' + tag + '</a>(' + allTags[tag] + ')</li> ';
    console.log('tagLinkHTML:', tagLinkHTML);

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  authorsList.innerHTML = templates.authorCloudLink(allTagsData);
    console.log(authorsList);
  
}

generateAuthorsCloud();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Auhtor was clicked', clickedElement);

  /*get attribute 'href' from clickedElement*/
  const href = clickedElement.getAttribute('href');

  generateTitleLinks('[data-author ="' + href + '"]');
}
  
function addClickListenersToAuthors(){
  /* find links to authors*/
  const authors = document.querySelectorAll(optAuthorLinkSelector);
  console.log(authors)
  /*start LOOP for all links*/
  for(let author of authors){
    author.addEventListener('click', authorClickHandler);

    /*end LOOP for each link*/
  }
}

addClickListenersToAuthors();

function addClickListenersToAuthorsCloud(){
  const authors = document.querySelectorAll(optAuthorCloudSelector);
  console.log(authors)
  
  for(let author of authors){
    author.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthorsCloud();

addClickListenersToTagsCloud();

function addClickListenersToTagsCloud(){
  const authors = document.querySelectorAll(optTagsCloudSelector);
  console.log(authors)
  
  for(let author of authors){
    author.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTagsCloud();