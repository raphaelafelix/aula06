/*/*
CONSUMINDO UMA API COM JAVASCRIPT
API: https://dog.ceo/api
*/

//================================
// 1- SELECIONAR ELEMENTOS DO HTML
//================================

const dogImage = document.getElementById("dogImage");
const breedName = document.getElementById("breedName");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const breedInput = document.getElementById("breedInput");
const dogArea = document.querySelector(".dog-area");

//=======================
// 2- URL BASE DA API
//=======================

const API_BASE = "https://dog.ceo/api";

//===========================
// 3- FUNÇÃO QUE CHAMA A API
//===========================

async function fetchFromApi(endpoint){

    dogArea.classList.add("loading");

    try {

        const url = `${API_BASE}${endpoint}`;
        console.log("Requisição:", url);

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Erro na requisição");
        }

        const data = await response.json();
        console.log("Resposta:", data);

        if (data.status === "success") {

            const imageUrl = data.message;
            dogImage.src = imageUrl;

            const breed = imageUrl.split("/")[4];
            const formattedBreed = breed.replace(/-/g," ");

            const finalBreed =
                formattedBreed.charAt(0).toUpperCase() +
                formattedBreed.slice(1);

            breedName.textContent = finalBreed;
        }

    } catch (error){

        console.error("Erro:", error);

        breedName.textContent = "Erro ao carregar";
        dogImage.src = "";

    } finally {

        dogArea.classList.remove("loading");

    }
}

//===========================
// 4- FUNÇÕES DE AÇÃO
//===========================

function getRandomDog(){
    fetchFromApi("/breeds/image/random");
}

function getBreedDog(){

    let breed = breedInput.value.toLowerCase().trim();

    if (!breed){
        alert("Digite uma raça!");
        return;
    }

    fetchFromApi(`/breed/${breed}/images/random`);
}

//===========================
// 5- EVENTOS
//===========================

randomBtn.addEventListener("click", getRandomDog);

searchBtn.addEventListener("click", getBreedDog);

dogImage.addEventListener("click", getRandomDog);

breedInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        getBreedDog();
    }
});

getRandomDog();
