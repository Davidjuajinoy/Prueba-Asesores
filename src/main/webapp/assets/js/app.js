// Efecto index
if(location.pathname == "/PruebaAsesores/")
{
const cardHover= document.querySelectorAll('.hover').forEach(hover => {
    hover.addEventListener('mouseover',()=>[
        hover.classList.add('box-shadow-custom')
])
    hover.addEventListener('mouseout',()=>{
        hover.classList.remove('box-shadow-custom')
    })
});

}




if(location.pathname != "/PruebaAsesores/")
{
    /*? Sidebar */
const btnSidebar = document.getElementById('sidebarCollapse');
const sidebarActive = document.getElementById('sidebar');
const bodyContent = document.getElementById('content');

btnSidebar.addEventListener('click',()=>{
    sidebarActive.classList.toggle('active');
    bodyContent.classList.toggle('active');
})

/*? End Sidebar */

}


// ? Mensajes de Error
const msgError =(message) => {
    Swal.fire({
        icon: 'error',
        html: `<p class="text-white h4 mb-3 text-capitalize">Error de validacion de datos en</p><p class="text-danger text-capitalize h6">${message}</p>`,
        focusConfirm:true,
        background : '#343a40',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6C63FF',
      });
}

const msgSuccess= (message) =>{
    Swal.fire({
        icon: 'success',
        html: `<p class="text-white h4 mb-3 text-capitalize">Bien Hecho</p><p class="text-success text-capitalize h6">${message}</p>`,
        focusConfirm:true,
        background : '#343a40',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6C63FF'
      });
}


const validateName =(name) =>{
    const nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{1,25}$/;
    if(nameRegex.test(name)) return true
    else return false
}

const validateDocumentNumber = (documentNumber) => {
    const documentNumberRegex = /^((\d{8})|(\d{10}))?$/;
    if(documentNumberRegex.test(documentNumber)) return true//console.log('documento válido')
    else return false //console.log('documento incorrecto')
}



const validateDate = (date) => {
    const dateRegex = /^[0-9-]{1,10}$/;
    if(dateRegex.test(date)) return true//console.log('documento válido')
    else return false //console.log('documento incorrecto')
}

//? End Mensajes de Error



//? paginacion

const liMostrar =document.getElementById('pagination');

let pagina = {
    pagina: 1,
    usuariosFila : 6,
    btnFila : 3
}


const paginationHtml = (count,pageBtn) =>{

    const fragment = document.createDocumentFragment();

    const liBtnPagination = document.createElement('LI');
    if(count == pageBtn)
    {
        liBtnPagination.classList.add('page-item','active');

    }else{
        liBtnPagination.classList.add('page-item');
    }

    const liBtnPaginationButtom = document.createElement('BUTTON');
    liBtnPaginationButtom.classList.add('page-link');
    liBtnPaginationButtom.textContent=`${count}`;
    liBtnPagination.append(liBtnPaginationButtom);

    fragment.append(liBtnPagination);

    return fragment;
}

function numbersButtoms(page,pageBtn)
{
    liMostrar.innerHTML='';

    const liPrev = document.createElement('LI');
    liPrev.id="pagination-prev";
    if(pageBtn == 1)
    {
        liPrev.classList.add('page-item','disabled');
    }else{
        liPrev.classList.add('page-item');
    }
    const liPrevBtn = document.createElement('BUTTON');
    liPrevBtn.classList.add('page-link');
    liPrevBtn.textContent="Anterior";
    liPrev.append(liPrevBtn);
    liMostrar.append(liPrev)


    //? Numero de Btn paginacion
    let maxLeft = (pagina.pagina - Math.floor(pagina.btnFila / 2))
    let maxRight = (pagina.pagina + Math.floor(pagina.btnFila / 2))

    if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = pagina.btnFila;
    }

    if (maxRight > page) {
        maxLeft = page - (pagina.btnFila - 1)
        
        if (maxLeft < 1){
            maxLeft = 1
        }
        maxRight = page;
    }
    
    for (let i = maxLeft; i <= maxRight; i++) {
        liMostrar.append(paginationHtml(i,pageBtn)); 
    }

    const liNext = document.createElement('LI');
    liNext.id="pagination-next";
    if(pageBtn == page)
    {
        liNext.classList.add('page-item','disabled');
    }else{
        liNext.classList.add('page-item');
    }
    const liNextBtn = document.createElement('BUTTON');
    liNextBtn.classList.add('page-link');
    liNextBtn.textContent="Siguiente";
    liNext.append(liNextBtn);
    liMostrar.append(liNext)  

}

//! funcion que llama a toda la creacion de las tablas y tambien la paginacion
function TableAndpagination(pagina,usuariosFila,datos,functionHtml)
{
    const trimStart =(pagina-1) * usuariosFila;
    const trimEnd =trimStart + usuariosFila;
    const datosRecortados = datos.slice(trimStart,trimEnd);
    const numeroPaginas = Math.ceil(datos.length / usuariosFila);
    functionHtml(datosRecortados);
    numbersButtoms(numeroPaginas,pagina);
}


// End Paginacion

console.log(location.pathname);
    
    
    


if (location.pathname == '/PruebaAsesores/clientes')

{
    //? Guarda todos los datos de la tabla Usuarios (DB) 
    let AllDatos = [];
    
    //? Selecciona el tr de la tabla donde se mostraran los campos (id,usuarios,etc);
    const thBody = document.getElementById('tablaAll');

    //? Obtener ID y ejecutar Modales mostrando datos dependiendo de la id para show,edit y delete
    thBody.addEventListener('click', (e) => {

        const id = e.target;
        if (id.getAttribute('id'))
        {
            const datosId = id.getAttribute('id');
            // buscar el id que coincida con el id obtenido del evento
            const datosFilter = AllDatos.filter(user => user.cliente_id == datosId)[0];

            if (id.getAttribute('data-target') == '#ModalUpdate')
            {
                UpdateCliente(datosFilter);
            } else if (id.getAttribute('data-target') == '#ModalShow') {
                showCliente(datosFilter);
            } else if (id.getAttribute('data-target') == '#ModalDelete')
            {
                const message = `${datosFilter.cli_nombres} ${datosFilter.cli_apellidos} identificado con el documento ${datosFilter.cli_numero_documento}`
                msgQuestion(message, datosFilter.cliente_id);
            }


        }


    })


    //? creacion de tr y td de la tabla tablaAll 
    const createAllUsersTable = (datos, count) => {
        const fragment = document.createDocumentFragment();

        const trTableAll = document.createElement('TR');
        trTableAll.classList.add('table-light');

        const tdTableAll = document.createElement('TD');
        tdTableAll.setAttribute('colspan', '1');

        tdTableAll.textContent = `${count}`;

        trTableAll.append(tdTableAll);

        const td2TableAll = document.createElement('TD');
        td2TableAll.setAttribute('colspan', '1');
        td2TableAll.classList.add('text-capitalize');
        td2TableAll.textContent = `${datos.cli_nombres} ${datos.cli_apellidos}`;

        trTableAll.append(td2TableAll);
      
        const td4TableAll = document.createElement('TD');
        td4TableAll.textContent = `${datos.cli_numero_documento}`;

        trTableAll.append(td4TableAll);


        const td5TableAll = document.createElement('TD');
        td5TableAll.textContent = `${datos.nombre_ciudad}`;

        trTableAll.append(td5TableAll);

        const td6TableAll = document.createElement('TD');
        td6TableAll.classList.add('text-capitalize');
        td6TableAll.textContent = `${datos.nombre_pais}`;

        trTableAll.append(td6TableAll);



        const td9TableAll = document.createElement('TD');
        td9TableAll.classList.add('i-separated');
        // td9TableAll.id=`${datos.id_usuario}`;


        let iTd9 = document.createElement('I');
        iTd9.id = `${datos.cliente_id}`;
        iTd9.setAttribute('data-toggle', 'modal');
        iTd9.setAttribute('data-target', '#ModalShow');
        iTd9.classList.add('show-svg');
        td9TableAll.append(iTd9);
        


        // let aTd9 =document.createElement('A');
        // aTd9.classList.add('edit-btn');

        let iATd9 = document.createElement('I');
        iATd9.id = `${datos.cliente_id}`;
        iATd9.classList.add('edit-svg');
        iATd9.setAttribute('data-toggle', 'modal');
        iATd9.setAttribute('data-target', '#ModalUpdate');

        td9TableAll.append(iATd9);

        // td9TableAll.append(aTd9);

        let i2Td9 = document.createElement('I');
        i2Td9.id = `${datos.cliente_id}`;
        i2Td9.classList.add('delete-svg');
        i2Td9.setAttribute('data-toggle', 'modal');
        i2Td9.setAttribute('data-target', '#ModalDelete');

        td9TableAll.append(i2Td9);

        trTableAll.append(td9TableAll);


        fragment.append(trTableAll);
        return fragment;

    }


    //? Paginacion  prev - next


    liMostrar.addEventListener('click', function (e)
    {

        if (e.target.localName == 'button')
        {
            if (e.target.textContent != 'Siguiente' && e.target.textContent != 'Anterior')
            {
                let numero = e.target.textContent;
                pagina.pagina = (Number(numero));
                TableAndpagination(pagina.pagina, pagina.usuariosFila, AllDatos, renderizarHtml);
            } else if (e.target.textContent == 'Siguiente')
            {
                let page = Math.ceil(AllDatos.length / pagina.usuariosFila);

                if (pagina.pagina < page)
                {
                    pagina.pagina += 1;
                    TableAndpagination(pagina.pagina, pagina.usuariosFila, AllDatos, renderizarHtml);
                }


            } else if (e.target.textContent == 'Anterior' && pagina.pagina > 1)
            {
                pagina.pagina -= 1;
                TableAndpagination(pagina.pagina, pagina.usuariosFila, AllDatos, renderizarHtml);
            }

        }

    })



    // retorna el fragmento con todo el codigo de TR>TD de TableAll
    const renderizarHtml = (datos) => {
        const fragment = document.createDocumentFragment();
        let count = 0;
        for (const user of datos) {
            count++;
            fragment.append(createAllUsersTable(user, count));
        }
        thBody.innerHTML = '';
        thBody.append(fragment);
    }

    //Buscador Por indexOf
    const searchName = document.getElementById('buscador');
    searchName.addEventListener('input', function (e)
    {
        let value = searchName.value.toLowerCase();
        
       

        if (value.trim() != '')
        {
            for (const name of AllDatos) {
                let nombre = `${name.cli_nombres} ${name.cli_apellidos}`;
                let documento = `${name.cli_numero_documento}`;
                
                if (nombre.indexOf(value) != -1 || documento.indexOf(value) != -1)
                {
         
                    thBody.innerHTML = '';
                    thBody.appendChild(createAllUsersTable(name, 1));
                }

            }

        }

        if (value.trim() == '')
        {
            TableAndpagination(pagina.pagina, pagina.usuariosFila, AllDatos, renderizarHtml);
        }

    })




    //? Peticion Ajax de SELECT * FROM  de DB 
    const showAllDatos = () => {

        fetch(`clientes?method=showAll`)
                .then(resp => resp.ok ? Promise.resolve(resp) : Promise.reject(new Error('Fallos la consulta')))
                .then(response => response.json())
                .then(data => {
                    //? se guardar los datos en el array (esto es para detalles y actualizar)
                    AllDatos = data;                 
                    TableAndpagination(pagina.pagina, pagina.usuariosFila, data, renderizarHtml);
                })
                .catch(error => console.log(error));
    }
    
    showAllDatos();
    
    
    
    //? funcion para mostrar los campos en el #ModalUpdate 
    const UpdateCliente= (user) => {
        
        const id = document.getElementById("update_id").value=`${user.cliente_id}`;
        const nombres = document.getElementById("update_nombres").value=`${user.cli_nombres}`;
        const apellidos = document.getElementById("update_apellidos").value=`${user.cli_apellidos}`;
        const nombre_ciudad = document.getElementById("update_ciudad").value=`${user.fk_cli_ciudad}`;
        const numero_documento = document.getElementById("update_numero_documento").value=`${user.cli_numero_documento}`;
        const tipo_documento = document.getElementById("update_tipo_documento").value=`${user.fk_cli_tipo_documento}`;
//        const cli_fecha_creacion = document.getElementById("update_fecha_creacion").value=`${user.cli_fecha_creacion}`;
    }
    
    //? funcion para mostrar los campos en el #ModalShow 
    const showCliente = (user)=>{
        
        const nombres = document.getElementById("show_nombres").textContent=`${user.cli_nombres} ${user.cli_apellidos}`;
        const nombre_ciudad = document.getElementById("show_ciudad").textContent=`${user.nombre_ciudad}`;
        const tipo_documento = document.getElementById("show_tipo_documento").textContent=`${user.nombre_documento}`;
        const numero_documento = document.getElementById("show_numero_documento").textContent=`${user.cli_numero_documento}`;
        const nombre_pais = document.getElementById("show_pais").textContent=`${user.nombre_pais}`;
        const cli_fecha_creacion = document.getElementById("show_fecha_creacion").textContent=`${user.cli_fecha_creacion}`;
    }
    
    
     const validarFormUsers = (paramNombre,paramApellido,paramNumeroDocumento,paramTipoDocumento,paramCiudad,paramDate) =>
     {
         // tiene que ser parametro id "#ejemplo"
         if(paramNombre.value == ""){
             paramNombre.focus();
             const message = "Ingresar nombres del usuario";
             msgError(message);
         }
         else if(validateName(paramNombre.value) == false)
         {
            paramNombre.focus();
            const message = "El nombre ingresado no es valido";
            msgError(message);
         }
         else if(paramApellido.value == ""){
             paramApellido.focus();
             const message = "Ingresar apellidos del usuario";
             msgError(message);
         }
         else if(validateName(paramApellido.value) == false){
            paramApellido.focus();
            const message = "El apellido ingresado no es valido";
            msgError(message);
        }
      
         else if(paramNumeroDocumento.value == ""){
             paramNumeroDocumento.focus();
             const message = "Ingresar numero documento";
             msgError(message);
         }
         else if(validateDocumentNumber(paramNumeroDocumento.value) != true)
         {
            paramNumeroDocumento.focus();
            const message = "Numero documento no valido";
            msgError(message);
         }    
         else if(paramTipoDocumento.value == ""){
             paramTipoDocumento.focus();    
             const message = "Seleccionar el tipo de documento";
             msgError(message);
         }
         else if(paramCiudad.value == ""){
            paramCiudad.focus();     
            const message = "Seleccionar la ciudad";
            msgError(message);
        }
         else if(paramDate.value == ""){
            paramDate.focus();     
            const message = "Error fecha no valida";
            msgError(message);
        }
        else{
             return true;
         }
     };
    
    //? funcion para guardar el Cliente #ModalAdd
    const btnSubmitFormAdd = document.getElementById('GuardarModalAdd');
    btnSubmitFormAdd.addEventListener('click',(e)=>{
        e.preventDefault();
        const nombres = document.getElementById("nombres");
        const apellidos = document.getElementById("apellidos");
        const numero_documento = document.getElementById("numero_documento");
        const fecha_creacion = document.getElementById("fecha_creacion");
        const tipo_documento = document.getElementById("tipo_documento");
        const ciudad = document.getElementById("ciudad");
        const fecha = document.getElementById("fecha_creacion");

        
         const validarForm = validarFormUsers(nombres,apellidos,numero_documento,tipo_documento,ciudad,fecha);

         
         if(validarForm == true )
         {   
                const formData = new FormData();
                formData.append('nombres',nombres.value.toLowerCase());
                formData.append('apellidos',apellidos.value.toLowerCase());
                formData.append('numero_documento',numero_documento.value);
                formData.append('tipo_documento',tipo_documento.value);
                formData.append('ciudad',ciudad.value);
                formData.append('fecha_creacion',fecha_creacion.value);
                
                      
                fetch('clientes?method=create' , 
                {
                    method : 'POST',
                    body : formData

                })
                .then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo la insercion')))
                .then(resp => resp.json())
                .then((data)=>{
                     
                    if(data[0]['error'])
                    {
                        correo.focus();
                        const msg ='Fallo la creacion del Cliente';
                        msgError(msg);
                    }          
                    else if(data[0]['ok']){

                        $("#ModalAdd").modal('hide');
                        let message = 'Usuario Agregado Correctamente';
                        // se llama la funcion de !=error
                        msgSuccess(message);
                        // se llama a la funcion de mostrar usuarios html
                        showAllDatos();
                    //  se reinician los  valores de los input solicitados 
                        resetValueFormModalAdd();
                    }

                }).catch(error => console.log(error));
            }
        
    })
    
    //? funcion para actualizar el Cliente #ModalUpdate
    const btnSubmitFormUpdate = document.getElementById('GuardarModalUpdate');
    btnSubmitFormUpdate.addEventListener('click',(e)=>{
        e.preventDefault();
        const id = document.getElementById("update_id");
        const nombres = document.getElementById("update_nombres");
        const apellidos = document.getElementById("update_apellidos");
        const numero_documento = document.getElementById("update_numero_documento");
        const fecha_creacion = document.getElementById("update_fecha_creacion");
        const tipo_documento = document.getElementById("update_tipo_documento");
        const ciudad = document.getElementById("update_ciudad");
        const fecha = document.getElementById("update_fecha_creacion");

        
         const validarForm = validarFormUsers(nombres,apellidos,numero_documento,tipo_documento,ciudad,fecha);

         
         if(validarForm == true )
         {   
                const formData = new FormData();
                formData.append('update_id',id.value);
                formData.append('update_nombres',nombres.value.toLowerCase());
                formData.append('update_apellidos',apellidos.value.toLowerCase());
                formData.append('update_numero_documento',numero_documento.value);
                formData.append('update_tipo_documento',tipo_documento.value);
                formData.append('update_ciudad',ciudad.value);
                formData.append('update_fecha_creacion',fecha_creacion.value);
                
                      
                fetch('clientes?method=update' , 
                {
                    method : 'POST',
                    body : formData

                })
                .then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo la insercion')))
                .then(resp => resp.json())
                .then((data)=>{
                     
                    if(data[0]['error'])
                    {
                        correo.focus();
                        const msg ='Fallo la Actualizacion del Cliente';
                        msgError(msg);
                    }          
                    else if(data[0]['ok']){

                        $("#ModalUpdate").modal('hide');
                        let message = 'Usuario Actualizado Correctamente';
                        // se llama la funcion de !=error
                        msgSuccess(message);
                        // se llama a la funcion de mostrar usuarios html
                        showAllDatos();
  
                    }

                }).catch(error => console.log(error));
            }
        
    })
    
    //reset input
       const resetValueFormModalAdd= () =>{
        const nombres = document.getElementById("nombres").value='';
        const apellidos = document.getElementById("apellidos").value='';
        const numero_documento = document.getElementById("numero_documento").value='';
        const tipo_documento = document.getElementById("tipo_documento").value='';
        const ciudad = document.getElementById("ciudad").value='';
 
    }
    
    
    
      //? funcion De Mensaje modal y callback de eliminar(deleteUser(id));
    const msgQuestion = (message, id) => {
        Swal.fire({
            icon: 'warning',
            html: `<p class="text-white h4 mb-3 text-capitalize">Desea borrar al Cliente</p><p class="text-danger text-capitalize h6">${message}</p>`,
            focusConfirm:true,
            background : '#343a40',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#6C63FF',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6C63FF'
            }).then((result) => {
            if (result.value) {
                const msg = "El Cliente ha sido eliminado";
                msgSuccess(msg);
                destroyCliente(id);
    
            };
        })
    }

    //? peticion para eliminar usuario mediante id
    const destroyCliente = (id) =>{
        fetch(`clientes?method=destroy&delete_id=${id}`,{
        }).then( resp =>  (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo el delete')))
        .then( resp => resp.text())
        .then((data) =>{
            // se actualiza la tabla
            showAllDatos();
        })
    
    }

}