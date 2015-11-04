<?php 
class Temporada extends ActiveRecord{
	protected function initialize(){
	    $this->validates_uniqueness_of("temporada","mgs: El parámetro para temporada ya fue usado, por favor use otro");
	}
	public function getInOptionsFormat(){
		$especies = $this->find();
		$options = "<option>Seleccione</option>";
		foreach ($especies as $key => $value) {
			$options .= "<option value=\"$value->id\">$value->temporada</option>";
		}
		return $options;
	}		
}

 ?>