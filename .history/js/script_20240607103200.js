let contadorAdministradores = 1;
let sigIDUsuarios = 1;

class Sistema {
    constructor() {
        this.listaAdministradores = [
            new Administrador("juan", "juan123"),
            new Administrador("pedro", "pedro123"),
        ];
        this.listaCompradores = [
            new Usuario("Prince", "Nelson", "Prince.Nelson", "Prince1234", "79927398712", "012"),
            new Usuario("Hideo", "Kojima", "Hideo.Kojima", "Hideo1234", "79927398712", "013"),
            new Usuario("Bob", "Esponja", "Bob.Esponja", "Bob1234", "79927398712", "014"),
        ];
        this.listaProductos = [];
        this.listaCompras = [];
    }

    buscarUsuarioGeneral(nombreDeUsuario) {
        let usuarioBuscado = null;
        let tipo = null;
        
        for (let i = 0; i < this.listaAdministradores.length; i++) {
            const unAdmin = this.listaAdministradores[i];
            if (unAdmin.usuario.toLowerCase() === nombreDeUsuario.toLowerCase()) {
                usuarioBuscado = unAdmin;
                tipo = 'admin';
                break;
            }
        }
        
        if (usuarioBuscado === null) {
            for (let i = 0; i < this.listaCompradores.length; i++) {
                const unUsuario = this.listaCompradores[i];
                if (unUsuario.usuario.toLowerCase() === nombreDeUsuario.toLowerCase()) {
                    usuarioBuscado = unUsuario;
                    tipo = 'comprador';
                    break;
                }
            }
        }
        
        return { usuario: usuarioBuscado, tipo: tipo };
    }
}

class Administrador {
    constructor(usuario, password) {
        this.id = contadorAdministradores;
        this.usuario = usuario;
        this.password = password;
        contadorAdministradores++;
    }
}

class Usuario {
    constructor(unNombre, unApellido, unUsuario, unaPass, unaTarjCred, unCVC) {
        this.nombre = unNombre;
        this.apellido = unApellido;
        this.usuario = unUsuario;
        this.password = unaPass;
        this.TarjCred = unaTarjCred;
        this.cvc = unCVC;
        sigIDUsuarios++;
    }
}

// Poner las otras clases

let sistema = new Sistema();
inicio();

function inicio() {
    ocultarTodo();
    document.querySelector("#pantallaLogin").style.display = "block"; //esto muestra el login
    document.querySelector("#btnLoginComprador").addEventListener("click", hacerLogin);
}

function ocultarTodo() { //eso esconde un elemento, que no se muestre
    document.querySelector("#navPrincipal").style.display = "none";
    document.querySelector("#pantallaLogin").style.display = "none";
    document.querySelector("#navPrincipalComprador").style.display = "none";
}

function hacerLogin() {
    // Capturar los datos
    let usuario = document.querySelector("#txtLoginUsuario").value;
    let password = document.querySelector("#txtPass").value;
    
    // Obtener un usuario con ese nombre de usuario
    let resultadoBusqueda = sistema.buscarUsuarioGeneral(usuario);
    let usuarioBuscado = resultadoBusqueda.usuario;
    let tipoUsuario = resultadoBusqueda.tipo;
    
    // Chequear si el user y password existen
    if (usuarioBuscado != null) {
        if (usuarioBuscado.password === password) {
            alert("Login ok");
            if (tipoUsuario === 'admin') {
                // Mostrar menú de administrador
                mostrarMenuAdmin();
            } else if (tipoUsuario === 'comprador') {
                // Mostrar menú de comprador
                mostrarMenuComprador();
            }
        } else {
            alert("Password incorrecto");
        }
    } else {
        alert("No existe un usuario con ese nombre de usuario");
    }
}

function mostrarMenuAdmin() {
    ocultarTodo();
    document.querySelector("#navPrincipal").style.display = "block"; // Mostrar menú de admin
}

function mostrarMenuComprador() {
    ocultarTodo();
    document.querySelector("#navPrincipalComprador").style.display = "block"; // Mostrar menú de comprador
}

function validarContrasena(password){
    if (password.length <5 ){
        return false;
    }
    let tieneMayuscula= false;
    let tieneMinuscula=false;
    let tieneNumero=false;

    for(let i=0; i< password.length; i++){
        const charCode = password.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
            tieneMayuscula = true;
        }
        // Verificar minúscula
        else if (charCode >= 97 && charCode <= 122) {
            tieneMinuscula = true;
        }
        // Verificar número
        else if (charCode >= 48 && charCode <= 57) {
            tieneNumero = true;
        }
        
    }
    return tieneMayuscula && tieneMinuscula && tieneNumero
}

function agregarUsuario(nombre, apellido, username, password, tarjeta) {
    let newUser = new Usuario(nombre, apellido, username, password, tarjeta);
    sistema.listaCompradores.push(newUser);
}



function luhnCheck(TarjCred) {
    let sum = 0; 
    let numDigits = TarjCred.length;
    let parity = numDigits % 2;

    for (let i = 0; i < numDigits; i++) {
        let digit = Number(TarjCred.charAt(i));

        if (i % 2 === parity) digit *= 2;
        if (digit > 9) digit -= 9;
        sum += digit;
    }
    return sum % 10 === 0;
}
