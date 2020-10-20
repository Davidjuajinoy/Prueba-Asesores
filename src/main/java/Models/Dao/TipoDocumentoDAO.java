/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Models.Dao;

import Models.Dto.TipoDocumento;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author David Juajinoy
 */
public class TipoDocumentoDAO {

    public List<TipoDocumento> showAll() {

        List<TipoDocumento> listaDocumento = new ArrayList<>();
        try {
            Conexion conn = new Conexion();
            String sql = "SELECT * FROM tipo_documento";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {

                int id_documento = rs.getInt("id_documento");
                String nombre_documento = rs.getString("nombre_documento");

                TipoDocumento tipoDocumento = new TipoDocumento(id_documento, nombre_documento);

                listaDocumento.add(tipoDocumento);
            }
            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error ShowAll['TipoDocumentoDAO']" + e.getMessage());
        }
        return listaDocumento;

    }

}
