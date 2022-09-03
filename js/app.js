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
        <button onclick="displayAllNews('${category.category_id}')" class="btn btn-primary" type="submit">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(categoriesDiv);
    });
}

const loadNews = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.category_id);
}

const displayAllNews = allNews =>{
    const newsContainer = document.getElementById('news-container');
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
}
loadCategories();
displayAllNews();