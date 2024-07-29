
display ();

// Revisa si el contenido del mensaje está vacío
function display() {
    let contenido = document.getElementById('texto_entrada').value;
    let vacio = document.getElementById('salida_vacio');
    let lleno = document.getElementById('salida_lleno');
    let copiar = document.getElementById('boton_copiar');
    let info = document.getElementById('revisar_info')
    
    if (contenido == '') {
        vacio.style.display = 'flex';
        lleno.style.display = 'none';
        info.style.display = 'none';
        copiar.setAttribute('disabled','true');

    } else {
        vacio.style.display = 'none';
        lleno.style.display = 'flex';
        copiar.removeAttribute('disabled');
    }
    return contenido;
}


// FUNCIONES DE BOTONES

// Botón Encriptar
function encriptar() {
    let contenido = display();
    if (contenido !== '') {
        let resultado = revisar(contenido);
        resultado = resultado.replaceAll('e','enter');
        resultado = resultado.replaceAll('i','imes');
        resultado = resultado.replaceAll('a','ai');
        resultado = resultado.replaceAll('o','ober');
        resultado = resultado.replaceAll('u','ufat');
        document.getElementById('salida_mensaje').innerHTML = resultado;
    document.getElementById('boton_copiar').textContent = 'Copiar';
    return;
    }
}

// Botón Desencriptar
function desencriptar() {
    let contenido = display();
    if (contenido !== '') {
        let resultado = revisar(contenido);
        resultado = resultado.replaceAll('enter','e');
        resultado = resultado.replaceAll('imes','i');
        resultado = resultado.replaceAll('ai','a');
        resultado = resultado.replaceAll('ober','o');
        resultado = resultado.replaceAll('ufat','u');
        document.getElementById('salida_mensaje').innerHTML = resultado;
    document.getElementById('boton_copiar').textContent = 'Copiar';    
    return;
    }
}

// Botón Borrar mensaje
function borrar_mensaje () {
    let mensaje = document.getElementById('texto_entrada');
    mensaje.value = '';
    return;
}

//Botón Copiar
function copiar_resultado () {
    let resultado = document.getElementById('salida_mensaje').innerHTML;
    let texto = document.getElementById('boton_copiar');
    navigator.clipboard.writeText(resultado);
    texto.textContent = '¡Copiado!';
    return;
}


//FUNCIONES DE REVISIÓN DE ENTRADA DEL USUARIO

// Revisa mayúsculas y caracteres especiales (no incluye números, comas, puntos ni guiones)
function revisar(mensaje) {
    let info = document.getElementById('revisar_info');
    let nuevo_mensaje = '';

    if (mensaje !== mensaje.toLowerCase() || mensaje !== caracteres(mensaje)) {
        nuevo_mensaje = mensaje.toLowerCase();
        nuevo_mensaje = caracteres(nuevo_mensaje);
        info.style.display = 'block';
        return nuevo_mensaje;
    } else {
        info.style.display = 'none';
        return mensaje;
    }
}
    
//Elimina caracteres especiales y cambia vocales
function caracteres(mensaje) {
    let nuevo_mensaje = '';
    let letra = '';
    let cantidad = mensaje.length;
    
    for (let i=0 ; i<cantidad ; i++) {
        letra = mensaje.charCodeAt(i);
        if (letra==32 || letra==10 || (letra>=97 && letra<=122) || (letra>=44 && letra<=57 && !(letra==47))) {
            nuevo_mensaje += mensaje[i];
        } else if ((letra>=224 && letra<=252) && !(letra==231 || letra==247 || letra==248)) {
            nuevo_mensaje += acentos(mensaje[i]);
        }
    }

    return nuevo_mensaje;
}

// Cambia vocales especiales a normales. También cambia la ñ
function acentos(letra) {
    x = letra.charCodeAt(0)
    if (x>=224 && x<=230) {
        return 'a';
    } else if (x>=232 && x<=235) {
        return 'e';
    } else if (x>=236 && x<=239) {
        return 'i';
    } else if (x>=242 && x<=246) {
        return 'o';
    } else if (x>=249 && x<=252) {
        return 'u';
    } else if (x==241) {
        return 'n';
    } else {
        return '';
    }
}
