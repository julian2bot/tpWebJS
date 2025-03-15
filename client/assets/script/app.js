// load les views dans la page index en fonction du hash (#) dans l'url
import Detail from "./view/Detail.js";
import Listing from "./view/Listing.js";
import Favoris from "./view/Favoris.js";
import Login from "./view/Login.js";
import Utils from "./utils/Utils.js";

const routes = {
    "/" : Login,
    "/login" : Login,
    "/listing" : Listing,
    "/detail" : Detail,
    "/favoris" : Favoris
};

const rooter = async () => {
    const content = document.querySelector("#app");

    let request = Utils.parseRequestURL();

    // console.log(request);

    let parsedURL = (request.ressource ? "/"+request.ressource : "/") + (request.id ? "/:id" : "") + (request.verb ? request.verb : "");

    // console.log(parsedURL);
    let page = routes[parsedURL] ? routes[parsedURL] : Listing;

    // console.log(page)

    content.innerHTML = await page.render();
    await page.init();
}

window.addEventListener("hashchange",rooter);
window.addEventListener("load",rooter);