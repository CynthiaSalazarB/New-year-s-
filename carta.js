document.addEventListener('DOMContentLoaded', function() {

  // Mostrar el formulario al hacer click en el botón
  document.getElementById('abrir-carta').addEventListener('click', function() {
    document.getElementById('inicio').style.display = 'none'; // Ocultar el botón
    document.getElementById('contenido').style.display = 'block'; // Mostrar el formulario
  });

  // Mostrar el mensaje cuando se seleccione quién eres
  document.getElementById('formulario-elecciones').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    let mensaje = '';

    switch (nombre) {
      case 'Mami':
        mensaje = '¡Feliz Navidad, Mami! Eres el corazón de nuestra familia.';
        break;
      case 'Papi':
        mensaje = '¡Feliz Navidad, Papi! Gracias por tu amor y apoyo.';
        break;
      case 'Ñaño Stiven':
        mensaje = '¡Feliz Navidad, Ñaño Stiven! Eres una gran inspiración.';
        break;
      case 'Ñaño Charlie':
        mensaje = '¡Feliz Navidad, Ñaño Charlie! Que este año sea increíble para ti.';
        break;
    }

    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerText = mensaje;
    mensajeDiv.style.display = 'block'; // Mostrar el mensaje
  });
});
