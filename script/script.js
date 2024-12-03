/*
    SCRIPTS (JavaScript) PARA EL EJERCICIO JS12
    Mariona Batalla Taylor

*/

/************************** COSAS PARA PREGUNTAR O QUE ME FALTAN
 *  Try catch errors - añadir
 *  Overflow no funciona gaire bé
 *  Falta porcentaje
 *  Falta coma
 *  Falta margen pantalla
 *  El breadcrum se borra al poner el segundo operando
 *  Poner alerta para el control de errores
 *  NaN, etc...
 *  Print el operador en el breadcrum cuando se empiece a teclear op2
 */


/* necesitaremos dos operadores y un resultado */
var op1=0;
var op2=0; 
var operacion; /*guardará la operación*/
var primerOperando=true; /* true si estamos en el primer operando, false si estamos en el segundo operando*/

var resultadoElem=document.getElementById('resultado'); /* éste será el que se imprima por pantalla */
var bread=document.getElementById('breadcrum'); /* será toda la operación que aparece encima */


/*NÚMERO CUALQUIERA*/

/* si es un botón*/
document.getElementById('botones').addEventListener('click', function(event)
{
    /* si es un número*/
    if (event.target.classList.contains('num')) 
    {
        //console.log("Es un numero");

        /* "id" no es un valor numérico, por tanto, debo extraer 
        el número con parseFloat antes de hacer operación: */
        queNumero= parseFloat(event.target.id);

        /*si estamos en el primer operando*/
        if(primerOperando)
        {
            op1=op1*10+queNumero; /*añadimos la próxima cifra*/
            actualizarResultado(op1); /* actualizamos los HTMLs*/
        }
        else /*segundo operando*/
        {
            op2=op2*10+queNumero;/*añadimos la próxima cifra*/
            actualizarResultado(op2); /* actualizamos los HTMLs*/
        }

        
    }
    else /* es de la clase op (operador )*/
    {
        //console.log("Es un operador");

        /*SI ES OPERACION QUE SOLO NECESITA UN OPERANDO LA EJECUTAMOS*/
        /*SI ES OPERACION DE DOS OPERANDOS, GUARDAREMOS LA OPERACION Y
        ACTIVAREMOS EL SEGUNDO OPERANDO*/
        switch(event.target.id)
        {
            case 'ce': 
            {
                console.log("CE");
                reset();
                break;
            }
            case 'ce2': 
            {
                console.log("CE2");
                borrarUltimoOperando(); 
                break;
            }
            case 'borrarCifra':
            {
                console.log("Borrar Cifra!");
                borrarUltimo();
                break;
            }
            case 'inverso': //OK
            {
                console.log("Inverso!");
                resultadoElem.innerHTML = 1/op1; /* el operando */
                bread.innerHTML+='1/x'; /* se añade al breadcrum */
                bread.innerHTML+='=';
                break;
            }

            case 'cuadrado': //OK
            {
                console.log("Cuadrado!");
                resultadoElem.innerHTML = op1*op1; /* el operando */
                bread.innerHTML+='^2'; /* se añade al breadcrum */
                bread.innerHTML+='=';
                break;
            }
            case 'sqrt': //OK
            {
                console.log("Sqrt!");
                //console.log("The square root is: "+ Math.sqrt(op1));
                resultadoElem.innerHTML = Math.sqrt(op1); /* el operando */
                bread.innerHTML+=event.target.textContent; /* se añade al breadcrum */
                bread.innerHTML+='=';
                break;
            }

            case 'masMenos': //OK
            {
                /*matemáticamente para encontrar el negativo de un número, lo tenemos
                que multiplicar por -1**/
                console.log("masMenos!");
                
                op1=op1*(-1);
                resultadoElem.innerHTML = op1; /* el operando */
                bread.innerHTML=op1; /* se añade al breadcrum */
                console.log("PRIMER OPERANDO HACIENDO INVERSO! "+op1);
                break;
            }
            case 'coma':  /************************************************HELP! */ 
            {
                console.log("Coma!");
                if(primerOperando)
                {
                    op1=
                    bread.innerHTML+=event.target.textContent; /* se añade al breadcrum */
                }
                else //op2
                {
                    op2=
                    bread.innerHTML+=event.target.textContent; /* se añade al breadcrum */
                }
                break;
            }

            case 'percent': break; /******************************************************FALTA  */ 
            case 'botonIgual': 
            {
                if(primerOperando)
                {
                    alert('Falta el segundo operando!');
                }
                else
                {
                    switch(operacion)
                    {
                        case '+': bread.innerHTML+='=';opSuma(op1,op2);break;
                        case '-': bread.innerHTML+='=';opResta(op1,op2);break;
                        case 'x': bread.innerHTML+='='; opMul(op1,op2);break;
                        case '/': bread.innerHTML+='=';opDiv(op1,op2);break;
                    }
                }
            }
            break;

            /* SI ES OPERACION DE MAS DE UN OPERANDO (el resto)*/
            /*GUARDAMOS LA OPERACIÓN PARA CUANDO TENGAMOS EL SEGUNGO OP.*/
            default: 
            {
                operacion=event.target.textContent;
                primerOperando=false; 
                resultadoElem.innerHTML =0; 
                bread.innerHTML+=event.target.textContent; /* se añade al breadcrum */
            }
        }
    }
    
});


/* OPERACIONES*/
function actualizarResultado(res)
{
    resultadoElem.innerHTML =res; /*el resultado en pantalla*/

    /*si op1 o op2 es 0*/
    if(bread.innerHTML==0) bread.innerHTML=res; /* el breadcrum */
    else bread.innerHTML=res;
}
function opSuma(num1, num2)
{
    actualizarResultado(num1+num2);
}

function opResta(num1, num2)
{
    actualizarResultado(num1-num2);
}

function opMul(num1, num2)
{
    actualizarResultado(num1*num2);
}

function opDiv(num1, num2)
{
    actualizarResultado(num1/num2); /* ojo que queremos decimales*/
}

function reset() /* borra y reestablece todo -CE */
{
    /*borramos todo, restablecemos todas las operaciones y valores*/
    primerOperando=true;
    op1=0;
    op2=0;
    resultadoElem.innerHTML = 0; /* el operando */
    bread.innerHTML=0; /* el breadcrum */
}

function  borrarUltimoOperando() /* borra y reestablece el operando actual*/
{
    if(primerOperando) //si estamos con el primer operando
    {
        op1=0;
        resultadoElem.innerHTML = 0; /* el operando */
        bread.innerHTML=0; /* el breadcrum */
    }
    else //si estamos con el segundo operando
    {
        op2=0;
        resultadoElem.innerHTML = 0; /* el operando */

        /* AHORA DEBERIAMOS DE ACTUALIZAR EL BREADCRUM****************   HELP!           *************************/  
        console.log("Debemos actualizar el breadcrum para quitar el op2! ");
        console.log("El bread es: "+bread.innerHTML);
        console.log("La operacion es: "+operacion);
        bread.innerHTML=0; /* el breadcrum */

        
    }
}

function  borrarUltimo() //OK
{
    if(primerOperando) //OK
    {
        op1=Math.floor(op1/10);
        console.log('el operando nuevo es: '+op1);
        resultadoElem.innerHTML = op1; /* el operando */
        bread.innerHTML=op1; /* el breadcrum */
    }

    else //Segundo operando
    {
        op2=Math.floor(op2/10);
        console.log('el operando nuevo es: '+op2);
        resultadoElem.innerHTML = op2; /* el operando */
        bread.innerHTML=op2; /* el breadcrum */
    }
} 

/***************************  BOTONES: CAMBIO DE ESTILO    */
/*
        CAMBIO DE COLOR AL PASAR POR ENCIMA
        Y REESTABLECER EL COLOR AL SALIR DE ENCIMA 
*/

/* añadiremos la funcionalidad que cambie de color cuando pasemos por encima */
document.getElementById('botones').addEventListener('mouseover', function(event) {
    /* si es de la clase botón */
    if (event.target.classList.contains('boton')) 
    {
        /*si es el botón de igual*/
        if (event.target.id ==='botonIgual') 
        {
            event.target.style.backgroundColor = '#aa7c63';
        }
        else /* es un botón normal*/
        {
            /* cambiamos el color de fondo */
            event.target.style.backgroundColor = '#ffb4a2';
            event.target.style.color = 'white';
        }
    }
});

/* ahora para restablecer el color cuando se mueva de encima del botón */
document.getElementById('botones').addEventListener('mouseout', function(event) {
    /* si es de la clase botón */
    if (event.target.classList.contains('boton')) 
    {
        /* ahora hay que separar el botón de igual del resto, porque su color
        original es diferente */

        /*si es el botón de igual*/
        if (event.target.id ==='botonIgual') 
        {
            /*cambia a su color original*/
            event.target.style.backgroundColor = '#ffb4a2';

        }
        else/*si es botón convencional*/
        {
            /* cambiamos al amarillo inicial */
            event.target.style.backgroundColor = '#e5989b';
            event.target.style.color = 'black';
        }
    }
});

/*      CAMBIO DE COLOR AL CLICAR
        Y REESTABLECER EL COLOR AL DESCLICAR 
*/

/* añadiremos la funcionalidad que cambie de color cuando cliquemos el botón */
document.getElementById('botones').addEventListener('mousedown', function(event) {
    /* si es de la clase botón */
    if (event.target.classList.contains('boton')) 
    {
        /* cambiamos el color de fondo */
        event.target.style.backgroundColor = '#6d6875';
    }
});

/* ahora para restablecer el color cuando se suelta el ratón del botón */
document.getElementById('botones').addEventListener('mouseup', function(event) {
    /* si es de la clase botón */
    if (event.target.classList.contains('boton')) 
    {
        /* ahora hay que separar el botón de igual del resto, porque su color
        original es diferente */

        /*si es el botón de igual*/
        if (event.target.id ==='botonIgual') 
        {
            /*cambia a su color original*/
            event.target.style.backgroundColor = '#aa7c63';
        }
        else/*si es botón convencional*/
        {
            /* cambiamos al amarillo inicial */
            event.target.style.backgroundColor = '#e5989b';
        }
    }
});
