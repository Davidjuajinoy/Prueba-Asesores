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
    const nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{1,40}$/;
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

const validateExperiencia = (experiencia) => {
    const experienciaRegex = /^[0-9.]{1,6}$/;
    if(experienciaRegex.test(experiencia)) return true//console.log('documento válido')
    else return false //console.log('documento incorrecto')
}


//? End Mensajes de Error



//? paginacion

const liMostrar =document.getElementById('pagination');

// Objeto Guarda la pag
let pagina = {
    pagina: 1,
    usuariosFila : 6,
    btnFila : 3
}

//Creacion de la paginacion html = Fragmento
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


//Renderizacion de la Paginacion con numero de btn
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
    
    
    
//Modulo Clientes

if (location.pathname == '/PruebaAsesores/clientes')

{
    //? Guarda todos los datos de la tabla clientes (DB) 
    let AllDatos = [];
    
    //? Selecciona el tr de la tabla donde se mostraran los campos (id,clientes,etc);
    const thBody = document.getElementById('tablaAll');

    //? Obtener ID y ejecutar Modales mostrando datos dependiendo de la id para show,edit y delete
    thBody.addEventListener('click', (e) => {

        const id = e.target;
        if (id.getAttribute('id'))
        {
            const datosId = id.getAttribute('id');
            // buscar el id que coincida con el id obtenido del evento
            const datosFilter = AllDatos.filter(clientes => clientes.cliente_id == datosId)[0];

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



    // Crea todo el codigo de TR>TD en TableAll
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


//Modulo Asesores

if (location.pathname == '/PruebaAsesores/asesores')

{
    //? Guarda todos los datos de la tabla Asesores (DB) 
    let AllDatos = [];
    
    //? Selecciona el tr de la tabla donde se mostraran los campos (id,asesores,etc);
    const thBody = document.getElementById('tablaAll');

    //? Obtener ID y ejecutar Modales mostrando datos dependiendo de la id para show,edit y delete
    thBody.addEventListener('click', (e) => {

        const id = e.target;
        if (id.getAttribute('id'))
        {
            const datosId = id.getAttribute('id');
            // buscar el id que coincida con el id obtenido del evento
            const datosFilter = AllDatos.filter(asesor => asesor.ase_id == datosId)[0];

            if (id.getAttribute('data-target') == '#ModalUpdate')
            {
                UpdateCliente(datosFilter);
            } else if (id.getAttribute('data-target') == '#ModalShow') {
                showCliente(datosFilter);
            } else if (id.getAttribute('data-target') == '#ModalDelete')
            {
                const message = `${datosFilter.ase_nombre} identificado con el documento ${datosFilter.ase_numero_documento}`
                msgQuestion(message, datosFilter.ase_id);
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
        td2TableAll.textContent = `${datos.ase_nombre}`;

        trTableAll.append(td2TableAll);
      
        const td4TableAll = document.createElement('TD');
        td4TableAll.textContent = `${datos.ase_numero_documento}`;

        trTableAll.append(td4TableAll);


        const td5TableAll = document.createElement('TD');
        td5TableAll.textContent = `${datos.ase_hora_inicio}`;

        trTableAll.append(td5TableAll);

        const td6TableAll = document.createElement('TD');
        td6TableAll.classList.add('text-capitalize');
        td6TableAll.textContent = `${datos.ase_hora_fin}`;

        trTableAll.append(td6TableAll);



        const td9TableAll = document.createElement('TD');
        td9TableAll.classList.add('i-separated');


        let iTd9 = document.createElement('I');
        iTd9.id = `${datos.ase_id}`;
        iTd9.setAttribute('data-toggle', 'modal');
        iTd9.setAttribute('data-target', '#ModalShow');
        iTd9.classList.add('show-svg');
        td9TableAll.append(iTd9);
        


        let iATd9 = document.createElement('I');
        iATd9.id = `${datos.ase_id}`;
        iATd9.classList.add('edit-svg');
        iATd9.setAttribute('data-toggle', 'modal');
        iATd9.setAttribute('data-target', '#ModalUpdate');

        td9TableAll.append(iATd9);



        let i2Td9 = document.createElement('I');
        i2Td9.id = `${datos.ase_id}`;
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
    searchName.addEventListener('input', function ()
    {
        let value = searchName.value.toLowerCase();
        
       

        if (value.trim() != '')
        {
            for (const name of AllDatos) {
                let nombre = `${name.ase_nombre}`;
                let documento = `${name.ase_numero_documento}`;
                
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

        fetch(`asesores?method=showAll`)
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
        
        const id = document.getElementById("update_id").value=`${user.ase_id}`;
        const nombres = document.getElementById("update_nombres").value=`${user.ase_nombre}`;
        const numero_documento = document.getElementById("update_numero_documento").value=`${user.ase_numero_documento}`;
        const update_experiencia = document.getElementById("update_experiencia").value=`${user.ase_experiencia}`;
        const update_hora_inicio = document.getElementById("update_hora_inicio").value=`${user.ase_hora_inicio}`;
        const update_hora_fin = document.getElementById("update_hora_fin").value=`${user.ase_hora_fin}`;
        const tipo_documento = document.getElementById("update_tipo_documento").value=`${user.fk_ase_tipo_documento}`;
        const update_especialidad = document.getElementById("update_especialidad").value=`${user.ase_especialidad}`;
    }
    
    //? funcion para mostrar los campos en el #ModalShow 
    const showCliente = (user)=>{
        
        const nombres = document.getElementById("show_nombres").textContent=`${user.ase_nombre}`;
        const numero_documento = document.getElementById("show_numero_documento").textContent=`${user.ase_numero_documento}`;
        const show_experiencia = document.getElementById("show_experiencia").textContent=`${user.ase_experiencia}`;
        const tipo_documento = document.getElementById("show_tipo_documento").value=`${user.fk_ase_tipo_documento}`;
        const show_hora_inicio = document.getElementById("show_hora_inicio").textContent=`${user.ase_hora_inicio}`;
        const show_hora_fin = document.getElementById("show_hora_fin").textContent=`${user.ase_hora_fin}`;
        const show_especialidad = document.getElementById("show_especialidad").textContent=`${user.ase_especialidad}`;
    }
    
    
     const validarFormUsers = (paramNombre,paramNumeroDocumento,paramExperiencia,paramHoraInicio,paramHoraFinal,paramTipoDocumento,paramEspecialidad) =>
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
         else if(paramExperiencia.value == "")
         {
             paramExperiencia.focus();
             const message = "Ingresar Años de Experiencia";
             msgError(message);
         }else if(validateExperiencia(paramExperiencia.value) != true)
         {
             paramExperiencia.focus();
             const message = "Solo se aceptan numeros {1.4},{1},{2,5}";
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
         else if(paramHoraInicio.value == ""){
            paramHoraInicio.focus();     
            const message = "Seleccionar la hora inicial";
            msgError(message);
        }
         else if(paramHoraFinal.value == ""){
            paramHoraFinal.focus();     
            const message = "Seleccionar la hora final";
            msgError(message);
        }
        else if(paramTipoDocumento.value == ""){
             paramTipoDocumento.focus();    
             const message = "Seleccionar el tipo de documento";
             msgError(message);
        }
         else if(paramEspecialidad.value == ""){
            paramEspecialidad.focus();     
            const message = "Ingresar especialidad";
            msgError(message);
        }
        else{
             return true;
         }
     };
    
    //? funcion para guardar el Asesor #ModalAdd
    const btnSubmitFormAdd = document.getElementById('GuardarModalAdd');
    btnSubmitFormAdd.addEventListener('click',(e)=>{
        e.preventDefault();
        const nombres = document.getElementById("nombres");
        const numero_documento = document.getElementById("numero_documento");
        const experiencia = document.getElementById("experiencia");
        const hora_inicio = document.getElementById("hora_inicio");
        const hora_fin = document.getElementById("hora_fin");
        const tipo_documento = document.getElementById("tipo_documento");
        const especialidad = document.getElementById("especialidad");

        
         const validarForm = validarFormUsers(nombres,numero_documento,experiencia,hora_inicio,hora_fin,tipo_documento,especialidad);

         if(validarForm == true )
         {   
                const formData = new FormData();
                formData.append('nombres',nombres.value.toLowerCase());
                formData.append('numero_documento',numero_documento.value);
                formData.append('experiencia',experiencia.value);
                formData.append('hora_inicio',hora_inicio.value);
                formData.append('hora_fin',hora_fin.value);
                formData.append('tipo_documento',tipo_documento.value);
                formData.append('especialidad',especialidad.value);
                
                      
                fetch('asesores?method=create' , 
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
                        let message = 'Asesor Agregado Correctamente';
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
        console.log('xd');
        const id = document.getElementById("update_id");
        const nombres = document.getElementById("update_nombres");
        const numero_documento = document.getElementById("update_numero_documento");
        const update_experiencia = document.getElementById("update_experiencia");
        const update_hora_inicio = document.getElementById("update_hora_inicio");
        const update_hora_fin = document.getElementById("update_hora_fin");
        const tipo_documento = document.getElementById("update_tipo_documento");
        const update_especialidad = document.getElementById("update_especialidad");

         const validarForm = validarFormUsers(nombres,numero_documento,update_experiencia,update_hora_inicio,update_hora_fin,tipo_documento,update_especialidad);

         if(validarForm == true )
         {   
                const formData = new FormData();
                formData.append('update_id',id.value);
                formData.append('update_nombres',nombres.value.toLowerCase());
                formData.append('update_numero_documento',numero_documento.value.toLowerCase());
                formData.append('update_experiencia',update_experiencia.value);
                formData.append('update_hora_inicio',update_hora_inicio.value);
                formData.append('update_hora_fin',update_hora_fin.value);
                formData.append('update_tipo_documento',tipo_documento.value);
                formData.append('update_especialidad',update_especialidad.value);
                
                      
                fetch('asesores?method=update' , 
                {
                    method : 'POST',
                    body : formData

                })
                .then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo la insercion')))
                .then(resp => resp.json())
                .then((data)=>{
                     
                    if(data[0]['error'])
                    {
                        
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
     
        const nombres = document.getElementById("nombres").value="";
        const numero_documento = document.getElementById("numero_documento").value="";
        const experiencia = document.getElementById("experiencia").value="";
        const hora_inicio = document.getElementById("hora_inicio").value="";
        const hora_fin = document.getElementById("hora_fin").value="";
        const tipo_documento = document.getElementById("tipo_documento").value="";
        const especialidad = document.getElementById("especialidad").value="";
        
 
    }
    
    
    
      //? funcion De Mensaje modal y callback de eliminar(deleteUser(id));
    const msgQuestion = (message, id) => {
        Swal.fire({
            icon: 'warning',
            html: `<p class="text-white h4 mb-3 text-capitalize">Desea borrar al Asesor</p><p class="text-danger text-capitalize h6">${message}</p>`,
            focusConfirm:true,
            background : '#343a40',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#6C63FF',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6C63FF'
            }).then((result) => {
            if (result.value) {
                const msg = "El Asesor ha sido eliminado";
                msgSuccess(msg);
                destroyCliente(id);
    
            };
        })
    }

    //? peticion para eliminar asesor mediante id
    const destroyCliente = (id) =>{
        fetch(`asesores?method=destroy&delete_id=${id}`,{
        }).then( resp =>  (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo el delete')))
        .then( resp => resp.text())
        .then((data) =>{
            // se actualiza la tabla
            showAllDatos();
        })
    
    }

}



//Modulo Citas

if (location.pathname == '/PruebaAsesores/citas')

{
    //? Guarda todos los datos de la tabla Asesores (DB) 
    let AllDatos = [];
    
    //? Selecciona el tr de la tabla donde se mostraran los campos (id,asesores,etc);
    const thBody = document.getElementById('tablaAll');

    //? Obtener ID y ejecutar Modales mostrando datos dependiendo de la id para show,edit y delete
    thBody.addEventListener('click', (e) => {

        const id = e.target;
        if (id.getAttribute('id'))
        {
            const datosId = id.getAttribute('id');
            // buscar el id que coincida con el id obtenido del evento
            const datosFilter = AllDatos.filter(cita => cita.id_citas == datosId)[0];

            if (id.getAttribute('data-target') == '#ModalUpdate')
            {
                UpdateCliente(datosFilter);
            } else if (id.getAttribute('data-target') == '#ModalShow') {
                showCliente(datosFilter);
            } else if (id.getAttribute('data-target') == '#ModalDelete')
            {
                const message = `${datosFilter.descripcion} Del Asesor ${datosFilter.fk_ase_nombre}`
                msgQuestion(message, datosFilter.id_citas);
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
        td2TableAll.textContent = `${datos.fecha}`;

        trTableAll.append(td2TableAll);
      
        const td4TableAll = document.createElement('TD');
        td4TableAll.classList.add('text-capitalize');

        td4TableAll.textContent = `${datos.fk_ase_nombre}`;

        trTableAll.append(td4TableAll);


        const td5TableAll = document.createElement('TD');
        td5TableAll.classList.add('text-capitalize');
        td5TableAll.textContent = `${datos.fk_cli_nombres} ${datos.fk_cli_apellidos}`;

        trTableAll.append(td5TableAll);

        const td6TableAll = document.createElement('TD');
        td6TableAll.classList.add('text-capitalize');
        td6TableAll.textContent = `${datos.fk_estado_cita}`;

        trTableAll.append(td6TableAll);



        const td9TableAll = document.createElement('TD');
        td9TableAll.classList.add('i-separated');


        let iTd9 = document.createElement('I');
        iTd9.id = `${datos.id_citas}`;
        iTd9.setAttribute('data-toggle', 'modal');
        iTd9.setAttribute('data-target', '#ModalShow');
        iTd9.classList.add('show-svg');
        td9TableAll.append(iTd9);
        


        let iATd9 = document.createElement('I');
        iATd9.id = `${datos.id_citas}`;
        iATd9.classList.add('edit-svg');
        iATd9.setAttribute('data-toggle', 'modal');
        iATd9.setAttribute('data-target', '#ModalUpdate');

        td9TableAll.append(iATd9);



        let i2Td9 = document.createElement('I');
        i2Td9.id = `${datos.id_citas}`;
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
    searchName.addEventListener('input', function ()
    {
        let value = searchName.value.toLowerCase();
        
       

        if (value.trim() != '')
        {
            for (const name of AllDatos) {
                let nombre = `${name.fk_ase_nombre}`;
                let documento = `${name.estado}`;
                
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

        fetch(`citas?method=showAll`)
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
    
    
//    
    //? funcion para mostrar los campos en el #ModalUpdate 
    const UpdateCliente= (user) => {
        
        const update_id = document.getElementById("update_id").value=`${user.id_citas}`;
        const update_fk_cliente = document.getElementById("update_fk_cliente").value=`${user.fk_clientes}`;
        const update_fecha = document.getElementById("update_fecha").value=`${user.fecha}`;
        const update_estado = document.getElementById("update_estado").value=`${user.fk_estado}`;
        const update_fk_asesor = document.getElementById("update_fk_asesor").value=`${user.fk_asesores}`;
        const update_hora_inicio = document.getElementById("update_hora_inicio").value=`${user.hora_inicio}`;
        const update_hora_fin = document.getElementById("update_hora_fin").value=`${user.hora_final}`;
        const update_descripcion = document.getElementById("update_descripcion").value=`${user.descripcion}`;
    }
    
    //? funcion para mostrar los campos en el #ModalShow 
    const showCliente = (user)=>{
        
        const show_cliente = document.getElementById("show_cliente").textContent=`${user.fk_cli_nombres} ${user.fk_cli_apellidos}`;
        const show_fecha = document.getElementById("show_fecha").textContent=`${user.fecha}`;
        const show_estado = document.getElementById("show_estado").textContent=`${user.fk_estado_cita}`;
        const show_asesor = document.getElementById("show_asesor").textContent=`${user.fk_ase_nombre}`;
        const show_hora_inicio = document.getElementById("show_hora_inicio").textContent=`${user.hora_inicio}`;
        const show_hora_fin = document.getElementById("show_hora_fin").textContent=`${user.hora_final}`;
        const show_descripcion = document.getElementById("show_descripcion").textContent=`${user.descripcion}`;
    }
//    




     const validarFormUsers = (paramDescripcion,paramFecha,paramEstado,paramHoraInicio,paramHoraFinal,paramFkAsesor,paramFkCliente) =>
     {
         // tiene que ser parametro id "#ejemplo"
         if(paramDescripcion.value == ""){
             paramDescripcion.focus();
             const message = "Ingresar Descripcion De La Cita";
             msgError(message);
         }
        else if(paramFecha.value == ""){
             paramFecha.focus();
             const message = "Ingresar Fecha de la Cita";
             msgError(message);
         }
        else if(paramEstado.value == ""){
            paramEstado.focus();     
            const message = "Seleccionar Estado de la Cita";
            msgError(message);
        }
         else if(paramHoraInicio.value == ""){
            paramHoraInicio.focus();     
            const message = "Seleccionar la hora inicial";
            msgError(message);
        }
         else if(paramHoraFinal.value == ""){
            paramHoraFinal.focus();     
            const message = "Seleccionar la hora final";
            msgError(message);
        }
        else if(paramFkAsesor.value == ""){
             paramFkAsesor.focus();    
             const message = "Seleccionar el Asesor";
             msgError(message);
        }
         else if(paramFkCliente.value == ""){
            paramFkCliente.focus();     
            const message = "Ingresar el Cliente";
            msgError(message);
        }
        else{
             return true;
         }
     };
//    
    //? funcion para guardar el Asesor #ModalAdd
    const btnSubmitFormAdd = document.getElementById('GuardarModalAdd');
    btnSubmitFormAdd.addEventListener('click',(e)=>{
        e.preventDefault();
        const descripcion = document.getElementById("descripcion");
        const fecha = document.getElementById("fecha");
        const estado = document.getElementById("estado");
        const hora_inicio = document.getElementById("hora_inicio");
        const hora_fin = document.getElementById("hora_fin");
        const fk_asesor = document.getElementById("fk_asesor");
        const fk_cliente = document.getElementById("fk_cliente");

        
         const validarForm = validarFormUsers(descripcion,fecha,estado,hora_inicio,hora_fin,fk_asesor,fk_cliente);

         if(validarForm == true )
         {   
                const formData = new FormData();
                formData.append('descripcion',descripcion.value.toLowerCase());
                formData.append('fecha',fecha.value);
                formData.append('estado',estado.value);
                formData.append('hora_inicio',hora_inicio.value);
                formData.append('hora_fin',hora_fin.value);
                formData.append('fk_asesor',fk_asesor.value);
                formData.append('fk_cliente',fk_cliente.value);
                
                      
                fetch('citas?method=create' , 
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
                        let message = 'Asesor Agregado Correctamente';
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
        const update_id = document.getElementById("update_id");
        const update_descripcion = document.getElementById("update_descripcion");
        const update_fecha = document.getElementById("update_fecha");
        const update_estado = document.getElementById("update_estado");
        const update_hora_inicio = document.getElementById("update_hora_inicio");
        const update_hora_fin = document.getElementById("update_hora_fin");
        const update_fk_asesor = document.getElementById("update_fk_asesor");
        const update_fk_cliente = document.getElementById("update_fk_cliente");

        const validarForm = validarFormUsers(update_descripcion,update_fecha,update_estado,update_hora_inicio,update_hora_fin,update_fk_asesor,update_fk_cliente);



         if(validarForm == true )
         {   
                const formData = new FormData();
                formData.append('update_id',update_id.value);
                formData.append('update_descripcion',update_descripcion.value);
                formData.append('update_fecha',update_fecha.value);
                formData.append('update_estado',update_estado.value);
                formData.append('update_hora_inicio',update_hora_inicio.value);
                formData.append('update_hora_fin',update_hora_fin.value);
                formData.append('update_fk_asesor',update_fk_asesor.value);
                formData.append('update_fk_cliente',update_fk_cliente.value);
                
                      
                fetch('citas?method=update' , 
                {
                    method : 'POST',
                    body : formData

                })
                .then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo la insercion')))
                .then(resp => resp.json())
                .then((data)=>{
                     
                    if(data[0]['error'])
                    {
                        
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
//    
        //reset input modalAdd
        const resetValueFormModalAdd= () =>{
     
            const descripcion = document.getElementById("descripcion").value="";
            const fecha = document.getElementById("fecha").value="";
            const estado = document.getElementById("estado").value="";
            const hora_inicio = document.getElementById("hora_inicio").value="";
            const hora_fin = document.getElementById("hora_fin").value="";
            const fk_asesor = document.getElementById("fk_asesor").value="";
            const fk_cliente = document.getElementById("fk_cliente").value="";
        
 
        }
//    
//    
//    
      //? funcion De Mensaje modal y callback de eliminar(deleteUser(id));
    const msgQuestion = (message, id) => {
        Swal.fire({
            icon: 'warning',
            html: `<p class="text-white h4 mb-3 text-capitalize">Desea borrar la cita</p><p class="text-danger text-capitalize h6">${message}</p>`,
            focusConfirm:true,
            background : '#343a40',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#6C63FF',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6C63FF'
            }).then((result) => {
            if (result.value) {
                const msg = "La Cita ha sido eliminado";
                msgSuccess(msg);
                destroyCliente(id);
    
            };
        })
    }

    //? peticion para eliminar asesor mediante id
    const destroyCliente = (id) =>{
        fetch(`citas?method=destroy&delete_id=${id}`,{
        }).then( resp =>  (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo el delete')))
        .then( resp => resp.text())
        .then((data) =>{
            // se actualiza la tabla
            showAllDatos();
        })
    
    }

}

