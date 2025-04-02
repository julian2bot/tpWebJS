
// Gestion des favoris
export default class MesFavoris{
    
    // Mets a jour les favoris dans le localStorage et mets le coeur de la bonne couleur
    static updateFavorites(id, dansFav = false) {
        let favs = JSON.parse(localStorage.getItem("fav")) || [];
        let elemCard = document.getElementById(`heart-${id}`);

        if (favs.includes(id)) {
            favs = favs.filter(num => num !== id);
            elemCard.classList.remove("heartsColor")
            elemCard.classList.remove("heartsAnime")
            if(dansFav){
                // cherche son parent
                const card = elemCard.closest(".card"); 
                if (card) {
                    card.remove();
                }
            
            }
        } else {
            favs.push(id);
            elemCard.classList.add("heartsColor")
            elemCard.classList.add("heartsAnime")
        }
    
        localStorage.setItem("fav", JSON.stringify(favs));
    }

    
    // Recupere les favoris du local storage sous forme de liste
    static getFavoris() {
        return JSON.parse(localStorage.getItem("fav")) || [];
    }
    
    // Prends l'ID d'un personnage et regarde s'il est dans nos favoris
    static estFavoris(id){
        if(MesFavoris.getFavoris().includes(String(id))){
            return "heartsColor"
        }
        return "";
    }
}