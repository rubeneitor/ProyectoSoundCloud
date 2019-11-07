

// document.addEventListener('DOMContentLoaded', (event) => {
    // Busqueda();


      function Busqueda() {
    $('.lista').empty(); //Limpiamos la lista.
    var autor = $('input').val();
    console.log(autor);
    
    SC.initialize({
      client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
    });
    let cancion;
    SC.get('/tracks', {
    
      q: document.getElementById('cancion').value,
    }).then(function(tracks) {
      var numero = 0;
      if (tracks.length > 12) {
        numero = 12;
      } else {
        numero = tracks.length;
      }
      id = 1;
      for (var i = 0; i < numero; i++) {
        if (tracks[i].artwork_url !== null) {
          $('.lista').append(
            "<div " + "id =' "+tracks[i].artwork_url +" ' class='imagen_mini col-xs-2'><br><img src='" + 
              tracks[i].artwork_url + 
              "' id ='" + 
              tracks[i].id + console.log(tracks[i].id) + 
              `' draggable='true' ondragstart='drag(event, ${tracks[i].id})'><p class="titulo">Titulo: ` + tracks[i].title + `<p class="genero">Genero: ` + tracks[i].genre +`</p><p class="autor">Autor: ` + tracks[i].user.username + `</p></div>`
          );
        }
      }
    })
    .catch(error => {
      console.error('ups', error);
    });
    
   }

  function permitirDrop(event){
    event.preventDefault();
   }

   function drag(event, objetoDragado){
     event.dataTransfer.setData('data', objetoDragado);
     console.log(objetoDragado);
   }
  
   function drop(event){
     document.getElementById("reproductor").style="display:block";
     document.getElementById("cancionArrastrada").innerHTML = "Arrastra otra cancion aqui"
     event.preventDefault();
    var data = event.dataTransfer.getData('data');
    cargarCancion(data);
    console.log('data' + data)
    // event.target.appendChild(document.getElementById(data));
   }

  
// function cancion(event){
//   var track_url = 'https://soundcloud.com/tracks/' + event;
// SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
//   console.log('oEmbed response: ', oEmbed);
// });
// }


function cargarCancion(id){
  document.getElementById('reproductor').src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + id + "&auto_play=true&liking=false&bbuying=false&sharing=false";
}







  


// });




// function asignamosCancion(event){
//   var miAudio =document.getElementById('miAudio').src = event.target.id;
//   // console.log("La cancion es: " + miAudio);
//   var duracion=0;
//   var interval;
//   miAudio.ondurationchange = function() {
//     duracion=miAudio.duration;
    
//   }
//  }
  


//  function iniciar(){
// if(miAudio.paused)
// {
//   // iniciamos
//   miAudio.play();
//   interval=setInterval(mostrarDuracion,100);
//   document.getElementById("iniciar").innerHTML="&#8545;";
// }else{
//   // paramos
//   miAudio.pause();
//   clearInterval(interval);
//   document.getElementById("iniciar").innerHTML="&#8227;";
// }
// }

// function mostrarDuracion(){
// if(duracion>0)
// {
//   porcentaje=miAudio.currentTime*100/duracion;
//   document.getElementById("duracion").getElementsByTagName("span")[0].style.width=porcentaje+"px";
//   document.getElementById("duracion").getElementsByTagName("div")[0].innerHTML=parseInt(porcentaje)+"%";
// }
// }

// SC.stream('/tracks/293').then(function(player){
// player.play().then(function(){
//   console.log('Playback started!');
// }).catch(function(e){
//   console.error('Playback rejected. Try calling play() from a user interaction.', e);
// });
// });
