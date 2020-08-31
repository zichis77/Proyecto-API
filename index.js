const app = require('./src/app');
const bodyParser = require('body-parser');

const {Router} = require('express');
const router = Router();

module.exports = router;

const port = process.env.PORT || 8080;

async function main(){
    await app.listen(port);
    console.log('El servidor se está ejecutando en el puerto ' + port)
}

main();
//app.listen(port, () => {
//    console.log("El servidor está inicializado en el puerto " + port);
//   });


   let usuario = {
    nombre:'',
    apellido: ''
   };
   let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
   };
   app.get('/', function(req, res) {
    respuesta = {
     error: true,
     codigo: 200,
     mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
   });
   app.route('/usuario')
    .get(function (req, res) {
     respuesta = {
      error: false,
      codigo: 200,
      mensaje: ''
     };
     if(usuario.nombre === '' || usuario.apellido === '') {
      respuesta = {
       error: true,
       codigo: 501,
       mensaje: 'El usuario no ha sido creado'
      };
     } else {
      respuesta = {
       error: false,
       codigo: 200,
       mensaje: 'respuesta del usuario',
       respuesta: usuario
      };
     }
     res.send(respuesta);
    })
    .post(function (req, res) {
     if(!req.body.nombre || !req.body.apellido) {
      respuesta = {
       error: true,
       codigo: 502,
       mensaje: 'El campo nombre y apellido son requeridos'
      };
     } else {
      if(usuario.nombre !== '' || usuario.apellido !== '') {
       respuesta = {
        error: true,
        codigo: 503,
        mensaje: 'El usuario ya fue creado previamente'
       };
      } else {
       usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
       };
       respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario creado',
        respuesta: usuario
       };
      }
     }
     
     res.send(respuesta);
    })
    .put(function (req, res) {
     if(!req.body.nombre || !req.body.apellido) {
      respuesta = {
       error: true,
       codigo: 502,
       mensaje: 'El campo nombre y apellido son requeridos'
      };
     } else {
      if(usuario.nombre === '' || usuario.apellido === '') {
       respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'El usuario no ha sido creado'
       };
      } else {
       usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
       };
       respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario actualizado',
        respuesta: usuario
       };
      }
     }
     
     res.send(respuesta);
    })
    .delete(function (req, res) {
     if(usuario.nombre === '' || usuario.apellido === '') {
      respuesta = {
       error: true,
       codigo: 501,
       mensaje: 'El usuario no ha sido creado'
      };
     } else {
      respuesta = {
       error: false,
       codigo: 200,
       mensaje: 'Usuario eliminado'
      };
      usuario = { 
       nombre: '', 
       apellido: '' 
      };
     }
     res.send(respuesta);
    });
   app.use(function(req, res, next) {
    respuesta = {
     error: true, 
     codigo: 404, 
     mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
   });