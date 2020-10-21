/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Models.Dao;

import Models.Dto.Citas;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author David Juajinoy
 */
public class CitasDAO {

    public List<Citas> showAllCitas() {
        List<Citas> listaCitas = new ArrayList<>();

        try {
            Conexion conn = new Conexion();
            String sql = "SELECT id_citas,descripcion,fecha,hora_inicio,hora_final,fk_asesores,fk_clientes,fk_estado,ase_nombre,ase_hora_inicio,ase_hora_fin,cli_nombres,cli_apellidos,estado_cita FROM citas INNER JOIN asesores ON citas.fk_asesores= asesores.ase_id INNER JOIN clientes ON citas.fk_clientes= clientes.cli_id INNER JOIN estado_cita ON citas.fk_estado=estado_cita.id_estado_cita";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int id_citas = rs.getInt("id_citas");
                String descripcion = rs.getString("descripcion");
                String fecha = rs.getString("fecha");   
                String hora_inicio = rs.getString("hora_inicio");
                String hora_final = rs.getString("hora_final");
                int fk_asesores = rs.getInt("fk_asesores");
                int fk_clientes = rs.getInt("fk_clientes");
                int fk_estado = rs.getInt("fk_estado");
                String ase_nombre = rs.getString("ase_nombre");
                String ase_hora_inicio = rs.getString("ase_hora_inicio");
                String ase_hora_fin = rs.getString("ase_hora_fin");
                String cli_nombres = rs.getString("cli_nombres");
                String cli_apellidos = rs.getString("cli_apellidos");
                String estado_cita = rs.getString("estado_cita");

              
                Citas citas = new Citas(id_citas, descripcion, fecha, hora_inicio, hora_final, fk_asesores, fk_clientes, fk_estado, ase_nombre, ase_hora_inicio, ase_hora_fin, cli_nombres, cli_apellidos, estado_cita);
//
                listaCitas.add(citas);

            }

            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error showAllCitas['CitasDAO']" + e.getMessage());

        }
        return listaCitas;

    }

    public String storedCita(Citas cita) {
        String msg = "";
        try {
            Conexion conn = new Conexion();
            String sql = "INSERT INTO citas (descripcion, fecha, hora_inicio, hora_final, fk_asesores, fk_clientes, fk_estado) VALUES (?, ?, ?,?,?,?,?)";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ps.setString(1, cita.getDescripcion());
            ps.setString(2, cita.getFecha());
            ps.setString(3, cita.getHora_inicio());
            ps.setString(4, cita.getHora_final());
            ps.setInt(5, cita.getFk_asesores());
            ps.setInt(6, cita.getFk_clientes());
            ps.setInt(7, cita.getFk_estado());
            ps.executeUpdate();
            msg = "[{\"ok\":\"insertado\"}]";

            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error storedCita['CitasDAO']" + e.getMessage());
            msg = "[{\"error\":\"noInsertado\"}]";

        }
        return msg;
    }

    public String updateCita(Citas cita) {
        String msg = "";
        try {
            Conexion conn = new Conexion();
            String sql = "UPDATE citas SET descripcion=?, fecha=?, hora_inicio=?, hora_final=?, fk_asesores=?, fk_clientes=?, fk_estado=? WHERE id_citas = ?";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ps.setString(1, cita.getDescripcion());
            ps.setString(2, cita.getFecha());
            ps.setString(3, cita.getHora_inicio());
            ps.setString(4, cita.getHora_final());
            ps.setInt(5, cita.getFk_asesores());
            ps.setInt(6, cita.getFk_clientes());
            ps.setInt(7, cita.getFk_estado());
            ps.setInt(8, cita.getId_citas());
            ps.executeUpdate();
            msg = "[{\"ok\":\"actualizado\"}]";

            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error updateCita['CitasDAO']" + e.getMessage());
            msg = "[{\"error\":\"noActualizado\"}]";

        }
        return msg;
    }

    public String destroyCita(Citas cita) {
        String msg = "";
        try {
            Conexion conn = new Conexion();
            String sql = "DELETE FROM citas WHERE id_citas = ? ";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ps.setInt(1, cita.getId_citas());
            ps.executeUpdate();
            msg = "[{\"ok\":\"eliminado\"}]";

            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error destroyCita['CitasDAO']" + e.getMessage());
            msg = "[{\"error\":\"noEliminado\"}]";

        }
        return msg;
    }

}
