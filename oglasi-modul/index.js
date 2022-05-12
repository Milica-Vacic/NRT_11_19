const fs=require('fs');
const { json } = require('stream/consumers');
const PATH='oglasi.json'

let oglasi=fs.readFileSync(PATH, (err, data) => {
    if (err) throw err;
        return data;
});
oglasi=JSON.parse(oglasi);

function snimi(data){
    fs.writeFileSync(PATH,JSON.stringify(data))
}

exports.sviOglasi=()=>{
    return oglasi
}


exports.getOglas=(id)=>{
    return oglasi.find(o=>o.id==id)
}

exports.filterKategorija=(kategorija)=>{
    return oglasi.filter(o=>o.kategorija==kategorija)
}

exports.filterOznaka=(oznaka)=>{
    return oglasi.filter(o=>o.oznaka.includes(oznaka))
}

exports.izmeniOglas=(id,noviO)=>{
    oglasi.forEach(o => {
        if (o.id==id){
            o=noviO
        }
    });
    snimi(oglasi)
}

exports.dodajOglas=(noviO)=>{
    let id=oglasi[length(oglasi)-1].id+1
    noviO.id=id
    oglasi.push(noviO)
    snimi(oglasi)
}

exports.obrisiOglas=(id)=>{
    oglasi=oglasi.filter(o=>o.id!=id)
    snimi(oglasi)
}