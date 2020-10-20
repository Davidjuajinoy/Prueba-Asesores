package Models.Dao;

import Models.Dto.Pais;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author David Juajinoy
 */
public class PaisDAO {

    public List<Pais> showAll() {
        List<Pais> listaPais = new ArrayList<>();
        try {
            Conexion conn = new Conexion();
            String sql = "SELECT * FROM paises";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Pais pais = new Pais();
                pais.setId_pais(rs.getInt("id_pais"));
                pais.setNombre_pais(rs.getString("nombre_pais"));

                listaPais.add(pais);
            }
            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error ShowAll['PaisDAO']" + e.getMessage());
        }
        return listaPais;

    }
}
