package Controllers;

import Models.Dao.AsesorDAO;
import Models.Dao.TipoDocumentoDAO;
import Models.Dto.Asesor;
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
@WebServlet(name = "AsesoresController", urlPatterns = {"/asesores"})
public class AsesoresController extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
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
                    this.deleteAsesor(request, response);
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
        
        String title = "Asesores";
        String[] table = {"Nombres", "Documento", "Hora De Inicio", "Hora Final"};
        
        request.setAttribute("title", title);
        request.setAttribute("table", table);
        request.setAttribute("listaDocumento", listaDocumentos);
        
        request.getRequestDispatcher("/WEB-INF/asesores.jsp").forward(request, response);
      
      
    }
    
    
    private void showAll(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        AsesorDAO asesor = new AsesorDAO();
        List<Asesor> listaAsesores = asesor.showAllAsesores();

        String json = new Gson().toJson(listaAsesores);
         
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.println(json);
        }

    }
    
    private void deleteAsesor(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

            int id = Integer.parseInt(request.getParameter("delete_id"));
            Asesor asesor = new Asesor(id);

            AsesorDAO asesorDao = new AsesorDAO();
            String eliminado = asesorDao.destroyAsesor(asesor);

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
                    this.createAsesor(request, response);
                    break;
                case "update":
                    this.updateAsesor(request, response);
                    break;              
                default:
                    this.methodDefault(request, response);
            }
        } else {
            this.methodDefault(request, response);
        }
    }
    
    
    private void createAsesor(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
     
            String nombres = request.getParameter("nombres");
            String numero_documento = request.getParameter("numero_documento");
            float experiencia = Float.parseFloat(request.getParameter("experiencia"));
            System.out.println(request.getParameter("experiencia"+" "+ experiencia));
            String hora_inicio = request.getParameter("hora_inicio");
            String hora_fin = request.getParameter("hora_fin");
            int tipo_documento = Integer.parseInt(request.getParameter("tipo_documento"));
            String especialidad = request.getParameter("especialidad");
            
  
            Asesor asesor = new Asesor(0, nombres, numero_documento, experiencia, especialidad, hora_inicio, hora_fin, tipo_documento);
            
            AsesorDAO asesorDao  =new AsesorDAO();
            String insertado = asesorDao.storedAsesor(asesor);

            response.setContentType("text/html;charset=UTF-8");
            try (PrintWriter out = response.getWriter()) {
                out.println(insertado);
            }
     

    }
    
    
    private void updateAsesor(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

     
            int update_id = Integer.parseInt(request.getParameter("update_id"));
            String update_nombres = request.getParameter("update_nombres");
            String update_numero_documento = request.getParameter("update_numero_documento");
            float update_experiencia = Float.parseFloat(request.getParameter("update_experiencia"));
            String update_hora_inicio = request.getParameter("update_hora_inicio");
            String update_hora_fin = request.getParameter("update_hora_fin");
            int update_tipo_documento = Integer.parseInt(request.getParameter("update_tipo_documento"));
            String update_especialidad = request.getParameter("update_especialidad");


            Asesor asesor = new Asesor(update_id, update_nombres, update_numero_documento, update_experiencia, update_especialidad, update_hora_inicio, update_hora_fin, update_tipo_documento);

            AsesorDAO asesorDao = new AsesorDAO();
            String actualizado = asesorDao.updateAsesor(asesor);
        
            response.setContentType("text/html;charset=UTF-8");
            try (PrintWriter out = response.getWriter()) {
                out.println(actualizado);
            }
     

    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
