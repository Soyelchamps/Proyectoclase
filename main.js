
// crea las constantes
const inputNombre = document.querySelector('#nombre');
const inputPoder = document.querySelector('#poder');
const inputFoto = document.querySelector('#foto');
const inputEdad = document.querySelector('#edad');
const btnAgregar = document.querySelector('#btnAgregar')
const contenedorLista = document.querySelector('#lista')

//agrega un unicornio
function agregarUni (){
    const inputNombreUni = inputNombre.value;
    const inputPoderUni = inputPoder.value;
    const inputFotoUni = inputFoto.value;
    const inputEdadUni = inputEdad.value;
        // crea el objeto con los datos del unicornio
        const Unicornio = {
            name: inputNombreUni,
            power: inputPoderUni,
            image: inputFotoUni,
            age: inputEdadUni
        } //metodo post para crear un unicornio
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(Unicornio),
            headers:{
                'Content-Type' :'application/json',
            }
        }

        fetch('https://unicorns-api.herokuapp.com/api/v1/unicorns',fetchConfig)
        .then((result) => {
            return result.json();
         }).then((result) => {
            console.log(result);
            limpiarInputs();
            obtenerUnicornios();
        }).catch((err) => {
            console.log(err);
        })
        }

function limpiarInputs(){
    inputNombre.value = '';
    inputPoder.value = '';
    inputFoto.value = '';
    inputEdad.value = '';
}

function obtenerUnicornios (){
    fetch('https://unicorns-api.herokuapp.com/api/v1/unicorns')
        .then((result) => {
            return result.json();
         }).then((result) => {
            console.log(result);
            mostrarUnicornios(result);
         }).catch((err) => {
            console.log(err);
        });
        }

    
    function mostrarUnicornios(arrayUnicornios){
        //Antes de agregar contenido a la lista limpiamos el contenedor
        contenedorLista.innerHTML = '';
        //Antes de crear los elementos invertimos el arreglo, el primer paso a ser el ultimo y el ulimo el primero
        arrayUnicornios= arrayUnicornios.reverse();
        //Recorremos el arreglo y creamos un li por cada elemento
        arrayUnicornios.forEach((element) => {
            const li= document.createElement('li') //Esto crea un elemento li
            const liContent = `
            <div class="card">
            <h3>${element.name}</h3>
            <img class="foto" src=${element.image} width="300">
            <h3>${element.power}</h3> 
            <h3>${element.age}</h3>
            <button id="borrar" onclick="eliminarUnicornio('${element._id}')">Eliminar</button>
            <button class="modificar" onclick="modificarUnicornio('${element._id}')">Modificar</button>
            </div>
        `
        li.addEventListener('click', () => {console.log(element._id)});
        li.id = element._id;
        li.innerHTML = liContent
        contenedorLista.appendChild(li)    
        })
    }

    btnAgregar.addEventListener('click',agregarUni);   
    function eliminarUnicornio(id){
        fetch(`https://unicorns-api.herokuapp.com/api/v1/unicorns/${id}`,{
            method: 'DELETE'
        }).then((result) => {
            return result.json();
         }).then((result) => {
            console.log(result);
            obtenerUnicornios();
         }).catch((err) => {
            console.log(err);
        });
    }
    


    
    // crea las constantes para modficiar
const minputNombre = document.querySelector('#mnombre');
const minputPoder = document.querySelector('#mpoder');
const minputFoto = document.querySelector('#mfoto');
const minputEdad = document.querySelector('#medad');
const mcontenedorLista = document.querySelector('#mlista')


function modificarUnicornio (id){
    const minputNombreUni = minputNombre.value;
    const minputPoderUni = minputPoder.value;
    const minputFotoUni = minputFoto.value;
    const minputEdadUni = minputEdad.value;

    const mUnicornio = {
                      name: minputNombreUni,
                      power: minputPoderUni,
                      image: minputFotoUni,
                      age: minputEdadUni
                  } //metodo post para crear un unicornio
                  const mfetchConfig = {
                      method: 'PUT',
                      body: JSON.stringify(mUnicornio),
                      headers:{
                          'Content-Type' :'application/json',
                      }
                  }
                    fetch(`https://unicorns-api.herokuapp.com/api/v1/unicorns/${id}`,mfetchConfig)
                        .then((result) => { 
                            return result.json();
                         }).then((result) => {  
                            console.log(result);
                            obtenerUnicornios();
                         }).catch((err) => {
                            console.log(err);
                        });
                    }
                



    obtenerUnicornios();