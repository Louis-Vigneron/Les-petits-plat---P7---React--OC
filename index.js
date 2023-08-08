import recipes from './Data/recipes.js';

function recoveryRecipes() {

    const main = document.getElementById("main");
    const totalRecipes = document.getElementById("totalRecipes")

    let ingredients = [];
    let appliance = [];
    let ustensils = [];
 
    totalRecipes.textContent =`${recipes.length} recettes`

    recipes.forEach(el => {
        main.innerHTML +=
            `   
        <div class="main__card">
            <img class="main__card__img" src="./Assets/Photos Recettes/${el.image}" alt="${el.name}">
            <div class="main__card__time">${el.time} min</div>
            <div class="main__card__description">
                <h2 class="main__card__description__title">${el.name}</h2>
                <div class="main__card__description__recipe">
                    <h3 class="main__card__description__recipe__title">RECETTE</h3>
                    <p class="main__card__description__recipe__text">${el.description}</p>
                </div>
                <div class="main__card__description__ingredient">
                    <h3 class="main__card__description__ingredient__title">INGRÉDIENTS</h3>     
                    ${el.ingredients.map((ingredient) =>
                `   <div class="main__card__description__ingredient__tags">
                                <p class="main__card__description__ingredient__tags__type">${ingredient.ingredient}</p>
                                <p class="main__card__description__ingredient__tags__quantity">${ingredient.quantity ? ingredient.quantity : '-'} ${ingredient.unit ? ingredient.unit : ''}</p>
                            </div>
                            `).join('')
            }       
                </div>
            </div>
        </div>    
    `

    });

    sortList(ingredients, 'ingredients', 'ingredient');
    sortList(appliance, 'appliance', '');
    sortList(ustensils, 'ustensils', '');
    displaySortOptions();
    //selectSortOption();

}

function displaySortOptions() {
    const button = document.querySelectorAll('.main__sort__button');     
    button.forEach(el => {
        el.addEventListener("click", () => {
            let div = el.closest(".main__sort");
            let listOptions = div.querySelector(".main__sort__list"); 
            const expanded = listOptions.getAttribute('aria-expanded') === 'true';    
            const arrowDown = el.nextElementSibling;              
            listOptions.setAttribute('aria-expanded', !expanded);
            listOptions.style.display = expanded ? 'none' : 'block';
            arrowDown.style.display = "none";
        })
    })


}

/* function selectSortOption() {
    const listOptions = document.getElementById('ingredients');
    const options = document.querySelectorAll('[role="listbox"]');
    const button = document.getElementById('test');
    const arrowDown = document.querySelector('.fa-chevron-down');
    const expanded = listOptions.getAttribute('aria-expanded') === 'false';
    options.forEach(el => {
        el.addEventListener("click", () => {
            options.forEach(els => {
                els.setAttribute('aria-selected', "false");
            })
            listOptions.setAttribute('aria-expanded', "true");
            el.setAttribute('aria-selected', "true");
            let selectedOption = listOptions.querySelector('[aria-selected="true"]').id;
            button.textContent = selectedOption;
            listOptions.style.display = expanded ? 'none' : 'block';
            button.style.display = "block";
            arrowDown.style.display = "block";
        })
    });
} */

function sortList(array, types, type) {
    const sort = document.getElementById(types);
    recipes.forEach(els => {
        if (Array.isArray(els[types])) {
            els[types].forEach(el => {
                if (type == '') {
                    if (!array.includes(el)) {
                        array.push(el)
                    }
                } else {
                    if (!array.includes(el[type])) {
                        array.push(el[type])
                    }
                }
            })
        } else {
            if (!array.includes(els[types])) {
                array.push(els[types])
            }
        }

    })

    array.forEach(el => {
        sort.innerHTML += `<li class="main__sort__list__select" id="${el}" role="listbox" aria-selected="false">${el}</li> `
    })
}

recoveryRecipes()