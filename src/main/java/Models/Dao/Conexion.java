package Models.Dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author David Juajinoy
 */
public class Conexion {

    public static final String DB_NAME = "prueba_asesores";
    public static final String DB_USER = "root";
    public static final String DB_PASS = "";
    public static final String JDBC_URL = "jdbc:mysql://localhost/" + DB_NAME + "?serverTimezone=UTC";

    Connection conn = null;

    public Conexion() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(JDBC_URL, DB_USER, DB_PASS);

        } catch (SQLException e) {
            System.out.println("Error Conexion.Java : " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.out.println("Error No encontro el Driver: " + e.getMessage());
        }
    }

    public Connection getConnection() {
        return conn;
    }

    public void disconnect() {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                System.out.println("Error Al Cerrar La Conexion: "+ e.getMessage());
            }
        }
    }

}
