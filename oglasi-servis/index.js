let express=require('express')
let app=express()
let oglasi=require('oglasi-modul')
const port=3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/oglas',(request, response)=>{
    response.send(oglasi.sviOglasi())
});

app.get('/oglas/:id',(request, response)=>{
    response.send(oglasi.getOglas(request.params.id))
});

app.get('/oglas/kategorija/:kat',(request, response)=>{
    response.send(oglasi.filterKategorija(request.params.kat))
});

app.get('/oglas/oznaka/:ozn',(request, response)=>{
    response.send(oglasi.filterOznaka(request.params.ozn))
});

app.post('/oglas',(request, response)=>{
    response.send(oglasi.dodajOglas(request.body))
});

app.put('/oglas/:id',(request, response)=>{
    response.send(oglasi.izmeniOglas(request.params.id, request.body))
});

app.delete('/oglas/:id',(request, response)=>{
    response.send(oglasi.obrisiOglas(request.params.id))
});

app.listen(port,()=>{console.log(`startovan server na portu ${port}`)});
