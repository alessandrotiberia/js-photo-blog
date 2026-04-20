'use strict';

// collegamento con l'API (vedi postman anche)
const indirizzo_api = "https://lanciweb.github.io/demo/api/pictures/";
// collegamento con il contenitore nel DOM dove inserire le card
const contenitore = document.querySelector(".contenitore");


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

        dati.forEach(function (card) {  // per ogni card nell'array, eseguo questa funzione


            /*   Quando voglio inserire un dato variabile preso dal server, uso il simbolo ${}
           Ad esempio, ${card.url} verra sostituito dal vero link dell'immagine.
           ${card.title} verra sostituito dalla vera didascalia. */

            const carta_html = `
        <div class="scheda_polaroid">
            <img src="./assets_day1/img/pin.svg" alt="Spillo rosso" class="spilla_fissaggio">
            <img src="${card.url}" alt="${card.title}" class="immagine_card">
            <p class="testo_didascalia">${card.title}</p>
        </div>
        `;  // creo una stringa con il codice html per ogni card, usando i dati dell'api

            // aggiungo il codice html della card al contenitore, usando += per non sovrascrivere le card già presenti
            contenitore.innerHTML += carta_html;
        });
    })

    // catch gestisce errori nella richiesta
    .catch(function (error) {
        console.error("Errore nella richiesta:", error);
    })

    // il finally viene eseguito sempre alla fine, sia in caso di successo che di errore
    .finally(function () {
        console.log("Richiesta completata");
    });


// Seleziono gli elementi del DOM per l'overlay
const modal = document.getElementById('modal-foto');
const imgModal = document.getElementById('img-modal');
const btnChiudi = document.getElementById('chiudi-modal');

// Aggiungo un event listener a tutto il contenitore per l'evento click alle immagini

contenitore.addEventListener('click', function (event) {
    //metto dentro una variabile l'elemento più vicino alla classe scheda_polaroid, partendo dall'elemento cliccato (event.target)
    const card_cliccata = event.target.closest('.scheda_polaroid');

    if (card_cliccata) { // se è stata cliccata una card
        const img_cliccata = card_cliccata.querySelector('.immagine_card');
        //copiamo il link dell'immagine cliccata nell'overlay
        imgModal.src = img_cliccata.src;
        //apriamo l'overlay
        modal.showModal();
    }
});

// Chiudere cliccando sulla X
btnChiudi.addEventListener('click', function () {
    // L'ALTRO METODO MAGICO: chiude tutto
    modal.close();
});