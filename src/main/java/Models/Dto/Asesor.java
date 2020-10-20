package Models.Dto;

/**
 *
 * @author David Juajinoy
 */
public class Asesor {
    
    private int ase_id;
    private String ase_nombre;
    private String ase_numero_documento;
    private String ase_experiencia;
    private String ase_especialidad;
    private String ase_hora_inicio;
    private String ase_hora_fin;
    private int fk_ase_tipo_documento;
    
    
    public Asesor()
    {
        
    }

    public Asesor(int ase_id, String ase_nombre, String ase_numero_documento, String ase_experiencia, String ase_especialidad, String ase_hora_inicio, String ase_hora_fin, int fk_ase_tipo_documento) {
        this.ase_id = ase_id;
        this.ase_nombre = ase_nombre;
        this.ase_numero_documento = ase_numero_documento;
        this.ase_experiencia = ase_experiencia;
        this.ase_especialidad = ase_especialidad;
        this.ase_hora_inicio = ase_hora_inicio;
        this.ase_hora_fin = ase_hora_fin;
        this.fk_ase_tipo_documento = fk_ase_tipo_documento;
    }



    public int getAse_id() {
        return ase_id;
    }

    public void setAse_id(int ase_id) {
        this.ase_id = ase_id;
    }

    public String getAse_nombre() {
        return ase_nombre;
    }

    public void setAse_nombre(String ase_nombre) {
        this.ase_nombre = ase_nombre;
    }

    public String getAse_numero_documento() {
        return ase_numero_documento;
    }

    public void setAse_numero_documento(String ase_numero_documento) {
        this.ase_numero_documento = ase_numero_documento;
    }

    public String getAse_experiencia() {
        return ase_experiencia;
    }

    public void setAse_experiencia(String ase_experiencia) {
        this.ase_experiencia = ase_experiencia;
    }

    public String getAse_especialidad() {
        return ase_especialidad;
    }

    public void setAse_especialidad(String ase_especialidad) {
        this.ase_especialidad = ase_especialidad;
    }

    public String getAse_hora_inicio() {
        return ase_hora_inicio;
    }

    public void setAse_hora_inicio(String ase_hora_inicio) {
        this.ase_hora_inicio = ase_hora_inicio;
    }

    public String getAse_hora_fin() {
        return ase_hora_fin;
    }

    public void setAse_hora_fin(String ase_hora_fin) {
        this.ase_hora_fin = ase_hora_fin;
    }

    public int getFk_ase_tipo_documento() {
        return fk_ase_tipo_documento;
    }

    public void setFk_ase_tipo_documento(int fk_ase_tipo_documento) {
        this.fk_ase_tipo_documento = fk_ase_tipo_documento;
    }

    @Override
    public String toString() {
        return "Asesor{" + "ase_id=" + ase_id + ", ase_nombre=" + ase_nombre + ", ase_numero_documento=" + ase_numero_documento + ", ase_experiencia=" + ase_experiencia + ", ase_especialidad=" + ase_especialidad + ", ase_hora_inicio=" + ase_hora_inicio + ", ase_hora_fin=" + ase_hora_fin + ", fk_ase_tipo_documento=" + fk_ase_tipo_documento + '}';
    }
    
    
    
    
    
}
