/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Models.Dao;


import Models.Dto.EstadoCita;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author David Juajinoy
 */
public class EstadoDAO {
    
      public List<EstadoCita> showAllEstado() {
        List<EstadoCita> listaEstado = new ArrayList<>();
        try {
            Conexion conn = new Conexion();
            String sql = "SELECT * FROM estado_cita";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                EstadoCita estado = new EstadoCita();
                estado.setId_estado_cita(rs.getInt("id_estado_cita"));
                estado.setEstado_cita(rs.getString("estado_cita"));

                listaEstado.add(estado);
            }
            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error showAllEstado['EstadoDAO']" + e.getMessage());
        }
        return listaEstado;

    }
    
}
