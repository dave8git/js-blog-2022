'use strict'

const titleClickHandler = function(){
    event.preventDefault();
    const clickedElement = this; 
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    const hrefAttribute = clickedElement.getAttribute('href');
    const art = document.querySelector(hrefAttribute);
    art.classList.add('active');
}


const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';


function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    let articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = ''; 
    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const link = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        html += link;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();  

function generateTags() {
    const allArticles = document.querySelectorAll('article');  
    
    for(let article of allArticles) {
        let html = '';
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
        const dataTags = article.getAttribute('data-tags'); 
        const dataTagsTable = dataTags.split(' ');
        for(let dataTag of dataTagsTable) {
            const link = '<li><a href="#tag-'+dataTag+'">'+ dataTag +'</a></li> ';
            html += link;
        }
        tagsWrapper.innerHTML = html;
    }
}

generateTags(); 

function tagClickHandler(event) {
    event.preventDefault(); 
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for(let activeTag of activeTags) {
        activeTag.classList.remove('active');
    }
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    for(let tagLink of tagLinks) {
        tagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    const linksTags = document.querySelectorAll('a[href^="#tag-"]');
    for(let linkTag of linksTags) {
        linkTag.addEventListener('click', tagClickHandler);
    }

}

function generateAuthors() {
    const allArticles = document.querySelectorAll('article');
    let html = '';
    
    for(let article of allArticles) {
        const dataAuthor = article.getAttribute('data-author');
        const authorsWrapper = article.querySelector(optArticleAuthorSelector);
        const link = '<li><a href="#author-'+dataAuthor+'">'+dataAuthor+'</a></li>';
        authorsWrapper.innerHTML = link; 
    }
}

generateAuthors();

function authorClickHandler() {
    event.preventDefault(); 
    const clickedElement = this; 
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', ''); 
    generateTitleLinks('[data-author="' + author + '"]');
    
}

function addClickListenersToAuthors() {
    const linkAuthors = document.querySelectorAll('a[href^="#author-"]');
    for(let linkAuthor of linkAuthors) {
        linkAuthor.addEventListener('click', authorClickHandler);
    }
}
addClickListenersToAuthors();