/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import Models.Dao.PaisDAO;
import Models.Dto.Pais;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author David Juajinoy
 */
@WebServlet(name = "PaisController", urlPatterns = {"/pais"})
public class PaisController extends HttpServlet {

  
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PaisDAO daoPais = new PaisDAO();
        List<Pais> listaPais = daoPais.showAll();
        String xd = "david";
        request.setAttribute("pais", xd);
        
        request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);
       
        
        
       
    }

  
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

 
}
