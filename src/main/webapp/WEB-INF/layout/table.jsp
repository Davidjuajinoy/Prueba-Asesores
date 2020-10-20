<%-- 
    Document   : table
    Created on : 18/10/2020, 08:27:51 PM
    Author     : David Juajinoy
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>


<div class="container mt-5 ">
    <div class="row">
        <div class="col-12 ">
            <table class="table  w-100  table-responsive-lg">
                <input type="text" id="buscador" class="form-control text-white bg-dark " placeholder="Buscador">

                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>${table[0]}</th>
                        <th>${table[1]}</th>
                        <th>${table[2]}</th>
                        <th>${table[3]}</th>
                        <th>Opciones</th>
                        <th class=""> <span class="d-flex justify-content-center align-content-center"> <i  data-toggle="modal" data-target="#ModalAdd" class="create-svg "></i> </span></th>
                    </tr>
                </thead>
                
        


                <tbody id="tablaAll">



                </tbody>
            </table>

            <!-- Paginacion -->
            <nav >
                <ul class="pagination d-flex justify-content-end" id="pagination">
                </ul>
            </nav>

        </div>
    </div>
</div>
