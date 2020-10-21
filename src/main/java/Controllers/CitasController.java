/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import Models.Dao.AsesorDAO;
import Models.Dao.CitasDAO;
import Models.Dao.ClientesDAO;
import Models.Dao.EstadoDAO;
import Models.Dao.TipoDocumentoDAO;
import Models.Dto.Asesor;
import Models.Dto.Citas;
import Models.Dto.Cliente;
import Models.Dto.EstadoCita;
import Models.Dto.TipoDocumento;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author David Juajinoy
 */
@MultipartConfig
@WebServlet(name = "CitasController", urlPatterns = {"/citas"})
public class CitasController extends HttpServlet {



    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String method = request.getParameter("method");
        if (method != null) {
            switch (method) {
                case "showAll":
                    this.showAll(request, response);
                    break;
                case "destroy":
                    this.deleteCita(request, response);
                    break;
                default:
                    this.methodDefault(request, response);
            }
        } else {
            this.methodDefault(request, response);
        }
    }
    
    protected void methodDefault(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Datos TipoDocumento
        TipoDocumentoDAO documento = new TipoDocumentoDAO();
        List<TipoDocumento> listaDocumentos = documento.showAll();
        
        
        // Datos Cliente
        ClientesDAO clienteDao = new ClientesDAO();
        List<Cliente> listaCliente = clienteDao.showAllClientes();

        // Datos Asesor
        AsesorDAO asesorDao = new AsesorDAO();
        List<Asesor> listaAsesor = asesorDao.showAllAsesores();
        
        // Datos Estado Cita
        EstadoDAO estadoDao = new EstadoDAO();
        List<EstadoCita> listaEstado = estadoDao.showAllEstado();
     
        String title = "Citas";
        String imgSidebar = "cita1.svg";
        String[] table = {"Fecha","Asesor","Cliente","Estado"};
//        
        request.setAttribute("title", title);
        request.setAttribute("imgSidebar", imgSidebar);
        request.setAttribute("table", table);
        request.setAttribute("listaDocumento", listaDocumentos);
        request.setAttribute("listaCliente", listaCliente);
        request.setAttribute("listaAsesor", listaAsesor);
        request.setAttribute("listaEstado", listaEstado);
//        
        request.getRequestDispatcher("/WEB-INF/citas.jsp").forward(request, response);
      
      
    }
    
    
    private void showAll(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

//         Datos Citas
        CitasDAO citasDao = new CitasDAO();
        List<Citas> listaCita = citasDao.showAllCitas();

        String json = new Gson().toJson(listaCita);
        
         
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.println(json);
        }

    }
    
    private void deleteCita(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

            int id = Integer.parseInt(request.getParameter("delete_id"));
            Citas cita = new Citas(id);

            CitasDAO citaDao = new CitasDAO();
            String eliminado = citaDao.destroyCita(cita);

            response.setContentType("text/html;charset=UTF-8");
            try (PrintWriter out = response.getWriter()) {
                out.println(eliminado);
            }
     

    }  
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String method = request.getParameter("method");
        if (method != null) {
            switch (method) {
                case "create":
                    this.createCita(request, response);
                    break;
                case "update":
                    this.updateCita(request, response);
                    break;              
                default:
                    this.methodDefault(request, response);
            }
        } else {
            this.methodDefault(request, response);
        }
    }
    
    private void createCita(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
     
      
            String descripcion = request.getParameter("descripcion");
            String fecha = request.getParameter("fecha");
            int estado = Integer.parseInt(request.getParameter("estado"));
            String hora_inicio = request.getParameter("hora_inicio");
            String hora_fin = request.getParameter("hora_fin");
            int fk_asesor = Integer.parseInt(request.getParameter("fk_asesor"));
            int fk_cliente =Integer.parseInt(request.getParameter("fk_cliente"));
            
  
            Citas cita = new Citas(0, descripcion, fecha, hora_inicio, hora_fin, fk_asesor, fk_cliente, estado);
            
            CitasDAO citasDao  =new CitasDAO();
            String insertado = citasDao.storedCita(cita);

            response.setContentType("text/html;charset=UTF-8");
            try (PrintWriter out = response.getWriter()) {
                out.println(insertado);
            }
     

    }
    
    
    private void updateCita(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

     
            int update_id = Integer.parseInt(request.getParameter("update_id"));
            String update_descripcion = request.getParameter("update_descripcion");
            String update_fecha = request.getParameter("update_fecha");
            int update_estado = Integer.parseInt(request.getParameter("update_estado"));
            String update_hora_inicio = request.getParameter("update_hora_inicio");
            String update_hora_fin = request.getParameter("update_hora_fin");
            int update_fk_asesor = Integer.parseInt(request.getParameter("update_fk_asesor"));
            int update_fk_cliente = Integer.parseInt(request.getParameter("update_fk_cliente"));


            Citas cita= new Citas(update_id, update_descripcion, update_fecha, update_hora_inicio, update_hora_fin, update_fk_asesor, update_fk_cliente, update_estado);

            CitasDAO citasDao = new CitasDAO();
            String actualizado = citasDao.updateCita(cita);
        
            response.setContentType("text/html;charset=UTF-8");
            try (PrintWriter out = response.getWriter()) {
                out.println(actualizado);
            }
     

    }
    
    

}
