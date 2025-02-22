// load les views dans la page index en fonction du hash (#) dans l'url
function loadView() {
    let view = window.location.hash.substring(1); 

    let container = document.getElementById("app"); 

    switch (view) {
        case "listing":
            fetch("view/listing.html")
                .then(response => response.text())
                .then(html => {
                    container.innerHTML = html;
                    executeScripts(container);
                });            
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
                .then(html => {
                    container.innerHTML = html;
                    executeScripts(container);
                });            
            break;
        default:
            container.innerHTML = "<h2>Bienvenue sur l'application</h2>";
    }
}



// todo :  c'est sensé executé le script car il est appelé dans detail.html qui est chargé eu fur et a mesure mais a changé ?
// function executeScripts(container) {
//     let scripts = container.querySelectorAll("script");
//     scripts.forEach(script => {
//         if (script.src) {
//             let newScript = document.createElement("script");
//             newScript.src = script.src;
//             newScript.defer = true;
//             document.body.appendChild(newScript);
//             console.log("📜 Script ajouté :", newScript.src);
//         } else {
//             eval(script.innerText); // Pour les scripts inline
//             console.log("📜 Script inline exécuté !");
//         }
//     });
// }

// function executeScripts(container) {
//     let scripts = container.querySelectorAll("script");
//     scripts.forEach(script => {
//         let newScript = document.createElement("script");

//         if (script.src) {
//             newScript.src = script.src;
//             newScript.type = script.type || "text/javascript"; // Gérer les modules
//             newScript.defer = true;
//         } else {
//             newScript.textContent = script.textContent; // Charger les scripts inline
//         }

//         document.body.appendChild(newScript);
//         console.log("📜 Script ajouté :", newScript.src || "inline script");
//     });
// }



// permets de prendre les scripts de view et les ajouter dans le fichier index (car on get que le html brute, on execute pas le js)
function executeScripts(container) {
    let scripts = container.querySelectorAll("script");
    scripts.forEach(script => {
        let newScript = document.createElement("script");

        if (script.src) {
            // ajout de ca par chatgpt car il y a des modules qui doivent etre charger mais le sont pas (car module = chargement au refresh pas au dynamique)
            newScript.src = script.src + "?t=" + new Date().getTime(); // Ajout d'un paramètre de cache pour forcer le rechargement merci chatgpt lol
            newScript.type = script.type || "text/javascript"; 
            newScript.defer = true;

            if (newScript.type === "module") {
                newScript.onload = () => {
                    console.log("📜 Module chargé :", newScript.src);
                };
            }
        } else {
            newScript.textContent = script.textContent; 
        }

        document.body.appendChild(newScript);
        console.log("📜 Script ajouté :", newScript.src || "inline script");
    });
}

// si le hash (#) change
window.addEventListener("hashchange", loadView);

// si on refresh / charge la page
window.addEventListener("load", loadView);
