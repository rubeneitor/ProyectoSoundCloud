

//AUTENTIFICAMOS CON EL ID DE CLIENTE
function autentificar() {
  SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
  });
}

document.getElementById("resultados").innerHTML = "";
//BUSCAMOS UNA CANCION Y MOSTRAMOS LOS RESULTADOS
$("#buscar").on('click', function (ev) {
  
  $('#resultados').empty(); //Limpiamos la lista.


  var autor = $('input').val();

  autentificar();

  let cancion;
  SC.get('/tracks', {

    q: document.getElementById('cancion').value
    // q: $('#cancion').val(),
  }).then(function (tracks) {
    var numero = document.getElementById("numResultados").value;
    var resultado = document.getElementById('cancion').value;

    if (resultado == '') {
      alert("Introduce un nombre de cancion, titulo o autor");
    } else {
      if ((numero <= 0) || numero == null) {
        alert('Tienes que insertar un numero de resultados');
      } else {
        $('.contenedorReproductorYArrastrar').css("visibility", "visible"); 
        id = 1;
        //BUCLE DONDE AÑADE UN DIV CON SU IMAGEN Y LOS DATOS QUE INDICO POR CADA RESULTADO DE LA BUSQUEDA
        for (var i = 1; i <= numero; i++) {
          if (tracks[i].artwork_url !== null) {
            console.log("IMAGEN: " + tracks[i].artwork_url);
            $('.lista').append(
              "<div " + "id =' " + tracks[i].artwork_url + " '><br><div class='resultado'><img src='" +
              tracks[i].artwork_url +
              "' id ='" +
              tracks[i].id + console.log(tracks[i].id) +
              `' draggable='true' ondragstart='drag(event, ${tracks[i].id})'><p class="titulo">Titulo: ` + tracks[i].title + `<p class="publicacion">Publicación: ` + tracks[i].release_day + "-" + tracks[i].release_month + "-" + tracks[i].realease_year + `</p><p class="autor">Autor: ` + tracks[i].user.username + `</p></div></div>`
            );
          } else {
            //EN CASO DE QUE LA CANCION NO TENGA IMAGEN, PONGO UNA POR DEFECTO
            tracks[i].artwork_url = "images/iconoSC.png";
            $('.lista').append("<div " + "id =' " + tracks[i].artwork_url + " '><br><div class='resultado'><img src='" +
              tracks[i].artwork_url +
              "' id ='" +
              tracks[i].id + console.log(tracks[i].id) +
              `' draggable='true' ondragstart='drag(event, ${tracks[i].id})'><p class="titulo">Titulo: ` + tracks[i].title + `<p class="publicacion">Publicación: ` + tracks[i].release_day + "-" + tracks[i].release_month + "-" + tracks[i].realease_year + `</p><p class="autor">Autor: ` + tracks[i].user.username + `</p></div></div>`);
            
          }
        }
      }
    }
  })

    .catch(error => {
      console.error('ups', error);
    });

});


function permitirDrop(event) {
  event.preventDefault();
}

// COGEMOS EL ELEMENTO ARRASTRANDO CON EL RATON
function drag(event, objetoDragado) {
  event.dataTransfer.setData('data', objetoDragado);
}

//SOLTAMOS EL ELMENTO PARA MOSTRAR EL REPRODUCTOR QUE INICIALMENTE DEJAMOS EN DISPLAY:NONE
function drop(event) {
  document.getElementById("reproductor").style = "display:block";
  $("#cancionArrastrada").html("Arrastra otra cancion aqui");
  event.preventDefault();
  var data = event.dataTransfer.getData('data');
  cargarCancion(data);
}

//AQUI CARGAMOS LA CANCION DROPADA EN EL REPRODUCTOR 
function cargarCancion(id) {
  document.getElementById('reproductor').src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + id + "&auto_play=true&liking=false&bbuying=false&sharing=false";

}

