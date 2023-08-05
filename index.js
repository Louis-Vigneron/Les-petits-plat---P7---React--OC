import recipes from './Data/recipes.js';

function recoveryRecipes() {

    const main = document.getElementById("main");  
    recipes.forEach(el => {
        main.innerHTML += 
    `   
        <div class="main__card">
            <img class="main__card__img" src="./Assets/Photos Recettes/${el.image}" alt="${el.name}">
            <div class="main__card__description">
                <h2 class="main__card__description__title">${el.name}</h2>
                <div class="main__card__description__recipe">
                    <h3 class="main__card__description__recipe__title">RECETTE</h3>
                    <p class="main__card__description__recipe__text">${el.description}</p>
                </div>
                <div class="main__card__description__ingredient">
                    <h3 class="main__card__description__ingredient__title">INGRÉDIENTS</h3>     
                    ${ el.ingredients.map((ingredient) => 
                        `   <div class="main__card__description__ingredient__tags">
                                <p class="main__card__description__ingredient__tags__type">${ingredient.ingredient}</p>
                                <p class="main__card__description__ingredient__tags__quantity">${ingredient.quantity ? ingredient.quantity :'-'} ${ingredient.unit ? ingredient.unit :''}</p>
                            </div>
                            `).join('')   
                    }       
                </div>
            </div>
        </div>    
    `
    const ingredient = document.querySelector(".main__card__ingredient")
   
    });
    
}

recoveryRecipes()