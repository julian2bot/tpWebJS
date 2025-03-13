const Utils = {
    parseRequestURL : ()=>{
        let url = window.location.hash.slice(1).toLocaleLowerCase() || '/';
        console.log(url);
        let r = url.split('/');
        let request = {
            ressource : null,
            id : null,
            verb : null
        };

        request.ressource = r[1];
        request.id = r[2];
        request.verb = r[3];

        return request;
    }
}

export default Utils;