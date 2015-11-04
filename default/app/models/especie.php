<?php 
class Especie extends ActiveRecord{
	protected function initialize(){
	    $this->validates_uniqueness_of("especie","mgs: El parámetro para especie ya fue usado, por favor use otro");
	}
	public function getInOptionsFormat(){
		$especies = $this->find();
		$options = "<option>Seleccione</option>";
		foreach ($especies as $key => $value) {
			$options .= "<option value=\"$value->id\">$value->especie</option>";
		}
		return $options;
	}	
}
 ?>