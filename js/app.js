const loadCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategories(data.data.news_category);
}

const displayNewsCategories = allCategories =>{
    const categoriesContainer = document.getElementById('categories-container');
    allCategories.forEach(category => {
        const categoriesDiv = document.createElement('div');
        categoriesDiv.classList.add('btn-group');
        categoriesDiv.classList.add('mx-3');
        categoriesDiv.innerHTML=`
        <button onclick="loadNews('${category.category_id}')" class="btn btn-primary" type="submit">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(categoriesDiv);
        toggleSpinner(true);
    });
}

const loadNews = async(category_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    let newsDetails = data.data;
    newsDetails.sort((a, b) => {
        return b.total_view - a.total_view;
        });
    displayAllNews(newsDetails);
}

const displayAllNews = allNews =>{

    const noNews = document.getElementById('not-found-msg');
        if(allNews.length === 0){
            noNews.classList.remove('d-none');
        }
        else{
            noNews.classList.add('d-none');
        }

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    allNews.forEach(news =>{

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        let newsText = news.details;
        newsText = newsText.slice(0,200);

        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${newsText}...</p>
                    <p class="card-text">
                        <small class="text-start text-muted">
                        <img src="${news.author.img}" class="rounded-circle" style="height: 50px;" alt="...">
                        ${news.author.name ? news.author.name : 'Author name not found'}<br>${news.author.published_date}</small> <span class="text-center"><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'Total View not found'}</span>
                        <span class="row justify-content-end"><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal"><i class="fa-brands fa-nfc-directional"></i></button></span>
                    </p>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
        toggleSpinner(false);
        document.getElementById('newsModal').addEventListener('click',function(){
            loadFullNews(news._id);
        })
    });
}

const loadFullNews = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayFullNews(data.data);
}

const displayFullNews = news =>{
    console.log(news);
    const modalTitle = document.getElementById('newsModalLabel');
    modalTitle.innerText = news.title;
    const newsFullDetails = document.getElementById('full-news');
    newsFullDetails.innerHTML = `
    <p>${news.details}</p>
    `;
}

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

loadCategories();
loadNews();