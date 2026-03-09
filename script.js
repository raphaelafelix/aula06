// CONSUMINDO UMA  API COM JAVASCRIPT
// API: https://dog.ceo/api


// 1 - SELECIONAR OS ELEMENTOS DO HTML

// Pegar a imagem do cachorro
const dogImage = document.getElementById("docImage");
// elemento onde aparece o nome da raça
const breedName = document.getElementById("breedName");

// botão que busca cachorro aleatório
const randomBtn = document.getElementById("randomBtn")

// botão que busca a raça
const searchBtn = document.getElementById("searchBtn")

// campo de input onde o usuário digita a raça 
const breedInput = document.getElementById("breedInput");

// área onde a imagem aparece
const dogArea = document.querySelector(".dog-area");


// ==============================================
// 2 - URL BASE DA API
// ==============================================

// Endereço principal da API
const API_BASE = "https://dog.ceo/api"


// ==============================================
// 3 - FUNÇÃO QUE CHAMA A API
// ==============================================

// função assíncrona que faz requisição do HTTP 
async function fetchFromApi(endpoint){
    // adiciona classe  de loading (mostra "Carregando...")
    dogArea.classList.add("loading")

    try{
        // montar a URL completa da requisição
        const url = `${API_BASE}${endpoint}`;

        // mostrar no console a URL chamada
        console.log("Requisição: ", url);

        // faz requisição HTTP para API
        const response = await fetch(url);

        // Converter para JSON
        const data = await response.json();

        // Mostrar a resposta no console
        console.log("Resposta: ", data);

        // Verificar se a API retornou com sucesso
        if(data.status === "success"){
            // URL da imagem retornada pela API
            const imageURL = data.message;
            // colocar a imagem no element <img>
            dogImage.src = imageURL;
            // extrai a raça da URL
            const breed = imageURL.split("/")[4];
            // substituir "-" por espaço
            const formattedBreed = breed.replace(/-/g, " ");

            // deixa a letra maiúscula
            const finalBreed =
            formattedBreed.charAt(0).toUpperCase() + 
            formattedBreed.slice(1);

            // mostra o nome da raça na tela
            breedName.textContent = finalBreed;

        } 

    }catch (erro){
        // mostrar erro no console 
        console.log("Erro:", error)

        // mensagem de erro para o usuário
        breedName.textContent = "Erro ao carregar"

        // remove imagem
        dogImage.src = "";
    } finally {
        // remove estado de loading
        dogArea.classList.remove("loading");
    }
}

fetchFromApi("/breeds/image/random")
