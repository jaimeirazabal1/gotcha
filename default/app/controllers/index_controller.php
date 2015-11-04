<?php

/**
 * Controller por defecto si no se usa el routes
 * 
 */
class IndexController extends AppController
{


    public function index()
    {
        echo "<pre>";
        var_dump($_REQUEST);
        echo "</pre>";
    }
    public function subir_archivo(){
    	View::select(null,"json");
    	if (isset($_FILES['archivo'])) {
		   $archivo = $_FILES['archivo'];
		   $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
		   $time = time();
		   $nombre = "{$_POST['nombre_archivo']}_$time.$extension";
		   if (move_uploaded_file($archivo['tmp_name'], $this->path_archivo."/".$nombre)) {
		      $this->data = 1;
		   } else {
		      $this->data = 0;
		   }
		}
    }
    public function mostrar_archivos(){

    	$directorio_escaneado = scandir($this->path_archivo);
		$archivos = array();
		foreach ($directorio_escaneado as $item) {
		   if ($item != '.' and $item != '..') {
		      $archivos[] = $item;
		   }
		}
		View::select(null,"json");
		$this->data = $archivos;
    }
    public function eliminar_archivo(){
    	View::select(null,"json");
    	if (isset($_POST['archivo'])) {
		   $archivo = $_POST['archivo'];
		   if (file_exists($this->path_archivo."/$archivo")) {
		      unlink($this->path_archivo."/$archivo");
		      $this->data = 1;
		   } else {
		      $this->data = 0;
		   }
		}
    }

}
