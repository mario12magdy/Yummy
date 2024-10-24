let loading = true



let navY = $(".nav-tab").outerWidth();
$(".open-close-icon").click(() => {
    // console.log($(".nav-tab").outerWidth());

    if ($(".side-nav-menu").css("left") == "0px") {

        $(".open-close-icon").removeClass("fa-x");
        $(".open-close-icon").addClass("fa-align-justify");

        $(".side-nav-menu").animate({ left: -navY }, 500);
        for (let i = 0; i < 6; i++) {
            $(".links li").eq(i).animate({ top: 300 },
                (i + 6) * 100
            )

        }
    }
    else {

        $(".open-close-icon").removeClass("fa-align-justify");
        $(".open-close-icon").addClass("fa-x");

        for (let i = 0; i < 6; i++) {
            $(".links li").eq(i).animate({ top: 0 },
                (i + 6) * 100
            )

        }



        $(".side-nav-menu").animate({ left: 0 }, 500)

    }
})
// $(".side-nav-menu").css("left", -navY)
$(".side-nav-menu").animate({ left: -navY }, 1000)


let main = document.querySelector('main .row');
if (loading == true){
    main.innerHTML =    ` <span class="loader text-center align-self-center"></span>`

}
async function searchByName(term) {
    loading = true
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    console.log(response.meals);


    displayMeals(response.meals)
}


function displayMeals(arr) {

    let cartona = '';

    for (let i = 0; i < arr.length; i++) {
        cartona += `
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6" onclick="getRecipe(${arr[i].idMeal})">
                <div class="meal position-relative overflow-hidden rounded-3">
                    <img class="w-100 " src="${arr[i].strMealThumb}"   alt="" >  
                    <div class="meal-layer position-absolute  d-flex align-items-center">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>                        
        `
    }

 main.innerHTML =    cartona
}

async function getCategories() {
    loading = true
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    console.log(response.categories);
    displayCategories(response.categories)


}
function displayCategories(arr) {

    let cartona = '';

    for (let i = 0; i < arr.length; i++) {
        cartona += `

            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
                <div class="meal position-relative overflow-hidden rounded-3" onclick="searchByName('${arr[i].strCategory}')">
                    <img class="w-100 " src="${arr[i].strCategoryThumb}"   alt="" >  
                    <div class="meal-layer position-absolute  d-flex flex-column align-items-center">
                         <h3>${arr[i].strCategory}</h3>
                         <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>                        
        `
    }

    main.innerHTML = cartona

}
async function getInrgedients() {
    loading = true

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    console.log(response.meals);
    displayInrgedients(response.meals)


}
function displayInrgedients(arr) {

    let cartona = '';

    for (let i = 0; i < arr.length; i++) {

        if (arr[i].strDescription != null) {
            cartona += `
          
            <div class="col-md-3 align-items-center text-center  text-light p-2 ingredientsMeals" onclick="getIngredientsMeals('${arr[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite text-light"></i>
                <h3 >${arr[i].strIngredient}</h3>                
                <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
                          
        `
        }
    }

    main.innerHTML = cartona

}
async function getArea() {
    loading = true

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    console.log(response.meals);
    displayArea(response.meals)


}
function displayArea(arr) {

    let cartona = '';

    for (let i = 0; i < arr.length; i++) {


        cartona += `
          
            <div class="col-md-3 align-items-center text-center  text-light p-2" onclick="getAreaMeals('${arr[i].strArea}')">
                <i class="fa-solid fa-house-laptop fa-4x text-light"></i>
                        <h3>${arr[i].strArea}</h3>
            </div>
                          
        `

    }

    main.innerHTML = cartona

}

async function getAreaMeals(area){
        loading = true

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json();
    console.log(response);
    
    displayMeals(response.meals);

}


async function getRecipe(mealID) {
        loading = true

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    response = await response.json()
    console.log(response.meals[0]);
    displayRecipe(response.meals[0])


}
function displayRecipe(obj) {


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (obj[`strIngredient${i}`]) {
            ingredients += `
            <li class="alert alert-info m-2 p-1">${obj[`strMeasure${i}`]} ${obj[`strIngredient${i}`]}</li>`
        }
    }

    let tags = obj.strTags?.split(",")
    // let tags = obj.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }





    let cartona = `
          
            <div class="row text-light   container">
            <div class="col-md-4  p-2 ">
                <img class="w-100 rounded-3" src="${obj.strMealThumb}" alt="">
                <h3>${obj.strMeal}</h3>
            </div>
            <div class="col-md-8  p-2">
                <h3>Instructions</h3>
                <p>${obj.strInstructions} </p>
                <h3>Area : ${obj.strArea}</h3>
                <h3>Category : ${obj.strCategory}</h3>
                <h3>Recipes :</h3>
                

                 
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${obj.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${obj.strYoutube}" class="btn btn-danger">Youtube</a>
                   

                   
                    

                </div>



            </div>
        </div>
                          
        `



    main.innerHTML = cartona

}
function displaySearch() {






    let cartona = `
          
          <div class="row  align-items-start">
              <div class="col-md-6"> <input id="searchByName" class="form-control text-light bg-transparent border-0 border-bottom" onchange="searchByName(this.value)" placeholder="Enter your Name..." type="text"> </div>
            <div class="col-md-6"> <input id="searchByLetter" class="form-control text-light bg-transparent border-0 border-bottom" onchange="searchByName(this.value)" placeholder="Search By letter..." maxlength="1" type="text"> </div>
          </div>
                          
        `



    main.innerHTML = cartona

}
function displayContact() {

    let cartona = `
          
          <div class="row gy-5 h-50 align-self-center">
           <div  class="col-md-6"> <input class="form-control bg-transparent " placeholder="Enter your Name" type="text"> </div>
            <div class="col-md-6"> <input class="form-control bg-transparent " placeholder="Enter your Email" type="email"> </div>
            <div class="col-md-6"> <input class="form-control bg-transparent " placeholder="Enter your Phone" type="tel"> </div>
            <div class="col-md-6"> <input class="form-control bg-transparent " placeholder="Enter your Age" type="number"> </div>
            <div class="col-md-6"> <input class="form-control bg-transparent " placeholder="Enter your Password" type="password"> </div>
            <div class="col-md-6"> <input class="form-control bg-transparent " placeholder="Re-password" type="password"> </div>
            <div class="col-md-12">
            <button class="btn btn-light">Submit</button>
          </div>            
        `



    main.innerHTML = cartona

}


async function getIngredientsMeals(ingredients){
    loading = true

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    response =await response.json();

    displayIngredientsMeals(response.meals)
    
}

function displayIngredientsMeals(arr){

    let cartona = '';

    for (let i = 0; i < arr.length; i++) {
        cartona += `
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6" onclick="getRecipe(${arr[i].idMeal})">
                <div class="meal position-relative overflow-hidden rounded-3">
                    <img class="w-100 " src="${arr[i].strMealThumb}"   alt="" >  
                    <div class="meal-layer position-absolute  d-flex align-items-center">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>                        
        `
    }

    main.innerHTML = cartona
}

// getInrgedients();
searchByName("");
// displayContact(); 
// displaySearch();

document.getElementById("Categories").addEventListener("click", () => {
    getCategories();
})
document.getElementById("Areas").addEventListener("click", () => {
    getArea();
})
document.getElementById("Inrgedients").addEventListener("click", () => {
    getInrgedients();
})
document.getElementById("Home").addEventListener("click", () => {
    searchByName("");
})
document.getElementById("logo").addEventListener("click", () => {
    searchByName("");
})
document.getElementById("Search").addEventListener("click", () => {
    displaySearch("");
})




document.getElementById("Contact").addEventListener("click", () => {
    displayContact("");
})




// document.getElementById("searchByName").addEventListener("change",()=>{
//     searchByName(document.getElementById("searchByName").value);
// })
// document.getElementById("searchByLetter").addEventListener("change",()=>{
//     searchByName(document.getElementById("searchByLetter").value);
// })










