

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
            const datosFilter = AllDatos.filter(user => user.id_usuario == datosId)[0];

            if (id.getAttribute('data-target') == '#ModalUpdate')
            {
                showdatosId(datosFilter);
            } else if (id.getAttribute('data-target') == '#ModalShow') {
                showUserInfo(datosFilter);
            } else if (id.getAttribute('data-target') == '#Delete')
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
        td2TableAll.setAttribute('colspan', '2');
        td2TableAll.classList.add('text-capitalize');
        td2TableAll.textContent = `${datos.cli_nombres} ${datos.apellidos}`;

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
        iTd9.id = `${datos.id_usuario}`;
        iTd9.setAttribute('data-toggle', 'modal');
        iTd9.setAttribute('data-target', '#ModalShow');
        iTd9.classList.add('show-svg');
        td9TableAll.append(iTd9);


        // let aTd9 =document.createElement('A');
        // aTd9.classList.add('edit-btn');

        let iATd9 = document.createElement('I');
        iATd9.id = `${datos.id_usuario}`;
        iATd9.classList.add('edit-svg');
        iATd9.setAttribute('data-toggle', 'modal');
        iATd9.setAttribute('data-target', '#ModalUpdate');

        td9TableAll.append(iATd9);

        // td9TableAll.append(aTd9);

        let i2Td9 = document.createElement('I');
        i2Td9.id = `${datos.id_usuario}`;
        i2Td9.classList.add('delete-svg');
        i2Td9.setAttribute('data-toggle', 'modal');
        i2Td9.setAttribute('data-target', '#Delete');

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

    //? funcion para mostrar los campos en el #ModalUpdate de Administrador.usuarios
//    const showdatosId = (user) => {
//        const nombres = document.getElementById("update_nombres").value = `${user.nombres}`;
//        const apellidos = document.getElementById("update_apellidos").value = `${user.apellidos}`;
//        const correo = document.getElementById("update_correo").value = `${user.correo}`;
//        const rol = document.getElementById("update_rol").value = `${user.fk_rol}`;
//        const clave = document.getElementById("update_clave").value = ``;
//        const tipo_documento = document.getElementById("update_tipo_documento").value = `${user.fk_tipo_documento}`;
//        const numero_documento = document.getElementById("update_numero_documento").value = `${user.numero_documento}`;
//        const cargo = document.getElementById("update_cargo").value = `${user.fk_cargo}`;
//        const eps = document.getElementById("update_eps").value = `${user.fk_eps}`;
//        const fondo_pension = document.getElementById("update_fondo_pension").value = `${user.fk_fondo_pension}`;
//        const id = document.getElementById('update_id').value = `${user.id_usuario}`;
//        const token = document.getElementById('token').value = `${user.token}`;
//        const clave_antigua = document.getElementById('clave_antigua').value = `${user.clave}`;
//        const updatePrevImgUser = document.getElementById('update_prev_user_img').src = `${user.img_usuario}`;
//
//    }

    //? funcion para mostrar los campos en el #ModalShow de Administrador.usuarios
//    const showUserInfo = (user) => {
//        const nombres = document.getElementById("show_nombres").textContent = `${user.nombres} ${user.apellidos}`;
//        const correo = document.getElementById("show_correo").textContent = `${user.correo}`;
//        const rol = document.getElementById("show_rol").value = `${user.fk_rol}`;
//        const tipo_documento = document.getElementById("show_tipo_documento").value = `${user.fk_tipo_documento}`;
//        const numero_documento = document.getElementById("show_numero_documento").textContent = `${user.numero_documento}`;
//        const cargo = document.getElementById("show_cargo").value = `${user.fk_cargo}`;
//        const eps = document.getElementById("show_eps").value = `${user.fk_eps}`;
//        const fondo_pension = document.getElementById("show_fondo_pension").value = `${user.fk_fondo_pension}`;
//        const img_usuario = document.getElementById("show_user_img").src = `${user.img_usuario}`;
//    }




    //? Resetear valores en #ModalAddNews
//    const resetValueFormModal = () => {
//        const nombres = document.getElementById("nombres").value = "";
//        const apellidos = document.getElementById("apellidos").value = "";
//        const correo = document.getElementById("correo").value = "";
//        const clave = document.getElementById("clave").value = "";
//        const tipo_documento = document.getElementById("tipo_documento").value = "";
//        const numero_documento = document.getElementById("numero_documento").value = "";
//        const cargo = document.getElementById("cargo").value = "";
//        const eps = document.getElementById("eps").value = "";
//        const fondo_pension = document.getElementById("fondo_pension").value = "";
//        const fk_rol = document.getElementById('rol').value = "";
//        const prev_user_img = document.getElementById('prev_user_img').src = "";
//        const user_img = document.getElementById('user_img').value = "";
//    }




    //? Validacion de alertas de Error de Formulario de Usuarios
    const validarFormUsers = (paramNombre, paramApellido, paramCorreo, paramNumeroDocumento, paramFkRol, paramFondoPension, paramCargo, paramTipoDocumento, paramEps) =>
    {
        // tiene que ser parametro id "#ejemplo"
        if (paramNombre.value == "") {
            paramNombre.focus();
            const message = "Ingresar nombres del usuario";
            msgError(message);
        } else if (validateName(paramNombre.value) == false)
        {
            paramNombre.focus();
            const message = "El nombre ingresado no es valido";
            msgError(message);
        } else if (paramApellido.value == "") {
            paramApellido.focus();
            const message = "Ingresar apellidos del usuario";
            msgError(message);
        } else if (validateName(paramApellido.value) == false) {
            paramApellido.focus();
            const message = "El apellido ingresado no es valido";
            msgError(message);
        } else if (paramCorreo.value == "") {
            paramCorreo.focus();
            const message = "Ingresar correo del usuario";
            msgError(message);
        } else if (validateEmail(paramCorreo.value) == false)
        {
            paramCorreo.focus();
            const message = "El Correo Ingresado No es Valido";
            msgError(message);
        } else if (paramNumeroDocumento.value == "") {
            paramNumeroDocumento.focus();
            const message = "Ingresar numero documento";
            msgError(message);
        } else if (validateDocumentNumber(paramNumeroDocumento.value) != true)
        {
            paramNumeroDocumento.focus();
            const message = "Numero documento no valido";
            msgError(message);
        } else if (paramTipoDocumento.value == "") {
            paramTipoDocumento.focus();
            const message = "Seleccionar el tipo de documento";
            msgError(message);
        } else if (paramCargo.value == "") {
            paramCargo.focus();
            const message = "Seleccionar el cargo";
            msgError(message);
        } else if (paramEps.value == "") {
            paramEps.focus();
            const message = "Seleccionar la eps";
            msgError(message);
        } else if (paramFondoPension.value == "") {
            paramFondoPension.focus();
            const message = "Seleccionar el fondo de pensiones";
            msgError(message);
        } else if (paramFkRol.value == "") {
            paramFkRol.focus();
            const message = "Seleccionar el tipo de Rol";
            msgError(message);
        } else {
            return true;
        }
    };

    const validarFormUsersPass = (paramClave) =>
    {
        if (paramClave.value == "") {
            paramClave.focus();
            const message = "Ingresar clave del usuario";
            msgError(message);
        } else if (validatePasswordModerate(paramClave.value) == false)
        {
            paramClave.focus();
            const message = "Clave no valida Debe tener 1 letra minúscula, 1 letra mayúscula, 1 número y tener al menos 8 caracteres.";
            msgError(message);
        } else {
            return true;
        }
    }



    //? funcion para guardar el usuario en DB en dashboard-admin : usuarios.php modal #ModalAddUser
    const btnSubmitModalCreate = document.getElementById('GuardarUsuario');
    btnSubmitModalCreate.addEventListener('click', (e) => {
        e.preventDefault();
        const nombres = document.getElementById("nombres");
        const apellidos = document.getElementById("apellidos");
        const correo = document.getElementById("correo");
        const tipo_documento = document.getElementById("tipo_documento");
        const clave = document.getElementById("clave");
        const numero_documento = document.getElementById("numero_documento");
        const cargo = document.getElementById("cargo");
        const eps = document.getElementById("eps");
        const fondo_pension = document.getElementById("fondo_pension");
        const fk_rol = document.getElementById('rol');

        const validarForm = validarFormUsers(nombres, apellidos, correo, numero_documento, fk_rol, fondo_pension, cargo, tipo_documento, eps);


        if (validarForm == true)
        {

            const formData = new FormData();
            formData.append('nombres', nombres.value.toLowerCase());
            formData.append('apellidos', apellidos.value.toLowerCase());
            formData.append('correo', correo.value.toLowerCase());
            formData.append('clave', clave.value);
            formData.append('tipo_documento', tipo_documento.value);
            formData.append('numero_documento', numero_documento.value);
            formData.append('cargo', cargo.value);
            formData.append('eps', eps.value);
            formData.append('fondo_pension', fondo_pension.value);
            formData.append('rol', fk_rol.value);
            formData.append('user_img', img);


            fetch('?c=Usuarios&m=store',
                    {
                        method: 'POST',
                        body: formData,

                    })
                    .then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo la insercion')))
                    .then(resp => resp.json())
                    .then((data) => {
                        if (data.error == 'correoExistente')
                        {
                            correo.focus();
                            const msg = 'Ya hay otra persona que tiene esta dirección de correo electrónico.';
                            msgError(msg);
                        } else if (data.error == 'errorAgregarUsuario')
                        {
                            const msg = 'Fallo la creacion de usuario';
                            msgError(msg);
                        } else if (data.ok) {

                            $("#ModalAdd").modal('hide');
                            let message = 'Usuario Agregado Correctamente';
                            // se llama la funcion de !=error
                            msgSuccess(message);
                            // se llama a la funcion de mostrar usuarios html
                            showAllDatos();
                         
                            //  se reinician los  valores de los input solicitados 
                            resetValueFormModal();
                        }

                    }).catch(error => console.log(error));
        }
    
    })

    //? funcion para limpiar los input en cancelar ModalAddUser
    const btnCancelUser = document.getElementById('CancelarUsuario');
    btnCancelUser.addEventListener('click', () => {
        resetValueFormModal();
    })

    //? funcion para actualizar el usuario en DB en dashboard-admin : usuarios.php modal #ModalUpdateUser
    const btnSubmitFormUpdateUsers = document.getElementById('EditarUsuario');
    btnSubmitFormUpdateUsers.addEventListener('click', (e) =>
    {
        e.preventDefault();
        const update_nombres = document.getElementById("update_nombres");
        const update_apellidos = document.getElementById("update_apellidos");
        const update_correo = document.getElementById("update_correo");
        const update_clave = document.getElementById("update_clave");
        const update_tipo_documento = document.getElementById("update_tipo_documento");
        const update_numero_documento = document.getElementById("update_numero_documento");
        const update_cargo = document.getElementById("update_cargo");
        const update_eps = document.getElementById("update_eps");
        const update_fondo_pension = document.getElementById("update_fondo_pension");
        const update_fk_rol = document.getElementById('update_rol');
        const update_updated_at = document.getElementById('updated_at');
        const update_id = document.getElementById("update_id");
        const token = document.getElementById("token");
        const clave_antigua = document.getElementById("clave_antigua");
        const img = updateImgUser.files[0];

        let validar = validarFormUsers(update_nombres, update_apellidos, update_correo, update_numero_documento, update_fk_rol, update_fondo_pension, update_cargo, update_tipo_documento, update_eps);

        if (update_clave.value == '')
        {
            formIsValid.clave = true;
        } else {
            validarFormUsersPass(update_clave);
        }

        if (validar == true && validateForm() == true)
        {
            const formData = new FormData();
            formData.append('update_id', update_id.value);
            formData.append('update_nombres', update_nombres.value.toLowerCase());
            formData.append('update_apellidos', update_apellidos.value.toLowerCase());
            formData.append('update_correo', update_correo.value.toLowerCase());
            formData.append('update_clave', update_clave.value);
            formData.append('update_tipo_documento', update_tipo_documento.value);
            formData.append('update_numero_documento', update_numero_documento.value);
            formData.append('update_cargo', update_cargo.value);
            formData.append('update_eps', update_eps.value);
            formData.append('update_fondo_pension', update_fondo_pension.value);
            formData.append('update_rol', update_fk_rol.value);
            formData.append('updated_at', update_updated_at.value);
            formData.append('token', token.value);
            formData.append('clave_antigua', clave_antigua.value);
            formData.append('update_user_img', img);

            fetch('?c=Usuarios&m=update',
                    {
                        method: 'POST',
                        body: formData,

                    })
                    .then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo la actualizacion')))
                    .then(resp => resp.json())
                    .then((data) => {

                        if (data.error == 'correoExistente')
                        {
                            correo.focus();
                            const msg = 'Ya hay otra persona que tiene esta dirección de correo electrónico.';
                            msgError(msg);
                        } else if (data.error) {
                            const msg = 'Fallo la actualizacion del usuario';
                            msgError(msg);
                        } else if (data.ok) {
                            $("#ModalUpdateUser").modal('hide');
                            let message = 'Usuario Actualizado Correctamente';
                            // se llama la funcion de !=error
                            msgSuccess(message);
                            // se llama a la funcion de mostrar usuarios html
                            showAllDatos();
                            //  se reinicia a false el objeto formIsValid
                            formIsValidReset();
                        }
                    })
                    .catch(console.log);
        }

    })

    //? funcion De Mensaje modal y callback de eliminar(deleteUser(id));
    const msgQuestion = (message, id) => {
        Swal.fire({
            icon: 'warning',
            html: `<p class="text-white h4 mb-3 text-capitalize">Desea borrar al usuario</p><p class="text-danger text-capitalize h6">${message}</p>`,
            focusConfirm: true,
            background: '#343a40',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#6C63FF',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6C63FF'
        }).then((result) => {
            if (result.value) {
                const msg = "El usuarios ha sido eliminado";
                msgSuccess(msg);
                deleteUser(id);

            }
            ;
        })
    }

    //? peticion para eliminar usuario mediante id
    const deleteUser = (id) => {
        fetch(`clientes?method=destroy&delete_id=${id}`, {
        }).then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo el delete')))
                .then(resp => resp.text())
                .then((data) => {
                    // se actualiza la tabla
                    showAllDatos();
                })

    }

    //? Se ejecuta la para la creacion de los datos cuando acceda a Modulo Usuarios
    showAllDatos()

}

