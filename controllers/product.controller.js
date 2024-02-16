// CONSTANTS
const API_URL = "https://pastebin.pl/view/raw/8fced5f8";
const CONSUMO_MULTIPLIER = 5;
const ORDEM_CONDICOES = {
    "DIN": 1, 
    "30": 2, 
    "R60": 3,
    "90": 4,
    "120": 5
};

// GETs

const getSuccess = (req, res) => {
    res.sendStatus(200);
}

// POSTs

const postArray = (req, res) => {

    let array = req.body;

    if (Array.isArray(array))
        res.status(200).send(array.length.toString());
    else
        res.sendStatus(400);
}

const orderArray = (array) => {
    let orderedArray = array.sort((a, b) => {

        let importance = 0;

        // Quantity
        importance += a.quantidade >= b.quantidade ? 0.5 : -0.5;

        // Condição Pagamento
        importance += ORDEM_CONDICOES[a.condicao_pagamento] < ORDEM_CONDICOES[b.condicao_pagamento] ? 0.3 : -0.3;

        // Pais
        importance += a.pais === "PORT" ? 0.2 : 0;
        importance += b.pais === "PORT" ? -0.2 : 0;

        return -importance;
    })
    .map(( element ) => {   // PREVISAO CONSUMO
        element.previsao_consumo = element.quantidade * CONSUMO_MULTIPLIER;
        return element;
    });

    return orderedArray;
}

const postOrderArray = (req, res) => {

    let array = req.body;

    if (Array.isArray(array))
    {
        res.status(200).send(JSON.stringify(orderArray(array)));
    }
    else
        res.sendStatus(400);
}

const postOrderArrayApi = async (req, res) => {

    fetch(API_URL)
    .then(response => response.json())
    .then(data => res.status(200).send(JSON.stringify(orderArray(data))))
    .catch(error => res.status(500).send(error));
}


// EXPORT
module.exports = {
    getSuccess: getSuccess,
    postArray: postArray,
    postOrderArray: postOrderArray,
    postOrderArrayApi: postOrderArrayApi
}