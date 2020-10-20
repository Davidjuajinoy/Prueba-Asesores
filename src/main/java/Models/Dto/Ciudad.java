package Models.Dto;

/**
 *
 * @author David Juajinoy
 */
public class Ciudad {

    private int id_ciudad;
    private String nombre_ciudad;
    private int fk_pais;

    public Ciudad() {
    }

    public Ciudad(int id_ciudad, String nombre_ciudad, int fk_pais) {
        this.id_ciudad = id_ciudad;
        this.nombre_ciudad = nombre_ciudad;
        this.fk_pais = fk_pais;
    }

    public int getId_ciudad() {
        return id_ciudad;
    }

    public void setId_ciudad(int id_ciudad) {
        this.id_ciudad = id_ciudad;
    }

    public String getNombre_ciudad() {
        return nombre_ciudad;
    }

    public void setNombre_ciudad(String nombre_ciudad) {
        this.nombre_ciudad = nombre_ciudad;
    }

    public int getFk_pais() {
        return fk_pais;
    }

    public void setFk_pais(int fk_pais) {
        this.fk_pais = fk_pais;
    }

    @Override
    public String toString() {
        return "Ciudad{" + "id_ciudad=" + id_ciudad + ", nombre_ciudad=" + nombre_ciudad + ", fk_pais=" + fk_pais + '}';
    }

}
