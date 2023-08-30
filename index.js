// const handleCategory = () => {
//     console.log('ami 1')
//     fetch('')
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//     console.log('ami 2')

// }


//category data take and show the display 
let count = 0;
const handleCategory = async () => {
    // console.log('ami 1')
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json();
    const categories = data.data.news_category;
    // console.log(categories)
    // console.log('ami 2') 
    displayCategory(categories)

}

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');

    categories.slice(0,3).forEach(category => {
        
        count = count + 1;
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab hover:text-xl font-bold">${count} ${category.category_name}</a> 
        `
        categoryContainer.appendChild(div)
    });
}
//category data take and show the display complete


const handleLoadNews = async (categoryId) => {
    console.log(categoryId)
    const res = await fetch (`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await res.json()
    displayNews(data)

}

const displayNews = (data) => {
    
    const news = data.data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML=''
    news?.forEach((news) => {
        console.log(news)
        const div = document.createElement('div');
        div.classList = `card  bg-cyan-300 shadow-2xl`
        div.innerHTML = `
        <figure>
          <img src="${news.image_url}" alt="Shoes" />
        </figure>
        <div class="card-body">
          <div class="flex justify-between items-center	">
          <h2 class="font-bold text-xl">${news.title.slice(0,40)}</h2>
          <button class="btn text-white rounded-full bg-[#f344a4]">${news?.rating?.badge}</button>
          </div>
          <p>${news.details.slice(0,65)}</p>
          <p>Total views: ${news.total_view}</p>

          <div class="card-footer flex justify-between mt-8">
            <div class="flex">
              <div>
                <div class="avatar online">
                  <div class="w-14 rounded-full">
                    <img src="${news.author.img}">
                  </div>
                </div>
              </div>
              <div>
              <h6>${news.author.name}</h6>
              <small>${news?.author?.published_date
              }</small>
              </div>
            </div>
            <div>
              <button class="btn text-white bg-[#000000]">DETAILS</button>
            </div>
          </div>
        </div>        
        
        
        `

        cardContainer.appendChild(div)
    })
}


handleCategory()
handleLoadNews('01')
