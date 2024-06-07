let contadorAdminID=1
let contadorCompradorID=1
class Sistema{
    constructor(){
        this.listaAdministradores = [
            new Administrador("Agustina", "agus123"),
            new Administrador("Pepe", "pepe123")
        ];

        this.listaCompradores=[
            new Comprador ("Maria", "maria123"),
            new Comprador ("Lucas", "lucas123")
        ];
        this.listaProductors=[];
        this.listaCompras=[];
        this.usuarioLogueado = null
    }

   /*  buscarAdmin(nombreDeUsuario){
        let adminBuscado = null
        
        for (let i = 0; i < this.listaAdministradores.length; i++) {
            const unAdmin = this.listaAdministradores[i];
            if (unAdmin.usuario === nombreDeUsuario){
                adminBuscado = unAdmin
                break;
            }
        }
        return adminBuscado
    } */

    obtenerElemento(arrayElem, prop, valor){
        let obj = null
        for (let i = 0; i < arrayElem.length; i++) {
            const unElemento = arrayElem[i];
            if (unElemento[prop]===valor){
                obj = unElemento
                break;
            }
        }
        return obj
    }
}

class Administrador{
    constructor(usuario, pass){
        this.usuario = usuario
        this.pass = pass
        this.id = contadorAdminID

        contadorAdminID++
    }
}

class Comprador{
    constructor(usuario, pass, nombre,apellido,tarjetaCredito,cvc){
        this.usuario = usuario
        this.pass = pass
        this.nombre;
        this.apellido; 
        this.tarjetaCredito;
        this.cvc;
        this.contadorCompradorID;
        this.saldoInicial = 3000
        contadorAdminID++
    }
}

let sistema = new Sistema()
inicio()

function inicio(){
   ocultarTodo()
   document.querySelector("#pantalLogin").style.display = "block" //Muestra la sección de login
   document.querySelector("#btnLogin").addEventListener("click", hacerLogin)
   document.querySelector("#btnRegistrar").addEventListener("click", registrarUsuario)
}

function ocultarTodo(){
    document.querySelector("#navPrincipal").style.display = "none"  //Manera de ocultar cosas
    document.querySelector("#pantalLogin").style.display = "none" 
    document.querySelector("#navPrincipalComprador").style.display = "none" 
    document.querySelector("#pantallaRegistro").style.display = "none" 
}

function hacerLogin(){
    //Capturo los datos
    let usuario = document.querySelector("#txtLoginUsuario").value;
    let pass = document.querySelector("#txtPass").value;
    //Obtengo un Admin con ese nombre de usuario

    // let adminBuscado = sistema.buscarAdmin(usuario)
    let adminBuscado = sistema.obtenerElemento(sistema.listaAdministradores,"usuario", usuario)
    //Si no es null, verifico que la contraseña sea la correcta
    if (adminBuscado!=null){
        if (adminBuscado.pass===pass){
            ocultarTodo()
            document.querySelector("#navPrincipal").style.display = "block" //Si es correcta, muestro el menú
            sistema.usuarioLogueado = adminBuscado
        } else{
            alert("pass incorrecta")
        }
    } else {
        //busco el comprador
        let compradorBuscado = sistema.obtenerElemento(sistema.listaCompradores,"usuario", usuario)
        if (compradorBuscado.pass===pass){
            ocultarTodo()
            document.querySelector("#navPrincipalComprador").style.display = "block" //Si es correcta, muestro el menú
            sistema.usuarioLogueado = compradorBuscado
        } else{
            alert("pass incorrecta")
        }
    }
                        
}

function registrarUsuario(){
    ocultarTodo()
    document.querySelector("#pantallaRegistro").style.display = "block"
    let nombre = document.querySelector("#txtNombre").value;
    let apellido = document.querySelector("#txtApellido").value;
    let usuario = document.querySelector("#txtUsuario").value;
    let pass = document.querySelector("#txtPass").value;
    let tarjetaCredito = document.querySelector("#txtTarjetaCredito").value;
    let cvc = document.querySelector("#txtCVC").value;

    let compradorNuevo = new Comprador(usuario,pass,nombre,apellido,tarjetaCredito,cvc)
    
}

function cerrarSesion(){
    //Cambiar la property de vuelta a null
}