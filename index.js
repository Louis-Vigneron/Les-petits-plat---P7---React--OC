import recipes from './Data/recipes.js';


function recoveryRecipes() {   

    let ingredients = [];
    let appliance = [];
    let ustensils = [];
    
    generateCardRecipe(recipes);
    sortList(ingredients, 'ingredients', 'ingredient');
    sortList(appliance, 'appliance', '');
    sortList(ustensils, 'ustensils', '');
    algo(ingredients, 'searchIngredients', 'ingredients');
    algo(appliance, 'searchAppliance','appliance');
    algo(ustensils, 'searchUstensils', 'ustensils');    
    displaySortOptions();
    selectSortOption();    
    displayCardRecipes(main);
}

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
let alreadySelect = []
function selectSortOption() {
    const options = document.querySelectorAll('[role="listbox"]');
    const displayOption = document.getElementById('selectedOption')

    options.forEach(el => {
        el.addEventListener("click", () => {
            let listOptions = el.closest("ul");
            options.forEach(els => {
                els.setAttribute('aria-selected', "false");
            })
            listOptions.setAttribute('aria-expanded', "true");
            el.setAttribute('aria-selected', "true");
            let selectedOption = listOptions.querySelector('[aria-selected="true"]').id;
            let displayOptionList = listOptions.previousElementSibling;
            if (!alreadySelect.includes(selectedOption)) {
                displayOptionList.innerHTML += `<p class="main__sort__list__select__option" data-custom-value="${selectedOption}">${selectedOption} <i class="fa-solid fa-circle-xmark closeOptionSelect closeOptionSelect--list"></i></i></p>`;
                displayOption.innerHTML += `<p class="main__selected__option" data-custom-value="${selectedOption}">${selectedOption} <i class="fa-solid fa-xmark closeOptionSelect"></i></p>`;
                alreadySelect.push(selectedOption);
                cleanOptionSelect();
            }
        })
    });

}

function sortList(array, types, type) {
    
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
    displaySortList(array, types)   
}

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
        })
    })
}

function displaySortList(array, id){
    const sort = document.getElementById(id);      
    sort.innerHTML ='';
    array.forEach(el => {
        sort.innerHTML += `<li class="main__sort__list__ul__select" id="${el}" role="listbox" aria-selected="false">${el}</li> `
    })
}

function algo(array, id, idList){
    const mainResearch = document.getElementById(id)    
    let filterArray = [];
    mainResearch.addEventListener("input",()=>{     
         if(mainResearch.value.length > 2){                   
             if(array.filter(e => e.includes(mainResearch.value))){ 
                filterArray = array.filter(e => e.includes(mainResearch.value));
                displaySortList(filterArray, idList);   
                displayCardRecipes(filterArray)            
            } 
        } else {
            displaySortList(array, idList);            
            generateCardRecipe(recipes)
        }   
        selectSortOption();      
    })    
        
}

function generateCardRecipe(array){
    const cardPlace = document.getElementById("recipesCard");        
    const totalRecipes = document.getElementById("totalRecipes");
    totalRecipes.textContent = `${array.length} recettes`;
    cardPlace.innerHTML =""
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

function displayCardRecipes(filterArray){
    let test = [];
    recipes.forEach(els => {
        els.ingredients.forEach(el =>{
            if(el.ingredient.includes(filterArray[0])){
                test.push(els);
                generateCardRecipe(test)
            }             
        })
        if(els.appliance == filterArray[0]){
            test.push(els);
            generateCardRecipe(test)
        }
        if(els.ustensils.includes(filterArray[0])){
            test.push(els);
            generateCardRecipe(test)
        }
    })
}



recoveryRecipes()

