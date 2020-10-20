package Models.Dto;

/**
 *
 * @author David Juajinoy
 */
public class EstadoCita {
    private int id_estado_cita;
    private String estado_cita;
    
    public EstadoCita()
    {
        
    }

    public EstadoCita(int id_estado_cita, String estado_cita) {
        this.id_estado_cita = id_estado_cita;
        this.estado_cita = estado_cita;
    }

    public int getId_estado_cita() {
        return id_estado_cita;
    }

    public void setId_estado_cita(int id_estado_cita) {
        this.id_estado_cita = id_estado_cita;
    }

    public String getEstado_cita() {
        return estado_cita;
    }

    public void setEstado_cita(String estado_cita) {
        this.estado_cita = estado_cita;
    }

    @Override
    public String toString() {
        return "EstadoCita{" + "id_estado_cita=" + id_estado_cita + ", estado_cita=" + estado_cita + '}';
    }
    
    
    
    
}
