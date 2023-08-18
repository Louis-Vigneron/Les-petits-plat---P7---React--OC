import recipes from './Data/recipes.js';

function recoveryRecipes() {

    generateCardRecipe(recipes);
    sortList(recipes);
    algo();
    resetButton();
    displaySortOptions();
    selectSortOption();
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
    const displayOption = document.getElementById('selectedOption');
    const cleanMainBar = document.getElementById('search');
    options.forEach(el => {
        el.addEventListener("click", () => {
            let listOptions = el.closest("ul");
            let test = el.closest("div");
            let tests = test.querySelector(".searchBar");
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
                tests.value = '';
                cleanMainBar.value = '';
            }
        })
    });

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
            if (alreadySelect.length == 0) {
                generateCardRecipe(recipes);
                sortList(recipes);

            } else {
                displayCardRecipes(alreadySelect);
            }
            selectSortOption()
        })

    })
}

function displaySortList(array, id) {
    const sort = document.getElementById(id);
    sort.innerHTML = '';
    array.forEach(el => {
        sort.innerHTML += `<li class="main__sort__list__ul__select" id="${el}" role="listbox" aria-selected="false">${el}</li> `
    })
}

function generateCardRecipe(array) {
    const cardPlace = document.getElementById("recipesCard");
    const totalRecipes = document.getElementById("totalRecipes");
    totalRecipes.textContent = `${array.length} recettes`;
    cardPlace.innerHTML = ""
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

function displayCardRecipes(filterArray) {
    let tests = [];
    recipes.forEach(el => {
        let test = JSON.stringify(el)
        let k = filterArray.every(item => test.includes(item))
        if (k == true) {
            tests.push(el)
        }
    })
    generateCardRecipe(tests)
    sortList(tests);
    filterArray.forEach(el => {
        let removeTagList = document.getElementById(el)
        removeTagList.remove()
    })

    selectSortOption()
}


function algo() {
    const inputMain = document.getElementById("search");
    const inputTag = document.querySelectorAll('.searchBar');
    const oui = document.getElementById('noRecipes');
    let x = []
    let ops = []
    inputMain.addEventListener("input", () => {
        if (!checkInput(inputMain)) {
            if (inputMain.value.length > 2) {
                displayCardRecipes(alreadySelect)
                let hj = document.querySelectorAll(".main__recipes__card__description__title")
                ops = []
                hj.forEach(el => {
                    recipes.forEach(els => {
                        if (els.name == el.textContent) {
                            ops.push(els)
                        }
                    })
                })
                x = []
                ops.forEach(el => {
                    let test = JSON.stringify(el).toLowerCase()
                    if (test.includes(inputMain.value.toLowerCase()) == true) {
                        x.push(el);
                    }
                })
                if (x.length > 0) {
                    oui.innerHTML = ''
                    oui.style.padding = '0'
                    generateCardRecipe(x);
                    sortList(x);
                    alreadySelect.forEach(el => {
                        let removeTagList = document.getElementById(el)
                        removeTagList.remove()
                    })
                } else {
                    generateCardRecipe(x);
                    sortList(x);
                    oui.style.padding = '50px'
                    oui.innerHTML = `Aucune recette ne contient "${inputMain.value}" vous pouvez chercher «
                    tarte aux pommes », « poisson », etc.`
                }

            } else {
                displayCardRecipes(alreadySelect)
            }
            selectSortOption();
        }
    })
    let y = []
    inputTag.forEach(el => {
        let p = el.closest('div')
        let l = p.querySelector('.main__sort__list__ul')
        let value = [];
        let op = [];

        el.addEventListener("input", () => {
            if (!checkInput(el)) {
                displayCardRecipes(alreadySelect);
                let f = document.querySelectorAll(".main__recipes__card__description__title")
                op = []
                f.forEach(el => {
                    recipes.forEach(els => {
                        if (els.name == el.textContent) {
                            op.push(els)
                        }
                    })

                })
                value = [];
                l.querySelectorAll("li").forEach(el => {
                    value.push(el.textContent)
                });
                y = [];
                op.forEach(els => {
                    let test = JSON.stringify(els).toLowerCase()
                    if (test.includes(el.value.toLowerCase()) == true) {
                        y.push(els);
                    }
                })
                if (y.length > 0) {
                    oui.innerHTML = ''
                    oui.style.padding = '0'
                    generateCardRecipe(y);
                    let o = value.filter(t => t.toLowerCase().includes(el.value.toLowerCase()));
                    displaySortList(o, l.id);
                    selectSortOption();
                } else {
                    sortList(y);
                    oui.style.padding = '50px'
                    oui.innerHTML = `Aucune filtre ne correspond à "${el.value}"`
                }
            }
        })
    })
}

function resetButton() {
    let resetBtn = document.querySelectorAll("[type=reset]")
    const oui = document.getElementById('noRecipes');
    resetBtn.forEach(el => {
        el.addEventListener("click", () => {
            oui.style.padding = '0'
            oui.innerHTML = "";
            displayCardRecipes(alreadySelect);
        })
    })
}

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

    displaySortList(ingredients, 'ingredients')
    displaySortList(appliance, 'appliance')
    displaySortList(ustensils, 'ustensils')
}


function checkInput(nodeDuChamp) {
    let regexTest = /^[A-Za-z]{0,20}$/
    if (!nodeDuChamp.value || !regexTest.test(nodeDuChamp.value)) {
        return true;
    }
    else {
        return false;
    }
}


recoveryRecipes()