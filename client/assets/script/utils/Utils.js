// Object pour l'url utile   
const Utils = {
    // Parse l'url   
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
    },
    // Parse la partie ID de l'url   
    parseListingId : ()=>{
        let id = Utils.parseRequestURL().id;
        console.log(id);
        if (id == null){
            return {};
        }
        id = id.replaceAll("%22", "\"");
        try {
            console.log(JSON.parse(`{${id}}`));
            return JSON.parse(`{${id}}`);            
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    // change la partie ID de l'url   
    updateListingId : (name="",page=-1, perpage=-1)=>{
        let param = Utils.parseListingId();
        console.log(name=="_")
        if(name=="_"){delete param["name"]}
        else if(name != ""){param.name = name;}
        if(page != -1){param.page = page;}
        if(perpage != -1){param.perpage = perpage;}

        let strParam = JSON.stringify(param);
        strParam = strParam.replace("{", "");
        strParam = strParam.replace("}", "");
        return strParam;
    }
}

export default Utils;