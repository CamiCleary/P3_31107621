const db = require ('../database/conection');

module.exports = {
    //Registro de clientes
    registroclientes(email, password1, preg_seg, resp_seg){
        return new Promise ((resolve, reject)=>{
            const sql= 'INSERT INTO clientes (email, password, preg_seg, resp_seg) VALUES (?, ?, ?, ?)'
            db.run (sql, [email, password1, preg_seg, resp_seg], (err, resultados)=>{
                if (err) reject (err);
                else resolve (resultados);
            });
        });
    },
    //Inicio de sesion clientes
    iniciosesionclientes(email){
        return new Promise ((resolve, reject)=>{
            const sql= 'SELECT id, password FROM clientes WHERE email = ?';
            db.all(sql, [email], ((err, resultados)=>{
                if (err) reject (err);
                else{ 
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve (resultados);}
            }))
        })
    },
    //Validar respuesta y pregunta de seguridad para la contraseña
    recuperarclave(pregunta, respuesta){
        return new Promise ((resolve, reject)=>{
            const sql= 'SELECT password from clientes WHERE preg_seg = ? AND resp_seg = ?'
            db.get (sql, [pregunta, respuesta], (err, resultados)=>{
                if (err) reject(err);
                else {
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve (resultados)};
            })
        })
    },
    //Factura de las comprar del cliente
    facturas(cantidad, total_pagado, fecha, ip_cliente, transaccion_id, descripcion, referencia, moneda_id, cliente_id, producto_id){
        return new Promise ((resolve, reject)=>{
            const sql= 'INSERT INTO compras (cantidad, total_pagado, fecha, ip_cliente, transaccion_id, descripcion, referencia, moneda_id, cliente_id, producto_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.run(sql, [cantidad, total_pagado, fecha, ip_cliente, transaccion_id, descripcion, referencia, moneda_id, cliente_id, producto_id], (err, resultados)=>{
                if (err) reject(err);
                else resolve (resultados);
            });
        })
    },
    //Muestra las compras realizadas por los clientes
    obtenerfacturas(){
        return new Promise ((resolve, reject)=>{
            const sql = 'SELECT compras.cantidad, compras.total_pagado, compras.fecha, compras.ip_cliente, compras.transaccion_id, compras.descripcion, compras.referencia, monedas.nomenclatura, clientes.email, productos.nombre FROM compras INNER JOIN monedas ON compras.moneda_id = monedas.id INNER JOIN clientes ON compras.cliente_id = clientes.id INNER JOIN productos ON compras.producto_id = productos.id';
            db.all(sql, (err,resultados)=>{
                if (err) reject (err);
                else resolve (resultados);
            });
        });
    },
    //Muestra los clientes registrados en el sistema
    obtenerclientes(){
        return new Promise ((resolve, reject)=>{
            const sql = 'SELECT * FROM clientes';
            db.all(sql, (err, resultados)=>{
                if (err) reject(err);
                else resolve (resultados);
            });
        });
    },
    //Hace el reporte de las 3 tablas (categorias, productos e imagenes)
    obteneradmin() {
        return new Promise ((resolve, reject) =>{
            const sql = 'SELECT productos.nombre AS productoNombre, productos.id, productos.precio, productos.codigo, productos.descripcion, productos.color, productos.material, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id';
            db.all (sql, (err, resultados) =>{
                if (err) reject (err);
                else {
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve (resultados)};
            });
        });
    },
    //Busqueda del producto por su id en las 3 tablas (categorias, productos e imagenes)
    obtenerPorId(id) {
        return new Promise ((resolve, reject) =>{
            const sql = 'SELECT productos.nombre AS productoNombre, productos.id, productos.precio, productos.codigo, productos.descripcion, productos.color, productos.material, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.id = ?';
            db.get (sql, [id], (err, resultados) =>{
                if (err) reject (err);
                else {
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve (resultados)};
            });
        });
    },
    //Busqueda usuarios por nombre
    obtenerprdPorNombre(nombre){
        return new Promise ((resolve, reject)=>{
            const sql = 'SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.color, productos.material, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.nombre = ?'
            db.all(sql, [nombre], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Busqueda usuarios por descripcion
    obtenerprdPorDescripcion(descripcion){
        return new Promise ((resolve, reject)=>{
            const sql = 'SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.color, productos.material, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.descripcion = ?'
            db.all(sql, [descripcion], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Filtrado categoria
    filtradoctg(categoria){
        return new Promise ((resolve, reject)=>{
            const sql='SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.color, productos.material, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE categorias.nombre = ?'
            db.all(sql, [categoria], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Filtrado color
    filtradocolor(color){
        return new Promise ((resolve, reject)=>{
            const sql='SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.color, productos.material, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.color = ?'
            db.all(sql, [color], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Filtrado material
    filtradomtrl(material){
        return new Promise ((resolve, reject)=>{
            const sql='SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.color, productos.material, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.material = ?'
            db.all(sql, [material], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Obtiene solamente la tabla de categorias
    obtenerctg(){
        return new Promise ((resolve, reject) =>{
            const sql = 'Select * FROM categorias';
            db.all (sql, (err, resultados) =>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Obtiene la tabla categorias por id
    obtenerctgPorId(id){
        return new Promise ((resolve, reject) => {
            const sql = 'SELECT * FROM categorias where id = ?'
            db.get(sql, [id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Agrega una categorias
    insertarctg(nombre){
        return new Promise ((resolve, reject) =>{
            const sql = 'INSERT INTO categorias (nombre) VALUES (?)';
            db.run(sql, [nombre], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Actualiza una categoria
    actualizarctg(nombre, id){
        return new Promise ((resolve, reject)=>{
            const sql = 'UPDATE categorias SET nombre = ? WHERE id = ?'
            db.run(sql, [nombre, id], (err) =>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    //Elimina una categoria
    eliminarctg(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'DELETE FROM categorias WHERE id = ?'
            db.run(sql, [id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    //Obtiene solamente la tabla productos
    obtenerprd(){
        return new Promise ((resolve, reject) =>{
            const sql = 'SELECT * from productos';
            db.all (sql, (err, resultados) =>{
                if (err) reject(err);
                else {
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve(resultados)};
            });
        });
    },
    //Obtiene la tabla productos por id
    obtenerprdPorId(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'SELECT * FROM productos WHERE id = ?';
            db.get(sql, [id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Agrega un nuevo producto
    insertarprd(nombre, precio, codigo, descripcion, color, material, categoria_id){
        return new Promise ((resolve, reject) =>{
            const sql = 'INSERT INTO productos (nombre, precio, codigo, descripcion, color, material, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.run (sql, [nombre, precio, codigo, descripcion, color, material, categoria_id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Actualiza un producto
    actualizarprd(nombre, precio, codigo, descripcion, color, material, id){
        return new Promise ((resolve, reject)=>{
            const sql = 'UPDATE productos SET nombre = ?, precio = ?, codigo = ?, descripcion = ?, color = ?, material = ? WHERE id = ?';
            db.run(sql, [nombre, precio, codigo, descripcion, color, material, id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    //Elimina un producto
    eliminarprd(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'DELETE FROM productos WHERE id = ?';
            db.run(sql, [id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });        
    },
    //Obtiene solamente la tabla imagenes
    obtenerimg(){
        return new Promise ((resolve, reject) =>{
            const sql = 'SELECT * FROM imagenes';
            db.all(sql, (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Obtiene la tabla imagenes por id
    obtenerimgPorId(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'SELECT * FROM imagenes WHERE id = ?';
            db.get(sql, [id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Agrega una nueva imagen
    insertarimg(url, destacado, producto_id){
        return new Promise ((resolve, reject)=>{
            const sql = 'INSERT INTO imagenes (url, destacado, producto_id) VALUES (?, ?, ?)';
            db.run (sql, [url, destacado, producto_id], (err, resultados) =>{
                if (err) reject(err);
                else {
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve(resultados)};
            });
        });
    },
    //Actualiza una imagen
    actualzarimg(url, destacado, id){
        return new Promise ((resolve, reject)=>{
            const sql = 'UPDATE imagenes SET url = ?, destacado = ? WHERE id = ?';
            db.run (sql, [url, destacado, id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    //Borra una imagen
    eliminarimg(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'DELETE FROM imagenes WHERE id = ?';
            db.run(sql, [id], (err)=>{
                if (err) reject (err);
                else resolve();
            });
        });
    },
};