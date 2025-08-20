"use strict"
const moz = {
    provincias: ["Cabo Delgado", "Niassa", "Nampula", "Zambezia", "Tete", "Manica", "Sofala", "Inhambane", "Gaza", "Maputo Província", "Maputo Cidade"],
    cabodelgado: {
        us: ["HR Mueda", "HR Montepuez", "HR Mocimboa da Praia", "HP Pemba", "HD Chiúre", "CS Quissanga","CS Palma", "CS Metoro", "CS Mecufi","CS Macomia","CS Ibo", "CS Balama", "CS Ancuabe"]
    },
    niassa: {
        us: ["HR Cuamba", "HP Lichinga", "HD Marrupa", "HD Mandimba", "CS Nipepe", "CS N'gauma", "CS Muembe","CS Metarica","CS Mecula", "CS Mecanhelas", "CS Mavago","CS Maua", "CS Chimbunila"]
    },
    nampula: {
        us: ["HR Ribaue","HR Namapa", "HR Angoche", "HM Nampula", "HG Marrere", "HD Nacala Porto", "HD Monapo", "HD Moma", "HC Nampula", "CS Rapale", "CS Nacaroa", "CS Nacala-A-Velha", "CS Murrupula", "CS Muecate", "CS Mossuril", "CS Memba", "CS Mecuburi", "CS Meconta", "CS Malema", "CS Liupo", "CS Larde","CS Lalaua", "CS Ilha de Moçambique"]
    },
    zambezia: {
        us: ["HP Quelimane","HD Morrumbala","HD Mocuba","HD Milange","HD Gurué","HD Gilé", "HD Alto Molócuè","HC de Quelimane","CS Pebane-Sede","CS Nicoadala-Sede","CS Namarroi-Sede","CS Namacurra-Sede","CS Mulevala","CS Mopeia-Sede","CS Molumbo","CS Mocubela","CS Maganja da Costa","CS Lugela-Sede","CS Luabo","CS Inhassunge-Sede","CS ILE-Sede","CS Derre","CS Chinde-Sede"]
    },
    tete: {
        us: ["HR Ulongue","HR Songo", "HR Mutarara","HP Tete", "HD Zumbo","CS Tsangano","CS Moatize", "CS Marara","CS Magoe", "CS Doa","CS Chifunde","CS Changara"]
    },
    manica: {
        us: ["HP Chimoio","HD Manica","HD Gondola","HD Catandica","CS Vanduzi","CS Sussundenga","CS Macossa","CS Macossa","CS Macate","CS Macate","CS Guro-Sede"]
    },
    sofala: {
        us: ["HR Nhamatanda","HR Marromeu","HR  Buzi", "HD Caia", "HC Beira", "CS Muanza", "CS Maringue-Sede", "CS Machanga", "CS Gorongoza-Sede","CS Dondo", "CS Chemba-Sede", "Chibabava-Sede"]
    },
    inhambane: {
        us: [ "HR Vilankulos","HR Chicuque","HP Inhambane","HD Quissico","HD Massinga","CS Panda","CS Morrumbene","CS Mabote","CS Jangamo","CS Inhassoro","CS Inharrime","CS Homoine","CS Funhalouro"]
    },
    gaza: {
        us: ["HR Mandlakazi","HR Chokwé","HR Chicumbane","HR Chicumbane (Antiga)","HR Chibuto","HP Xai-Xai","HD Mapai","HD Mapai (Antiga)","CS Massingir","CS Massangena","CS Mabalane","CS Guija","CS Chongoene"]
    }, 
    maputoprovincia: {
        us: ["HR Xinavane","HP Matola","HG Machava","CS Namaacha","CS Moamba","CS Matutuine","CS Marracuene","CS Magude","CS Boane"]
    },
    maputocidade: {
        us: ["Hospital Polana Caniço","HM Maputo", "HG Mavalane","HG José Macamo","HG Chamanculo", "HC Maputo","CS Catembe"]
    }
}
function formatarString(str) {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = str.replaceAll(/\W/g, "").toLowerCase();
    return str;
}
function notEmpty(...inputs) {
    let filledInput = 0;
    for (const input of inputs) {
        input.value !== "" && filledInput++;
    }
    if(filledInput >= inputs.length) return true
    else return false;
}
function listarProvincias() {
    const provDataList = document.getElementById("datalist-provincias");
    for (const prov of moz.provincias) {
        provDataList.innerHTML += `<option value="${prov}"></option>`;
    }
}
function listarUSs() {
    const usDataList = document.getElementById("datalist-us");
    const inputProv = document.getElementById("input-provincia");
    let provDefinida = formatarString(inputProv.value);
    usDataList.innerHTML = "";
    for (const prov in moz) {
        if(formatarString(prov) === provDefinida) {
            let USs = moz[prov].us;
            for (const us of USs) {
                usDataList.innerHTML += `<option value="${us}"></option>`;
            }
        }
    }
}

window.addEventListener("load", () => {
    listarProvincias();
    listarUSs();
    const inputProv = document.getElementById("input-provincia");
    inputProv.addEventListener("input", () => listarUSs());
});
