

    //AUTENTIFICAMOS CON EL ID DE CLIENTE
    function autentificar(){
      SC.initialize({
        client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
      });
    }

    //BUSCAMOS UNA CANCION Y MOSTRAMOS LOS RESULTADOS
    // function Busqueda(){

      document.getElementById("resultados").innerHTML = "";
      // document.getElementById("lista").remove();
      $("#buscar").on('click', function(ev) {
        $('#resultados').empty(); //Limpiamos la lista.
        //******* HACERLO CON DOCUMENT.GETELEMENTBYID
        
        var autor = $('input').val();
        console.log(autor);
        
        autentificar();
        
        let cancion;
        SC.get('/tracks', {
        
          q: document.getElementById('cancion').value,
          // q: $('#cancion').val(),
        }).then(function(tracks) {
          var numero = document.getElementById("numResultados").value;
          console.log('numCanciones' + numero)
          // if (tracks.length >= numero) {
          //   numero = numero;
          // } else {
          //   numero = tracks.length;
          // }
          if((numero <= 0) || numero == null){
            alert('Tienes que insertar un numero de resultados');
          } else {
          id = 1;
          for (var i = 1; i <= numero; i++) {
            console.log("I: " + i + " NUMERO: " + numero);
            if (tracks[i].artwork_url !== null) {
              console.log("IMAGEN: " + tracks[i].artwork_url);
              $('.lista').append(
                "<div " + "id =' "+tracks[i].artwork_url +" ' class='imagen_mini col-xs-2'><br><img src='" + 
                  tracks[i].artwork_url + 
                  "' id ='" + 
                  tracks[i].id + console.log(tracks[i].id) + 
                  `' draggable='true' ondragstart='drag(event, ${tracks[i].id})'><p class="titulo">Titulo: ` + tracks[i].title + `<p class="genero">Genero: ` + tracks[i].genre +`</p><p class="autor">Autor: ` + tracks[i].user.username + `</p></div>`
              );
            } else {
              
              tracks[i].artwork_url = "images/iconoSC.png";
              $('.lista').append( "<div " + "id =' "+tracks[i].artwork_url +" ' class='imagen_mini col-xs-2'><br><img src='" + 
                  tracks[i].artwork_url + 
                  "' id ='" + 
                  tracks[i].id + console.log(tracks[i].id) + 
                  `' draggable='true' ondragstart='drag(event, ${tracks[i].id})'><p class="titulo">Titulo: ` + tracks[i].title + `<p class="genero">Genero: ` + tracks[i].genre +`</p><p class="autor">Autor: ` + tracks[i].user.username + `</p></div>`);
              console.log(tracks[i].artwork_url);
              // console.log(url="../images/iconoSC.png");
            }
          }
        }
        })
        
        .catch(error => {
          console.error('ups', error);
        });
  
      });
    // }

    function permitirDrop(event){
      event.preventDefault();
     }
  
     // COGEMOS EL ELEMENTO ARRASTRANDO CON EL RATON
     function drag(event, objetoDragado){
       event.dataTransfer.setData('data', objetoDragado);
       console.log(objetoDragado);
     }
    
     //SOLTAMOS EL ELMENTO PARA MOSTRAR EL REPRODUCTOR QUE INICIALMENTE DEJAMOS EN DISPLAY:NONE
     function drop(event){
       document.getElementById("reproductor").style="display:block";
       $("#cancionArrastrada").html("Arrastra otra cancion aqui");
       event.preventDefault();
      var data = event.dataTransfer.getData('data');
      cargarCancion(data);
      console.log('data' + data)
      // event.target.appendChild(document.getElementById(data));
     }

     //AQUI CARGAMOS LA CANCION DROPADA EN EL REPRODUCTOR 
     function cargarCancion(id){
      document.getElementById('reproductor').src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + id + "&auto_play=true&liking=false&bbuying=false&sharing=false";
    
    }
    
