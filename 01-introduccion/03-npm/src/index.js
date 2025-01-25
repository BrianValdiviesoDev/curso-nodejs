var moment = require('moment');

const saludar = (nombre) => {
    const date = moment().format();
    console.log(`Hola ${nombre} hoy es ${date}`)
}

saludar("Mundo")