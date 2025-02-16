function loadView() {
    let view = window.location.hash.substring(1); 

    let container = document.getElementById("app"); 

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

window.addEventListener("hashchange", loadView);

window.addEventListener("load", loadView);
