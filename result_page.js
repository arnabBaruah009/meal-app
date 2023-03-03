const urlParams = new URLSearchParams(window.location.search);
const data = urlParams.get('data');
const obj = JSON.parse(data);

//setting the image
const img = document.querySelector('#vertical-div img');
img.setAttribute('src', obj.strMealThumb);
img.setAttribute('alt', obj.strMeal);

//setting the name
const meal_name = document.getElementById('meal-name');
meal_name.innerHTML = `<h2>${obj.strMeal}</h2>`

//setting the ingredients list
const ingredient_list = document.getElementById('ingredients-list');

for(let i=1;;i++){
    if(!obj['strIngredient' + i]){
        break;
    }

    const li = document.createElement('li');
    li.textContent = obj['strIngredient' + i];
    ingredient_list.append(li);
}

//setting the youtube video
const video_id = obj.strYoutube.split('=')[1];
const iframe = document.querySelector('#meal-info iframe');
iframe.setAttribute('src', `https://www.youtube.com/embed/${video_id}`);

//setting the instructions
const instructions = document.querySelector('#meal-info span');
instructions.textContent = obj.strInstructions;
