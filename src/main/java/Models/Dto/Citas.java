package Models.Dto;

/**
 *
 * @author David Juajinoy
 */
public class Citas {

    private int id_citas;
    private String descripcion;
    private String fecha;
    private String hora_inicio;
    private String hora_final;
    private int fk_asesores;
    private int fk_clientes;
    private int fk_estado;
    
    public Citas()
    {
        
    }

    public Citas(int id_citas, String descripcion, String fecha, String hora_inicio, String hora_final, int fk_asesores, int fk_clientes, int fk_estado) {
        this.id_citas = id_citas;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora_inicio = hora_inicio;
        this.hora_final = hora_final;
        this.fk_asesores = fk_asesores;
        this.fk_clientes = fk_clientes;
        this.fk_estado = fk_estado;
    }

 

    public int getId_citas() {
        return id_citas;
    }

    public void setId_citas(int id_citas) {
        this.id_citas = id_citas;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHora_inicio() {
        return hora_inicio;
    }

    public void setHora_inicio(String hora_inicio) {
        this.hora_inicio = hora_inicio;
    }

    public String getHora_final() {
        return hora_final;
    }

    public void setHora_final(String hora_final) {
        this.hora_final = hora_final;
    }

    public int getFk_asesores() {
        return fk_asesores;
    }

    public void setFk_asesores(int fk_asesores) {
        this.fk_asesores = fk_asesores;
    }

    public int getFk_clientes() {
        return fk_clientes;
    }

    public void setFk_clientes(int fk_clientes) {
        this.fk_clientes = fk_clientes;
    }

    public int getFk_estado() {
        return fk_estado;
    }

    public void setFk_estado(int fk_estado) {
        this.fk_estado = fk_estado;
    }

    @Override
    public String toString() {
        return "Citas{" + "id_citas=" + id_citas + ", descripcion=" + descripcion + ", fecha=" + fecha + ", hora_inicio=" + hora_inicio + ", hora_final=" + hora_final + ", fk_asesores=" + fk_asesores + ", fk_clientes=" + fk_clientes + ", fk_estado=" + fk_estado + '}';
    }
    
    

}
