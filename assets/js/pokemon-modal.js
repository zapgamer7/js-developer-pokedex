const openModalButton = document.querySelector("#pokemon");  
const closeModalButton = document.querySelector("#close-modal");
const fade = document.querySelector("#fade");
const modal = document.querySelector("#modalPokemon");

const toggleModal = (id) =>{
    [modal, fade].forEach((el) => el.classList.toggle("hide"))

    if(id){
        loadPokemonModal(id)
    }else{
        modal.innerHTML = ""
    }

    
}