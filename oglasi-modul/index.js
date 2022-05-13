const fs=require('fs');
const { parse } = require('path');
const { json } = require('stream/consumers');
const PATH='oglasi.json'

let oglasi=[]

let osvezi=()=>{
    oglasi=fs.readFileSync(PATH, (err, data) => {
        if (err) throw err;
            return data;
    });
    oglasi=JSON.parse(oglasi);
}
osvezi()


function snimi(data){
    fs.writeFileSync(PATH,JSON.stringify(data))
}

exports.sviOglasi=()=>{
    osvezi()
    return oglasi
}


exports.getOglas=(id)=>{
    return oglasi.find(o=>o.id==id)
}

exports.filterKategorija=(kategorija)=>{
    return oglasi.filter(o=>o.kategorija==kategorija)
}

exports.filterOznaka=(oznaka)=>{
    return oglasi.filter(ogl=>{
        return (ogl.oznaka.filter(o=>o.includes(oznaka)).length>0)
    })
}

exports.izmeniOglas=(id,noviO)=>{
    console.log(id)
    console.log(noviO)
    noviO.id=id
    console.log(noviO)
    oglasi.forEach(o => {
        if (parseInt(o.id)==id){
        o.kategorija=noviO.kategorija,
        o.datumIsteka=noviO.datumIsteka,
        o.cena=noviO.cena,
        o.valuta=noviO.valuta,
        o.tekst=noviO.tekst,
        o.oznaka=noviO.oznaka,
        o.email=noviO.email
        }
    });
    snimi(oglasi)
}

exports.dodajOglas=(noviO)=>{
    let id=1
    if (oglasi.length>0)
        id=parseInt(oglasi[oglasi.length-1].id)+1
    noviO.id=id
    oglasi.push(noviO)
    snimi(oglasi)
}

exports.obrisiOglas=(id)=>{
    console.log(id)
    oglasi=oglasi.filter(o=>o.id!=id)
    snimi(oglasi)
}