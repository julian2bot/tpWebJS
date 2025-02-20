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
                .then(html => {
                    container.innerHTML = html;
                    executeScripts(container);
                });
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



// todo :  c'est sensé executé le script car il est appelé dans detail.html qui est chargé eu fur et a mesure mais a changé ?
function executeScripts(container) {
    let scripts = container.querySelectorAll("script");
    scripts.forEach(script => {
        if (script.src) {
            let newScript = document.createElement("script");
            newScript.src = script.src;
            newScript.defer = true;
            document.body.appendChild(newScript);
            console.log("📜 Script ajouté :", newScript.src);
        } else {
            eval(script.innerText); // Pour les scripts inline
            console.log("📜 Script inline exécuté !");
        }
    });
}


window.addEventListener("hashchange", loadView);

window.addEventListener("load", loadView);
