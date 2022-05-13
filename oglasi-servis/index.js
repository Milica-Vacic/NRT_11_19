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

app.post('/oglas/kategorija',(request, response)=>{
    response.send(oglasi.filterKategorija(request.body.kat))
});

app.post('/oglas/oznaka',(request, response)=>{
    response.send(oglasi.filterOznaka(request.body.ozn))
});

app.post('/oglas',(request, response)=>{
    oglasi.dodajOglas(request.body)
    response.end("OK")
});

app.patch('/oglas/:id',(request, response)=>{
    console.log("Server")
    oglasi.izmeniOglas(request.params.id, request.body)
    response.end("OK")
});

app.delete('/oglas/:id',(request, response)=>{
    console.log(request.params.id)
    oglasi.obrisiOglas(parseInt(request.params.id))
    response.end("OK")
});

app.listen(port,()=>{console.log(`startovan server na portu ${port}`)});
