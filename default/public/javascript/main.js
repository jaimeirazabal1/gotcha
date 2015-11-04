
   function subirArchivos() {
      $("#archivo").upload('index/subir_archivo',
      {
         nombre_archivo: $("#nombre_archivo").val()
      },
      function(respuesta) {
         //Subida finalizada.
         $("#barra_de_progreso").val(0);
         if (respuesta === 1) {
            mostrarRespuesta('El archivo ha sido subido correctamente.', true);
            $("#nombre_archivo, #archivo").val('');
         } else {
            mostrarRespuesta('El archivo NO se ha podido subir.', false);
         }
         mostrarArchivos();
         }, function(progreso, valor) {
            //Barra de progreso.
            $("#barra_de_progreso").val(valor);
         });
   }
   function eliminarArchivos(archivo) {
      $.ajax({
         url: 'index/eliminar_archivo',
         type: 'POST',
         timeout: 10000,
         data: {archivo: archivo},
         error: function() {
            mostrarRespuesta('Error al intentar eliminar el archivo.', false);
         },
         success: function(respuesta) {
            if (respuesta == 1) {
               mostrarRespuesta('El archivo ha sido eliminado.', true);
            } else {
               mostrarRespuesta('Error al intentar eliminar el archivo.', false); 
            }
            mostrarArchivos();
         }
      });
   }
   function mostrarArchivos() {
      $.ajax({
         url: 'index/mostrar_archivos',
         dataType: 'JSON',
         success: function(respuesta) {
            if (respuesta) {
               var html = '';
               for (var i = 0; i < respuesta.length; i++) {
                  if (respuesta[i] != undefined) {
                     html += '<div class="row"> <span class="col-lg-2"> ' + respuesta[i] + ' </span> <div class="col-lg-2"> <a class="eliminar_archivo btn btn-danger" href="javascript:void(0);"> Eliminar </a> </div> </div> <hr />';
                  }
               }
               $("#archivos_subidos").html(html);
            }
         }
      });
   }
   function mostrarRespuesta(mensaje, ok){
      $("#respuesta").removeClass('alert-success').removeClass('alert-danger').html(mensaje);
      if(ok){
         $("#respuesta").addClass('alert-success');
      }else{
         $("#respuesta").addClass('alert-danger');
      }
   }
   function readURL(input) {

       if (input.files && input.files[0]) {
           var reader = new FileReader();

           reader.onload = function (e) {
               $('#blah').attr('src', e.target.result);
           }

           reader.readAsDataURL(input.files[0]);
       }
   }
   function cargando(suiche){
      if (suiche == "on") {
         $(".cargando").removeClass("hide");
      }else{
         $(".cargando").addClass("hide");
      }
   }
   function mensaje_modal(mensaje, class_){
      if ($(".mensajes_modal").hasClass("alert-success")) {
         $(".mensajes_modal").removeClass("alert-success")
      };
      if ($(".mensajes_modal").hasClass("alert-danger")) {
         $(".mensajes_modal").removeClass("alert-danger")
      };
      $(".mensajes_modal").text(mensaje);
      $(".mensajes_modal").addClass(class_);
   }
   function sumar_decimales_octal(clase_inputs, clase_total){
      $("."+clase_inputs).val("0.0");
      $("."+clase_total).val("0.0")
      $("."+clase_inputs).keyup(function(){
         var suma = "0.0";
         suma_entero = suma.split(".")[0];
         suma_decimal = suma.split(".")[1];
         $("."+clase_inputs).each(function(index){
            valor = $(this).val().toString();
            if (!valor) {
               alert("El formato de los dígitos debe ser decimal (x.x) y diferente de nulo");
               $(this).val("0.0");
               $(this).focus();
               return;
            };
            valor_decimal = valor.split(".")[1];
            if (valor_decimal > 7) {
               alert("El valor del decimal debe estar en formato octal, es decir, mayor o igual a 7");
               $(this).val("0.0");
               $(this).focus();
               return;
            }
            valor_entero = valor.split(".")[0];
            suma_entero = parseInt(suma_entero) + parseInt(valor_entero);
            suma_decimal_aux = parseInt(suma_decimal) + parseInt(valor_decimal);
            if (suma_decimal_aux > 7) {
               diferencia = suma_decimal_aux - 8;
               suma_entero++;
               suma_decimal = diferencia;
            }else{
               suma_decimal = suma_decimal_aux;
            }
         });
         if (suma_entero.toString() == "NaN") {
            total_entero = "0";
         }else{
            total_entero = suma_entero;
         }
         if (suma_decimal.toString() == "NaN") {
            total_decimal = "0";
         }else{
            total_decimal = suma_decimal;
         }
         total = total_entero+"."+total_decimal; 
         $("."+clase_total).val(total);
      });      
   }
   $(document).ready(function() {

      sumar_decimales_octal("longitudvelastipicasleft","ltotalleft");
      sumar_decimales_octal("longitudvelastipicasright","ltotalright");
      sumar_decimales_octal("circunferenciasleft","ctotalleft");
      sumar_decimales_octal("circunferenciasright","ctotalright");
      sumar_decimales_octal("longitudvelasatipicasleft","latotalleft");
      sumar_decimales_octal("longitudvelasatipicasright","latotalright");

      var public_path = $.KumbiaPHP.publicPath;
      console.log("PUBLIC_PATH:",$.KumbiaPHP.publicPath)

      $("#imgInp").change(function(){
          readURL(this);
      });
      mostrarArchivos();
      $("#boton_subir").on('click', function() {
         subirArchivos();
      });
      $("#archivos_subidos").on('click', '.eliminar_archivo', function() {
         var archivo = $(this).parents('.row').eq(0).find('span').text();
         archivo = $.trim(archivo);
         eliminarArchivos(archivo);
      });

      /*uso para ajax*/
      $("body").on("submit","#form_nueva_especie",function(e){
         e.preventDefault();
         var data = $(this).serialize();
         cargando("on");
         $.ajax({
            url:public_path+"especie/nueva",
            data:data,
            type:"POST",
            async:false,
            success:function(r){
               if (r.valid) {
                  console.log("success:",r);
                  mensaje_modal(r.mensaje, "alert-success");
                  $("#especie_especie").val("");
                  $("#ide_especie_id").html(r.html);

               }else{
                  mensaje_modal(r.mensaje, "alert-danger");
               }
               cargando("off");

            },
            error:function(e){
               console.log("Error:",e);
               mensaje_modal($(e.responseText).text(), "alert-danger");
               cargando("off");
            }
         })
      });
      $("body").on("submit","#form_nueva_categoria",function(e){
         e.preventDefault();
         var data = $(this).serialize();
         cargando("on");
         $.ajax({
            url:public_path+"categoria/nueva",
            data:data,
            type:"POST",
            async:false,
            success:function(r){
               if (r.valid) {
                  console.log("success:",r);
                  mensaje_modal(r.mensaje, "alert-success");
                  $("#categoria_categoria").val("");
                  $("#ide_categoria_id").html(r.html);

               }else{
                  mensaje_modal(r.mensaje, "alert-danger");
               }
               cargando("off");

            },
            error:function(e){
               console.log("Error:",e);
               mensaje_modal($(e.responseText).text(), "alert-danger");
               cargando("off");
            }
         })
      });
      $("body").on("submit","#form_nueva_temporada",function(e){
         e.preventDefault();
         var data = $(this).serialize();
         cargando("on");
         $.ajax({
            url:public_path+"temporada/nueva",
            data:data,
            type:"POST",
            async:false,
            success:function(r){
               if (r.valid) {
                  console.log("success:",r);
                  mensaje_modal(r.mensaje, "alert-success");
                  $("#temporada_temporada").val("");
                  $("#ide_temporada_id").html(r.html);

               }else{
                  mensaje_modal(r.mensaje, "alert-danger");
               }
               cargando("off");

            },
            error:function(e){
               console.log("Error:",e);
               mensaje_modal($(e.responseText).text(), "alert-danger");
               cargando("off");
            }
         })
      });
      /*eventos para sumar octales*/
      $(".longitudvelastipicasleft").keyup(function(){
         var suma=0;
         $(".longitudvelastipicasleft").each(function(){
            if ($(this).val()) {
               suma = parseFloat(suma) + parseFloat($(this).val());
            }
         })
         if (suma) {
            $("#ltotalleft").val(suma)
         }else{
            $("#ltotalleft").val("0.0");
         }
      })
      $(".longitudvelastipicasright").keyup(function(){
         var suma=0;
         $(".longitudvelastipicasright").each(function(){
            if ($(this).val()) {
               suma = parseFloat(suma) + parseFloat($(this).val());
            }
         })
         if (suma) {
            $("#ltotalright").val(suma)
         }else{
            $("#ltotalright").val("0.0");
         }
      })
      /*uso para css*/
      $("input[type='text'],select,textarea").addClass("form-control");
      $("button, input[type='submit']").addClass("btn btn-default");

      /*uso para evento de modal cuando se quite*/
      $('#myModal,#myModal2').on('hidden.bs.modal', function (e) {
         $(".mensajes_modal").hasClass("alert-success") ? $(".mensajes_modal").removeClass("alert-success") :  "";
         $(".mensajes_modal").hasClass("alert-danger") ? $(".mensajes_modal").removeClass("alert-danger") : "";
         $(".mensajes_modal").text("");
      })
   });
