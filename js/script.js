'use strict'

const titleClickHandler = function(){
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
}

const links = document.querySelectorAll('.titles a');
for(let link of links){
    link.addEventListener('click', titleClickHandler);
}
