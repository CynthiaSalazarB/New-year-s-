document.addEventListener('DOMContentLoaded', function () {

  // Mostrar el formulario al hacer click en el botón
  document.getElementById('abrir-carta').addEventListener('click', function () {
      document.getElementById('inicio').style.display = 'none'; // Ocultar el botón
      document.getElementById('contenido').style.display = 'block'; // Mostrar el formulario
  });

  // Contraseñas para cada opción
  const contraseñas = {
      'Mami': 'CHALUPITA',
      'Papi': 'UN MILLON DE BESOS',
      'Ñaño Stiven': 'DESAPARECIDO',
      'Ñaño Charlie': 'MEXIQUENCE'
  };

  // Mostrar el mensaje cuando se seleccione quién eres
  document.getElementById('formulario-elecciones').addEventListener('submit', function (event) {
      event.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const contraseñaIngresada = document.getElementById('password').value;
      const mensajeDiv = document.getElementById('mensaje');

      if (contraseñaIngresada === contraseñas[nombre]) {
          // Mostrar mensaje adecuado dependiendo de la opción seleccionada
          let mensaje = '';
          switch (nombre) {
              case 'Mami':    mensaje = '¡Feliz Año Nuevo, Mami! Gracias por ser mi mejor amiga, siempre me apoyas en todo y me das consejos cuando mas lo necesito. Me haces sentir que puedo lograr todo incluso cuando dudo de mi, me levantas los animos y me regresas la confianza. Agradezco al universoporque me dio a la mejor mamá del mundo. Te amo un montón mami. Gracias por todo ma. TE AMOOO.';
                  break;
              case 'Papi':
                  mensaje = '¡Feliz Año Nuevo, Papi! Te quiero dar las gracias por apoyarme siempre, darme consejos que aplico todos los días y por siempre querer que esté bien. Gracias por ser con quien puedo compartir mi curiosidad y creatividad, y siempre creer en mi. Te amo un montón pa, siempre estás en mi corazón. Gracias por todo pa. TE AMOOO. ';
                  break;
              case 'Ñaño Stiven':
                  mensaje = '¡Feliz Año Nuevo, Ñaño Stiven! Sé que no habalmos mucho pero quiero que sepas que te amo mucho. Te deseo lo mejor para el 2025 y sé que puedes cumplir todo lo que te propongas con dedicación y esfuerzo. Sigue aprendiendo y sigue siendo una buena persona, sé ue lograrás cosas muy grandes, tienes toda mi confianza. Agradezco por tenerte como hermano. Te amo mucho.';
                  break;
              case 'Ñaño Charlie':
                  mensaje = '¡Feliz Año Nuevo, Ñaño Charlie! Gracias por siempre creer en mi, apoyarme y darme consejos cuando lo necesito. Eres mi inspiración para seguir esforzandome cada día, me demuestras que cuando se quiere algo siempre hay una manera de conseguirlo. Gracias por enseñarme tanto y por brindarme experiencias bonitas. Sigue siendo la persona que eres y sé ue lograrás cosas muy grandes, tienes toda mi confianza. Te amo mucho Charlie.';
                  break;
          }

              
          mensajeDiv.innerText = mensaje;
          mensajeDiv.style.color = 'green'; // Mensaje correcto
          mensajeDiv.style.display = 'block'; // Mostrar el mensaje
      } else {
          mensajeDiv.innerText = 'La contraseña es incorrecta.';
          mensajeDiv.style.color = 'red'; // Mensaje de error
          mensajeDiv.style.display = 'block'; // Mostrar el mensaje
      }
  });

  // Crear la escena, cámara y renderizador de THREE.js
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true }); // Fondo transparente
  renderer.setSize(300, 300);
  document.getElementById("three-container").appendChild(renderer.domElement);

  // Agregar iluminación
  const light = new THREE.PointLight(0xffffff, 1, 500);
  light.position.set(10, 10, 10);
  scene.add(light);

  // Cargar el texto "2025"
  const loader = new THREE.FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new THREE.TextGeometry("2025", {
          font: font,
          size: 2,
          height: 0.5,
          curveSegments: 12,
      });

      const textMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-4, 0, 0);
      scene.add(textMesh);

      // Variables de animación
      let rotationActive = true; // Indica si el texto está girando
      let lastTime = 0; // Último tiempo registrado
      const rotationDuration = 3000; // Duración de la rotación (3 segundos)
      const pauseDuration = 3000; // Duración de la pausa (3 segundos)

      function animate(time) {
          requestAnimationFrame(animate);

          if (rotationActive) {
              // Rotación activa: calcular el progreso
              const elapsedTime = time - lastTime;
              textMesh.rotation.y = (elapsedTime / rotationDuration) * Math.PI * 2;

              if (elapsedTime >= rotationDuration) {
                  // Termina la rotación y comienza la pausa
                  rotationActive = false;
                  lastTime = time; // Actualizar el tiempo
              }
          } else {
              // Pausa activa
              if (time - lastTime >= pauseDuration) {
                  // Termina la pausa y reinicia la rotación
                  rotationActive = true;
                  lastTime = time; // Reiniciar tiempo
              }
          }

          renderer.render(scene, camera);
      }

      animate();
  });

  camera.position.z = 10;
});
