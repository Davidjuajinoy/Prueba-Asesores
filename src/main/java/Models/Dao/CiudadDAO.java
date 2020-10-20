
package Models.Dao;

import Models.Dto.Ciudad;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author David Juajinoy
 */
public class CiudadDAO {
    
        public List<Ciudad> showAll() {
        List<Ciudad> listaPais = new ArrayList<>();
        try {
            Conexion conn = new Conexion();
            String sql = "SELECT * FROM ciudades";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                
                int id_ciudad  = rs.getInt("id_ciudad");
                String nombre_ciudad =rs.getString("nombre_ciudad");
                int fk_pais = rs.getInt("fk_pais");
                Ciudad ciudad = new Ciudad(id_ciudad, nombre_ciudad, fk_pais);
                
                listaPais.add(ciudad);
            }
            conn.disconnect();
            

        } catch (SQLException e) {
            System.out.println("Error ShowAll['PaisDAO']" + e.getMessage());
        }
            return listaPais;

    }
}
