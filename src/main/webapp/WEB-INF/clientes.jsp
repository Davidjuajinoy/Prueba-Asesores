<%-- 
    Document   : clientes
    Created on : 18/10/2020, 06:23:37 PM
    Author     : David Juajinoy
--%>
<%@page import="java.time.LocalDate"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:include page="layout/header.jsp"/>



<jsp:include page="layout/Sidebar.jsp"></jsp:include>


<!-- Modals -->

<!-- ? Modal Create -->
<div class="modal fade" id="ModalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">

    <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content  bg-custom text-white">
            <div class="modal-header border-0 bg-custom-two text-shadow-custom">
                <h5 class="modal-title text-center h4 font-weight-bold text-shadow-1
                    text-white" id="informationModal">Agregar Cliente</h5>
                <button type="button" id="cerrarModalUsuario" tabindex="-1" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="POST">
                    <div class="row">



                        <div class="form-group col-md-6 col-12 col-sm-12">
                            <label for="nombres" class="text-shadow-1 text-custom">Nombres</label>
                            <input type="text" tabindex="1" class="form-control bg-white input-custom" name="nombres" placeholder="pepito" id="nombres">
                        </div>

                        <div class="form-group col-md-6 col-12 col-sm-12">
                            <label for="apellidos" class="text-shadow-1 text-custom">Apellidos</label>
                            <input type="text" tabindex="2" class="form-control bg-white input-custom" name="apellidos" placeholder="perez" id="apellidos">
                        </div>


                        <div class="col-md-12 col-lg-12 col-sm-12">
                            <div class="form-group">
                                <label for="numero_documento" class="text-shadow-1 text-custom">Número
                                    Documento</label>
                                <input type="text" tabindex="3" class="form-control bg-white input-custom" placeholder="1234567890" name="numero_documento" id="numero_documento">
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-6 col-sm-12">
                            <div class="form-group">
                                <label for="tipo_documento" class="text-shadow-1 text-custom">Tipo
                                    Documento</label>
                                <select name="tipo_documento" tabindex="4" id="tipo_documento" class="form-control bg-white">
                                    <option value="" selected="true">-- Seleccione --</option>
                                <c:forEach items="${listaDocumento}" var="documento">
                                    <option value="${documento.id_documento}">${documento.nombre_documento}</option>
                                </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-6 col-sm-12">
                            <div class="form-group">
                                <label for="ciudad" class="text-shadow-1 text-custom">Ciudad</label>
                                <select name="ciudad" tabindex="5" id="ciudad" class="form-control bg-white">
                                    <option value="" selected="true">-- Seleccione --</option>
                                <c:forEach items="${listaCiudad}" var="ciudad">
                                    <option value="${ciudad.id_ciudad}">${ciudad.nombre_ciudad}</option>
                                </c:forEach>
                                </select>
                            </div>
                        </div>
                        
                        <input type="hidden" id="fecha_creacion" name="fecha_creacion" value="<%= LocalDate.now() %>">


                    </div>

                    <div class="d-flex justify-content-end align-items-center my-2">
                        <label data-hover="Aceptar" for="GuardarModalAdd" class="box-shadow-custom mr-3 text-center text-decoration-none button--scale-text  font-weight-bold  text-white rounded-lg text-capitalize">Aceptar</label>
                        <input id="GuardarModalAdd" class="d-none " type="submit"></input>



                        <label data-hover="Cancelar" for="CancelarModalAdd" class="box-shadow-custom text-center text-decoration-none button--scale-text  font-weight-bold   text-white rounded-lg text-capitalize">Cancelar</label>
                        <input  id="CancelarModalAdd" class="d-none" data-dismiss="modal"></input>



                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
<!-- ? End Modal Create-->


<!-- ? Modal Show-->
<div class="modal fade w-100" id="ModalShow" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
  
    <div class="modal-content  bg-dark text-white">
      <div class="modal-header border-0 bg-custom-two">
        <h5 class="modal-title text-center h4 font-weight-bold text-shadow-custom
        text-white" id="showModal">Informacion del Cliente</h5>
        <button type="button"  class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="row">
           
            <div class="col-6">
                <div class="form-group">
                  <label for="show_nombres" class="text-shadow-custom text-custom">Nombres</label>
                  <p id="show_nombres" class="d-block text-capitalize"></p>    
                </div>
                  
                <div class="form-group ">
                    <label class="text-shadow-custom text-custom">Número Documento</label>
                    <p id="show_numero_documento" class="d-block"></p>
                </div>
                  
                <div class="form-group  ">
                  <label for="show_pais" class="text-shadow-custom text-custom">Pais</label>
                  <p id="show_pais" class="d-block text-capitalize"></p>    
                </div> 
                
            </div>
              
            <div class="col-6 ">
                   <div class="form-group  ">
                     <label for ="show_tipo_documento"class="text-shadow-custom text-custom">Tipo Documento</label>
                     <p id="show_tipo_documento" class="d-block text-capitalize"></p>    
                    </div>

                    <div class="form-group  ">
                       <label for="show_fecha_creacion" class="text-shadow-custom text-custom">Fecha de Creacion</label>
                       <p id="show_fecha_creacion" class="d-block text-capitalize"></p>
                    </div>
                
              <div class="form-group  ">
                  <label for="show_ciudad" class="text-shadow-custom text-custom">Ciudad</label>
                  <p id="show_ciudad" class="d-block text-capitalize"></p>    
 
              </div>
                
              
                  
            </div>
    


              <div class="d-flex justify-content-end align-items-center col-12 ">
                <label data-hover="Cerrar" for="CancelarShow" class="box-shadow-custom text-center text-decoration-none button--scale-text  font-weight-bold   text-white rounded-lg text-capitalize">cerrar</label>
                <input  id="CancelarShow" class="d-none" data-dismiss="modal"></input>
              </div>

          </div>




        
 
      </div>
    </div>
  </div>
</div>
    <!-- ? Modal End Show-->
    
    
    
    <!-- ? Modal Update-->
<div class="modal fade w-100" id="ModalUpdate" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
  
    <div class="modal-content  bg-dark text-white">
      <div class="modal-header border-0 bg-custom-two text-shadow-custom">
        <h5 class="modal-title text-center h4 font-weight-bold text-shadow-1
        text-white" id="informationModal">Actualizar Cliente</h5>
        <button type="button" id="cerrarModalUpdate" class="close " data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <form method="POST">
                    <div class="row">

                        <input type="hidden" id="update_id" >

                        <div class="form-group col-md-6 col-12 col-sm-12">
                            <label for="update_nombres" class="text-shadow-1 text-custom">Nombres</label>
                            <input type="text" tabindex="1" class="form-control text-capitalize bg-white input-custom" name="update_nombres" placeholder="pepito" id="update_nombres">
                        </div>

                        <div class="form-group col-md-6 col-12 col-sm-12">
                            <label for="update_apellidos" class="text-shadow-1 text-custom">Apellidos</label>
                            <input type="text" tabindex="2" class="form-control text-capitalize bg-white input-custom" name="update_apellidos" placeholder="perez" id="update_apellidos">
                        </div>


                        <div class="col-md-12 col-lg-12 col-sm-12">
                            <div class="form-group">
                                <label for="update_numero_documento" class="text-shadow-1 text-custom">Número
                                    Documento</label>
                                <input type="text" tabindex="3" class="form-control bg-white input-custom" placeholder="1234567890" name="update_numero_documento" id="update_numero_documento">
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-6 col-sm-12">
                            <div class="form-group">
                                <label for="update_tipo_documento" class="text-shadow-1 text-custom">Tipo
                                    Documento</label>
                                <select name="update_tipo_documento" tabindex="4" id="update_tipo_documento" class="form-control bg-white">
                                    <option value="" selected="true">-- Seleccione --</option>
                                <c:forEach items="${listaDocumento}" var="documento">
                                    <option value="${documento.id_documento}">${documento.nombre_documento}</option>
                                </c:forEach>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-6 col-sm-12">
                            <div class="form-group">
                                <label for="update_ciudad" class="text-shadow-1 text-custom">Ciudad</label>
                                <select name="update_ciudad" tabindex="5" id="update_ciudad" class="form-control bg-white">
                                    <option value="" selected="true">-- Seleccione --</option>
                                <c:forEach items="${listaCiudad}" var="ciudad">
                                    <option value="${ciudad.id_ciudad}">${ciudad.nombre_ciudad}</option>
                                </c:forEach>
                                </select>
                            </div>
                        </div>
                        
                        <input type="hidden" id="update_fecha_creacion" name="update_fecha_creacion" value="<%= LocalDate.now() %>">


                    </div>

                    <div class="d-flex justify-content-end align-items-center my-2">
                        <label data-hover="Aceptar" for="GuardarModalUpdate" class="box-shadow-custom mr-3 text-center text-decoration-none button--scale-text  font-weight-bold  text-white rounded-lg text-capitalize">Aceptar</label>
                        <input id="GuardarModalUpdate" class="d-none " type="submit"></input>



                        <label data-hover="Cancelar" for="CancelarModalUpdate" class="box-shadow-custom text-center text-decoration-none button--scale-text  font-weight-bold   text-white rounded-lg text-capitalize">Cancelar</label>
                        <input  id="CancelarModalUpdate" class="d-none" data-dismiss="modal"></input>



                    </div>

                </form>
      </div>
    </div>
  </div>
</div>
<!-- ? Modal End Update-->


<!-- Modals End-->


    <!-- Content -->
<jsp:include page="layout/table.jsp" />
<!-- End Content -->


<jsp:include page="layout/footer.jsp"/>
