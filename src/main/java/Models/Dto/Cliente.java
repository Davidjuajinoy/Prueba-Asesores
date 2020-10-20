package Models.Dto;

/**
 *
 * @author David Juajinoy
 */
public class Cliente {
    
    private int cliente_id;
    private String cli_nombres;
    private String cli_apellidos;
    private String cli_numero_documento;
    private String cli_fecha_creacion;
    private int fk_cli_tipo_documento;
    private int fk_cli_ciudad;
    
    //inner join
    private String nombre_documento;
    private String nombre_ciudad;
    private String nombre_pais;
    private int fk_pais;
   
    public Cliente()
    {
        
    }

    public Cliente(int cliente_id) {
        this.cliente_id = cliente_id;
    }

    public Cliente(String cli_nombres, String cli_apellidos, String cli_numero_documento, String cli_fecha_creacion, int fk_cli_tipo_documento, int fk_cli_ciudad) {
        this.cli_nombres = cli_nombres;
        this.cli_apellidos = cli_apellidos;
        this.cli_numero_documento = cli_numero_documento;
        this.cli_fecha_creacion = cli_fecha_creacion;
        this.fk_cli_tipo_documento = fk_cli_tipo_documento;
        this.fk_cli_ciudad = fk_cli_ciudad;
    }
    


    public Cliente(int cliente_id, String cli_nombres, String cli_apellidos, String cli_numero_documento, String cli_fecha_creacion, int fk_cli_tipo_documento, int fk_cli_ciudad) {
        this.cliente_id = cliente_id;
        this.cli_nombres = cli_nombres;
        this.cli_apellidos = cli_apellidos;
        this.cli_numero_documento = cli_numero_documento;
        this.cli_fecha_creacion = cli_fecha_creacion;
        this.fk_cli_tipo_documento = fk_cli_tipo_documento;
        this.fk_cli_ciudad = fk_cli_ciudad;
    }
    
      public Cliente(int cliente_id, String cli_nombres, String cli_apellidos, String cli_numero_documento, String cli_fecha_creacion, int fk_cli_tipo_documento, int fk_cli_ciudad , String nombre_documento,String nombre_ciudad,String nombre_pais, int fk_pais) {
        this.cliente_id = cliente_id;
        this.cli_nombres = cli_nombres;
        this.cli_apellidos = cli_apellidos;
        this.cli_numero_documento = cli_numero_documento;
        this.cli_fecha_creacion = cli_fecha_creacion;
        this.fk_cli_tipo_documento = fk_cli_tipo_documento;
        this.fk_cli_ciudad = fk_cli_ciudad;
        this.nombre_documento = nombre_documento;
        this.nombre_ciudad = nombre_ciudad;
        this.nombre_pais = nombre_pais;
        this.fk_pais  =fk_pais;

    }

   

    public int getCliente_id() {
        return cliente_id;
    }

    public void setCliente_id(int cliente_id) {
        this.cliente_id = cliente_id;
    }

    public String getCli_nombres() {
        return cli_nombres;
    }

    public void setCli_nombres(String cli_nombres) {
        this.cli_nombres = cli_nombres;
    }

    public String getCli_apellidos() {
        return cli_apellidos;
    }

    public void setCli_apellidos(String cli_apellidos) {
        this.cli_apellidos = cli_apellidos;
    }

    public String getCli_numero_documento() {
        return cli_numero_documento;
    }

    public void setCli_numero_documento(String cli_numero_documento) {
        this.cli_numero_documento = cli_numero_documento;
    }

    public String getCli_fecha_creacion() {
        return cli_fecha_creacion;
    }

    public void setCli_fecha_creacion(String cli_fecha_creacion) {
        this.cli_fecha_creacion = cli_fecha_creacion;
    }

    public int getFk_cli_tipo_documento() {
        return fk_cli_tipo_documento;
    }

    public void setFk_cli_tipo_documento(int fk_cli_tipo_documento) {
        this.fk_cli_tipo_documento = fk_cli_tipo_documento;
    }

    public int getFk_cli_ciudad() {
        return fk_cli_ciudad;
    }

    public void setFk_cli_ciudad(int fk_cli_ciudad) {
        this.fk_cli_ciudad = fk_cli_ciudad;
    }

    @Override
    public String toString() {
        return "Cliente{" + "cliente_id=" + cliente_id + ", cli_nombres=" + cli_nombres + ", cli_apellidos=" + cli_apellidos + ", cli_numero_documento=" + cli_numero_documento + ", cli_fecha_creacion=" + cli_fecha_creacion + ", fk_cli_tipo_documento=" + fk_cli_tipo_documento + ", fk_cli_ciudad=" + fk_cli_ciudad + '}';
    }
    
    
    
    
}
