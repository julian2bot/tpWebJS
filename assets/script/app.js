// Fonction pour charger la vue correspondante
function loadView() {
    let view = window.location.hash.substring(1); // Ex: "#listing" → "listing"

    let container = document.getElementById("app"); // L'endroit où afficher les vues

    switch (view) {
        case "listing":
            fetch("view/listing.html")
                .then(response => response.text())
                .then(html => container.innerHTML = html);
            break;
        case "detail":
            fetch("view/detail.html")
                .then(response => response.text())
                .then(html => container.innerHTML = html);
            break;
        case "favoris":
            fetch("view/favoris.html")
                .then(response => response.text())
                .then(html => container.innerHTML = html);
            break;
        default:
            container.innerHTML = "<h2>Bienvenue sur l'application</h2>";
    }
}

// Détecter le changement de vue
window.addEventListener("hashchange", loadView);

// Charger la vue au démarrage
window.addEventListener("load", loadView);
