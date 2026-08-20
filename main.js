/* ============================================================
   S2 · CÍRCULOS
   Interacción y Renderizado Web Avanzado · CC325-21

   Cinco conceptos, una sola pieza:
   arrays · objetos · condicionales · loops · funciones

   ------------------------------------------------------------
   CÓMO SE TRABAJA ESTE ARCHIVO

   Cada PASO es un comentario en pseudocódigo. Escribe tu código
   DEBAJO del comentario, sin borrarlo: al final los comentarios
   te quedan de mapa de lo que construiste.

   No pases al siguiente paso hasta ver el anterior funcionando
   en pantalla. Si algo truena, abre la consola (F12 › Console)
   antes de preguntar: el error casi siempre te dice la línea.

   Los números entre corchetes remiten al cheatsheet.
   Si un paso no se entiende, la pieza que falta está más arriba.
   ============================================================ */


/* ============================================================
   PASO 0 · YA RESUELTO — canvas responsivo + loop de animación
   ============================================================
   Esto no lo escribes tú. Léelo, entiende qué hace cada parte
   y corre el archivo para confirmar que ves una pantalla oscura
   sin errores en consola.

   Dos cosas están pasando aquí:

   1. AJUSTAR EL LIENZO
      Un <canvas> tiene dos tamaños distintos: el que ocupa en
      pantalla (CSS) y cuántos píxeles reales tiene adentro.
      Si no los sincronizas, todo se ve borroso o estirado.

   2. EL LOOP
      requestAnimationFrame le pide al navegador que ejecute tu
      función una vez por cuadro, sincronizado con la pantalla.
      En un monitor normal son 60 veces por segundo: tus 60 fps.
      Como la función se vuelve a pedir a sí misma al final, el
      ciclo no se detiene.
   ------------------------------------------------------------ */

const lienzo = document.querySelector("#lienzo");   // [12] el DOM: buscamos el nodo
const ctx = lienzo.getContext("2d");                // el "pincel" con el que se dibuja

// Medidas de la ventana. Las guardamos aparte porque las vas a
// necesitar en varios pasos (posiciones iniciales, rebotes).
let ancho = 0;
let alto = 0;

function ajustarLienzo() {
   // En pantallas Retina, 1 píxel CSS son 2 o 3 píxeles reales.
   // Topamos en 2: arriba de eso el costo sube y la diferencia no se nota.
   const dpr = Math.min(window.devicePixelRatio || 1, 2);

   ancho = window.innerWidth;
   alto = window.innerHeight;

   // Resolución interna real del canvas
   lienzo.width = ancho * dpr;
   lienzo.height = alto * dpr;

   // Con esto seguimos dibujando en píxeles CSS y el navegador escala solo.
   ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

ajustarLienzo();                                     // se corre una vez al cargar
window.addEventListener("resize", ajustarLienzo);    // [13] y otra vez en cada resize


function cuadro() {
   // Borrar lo del cuadro anterior. Si comentas esta línea vas a
   // ver el rastro acumulado — pruébalo en algún momento, es útil.
   ctx.clearRect(0, 0, ancho, alto);

   // ↓↓↓ AQUÍ VA A VIVIR TU DIBUJO (pasos 2, 3 y 6) ↓↓↓

   //circulo.x += circulo.vx //hace que ek curculo se mueva en x

   circulos[0].x += circulos[0].vx;

   //console.log(circulos[0].x); //imprime el valor de x del circulo en la consola

   dibujarCirculo(circulos[0]);//dibuja el circulo 

   //console.log(circulo.x); 

   //dibujarCirculo(circulo);

   for (const unCirculo of circulos) {
      unCirculo.x += unCirculo.vx;
      unCirculo.y += unCirculo.vy;

      const velocidad = Math.sqrt(unCirculo.vx * unCirculo.vx + unCirculo.vy * unCirculo.vy); //calcula la velocidad del circulo

      if (velocidad > 1.5) { //si la velocidad es mayor a 1.5
         unCirculo.radio = 20; //el radio del circulo es 20
      } else {
         unCirculo.radio = 10; //el radio del circulo es 10
      };


      if (unCirculo.x - unCirculo.radio < 0) {
         unCirculo.vx *= -1; //cambia la direccion de la velocidad en x
         unCirculo.x = unCirculo.radio;
      };

      if (unCirculo.x + unCirculo.radio > ancho) {
         unCirculo.vx *= -1; //cambia la direccion de la velocidad en x
         unCirculo.x = ancho - unCirculo.radio;
      };

      if (unCirculo.y - unCirculo.radio < 0) {
         unCirculo.vy *= -1; //cambia la direccion de la velocidad en y
         unCirculo.y = unCirculo.radio;
      };

      if (unCirculo.y + unCirculo.radio > alto) {
         unCirculo.vy *= -1; //cambia la direccion de la velocidad en y
         unCirculo.y = alto - unCirculo.radio;
      };

      if (unCirculo.vx > 0 && unCirculo.vy > 0) {
         unCirculo.color = "blue";
      } else if (unCirculo.vx < 0 && unCirculo.vy > 0) {
         unCirculo.color = "red";
      } else if (unCirculo.vx > 0 && unCirculo.vy < 0) {
         unCirculo.color = "green";
      } else if (unCirculo.vx < 0 && unCirculo.vy < 0) {
         unCirculo.color = "yellow";
      };



      dibujarCirculo(unCirculo);

   };
   requestAnimationFrame(cuadro);

};



// ↑↑↑ ------------------------------------------- ↑↑↑

// pide el siguiente cuadro

requestAnimationFrame(cuadro);     // arranca el ciclo


/* ============================================================
   PASO 1 · Un círculo es un objeto      [08] Objetos
   ============================================================
   Un círculo todavía no es un dibujo: son datos. Antes de dibujar
   nada, decide qué necesita saber la máquina para poder dibujarlo.

   PSEUDOCÓDIGO
   - crear un objeto llamado "circulo"
   - guardar dentro su posición: x, y
   - guardar dentro su radio
   - guardar dentro su color
   - guardar dentro su velocidad: vx, vy

   OJO: esto es una decisión de dirección de arte, no técnica.
   ¿De qué tamaño? ¿De qué color? ¿Rápido o lento? Elige números
   concretos. Si te sale "mediano", todavía no sabes qué quieres.

   Comprobación: escribe console.log(circulo) y míralo en consola.
   ------------------------------------------------------------ */

// tu código aquí

let circulo = {
   x: Math.random() * window.innerWidth / 2,
   y: Math.random() * window.innerHeight / 2,
   radio: 15,
   color: "#FF0000",
   vx: (Math.random() - 0.5) * 4, //velocidad en x
   vy: (Math.random() - 0.5) * 4 //velocidad en y
};

console.log(circulo);


/* ============================================================
   PASO 2 · Dibujar ese círculo          [11] Funciones
   ============================================================
   El pincel (ctx) no sabe de círculos: sabe de trazos. Un círculo
   se dibuja en tres movimientos — empezar un trazo, describir el
   arco, rellenarlo.

   PSEUDOCÓDIGO
   - crear una función "dibujarCirculo" que reciba UN círculo
   - dentro: iniciar un trazo nuevo
   - dentro: trazar un arco completo en la posición y radio del círculo
   - dentro: pintar el relleno con el color del círculo
   - llamar a esa función dentro de cuadro(), después del clearRect

   La función recibe el círculo COMO PARÁMETRO. No lee la variable
   de afuera. Eso importa: en el paso 6 vas a llamar la misma
   función con círculos distintos y tiene que servir para todos.

   Pistas de la API de canvas (esto sí te lo damos, no es el punto
   del ejercicio):
     ctx.beginPath()
     ctx.arc(x, y, radio, 0, Math.PI * 2)
     ctx.fillStyle = "#FFFFFF"
     ctx.fill()

   Comprobación: ves un círculo quieto en pantalla.
   ------------------------------------------------------------ */

// tu código aquí

function dibujarCirculo(circulo) {
   ctx.beginPath();
   ctx.arc(circulo.x, circulo.y, circulo.radio, 0, Math.PI * 2);
   ctx.fillStyle = circulo.color;
   ctx.fill();
};

/* ============================================================
   PASO 3 · Que se mueva
   ============================================================
   Nada se mueve solo. Se mueve porque cada cuadro está un poquito
   más allá que en el anterior, y se dibuja 60 veces por segundo.

   PSEUDOCÓDIGO
   - dentro de cuadro(), antes de dibujar:
   - sumarle a la x del círculo su velocidad en x
   - sumarle a la y del círculo su velocidad en y

   Comprobación: el círculo cruza la pantalla y se va. Que se
   escape está bien: lo atrapamos en el paso 7.

   Prueba esto antes de seguir: cambia la velocidad a 0.5 y luego
   a 20. ¿En cuál se siente bien? Ese número es una decisión de
   diseño, igual que un color.
   ------------------------------------------------------------ */

// tu código aquí
circulo.x += circulo.vx;
circulo.y += circulo.vy;



/* ============================================================
   PASO 4 · Una fábrica de círculos      [11] Funciones · [07] Arrays
   ============================================================
   Hasta ahora hay UN círculo escrito a mano. Para tener muchos no
   vamos a copiar y pegar: vamos a escribir la receta una vez.

   PSEUDOCÓDIGO
   - crear una función "crearCirculo" que NO reciba nada
   - dentro: construir el mismo objeto del paso 1
   - dentro: DEVOLVER ese objeto (return)
   - crear un array vacío llamado "circulos"
   - meter en el array el resultado de llamar crearCirculo()
   - hacer que los pasos 2 y 3 trabajen sobre circulos[0]

   La diferencia con el paso 1: ahí el objeto existía porque lo
   escribiste. Aquí existe porque una función lo fabrica. Puedes
   pedir otro cuando quieras.

   Bonus si lo quieres desde ya: que la posición, el radio o la
   velocidad salgan de Math.random() en vez de ser fijos.

   Comprobación: se ve exactamente igual que en el paso 3. Si algo
   cambió visualmente, algo se rompió.
   ------------------------------------------------------------ */

// tu código aquí
function crearCirculo() {
   let circulo2 = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radio: 15,
      color: "#3300ff",
      vx: (Math.random() - 0.5) * 4, //velocidad en x
      vy: (Math.random() - 0.5) * 4 //velocidad en y
   };
   return circulo2; //entrega el objeto circulo2 al que se le llama la funcion
};

let circulos = []; //nueva variable que es un array vacio

circulos.push(crearCirculo());//metemos en el array el resultado de llamar a la funcion crearCirculo

//console.log(circulos[0]);//comprobamos que se haya creado el circulo y se haya metido en el array


/* ============================================================
   PASO 5 · Muchos                        [10] Loops
   ============================================================
   Ahora sí: si la receta ya existe, pedirla 200 veces cuesta lo
   mismo que pedirla una.

   PSEUDOCÓDIGO
   - crear una constante CANTIDAD con el número de círculos
   - hacer un loop que se repita CANTIDAD veces
   - en cada vuelta: meter al array un círculo nuevo

   Comprobación: console.log(circulos.length) marca CANTIDAD.
   En pantalla todavía se ve UN círculo — normal, el dibujo sigue
   apuntando a circulos[0]. Eso se arregla en el paso 6.

   Si todos salieron encimados en el mismo punto, es que crearCirculo
   devuelve siempre lo mismo: ahí es donde entra Math.random().
   ------------------------------------------------------------ */

// tu código aquí
const CANTIDAD = 200; //constante con el numero de circulos

for (let i = 0; i < CANTIDAD; i++) {
   circulos.push(crearCirculo()); //metemos en el array un circulo nuevo
};
console.log(circulos.length);


/* ============================================================
   PASO 6 · Dibujarlos todos              [10] Loops
   ============================================================
   PSEUDOCÓDIGO
   - dentro de cuadro(), después del clearRect:
   - recorrer el array de círculos
   - para cada uno: actualizar su posición y dibujarlo

   Aquí hay dos loops distintos y conviene notar la diferencia:
   el del paso 5 necesitaba un contador (cuántas veces), este solo
   necesita los valores (cada círculo). El cheatsheet [10] muestra
   las dos formas — usa la que corresponda.

   Comprobación: CANTIDAD círculos moviéndose.

   ANTES DE SEGUIR — abre dev tools › Rendering › Frame Rendering
   Stats y sube CANTIDAD hasta que los 60 fps se caigan. Anota el
   número en tu bitácora. Ese es tu presupuesto en esta máquina.
   ------------------------------------------------------------ */

// tu código aquí
for (const unCirculo of circulos) {
   unCirculo.x += unCirculo.vx;
   unCirculo.y += unCirculo.vy;

};

/* ============================================================
   PASO 7 · Que reboten                   [09] Condicionales
   ============================================================
   Un rebote es una decisión: "si te pasaste del borde, regrésate".
   Eso es un if.

   PSEUDOCÓDIGO
   - dentro de la actualización de cada círculo, después de moverlo:
   - si la orilla izquierda del círculo se pasó de 0 → invertir vx
   - si la orilla derecha se pasó del ancho → invertir vx
   - si la orilla de arriba se pasó de 0 → invertir vy
   - si la orilla de abajo se pasó del alto → invertir vy

   OJO 1: el borde del círculo no es su centro. Un círculo toca la
   pared cuando x - radio llega a 0, no cuando x llega a 0.

   OJO 2: si solo inviertes la velocidad, algunos se van a quedar
   vibrando pegados a la orilla. Piensa por qué pasa y qué le falta
   a la instrucción. (Pista: invertir el rumbo no lo saca de donde
   ya está.)

   Comprobación: nadie se escapa y nadie se atora en el borde.
   ------------------------------------------------------------ */

// tu código aquí
if (unCirculo.x - unCirculo.radio < 0) {
   unCirculo.vx *= -1; //cambia la direccion de la velocidad en x
   unCirculo.x = unCirculo.radio;
};

if (unCirculo.x + unCirculo.radio > ancho) {
   unCirculo.vx *= -1; //cambia la direccion de la velocidad en x
   unCirculo.x = ancho - unCirculo.radio;
};

if (unCirculo.y - unCirculo.radio < 0) {
   unCirculo.vy *= -1; //cambia la direccion de la velocidad en y
   unCirculo.y = unCirculo.radio;
};

if (unCirculo.y + unCirculo.radio > alto) {
   unCirculo.vy *= -1; //cambia la direccion de la velocidad en y
   unCirculo.y = alto - unCirculo.radio;
};
/* ============================================================
   PASO 8 · Color con criterio            [09] Condicionales
   ============================================================
   A partir de aquí la regla la pones tú. El código ya lo sabes
   escribir; lo que se evalúa es qué decides.

   PSEUDOCÓDIGO
   - definir una condición que dependa de algo que ya existe
     (posición, velocidad, tamaño, cercanía a un borde...)
   - si se cumple → un color
   - si no → otro

   La regla tiene que ser DEFENDIBLE. "Los de arriba son claros y
   los de abajo oscuros porque simula profundidad" es una regla.
   "Colores random" no lo es.

   Comprobación: puedes explicar la regla en una frase sin decir
   la palabra "if".
   ------------------------------------------------------------ */

// tu código aquí
if (unCirculo.vx > 0 && unCirculo.vy > 0) { //derecha a abajo
   unCirculo.color = "blue";
} else if (unCirculo.vx < 0 && unCirculo.vy > 0) { //izquierda a abajo
   unCirculo.color = "red";
} else if (unCirculo.vx > 0 && unCirculo.vy < 0) { //derecha a arriba
   unCirculo.color = "green";
} else if (unCirculo.vx < 0 && unCirculo.vy < 0) { //izquierda a arriba
   unCirculo.color = "yellow";
};


/* ============================================================
   PASO 9 · Tamaño con criterio           [09] Condicionales
   ============================================================
   Mismo trato que el paso 8, pero sobre el radio.

   PSEUDOCÓDIGO
   - definir una segunda condición
   - si se cumple → modificar el radio
   - si no → dejarlo o regresarlo

   OJO: si el radio cambia, el rebote del paso 7 tiene que seguir
   funcionando. Si el círculo crece pegado a la pared, ¿qué pasa?

   Comprobación: la pieza sigue a 60 fps y nadie se atora.
   ------------------------------------------------------------ */

// tu código aquí
const velocidad = Math.sqrt(unCirculo.vx * unCirculo.vx + unCirculo.vy * unCirculo.vy); //calcula la velocidad del circulo

if (velocidad > 1.5) { //si la velocidad es mayor a 1.5
   unCirculo.radio = 20; //el radio del circulo es 20
} else {
   unCirculo.radio = 10; //el radio del circulo es 10
};

/* ============================================================
   ANTES DE SUBIR A GITHUB

   1. Corre la pieza y ábrela en el celular si puedes.
   2. Anota en la bitácora tu número del paso 6.
   3. Prepara las tres respuestas de la defensa:

      · ¿Por qué esa CANTIDAD y no otra?
      · ¿Qué regla propusiste en el paso 8 y qué descartaste antes?
      · Te señalo una línea al azar de tu archivo: ¿qué hace?
   ============================================================ */