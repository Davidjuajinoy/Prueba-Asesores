package Models.Dao;

import Models.Dto.Cliente;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author David Juajinoy
 */
public class ClientesDAO {

    public List<Cliente> showAllClientes() {
        List<Cliente> listaCliente = new ArrayList<>();

        try {
            Conexion conn = new Conexion();
            String sql = "SELECT * FROM `clientes` INNER JOIN tipo_documento ON clientes.fk_cli_tipo_documento= tipo_documento.id_documento INNER JOIN ciudades ON clientes.fk_cli_ciudad= ciudades.id_ciudad INNER JOIN paises ON ciudades.fk_pais= paises.id_pais";
//            String sql = "SELECT * FROM clientes";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int clid_id = rs.getInt("cli_id");
                String cli_nombres = rs.getString("cli_nombres");
                String cli_apellidos = rs.getString("cli_apellidos");
                String cli_numero_documento = rs.getString("cli_numero_documento");
                String cli_fecha_creacion = rs.getString("cli_fecha_creacion");
                int fk_cli_tipo_documento = rs.getInt("fk_cli_tipo_documento");
                int fk_cli_ciudad = rs.getInt("fk_cli_ciudad");
                String nombre_documento = rs.getString("nombre_documento");
                String nombre_ciudad = rs.getString("nombre_ciudad");
                String nombre_pais = rs.getString("nombre_pais");
                int fk_pais = rs.getInt("fk_pais");

                Cliente cliente = new Cliente(clid_id, cli_nombres, cli_apellidos, cli_numero_documento, cli_fecha_creacion, fk_cli_tipo_documento, fk_cli_ciudad, nombre_documento, nombre_ciudad, nombre_pais, fk_pais);

                listaCliente.add(cliente);

            }
            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error showAllClientes['ClientesDao']" + e.getMessage());

        }

        return listaCliente;
    }

    public String storedCliente(Cliente cliente) {
        String msg = "";
        try {
            Conexion conn = new Conexion();
            String sql = "INSERT INTO clientes(cli_nombres, cli_apellidos, cli_numero_documento, cli_fecha_creacion, fk_cli_tipo_documento, fk_cli_ciudad) VALUES (?,?,?,?,?,?)";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ps.setString(1, cliente.getCli_nombres());
            ps.setString(2, cliente.getCli_apellidos());
            ps.setString(3, cliente.getCli_numero_documento());
            ps.setString(4, cliente.getCli_fecha_creacion());
            ps.setInt(5, cliente.getFk_cli_tipo_documento());
            ps.setInt(6, cliente.getFk_cli_ciudad());
            ps.executeUpdate();
            msg="[{\"ok\":\"insertado\"}]";
            conn.disconnect();

        } catch (SQLException e) {
            System.out.println("Error storedCliente['ClientesDao']" + e.getMessage());
            msg="[{\"error\":\"noInsertado\"}]";
            
        }
       
        return msg;
    }
    
    
    public String updateCliente(Cliente cliente) {
        String msg = "";
        try {
            Conexion conn = new Conexion();
            String sql = "UPDATE clientes SET cli_nombres = ?, cli_apellidos=?, cli_numero_documento=?, cli_fecha_creacion=?, fk_cli_tipo_documento=?, fk_cli_ciudad=? WHERE cli_id =? ";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ps.setString(1, cliente.getCli_nombres());
            ps.setString(2, cliente.getCli_apellidos());
            ps.setString(3, cliente.getCli_numero_documento());
            ps.setString(4, cliente.getCli_fecha_creacion());
            ps.setInt(5, cliente.getFk_cli_tipo_documento());
            ps.setInt(6, cliente.getFk_cli_ciudad());
            ps.setInt(7, cliente.getCliente_id());
            ps.executeUpdate();
            msg="[{\"ok\":\"actualizado\"}]";
            

        } catch (SQLException e) {
            System.out.println("Error updateCliente['ClientesDao']" + e.getMessage());
            msg="[{\"error\":\"noActualizado\"}]";
            
        }
        return msg;
    }
    
    
    public String destroyCliente(Cliente cliente) {
        String msg = "";
        try {
            Conexion conn = new Conexion();
            String sql = "DELETE FROM clientes WHERE cli_id = ? ";
            PreparedStatement ps = conn.getConnection().prepareStatement(sql);
            ps.setInt(1, cliente.getCliente_id());
            ps.executeUpdate();
            msg="[{\"ok\":\"eliminado\"}]";
            conn.disconnect();
            

        } catch (SQLException e) {
            System.out.println("Error destroyCliente['ClientesDao']" + e.getMessage());
            msg="[{\"error\":\"noEliminado\"}]";
            
        }
        return msg;
    }
    
    

}
