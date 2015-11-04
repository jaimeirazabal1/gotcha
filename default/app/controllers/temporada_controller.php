<?php 
Load::models("temporada");
class TemporadaController extends AppController{
	public function nueva(){
		View::select(null,"json");
		$nueva = new Temporada(Input::post("temporada"));
		if ($nueva->save()) {
			$buscar = new Temporada();
			$options = $buscar->getInOptionsFormat();
			$this->data = array("valid"=>true,"mensaje"=>"temporada Agregada con éxito","html"=>$options);
		}else{
			$this->data = array("valid"=>false,"mensaje"=>strip_tags(str_replace("<br>", "\n", ob_get_contents())));
		}
	}
}

 ?>