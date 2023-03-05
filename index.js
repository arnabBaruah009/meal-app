const container = document.getElementById('container');
const search = document.getElementById('search');
const sub_btn = document.getElementById('sub-btn')
const result_display = document.getElementById('result-display');
const result_heading = document.getElementById('result-heading');
const meal_display = document.getElementById('meal-display');
const favorite_list = document.getElementById('favorite-list');

//show suggestions
const searchSuggestions = document.getElementById('search-suggestions');

search.addEventListener('input', async function(){
    let curr_value = search.value;
    let curr_suggestions = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${curr_value}`)).json();
    
    searchSuggestions.innerHTML = '';
    curr_suggestions.meals.forEach(suggestion => {
        const option = document.createElement('option');
        option.value = suggestion.strMeal;
        searchSuggestions.appendChild(option);
    })
})

//get the full meal details, convert it to string and pass it through the url
async function searchMealbyID(element){
    const meal_id = element.id;
    let mealInfo = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`)).json();
    let jsonString = JSON.stringify(mealInfo.meals[0]);
    window.location.href = `./result_page.html?data=${jsonString}`;
}

//search all meals and display result
async function searchMeal(){

    try {
        const item = search.value;
        search.value = '';
        if(item == ''){
            alert('Please enter a name');
            return;
        }

        let data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)).json();

        if(data.meals == null){
            result_heading.innerHTML = `No result for '<strong>${item}</strong>'`;
            return;
        }

        result_heading.innerHTML = `Results for '<b>${item}</b>'`;
        meal_display.innerHTML = data.meals.map(meal => `
            <div class="meal-div" id="${meal.idMeal}">
                <div class="favorite-btn"><i data-id="${meal.idMeal}" class="fa-solid fa-heart"></i></div>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strMeal}</p>
            </div>
        `).join('');

        let meal_div = document.getElementsByClassName('meal-div');
        for(let element of meal_div){
            element.addEventListener('click', function(){
                container.innerHTML = '';
                searchMealbyID(element);
            })
        }

        //when favorite is clicked
        const favorite = document.querySelectorAll('.favorite-btn i');
        for(let fav of favorite){
            fav.addEventListener('click', function(event){
                event.stopPropagation();
                fav.classList.toggle('favorite-color');
                const meal_id = fav.getAttribute('data-id');
                const favorite_meal_div = document.getElementById(`${meal_id}`).cloneNode(true);
                favorite_meal_div.setAttribute('data-id', 'A'+meal_id);
                if(fav.classList.contains('favorite-color')){
                    favorite_list.append(favorite_meal_div);
                } else {
                    const child = favorite_list.querySelector(`[data-id=A${meal_id}]`);
                    favorite_list.removeChild(child);
                }
            })
        }
    } catch (error) {
        console.log('Error in fetching data from the api',error)
        return;
    }
}

sub_btn.addEventListener('click', searchMeal);


