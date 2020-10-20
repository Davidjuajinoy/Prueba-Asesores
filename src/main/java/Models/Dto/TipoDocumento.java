
package Models.Dto;

/**
 *
 * @author David Juajinoy
 */
public class TipoDocumento {
    
    private int id_documento;
    private String nombre_documento;

    public TipoDocumento() {
    }

    public TipoDocumento(int id_documento, String nombre_documento) {
        this.id_documento = id_documento;
        this.nombre_documento = nombre_documento;
    }

    public int getId_documento() {
        return id_documento;
    }

    public void setId_documento(int id_documento) {
        this.id_documento = id_documento;
    }

    public String getNombre_documento() {
        return nombre_documento;
    }

    public void setNombre_documento(String nombre_documento) {
        this.nombre_documento = nombre_documento;
    }

    @Override
    public String toString() {
        return "TipoDocumento{" + "id_documento=" + id_documento + ", nombre_documento=" + nombre_documento + '}';
    }
    
    
    
    
}
