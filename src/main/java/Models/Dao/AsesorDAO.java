/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Models.Dao;

import Models.Dto.Asesor;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author David Juajinoy
 */
public class AsesorDAO {

    public List<Asesor> showAllAsesores() {
        List<Asesor> listaAsesores = new ArrayList<>();

        try {
            Conexion conn = new Conexion();
            String sql = "SELECT * FROM asesores";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int ase_id = rs.getInt("ase_id");
                String ase_nombre = rs.getString("ase_nombre");
                String ase_numero_documento = rs.getString("ase_numero_documento");
                float ase_experiencia = rs.getFloat("ase_experiencia");
                String ase_especialidad = rs.getString("ase_especialidad");
                String ase_hora_inicio = rs.getString("ase_hora_inicio");
                String ase_hora_fin = rs.getString("ase_hora_fin");
                int fk_ase_tipo_documento = rs.getInt("fk_ase_tipo_documento");

                Asesor asesor = new Asesor(ase_id, ase_nombre, ase_numero_documento, ase_experiencia, ase_especialidad, ase_hora_inicio, ase_hora_fin, fk_ase_tipo_documento);

                listaAsesores.add(asesor);

            }

            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error showAllAsesores['AsesorDao']" + e.getMessage());

        }
        return listaAsesores;

    }
    
    
    public String storedAsesor(Asesor asesor)
    {
        String msg="";
        try {
            Conexion conn = new Conexion();
            String sql = "INSERT INTO asesores(ase_nombre,ase_numero_documento,ase_experiencia,ase_especialidad,ase_hora_inicio,ase_hora_fin,fk_ase_tipo_documento) VALUES(?,?,?,?,?,?,?)";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ps.setString(1, asesor.getAse_nombre());
            ps.setString(2, asesor.getAse_numero_documento());
            ps.setFloat(3, asesor.getAse_experiencia());
            ps.setString(4, asesor.getAse_especialidad());
            ps.setString(5, asesor.getAse_hora_inicio());
            ps.setString(6, asesor.getAse_hora_fin());
            ps.setInt(7, asesor.getFk_ase_tipo_documento());
            ps.executeUpdate();
            msg="[{\"ok\":\"insertado\"}]";

            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error storedAsesor['AsesorDao']" + e.getMessage());
            msg="[{\"error\":\"noInsertado\"}]";


        }
        return msg;
    }
    
    
        public String updateAsesor(Asesor asesor)
    {
        String msg="";
        try {
            Conexion conn = new Conexion();
            String sql = "UPDATE asesores SET ase_nombre=?,ase_numero_documento=?,ase_experiencia=?,ase_especialidad=?,ase_hora_inicio=?,ase_hora_fin=?,fk_ase_tipo_documento=? WHERE ase_id = ?";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ps.setString(1, asesor.getAse_nombre());
            ps.setString(2, asesor.getAse_numero_documento());
            ps.setFloat(3, asesor.getAse_experiencia());
            ps.setString(4, asesor.getAse_especialidad());
            ps.setString(5, asesor.getAse_hora_inicio());
            ps.setString(6, asesor.getAse_hora_fin());
            ps.setInt(7, asesor.getFk_ase_tipo_documento());
            ps.setInt(8, asesor.getAse_id());
            ps.executeUpdate();
            msg="[{\"ok\":\"actualizado\"}]";

            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error updateAsesor['AsesorDao']" + e.getMessage());
               msg="[{\"error\":\"noActualizado\"}]";

        }
        return msg;
    }
    
        
    public String destroyAsesor(Asesor asesor) {
        String msg = "";
        try {
            Conexion conn = new Conexion();
            String sql = "DELETE FROM asesores WHERE ase_id = ? ";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ps.setInt(1, asesor.getAse_id());
            ps.executeUpdate();
            msg="[{\"ok\":\"eliminado\"}]";

            conn.disconnect();
            

        } catch (SQLException e) {
            System.out.println("Error destroyAsesor['AsesorsDao']" + e.getMessage());
            msg="[{\"error\":\"noEliminado\"}]";

            
        }
        return msg;
    }

}
