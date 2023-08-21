import recipes from './Data/recipes.js';

//function for generate main page
function recoveryRecipes() {
    generateCardRecipe(recipes);
    sortList(recipes);
    algo();
    resetButton();
    displaySortOptions();
    selectSortOption();
    tagFromSearchBar()
}

//function for display tags lists
function displaySortOptions() {
    const button = document.querySelectorAll('.main__sort__button');
    button.forEach(el => {
        el.addEventListener("click", () => {
            let div = el.closest(".main__sort");
            let listOptions = div.querySelector(".main__sort__list");
            let arrowDown = el.closest("button");
            const expanded = listOptions.getAttribute('aria-expanded') === 'true';
            arrowDown.style.borderRadius = expanded ? '11px' : '11px 11px 0 0';
            listOptions.setAttribute('aria-expanded', !expanded);
            listOptions.style.display = expanded ? 'none' : 'block';
            arrowDown.innerHTML = expanded ? ` ${arrowDown.textContent} <i
            class="fa-solid fa-chevron-down"></i>` : `  ${arrowDown.textContent} <i
            class="fa-solid fa-chevron-up"></i>`
        })
    })


}

//function for select and display tag selected
let alreadySelect = [];
function selectSortOption() {
    const options = document.querySelectorAll('[role="listbox"]');
    const displayOption = document.getElementById('selectedOption');
    const cleanMainBar = document.getElementById('search');
    options.forEach(el => {
        el.addEventListener("click", () => {
            let listOptions = el.closest("ul");
            let selectDiv = el.closest("div");
            let selectInputClean = selectDiv.querySelector(".searchBar");
            options.forEach(els => {
                els.setAttribute('aria-selected', "false");
            })
            el.setAttribute('aria-selected', "true");
            let selectedOption = listOptions.querySelector('[aria-selected="true"]').id;
            let displayOptionList = listOptions.previousElementSibling;
            if (!alreadySelect.includes(selectedOption)) {
                displayOptionList.innerHTML += `<p class="main__sort__list__select__option" data-custom-value="${selectedOption}">${selectedOption} <i class="fa-solid fa-circle-xmark closeOptionSelect closeOptionSelect--list"></i></i></p>`;
                displayOption.innerHTML += `<p class="main__selected__option" data-custom-value="${selectedOption}">${selectedOption} <i class="fa-solid fa-xmark closeOptionSelect"></i></p>`;
                alreadySelect.push(selectedOption);
                cleanOptionSelect();
                displayCardRecipes(alreadySelect);
                selectInputClean.value = '';
                cleanMainBar.value = '';
            }
        })
    });

}

//function for remove selected tag
function cleanOptionSelect() {
    let button = document.querySelectorAll(".closeOptionSelect");
    button.forEach(el => {
        el.addEventListener("click", () => {
            let selectRemoveOption = el.closest("p");
            let removeOption = document.querySelectorAll(`[data-custom-value="${selectRemoveOption.dataset.customValue}"]`);
            alreadySelect = alreadySelect.filter((e) => e !== selectRemoveOption.dataset.customValue);
            removeOption.forEach(el => {
                el.remove()
            })
            if (alreadySelect.length == 0) {
                generateCardRecipe(recipes);
                sortList(recipes);

            } else {
                displayCardRecipes(alreadySelect);
            }
            selectSortOption();
        })

    })
}

//function for generate li on ul tag list
function displaySortList(array, id) {
    const sort = document.getElementById(id);
    sort.innerHTML = '';
    array.forEach(el => {
        sort.innerHTML += `<li class="main__sort__list__ul__select" id="${el}" role="listbox" aria-selected="false">${el}</li> `
    })
}

//function for generate and display card recipe
function generateCardRecipe(array) {
    const cardPlace = document.getElementById("recipesCard");
    const totalRecipes = document.getElementById("totalRecipes");
    totalRecipes.textContent = `${array.length} recettes`;
    cardPlace.innerHTML = "";
    array.forEach(el => {
        cardPlace.innerHTML +=
            `   
           <div class="main__recipes__card">
               <img class="main__recipes__card__img" src="./Assets/Photos Recettes/${el.image}" alt="${el.name}">
               <div class="main__recipes__card__time">${el.time} min</div>
               <div class="main__recipes__card__description">
                   <h2 class="main__recipes__card__description__title">${el.name}</h2>
                   <div class="main__recipes__card__description__recipe">
                       <h3 class="main__recipes__card__description__recipe__title">RECETTE</h3>
                       <p class="main__recipes__card__description__recipe__text">${el.description}</p>
                   </div>
                   <div class="main__recipes__card__description__ingredient">
                       <h3 class="main__recipes__card__description__ingredient__title">INGRÉDIENTS</h3>     
                       ${el.ingredients.map((ingredient) =>
                `   <div class="main__recipes__card__description__ingredient__tags">
                                   <p class="main__recipes__card__description__ingredient__tags__type">${ingredient.ingredient}</p>
                                   <p class="main__recipes__card__description__ingredient__tags__quantity">${ingredient.quantity ? ingredient.quantity : '-'} ${ingredient.unit ? ingredient.unit : ''}</p>
                               </div>
                               `).join('')
            }       
                   </div>
               </div>
           </div>    
       `
    });
}

//function for display recipe with selected tag(s)
function displayCardRecipes(filterArray) {
    let recipesFiltered = [];
    
    recipes.forEach(el => {
        let jsonRecipe = JSON.stringify(el);
        let checkEl = filterArray.every(item => jsonRecipe.includes(item));
        if (checkEl == true) {
            recipesFiltered.push(el)
        }
    })
    generateCardRecipe(recipesFiltered)
    sortList(recipesFiltered);
    filterArray.forEach(el => {
        let removeTagList = document.getElementById(el);
        if(removeTagList != null){
            removeTagList.remove();
        }        
    })
    selectSortOption();
}

//function to search for items when typing in the search bar
function algo() {
    
}

//function for reset input with the cross button
function resetButton() {
    let resetBtn = document.querySelectorAll("[type=reset]");
    const noRecipe = document.getElementById('noRecipes');
    resetBtn.forEach(el => {
        el.addEventListener("click", () => {
            noRecipe.style.padding = '0';
            noRecipe.innerHTML = "";
            displayCardRecipes(alreadySelect);
        })
    })
}

//function for generate array for tag list 
function sortList(array) {
    let ingredients = [];
    let appliance = [];
    let ustensils = [];
    if (array.length > 1) {
        array.forEach(els => {
            els.ingredients.forEach(elss => {
                if (!ingredients.includes(elss.ingredient)) {
                    ingredients.push(elss.ingredient)
                }
            })
            if (!appliance.includes(els.appliance)) {
                appliance.push(els.appliance)
            }
            els.ustensils.forEach(elss => {
                if (!ustensils.includes(elss)) {
                    ustensils.push(elss)
                }
            })
        })
    } else if (array.length == 1) {
        array[0].ingredients.forEach(elss => {
            if (!ingredients.includes(elss.ingredient)) {
                ingredients.push(elss.ingredient)
            }
        })
        if (!appliance.includes(array[0].appliance)) {
            appliance.push(array[0].appliance)
        }
        array[0].ustensils.forEach(elss => {
            if (!ustensils.includes(elss)) {
                ustensils.push(elss)
            }
        })
    }

    displaySortList(ingredients, 'ingredients');
    displaySortList(appliance, 'appliance');
    displaySortList(ustensils, 'ustensils');
}

//function regex to control input user
function checkInput(nodeDuChamp) {
    let regexTest = /^[A-Za-z]{0,20}$/
    if (!nodeDuChamp.value || !regexTest.test(nodeDuChamp.value)) {
        return true;
    }
    else {
        return false;
    }
}

//function for add tag from input bar 
function tagFromSearchBar(){
    const displayOption = document.getElementById('selectedOption');
    const searchButton = document.querySelectorAll('.searchButton');
    searchButton.forEach(el =>{
        el.addEventListener("click",(e)=>{           
            const form = el.closest('form');
            const inputBar = form.querySelector("input");
            e.preventDefault();
            displayOption.innerHTML += `<p class="main__selected__option" data-custom-value="${inputBar.value}">${inputBar.value} <i class="fa-solid fa-xmark closeOptionSelect"></i></p>`;
            alreadySelect.push(inputBar.value);
            displayCardRecipes(alreadySelect);
            cleanOptionSelect();
            inputBar.value = '';
        })
    })
}

recoveryRecipes()