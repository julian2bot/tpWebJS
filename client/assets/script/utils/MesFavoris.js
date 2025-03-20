
export default class MesFavoris{
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

    
    static getFavoris() {
        return JSON.parse(localStorage.getItem("fav")) || [];
    }
    
    static estFavoris(id){
        if(MesFavoris.getFavoris().includes(String(id))){
            return "heartsColor"
        }
        return "";
    }
}