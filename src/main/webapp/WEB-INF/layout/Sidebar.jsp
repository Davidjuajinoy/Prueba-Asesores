<%-- 
    Document   : Sidebar
    Created on : 18/10/2020, 06:53:12 PM
    Author     : David Juajinoy
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="container-fluid  vw-100 vh-100 ">

    <!--  ! Sidebar  -->

    <div class="bg-custom " id="sidebar">
        <p class="diplay-6 text-shadow-custom  text-white my-3 px-2 font-weight-bold text-center text-capitalize">${title} </p>
        <div class="d-flex flex-column justify-content-center align-items-center m-4 ">
            <img src="${pageContext.request.contextPath}/assets/svg/${imgSidebar}" class="img_dashboard" alt="">
        </div>    
        <div class="menu_option text-white list-unstyled ">
            <li class="nav-item button--fill">
                <a class="nav-link text-white nav_hover" href="${pageContext.request.contextPath}/asesores">Administrar Asesores</a>
            </li>
            <li class="nav-item button--fill">
                <a class="nav-link text-white nav_hover" href="${pageContext.request.contextPath}/clientes">Administrar Clientes</a>
            </li>
            <li class="nav-item button--fill">
                <a class="nav-link text-white nav_hover" href="${pageContext.request.contextPath}/citas">Administrar Citas</a>
            </li>
        </div>

    </div>

    <!-- ! End  Sidebar  -->


    <!-- ! Content  -->
    <div id="content" class="container-fluid m-0 h-100 p-0 d-flex flex-column   ">

        <div class="container-fluid bg-custom  m-0 p-1 position-sticky btn-div  ">

            <button type="button" id="sidebarCollapse" class="btn text-white  ml-2 bg-custom-two">
                &#9776;
            </button>    

        </div>