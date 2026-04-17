'use strict';

// collegamento con l'API (vedi postman anche)
const indirizzo_api = "https://lanciweb.github.io/demo/api/pictures/";


// chiamata verso l'indirizzo api
fetch(indirizzo_api)
    //then gestisce risposta del server 
    .then(function (response) {

      /*   //se la risposta non è ok, allora lancio un errore
        if (!response.ok) {
            console.error("Errore nella risposta del server");
        } */
        
        //se la risposta è ok, allora la trasformo in json
        return response.json();

    })

    //then gestisce la risposta in json dal passaggio precedente
    .then(function (dati) {
        console.log("dati recuperati", dati);  // qui vediamo array con le card

    })

    // catch gestisce errori nella richiesta
    .catch(function (error) {
        console.error("Errore nella richiesta:", error);
    })
    
    // il finally viene eseguito sempre alla fine, sia in caso di successo che di errore
    .finally(function () {
        console.log("Richiesta completata");
    });