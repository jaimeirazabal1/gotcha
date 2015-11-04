<?php 
Load::models("categoria");
class CategoriaController extends AppController{
	public function nueva(){
		View::select(null,"json");
		$nueva = new Categoria(Input::post("categoria"));
		if ($nueva->save()) {
			$buscar = new Categoria();
			$options = $buscar->getInOptionsFormat();
			$this->data = array("valid"=>true,"mensaje"=>"Categoria Agregada con éxito","html"=>$options);
		}else{
			$this->data = array("valid"=>false,"mensaje"=>strip_tags(str_replace("<br>", "\n", ob_get_contents())));
		}
	}
}

 ?>