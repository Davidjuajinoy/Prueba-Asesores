<%-- 
    Document   : index
    Created on : 18/10/2020, 01:11:11 PM
    Author     : David Juajinoy
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<jsp:include page="WEB-INF/layout/header.jsp"></jsp:include>

    <div class="container-fluid bg-custom vw-100 vh-100">
        <div class="container  vh-100">
            <div class="row  h-100 d-flex justify-content-center align-items-center ">
                <div class="col-4">
                    <a href="${pageContext.request.contextPath}/asesores"  class="text-decoration-none ">
                        <div class="card bg-custom-two hover">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                <h5 class="card-title text-shadow-custom text-white font-weight-bold">Asesores</h5>
                                <img src="${pageContext.request.contextPath}/assets/svg/asesores1.svg" alt="" class="img-fluid h-100 img-animation p-3">
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-4 w-100">
                <a href="${pageContext.request.contextPath}/clientes"  class="text-decoration-none ">
                    <div class="card bg-custom-two hover">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center">
                            <h5 class="card-title text-shadow-custom text-white font-weight-bold">Clientes</h5>
                            <img src="${pageContext.request.contextPath}/assets/svg/clientes1.svg" alt="" class="img-fluid h-100 img-animation p-3">

                        </div>
                    </div>
                </a>

            </div>

            <div class="col-4">
                <a href="citas.html"  class="text-decoration-none ">
                    <div class="card bg-custom-two hover">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center">
                            <h5 class="card-title text-shadow-custom text-white font-weight-bold">Citas</h5>
                            <img src="${pageContext.request.contextPath}/assets/svg/cita1.svg" alt="" class="img-fluid h-100 img-animation p-3">
                        </div>
                    </div>
                </a>

            </div>


        </div>
    



    <jsp:include page="WEB-INF/layout/footer.jsp"></jsp:include>
