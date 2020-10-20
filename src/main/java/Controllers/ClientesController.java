/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import Models.Dao.CiudadDAO;
import Models.Dao.ClientesDAO;
import Models.Dao.PaisDAO;
import Models.Dao.TipoDocumentoDAO;
import Models.Dto.Ciudad;
import Models.Dto.Cliente;
import Models.Dto.Pais;
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
@WebServlet(name = "ClientesController", urlPatterns = {"/clientes"})
public class ClientesController extends HttpServlet {

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
                    this.deleteCliente(request, response);
                    break;
                default:
                    this.methodDefault(request, response);
            }
        } else {
            this.methodDefault(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String method = request.getParameter("method");
        if (method != null) {
            switch (method) {
                case "create":
                    this.createCliente(request, response);
                    break;
                case "update":
                    this.updateCliente(request, response);
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

        // Datos Paias
        PaisDAO pais = new PaisDAO();
        List<Pais> listaPais = pais.showAll();

        // Datos ciudad
        CiudadDAO ciudad = new CiudadDAO();
        List<Ciudad> listaCiudad = ciudad.showAll();

        // Datos TipoDocumento
        TipoDocumentoDAO documento = new TipoDocumentoDAO();
        List<TipoDocumento> listaDocumentos = documento.showAll();

        // Datos Enviados
        request.setAttribute("listaPais", listaPais);
        request.setAttribute("listaCiudad", listaCiudad);
        request.setAttribute("listaDocumento", listaDocumentos);

        request.getRequestDispatcher("/WEB-INF/clientes.jsp").forward(request, response);

    }

    private void showAll(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        ClientesDAO cliente = new ClientesDAO();
        List<Cliente> clientesList = cliente.showAllClientes();

        String json = new Gson().toJson(clientesList);
         
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.println(json);
        }

    }

    private void createCliente(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

     
            String nombres = request.getParameter("nombres");
            String apellidos = request.getParameter("apellidos");
            String numero_documento = request.getParameter("numero_documento");
            String fecha_creacion = request.getParameter("fecha_creacion");
            int tipo_documento = Integer.parseInt(request.getParameter("tipo_documento"));
            int ciudad = Integer.parseInt(request.getParameter("ciudad"));
            

            Cliente cliente = new Cliente(nombres, apellidos, numero_documento, fecha_creacion, tipo_documento, ciudad);
            ClientesDAO clienteDao = new ClientesDAO();
            String insertado = clienteDao.storedCliente(cliente);

            
        
            response.setContentType("text/html;charset=UTF-8");
            try (PrintWriter out = response.getWriter()) {
                out.println(insertado);
            }
     

    }
    
    
    private void updateCliente(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

     
            int id = Integer.parseInt(request.getParameter("update_id"));
            String nombres = request.getParameter("update_nombres");
            String apellidos = request.getParameter("update_apellidos");
            String numero_documento = request.getParameter("update_numero_documento");
            String fecha_creacion = request.getParameter("update_fecha_creacion");
            int tipo_documento = Integer.parseInt(request.getParameter("update_tipo_documento"));
            int ciudad = Integer.parseInt(request.getParameter("update_ciudad"));
            

            Cliente cliente = new Cliente(id,nombres, apellidos, numero_documento, fecha_creacion, tipo_documento, ciudad);

            ClientesDAO clienteDao = new ClientesDAO();
            String actualizado = clienteDao.updateCliente(cliente);

            
        
            response.setContentType("text/html;charset=UTF-8");
            try (PrintWriter out = response.getWriter()) {
                out.println(actualizado);
            }
     

    }
    
    
    private void deleteCliente(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

     
            int id = Integer.parseInt(request.getParameter("delete_id"));
            Cliente cliente = new Cliente(id);

            ClientesDAO clienteDao = new ClientesDAO();
            String eliminado = clienteDao.destroyCliente(cliente);

            
        
            response.setContentType("text/html;charset=UTF-8");
            try (PrintWriter out = response.getWriter()) {
                out.println(eliminado);
            }
     

    }  

}
