<?php 
Load::models("especie");
class EspecieController extends AppController{
	public function nueva(){
		View::select(null,"json");
		$nueva = new Especie(Input::post("especie"));
		if ($nueva->save()) {
			$buscar = new Especie();
			$options = $buscar->getInOptionsFormat();
			$this->data = array("valid"=>true,"mensaje"=>"Especie Agregada con éxito","html"=>$options);
		}else{
			$this->data = array("valid"=>false,"mensaje"=>strip_tags(str_replace("<br>", "\n", ob_get_contents())));
		}
	}
}

 ?>