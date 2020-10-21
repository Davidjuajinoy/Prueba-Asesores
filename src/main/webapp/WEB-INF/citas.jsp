<%-- 
    Document   : citas
    Created on : 18/10/2020, 06:23:43 PM
    Author     : David Juajinoy
--%>

<%--<%@page import="java.time.LocalDate"%>--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:include page="layout/header.jsp"/>



<jsp:include page="layout/Sidebar.jsp"></jsp:include>


<!-- Modals -->


<!-- ? Modal Create -->
<div class="modal fade " id="ModalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-modal= >


    <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content  bg-custom text-white">
            <div class="modal-header border-0 bg-custom-two text-shadow-custom">
                <h5 class="modal-title text-center h4 font-weight-bold text-shadow-1
                    text-white" id="informationModal">Agregar Cita</h5>
                <button type="button" id="cerrarModalUsuario" tabindex="-1" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="POST">
                    <div class="row">



                        <div class="form-group col-12">
                            <label for="descripcion" class="text-shadow-1 text-custom text-capitalize">descripcion</label>
                    
                            <textarea name="descripcion" id="descripcion" rows="2" class="form-control" style="resize: none;"></textarea>
                        </div>

                     


                        <div class="col-7">
                            <div class="form-group">
                                <label for="fecha" class="text-shadow-1 text-custom">fecha de la cita</label>
                                <input type="date" tabindex="3" class="form-control input-custom" name="fecha" id="fecha">
                            </div>
                        </div>

                        <div class="col-5">
                            <div class="form-group">
                                <label for="estado" class="text-shadow-1 text-custom text-capitalize">Estado de la cita</label>
                                <select name="estado" tabindex="4" id="estado" class="form-control ">
                                    <option value="" selected="true">-- Seleccione --</option>
                                <c:forEach items="${listaEstado}" var="estado">
                                    <option value="${estado.id_estado_cita}">${estado.estado_cita}</option>
                                </c:forEach>
                                </select>
                            </div>
                        </div>

                  
                        


                    </div>

                    <div class="row">
                        <div class="col-md-6 col-lg-6 col-sm-12">
                            <div class="form-group">
                                <label for="hora_inicio" class="text-shadow-1 text-custom text-capitalize">Hora de inicio</label>
                                <input type="time" tabindex="3" placeholder="1234567890" name="hora_inicio" class="form-control" id="hora_inicio">
                            </div>  
                        </div>


                        <div class="col-md-6 col-lg-6 col-sm-12 ">
                           
                            <div class="form-group">
                                <label for="hora_fin" class="text-shadow-1 text-custom text-capitalize">Hora de fin</label>
                                <input type="time" tabindex="3" placeholder="1234567890" name="hora_fin" class="form-control" id="hora_fin">
                            </div>  
                        </div>


                        <div class="col-6">
                        
                                <div class="form-group">
                                    <label for="fk_asesor" class="text-shadow-1 text-custom">Asesor</label>
                                    <select name="fk_asesor" tabindex="4" id="fk_asesor" class="form-control ">
                                        <option value="" selected="true">-- Seleccione --</option>
                                    
                                <c:forEach items="${listaAsesor}" var="asesor">
                                    <option value="${asesor.ase_id}">${asesor.ase_nombre}</option>
                                </c:forEach>
                                  
                                    </select>
                                </div>
                            

                        </div>

                        <div class="form-group col-6">
                          <label for="fk_cliente" class="text-shadow-1 text-custom text-capitalize">cliente</label>
                    
                          <select name="fk_cliente" tabindex="4" id="fk_cliente" class="form-control ">
                            <option value="" selected="true">-- Seleccione --</option>
                        
                             <c:forEach items="${listaCliente}" var="cliente">
                                    <option value="${cliente.cliente_id}">${cliente.cli_nombres} ${cliente.cli_apellidos}</option>
                                </c:forEach>
                      
                        </select>
                      </div>
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
<div class="modal fade  " id="ModalShow" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
  
    <div class="modal-content  bg-dark text-white">
      <div class="modal-header border-0 bg-custom-two">
        <h5 class="modal-title text-center h4 font-weight-bold text-shadow-custom
        text-white text-capitalize" id="showModal">Informacion de la Cita</h5>
        <button type="button"  class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="row">
           
            <div class="col-6">
                <div class="form-group">
                  <label for="show_cliente" class="text-shadow-custom text-custom">Cliente</label>
                  <p id="show_cliente" class="d-block text-capitalize"></p>    
                </div>
                  
                <div class="form-group ">
                    <label class="text-shadow-custom text-custom">fecha</label>
                    <p id="show_fecha" class="d-block"></p>
                </div>
                  
                <div class="form-group  ">
                  <label for="show_estado" class="text-shadow-custom text-custom text-capitalize">Estado</label>
                  <p id="show_estado" class="d-block text-capitalize"></p>    
                </div> 
                
            </div>
              
            <div class="col-6 ">
                   <div class="form-group  ">
                     <label for ="show_asesor"class="text-shadow-custom text-custom">Asesor</label>
                     <p id="show_asesor" class="d-block text-capitalize"></p>    
                    </div>

                    <div class="form-group  ">
                       <label for="show_hora_inicio" class="text-shadow-custom text-custom text-capitalize">hora de inicio</label>
                       <p id="show_hora_inicio" class="d-block text-capitalize"></p>
                    </div>
                
                    <div class="form-group  ">
                      <label for="show_hora_fin" class="text-shadow-custom text-custom text-capitalize">hora de fin</label>
                      <p id="show_hora_fin" class="d-block text-capitalize"></p>
                   </div>
                
              
                  
            </div>

            <div class="col-12 ">
              <div class="form-group  ">
                <label for="show_descripcion" class="text-shadow-custom text-custom text-capitalize">Descripcion</label>
                <p id="show_descripcion" class="d-block text-capitalize"></p>    
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
<div class="modal fade w-100 " id="ModalUpdate" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"  >

  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
  
    <div class="modal-content  bg-dark text-white">
      <div class="modal-header border-0 bg-custom-two text-shadow-custom">
        <h5 class="modal-title text-center h4 font-weight-bold text-shadow-1
        text-white" id="informationModal">Actualizar Cita</h5>
        <button type="button" id="cerrarModalUpdate" class="close " data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form method="POST">
            <div class="row">
                
                <input type="hidden" id="update_id" name="update_id">


                <div class="form-group col-12">
                    <label for="update_descripcion" class="text-shadow-1 text-custom text-capitalize">descripcion</label>
            
                    <textarea name="update_descripcion" id="update_descripcion" rows="2" class="form-control" style="resize: none;"></textarea>
                </div>

             


                <div class="col-7">
                    <div class="form-group">
                        <label for="update_fecha" class="text-shadow-1 text-custom">fecha de la cita</label>
                        <input type="date" tabindex="3" class="form-control input-custom" name="update_fecha" id="update_fecha">
                    </div>
                </div>

                <div class="col-5">
                    <div class="form-group">
                        <label for="update_estado" class="text-shadow-1 text-custom text-capitalize">Estado de la cita</label>
                        <select name="update_estado" tabindex="4" id="update_estado" class="form-control ">
                            <option value="" selected="true">-- Seleccione --</option>
                        
                           <c:forEach items="${listaEstado}" var="estado">
                                    <option value="${estado.id_estado_cita}">${estado.estado_cita}</option>
                                </c:forEach>
                      
                        </select>
                    </div>
                </div>


            </div>

            <div class="row">
                <div class="col-md-6 col-lg-6 col-sm-12">
                    <div class="form-group">
                        <label for="update_hora_inicio" class="text-shadow-1 text-custom text-capitalize">Hora de inicio</label>
                        <input type="time" tabindex="3" placeholder="1234567890" name="update_hora_inicio" class="form-control" id="update_hora_inicio">
                    </div>  
                </div>


                <div class="col-md-6 col-lg-6 col-sm-12 ">
                   
<!--                    <div class="form-group">
                        <label for="update_hora_fin" class="text-shadow-1 text-custom text-capitalize">Hora de fin</label>
                        <input type="time" tabindex="3" placeholder="1234567890" name="update_hora_fin" class="form-control" id="update_hora_fin">
                    </div>  -->

                    <div class="form-group">
                        <label for="update_hora_fin" class="text-shadow-1 text-custom text-capitalize">Hora de fin</label>
                        <input type="time" tabindex="3" placeholder="1234567890" name="update_hora_fin" class="form-control" id="update_hora_fin">
                
                    </div>  
                </div>


                <div class="col-6">
                
                        <div class="form-group">
                            <label for="update_fk_asesor" class="text-shadow-1 text-custom">Asesor</label>
                            <select name="update_fk_asesor" tabindex="4" id="update_fk_asesor" class="form-control ">
                                <option value="" selected="true">-- Seleccione --</option>
                            
                            <c:forEach items="${listaAsesor}" var="asesor">
                                    <option value="${asesor.ase_id}">${asesor.ase_nombre}</option>
                                </c:forEach>
                          
                            </select>
                        </div>
                    

                </div>

                <div class="form-group col-6">
                  <label for="update_fk_cliente" class="text-shadow-1 text-custom text-capitalize">cliente</label>
            
                  <select name="update_fk_cliente" tabindex="4" id="update_fk_cliente" class="form-control ">
                    <option value="" selected="true">-- Seleccione --</option>
                
                             <c:forEach items="${listaCliente}" var="cliente">
                                    <option value="${cliente.cliente_id}">${cliente.cli_nombres} ${cliente.cli_apellidos}</option>
                                </c:forEach>
                      
              
                </select>
              </div>
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

