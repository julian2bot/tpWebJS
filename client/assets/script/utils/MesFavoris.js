
export default class MesFavoris{
    static updateFavorites(id) {
        let favs = JSON.parse(localStorage.getItem("fav")) || [];
    
        if (favs.includes(id)) {
            favs = favs.filter(num => num !== id);
        } else {
            favs.push(id);
        }
    
        localStorage.setItem("fav", JSON.stringify(favs));
    }
    
    static getFavorites() {
        return JSON.parse(localStorage.getItem("fav")) || [];
    }
    
}