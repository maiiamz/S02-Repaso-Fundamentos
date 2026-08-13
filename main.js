//MEMORIA: Variables y constantes
let dinero;
const COLOR_MOCHILA = "black";
let colores = ["rojo", "verde", "negro"];

console.log(20);
console.log("rosa");
console.log(colores);
console.log(colores[2]);
// opt + shift + arrowDown

let computadora = {
    tipo: "dispositivo",
    tamaño: "grande",
    resolucion: 4320,
    encender: function() {
        console.log("encendiendo computadora");
        console.log("inicializando sistemas");
        console.log("preparando imagenes");
    },
    buscar: function (){
        console.log("buscando...")
    }
};

computadora.utilidad = "práctica";
computadora.resolucion = 1080;
computadora.encender();
console.log(computadora.encender);

// Funciones
function mezclar(){
    console.log("mezclando ingredientes");
};

mezclar();