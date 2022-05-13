const express = require("express");
const fs=require("fs");
const app = express();
const path = require('path');
const axios = require('axios');
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let getView=(name)=>{
    return fs.readFileSync(path.join(__dirname+"/views/"+name+".html"),"utf-8")
}
app.get("/",(req,res)=>{
    let prikaz="";
    axios.get('http://localhost:3000/oglas')
    .then(response => {
        
        response.data.forEach(element => {

            let oznake=""
            for (o of element.oznaka){
                oznake+=`${o}\n`
            }
            let mejlovi=""
            for (em of element.email){
                mejlovi+=`${em.tip}: ${em.vrednost}\n`
            }
            prikaz+=`<tr>
            <td>${element.kategorija}</td>
            <td>${element.datumIsteka}</td>
            <td>${element.cena} ${(element.valuta==null?"RSD":element.valuta)}</td>
            <td>${element.tekst}</td>
            <td>${oznake}</td>
            <td>${mejlovi}</td>
            <td><a href="/oglas/izmeni/${element.id}">Izmeni</a></td>
            <td><a href="/oglas/obrisi/${element.id}">Obrisi</a></td>
            </tr>`;
        });
        
        res.send(getView("index").replace("#{DATA}",prikaz));
    })
    .catch(error => {
        console.log(error);
    });
});


app.get("/oglas/izmeni/:id",(req,res)=>{
    res.send(getView("izmeni").replace("#{DATA}",req.params["id"]))
});

app.post("/oglas/izmeni/:id",(req,res)=>{
    console.log("radim")
    let oznake=[]
    let email=[]
    if (req.body.oznake.trim()!=''){oznake=req.body.oznake.trim().split("#")}
    if (typeof req.body.email!='string'){
        for (idx in req.body.email){
            email.push({
                tip:req.body.tip[idx],
                vrednost:req.body.email[idx]
            })
        }
    }
    else{
        email.push({
            tip:req.body.tip,
            vrednost:req.body.email
        })
    }

    axios.patch(`http://localhost:3000/oglas/${req.params["id"]}`,{
        kategorija:req.body.kategorija,
        datumIsteka:req.body.datumIsteka,
        cena:req.body.cena,
        valuta:req.body.valuta,
        tekst:req.body.tekst,
        oznaka:oznake,
        email:email
    })
    .then(
        res.redirect("/")
    )
    .catch(error => {
        console.log(error);
    });
});


app.get("/oglas/dodaj",(req,res)=>{
    res.send(getView("dodaj"));
});

app.post("/oglas/dodaj",(req,res)=>{
    let oznake=[]
    if (req.body.oznake.trim()!=''){oznake=req.body.oznake.trim().split("#")}
    let email=[]
    if (typeof req.body.email!='string'){
        for (idx in req.body.email){
            email.push({
                tip:req.body.tip[idx],
                vrednost:req.body.email[idx]
            })
        }
    }
    else{
        email.push({
            tip:req.body.tip,
            vrednost:req.body.email
        })
    }
    axios.post('http://localhost:3000/oglas',{
        kategorija:req.body.kategorija,
        datumIsteka:req.body.datumIsteka,
        cena:req.body.cena,
        valuta:req.body.valuta,
        tekst:req.body.tekst,
        oznaka:oznake,
        email:email
    })
    .then(
        res.redirect("/")
    )
    .catch(error => {
        console.log(error);
    });
});


app.post("/oglas/kategorija",(req,res)=>{
    let prikaz=""
    axios.post(`http://localhost:3000/oglas/kategorija/`,{kat:req.body.kat})
    .then(response=>{
        response.data.forEach(element => {

            let oznake=""
            for (o of element.oznaka){
                oznake+=`${o},\n`
            }
            let mejlovi=""
            for (em of element.email){
                mejlovi+=`${em.tip}: ${em.vrednost},\n`
            }
            prikaz+=`<tr>
            <td>${element.kategorija}</td>
            <td>${element.datumIsteka}</td>
            <td>${element.cena} ${(element.valuta==null?"RSD":element.valuta)}</td>
            <td>${element.tekst}</td>
            <td>${oznake}</td>
            <td>${mejlovi}</td>
            <td><a href="/oglas/izmeni/${element.id}">Izmeni</a></td>
            <td><a href="/oglas/obrisi/${element.id}">Obrisi</a></td>
            </tr>`;
        });
        
        res.send(getView("index").replace("#{DATA}",prikaz));
    })
    .catch(error=>{
        console.log(error)
    })

})

app.post("/oglas/oznaka",(req,res)=>{
    let prikaz=""
    axios.post(`http://localhost:3000/oglas/oznaka`,{
        ozn:req.body.ozn
    })
    .then(response=>{
        response.data.forEach(element => {

            let oznake=""
            for (o of element.oznaka){
                oznake+=`${o}\n`
            }
            let mejlovi=""
            for (em of element.email){
                mejlovi+=`${em.tip}: ${em.vrednost}\n`
            }
            prikaz+=`<tr>
            <td>${element.kategorija}</td>
            <td>${element.datumIsteka}</td>
            <td>${element.cena} ${(element.valuta==null?"RSD":element.valuta)}</td>
            <td>${element.tekst}</td>
            <td>${oznake}</td>
            <td>${mejlovi}</td>
            <td><a href="/oglas/izmeni/${element.id}">Izmeni</a></td>
            <td><a href="/oglas/obrisi/${element.id}">Obrisi</a></td>
            </tr>`;
        });
        
        res.send(getView("index").replace("#{DATA}",prikaz));
    })
    .catch(error=>{
        console.log(error)
    })

})

app.get("/oglas/obrisi/:id",(req,res)=>{
    axios.delete(`http://localhost:3000/oglas/${req.params["id"]}`)
    .then(response => {
        res.redirect("/")
    })
    .catch(error => {
        console.log(error);
    });
});

app.listen(port,()=>{console.log(`klijent na portu ${port}`)});

