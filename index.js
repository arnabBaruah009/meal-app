const container = document.getElementById('container');
const search = document.getElementById('search');
const sub_btn = document.getElementById('sub-btn')
const result_display = document.getElementById('result-display');
const result_heading = document.getElementById('result-heading');
const meal_display = document.getElementById('meal-display');

async function searchMealbyID(element){
    const meal_id = element.id;
    let mealInfo = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`)).json();
    let jsonString = JSON.stringify(mealInfo.meals[0]);
    window.location.href = `./result_page.html?data=${jsonString}`;
}

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

    } catch (error) {
        console.log('Error in fetching data from the api',error)
        return;
    }
}

sub_btn.addEventListener('click', searchMeal);
