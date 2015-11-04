<?php 
class Categoria extends ActiveRecord{
	protected function initialize(){
	    $this->validates_uniqueness_of("categoria","mgs: El parámetro para categoria ya fue usado, por favor use otro");
	}
	public function getInOptionsFormat(){
		$especies = $this->find();
		$options = "<option>Seleccione</option>";
		foreach ($especies as $key => $value) {
			$options .= "<option value=\"$value->id\">$value->categoria</option>";
		}
		return $options;
	}		
}

 ?>