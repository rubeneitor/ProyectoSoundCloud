

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
            "<div " + "id =' "+tracks[i].artwork_url +" ' class='imagen_mini col-xs-2'> " + tracks[i].title + "<br><img src='" + 
              tracks[i].artwork_url + 
              "' id ='" + 
              tracks[i].id + console.log(tracks[i].id) + 
              "' draggable='true' ondragstart='drag(event)'></div>"
          );
        }
      }
    })
    .catch(error => {
      console.error('ups', error);
    });
    
   }

 
   

  //  $( function() {
  //   $( "#draggable" ).draggable();
  // } );
   
  //  function reproducir(){
  //   let arrastrar = event.target.id;
  //   // arrastrar.event.drag;
  //        console.log('ARRASTRAR' + arrastrar);
  //    }

  //   node.on('click', fuction ev){
      
  //   }
  //     // 

  function permitirDrop(event){
    event.preventDefault();
   }

   function drag(event){
     event.dataTransfer.setData('data', event.target.id);
     console.log(event.dataTransfer.getData('data', event.target.id));
   }
  
   function drop(event){
     event.preventDefault();
    var data = event.dataTransfer.getData('data');
    console.log('data' + data)
    event.target.appendChild(document.getElementById(data));
   }


  


// });