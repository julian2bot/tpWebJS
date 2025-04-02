import { ENDPOINT } from "../config.js";

// Gestion des notes
export default class Note{
    // Recuperer la note d'un utilisateur pour un personnage 
    static getNotebyUserbycharacter = async (userID, characterID) => {
        try {
            const response = await fetch(`${ENDPOINT}note?idUser=${userID}&id=${characterID}`);
            if (!response.ok) throw new Error("Erreur lors de la récupération de la note");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    

    // Recuperer toutes les notes d'un personnage 
    static getnotesCharacter = async (characterID) => {
        try {
            const response = await fetch(`${ENDPOINT}note?id=${characterID}`);
            if (!response.ok) throw new Error("Erreur lors de la récupération de la note");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    
    // Calcul de la note moyene d'un personnage 
    static getMoyenneNoteCharacter = async (characterID) => {
        let lesNotes = await Note.getnotesCharacter(characterID)
        let nbNote = 0;
        let valeurNote = 0;
        
        // console.log(lesNotes)

        lesNotes.forEach(note => {
            nbNote++;
            valeurNote+=note.note;
        });
        console.log(valeurNote, nbNote)
        console.log(valeurNote/nbNote)
        if(nbNote===0){
            return 0;
            
        }
        return valeurNote/nbNote ?? 0
    }

    // Affichage d'une note pour un personnage donne 
    static async afficheNote(idCharacter){
        let noteMoyenne = await Note.getMoyenneNoteCharacter(idCharacter);
        const characterNoteMoyenne = document.getElementById(`characterNote-${idCharacter}`);
        characterNoteMoyenne.textContent = `${noteMoyenne} / 5`; 
    }

    // Gestion d'ajout / edit d'une note (les etoiles)  
    static async noteStar(userID, idCharacter){
        
            const character = document.getElementById(`character-${idCharacter}`);
            const stars = character.querySelectorAll(`#character-${idCharacter}.stars .star i`);
            const hiddenInput = character.querySelector("input[name='nbEtoile']");

            const starsContainer = character;
            console.log(starsContainer)
            if(stars != undefined && hiddenInput != undefined && starsContainer != undefined){
                let maNote = 0;
                let noteStar = await Note.getNotebyUserbycharacter(userID, idCharacter);
                
                if(noteStar.length!=0){
                    maNote= noteStar[0].note;
                }

                if(maNote>5){
                    maNote=5;
                }
                let selectedRating = maNote; 
                hiddenInput.value = selectedRating;
                updateStars(selectedRating);

                stars.forEach(star => {
                    // Gestion du clic
                    star.addEventListener("click", function (event) {
                        event.preventDefault(); // Empêche le saut de page
                        selectedRating = this.getAttribute("data-index");
                        hiddenInput.value = selectedRating;
                        starsContainer.classList.add("clicked"); // Active l'état cliqué
                        Note.saveNote(userID, idCharacter, selectedRating)
                        Note.afficheNote(idCharacter)
                        updateStars(selectedRating);
                    });
    
                    // Gestion du hover
                    star.addEventListener("mouseover", function () {
                        updateStars(this.getAttribute("data-index"));
                    });
    
                    // Retour à la note sélectionnée en quittant le hover
                    star.addEventListener("mouseout", function () {
                        updateStars(selectedRating);
                    });
                });
    
                function updateStars(rating) {
                    stars.forEach(s => {
                        const index = s.getAttribute("data-index");
                        if (index <= rating) {
                            s.parentElement.classList.add("staryellow");
                        } else {
                            s.parentElement.classList.remove("staryellow");
                        }
                    });
                }
            }

        }


        // Sauvegarde d'une note dans le json serveur 
        static async saveNote(userID, idCharacter, note){
            
            const response = await fetch(`${ENDPOINT}note/${idCharacter}`);
            
            let methode = "POST";
            let url = `${ENDPOINT}note/`;
            if (response.status !== 404) {
                methode = "PUT";
                url = `${ENDPOINT}note/${idCharacter}`;
            }

            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: methode,
                body: JSON.stringify(
                    {

                        id:idCharacter,
                        idUser:userID,
                        note:note

                    })
            })
            .then(res => {
                console.log('Save Success : ', res);
            })
            .catch(res => { console.log(res) });
        }
}

