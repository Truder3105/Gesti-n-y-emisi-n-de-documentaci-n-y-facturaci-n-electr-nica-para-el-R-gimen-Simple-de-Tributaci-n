document.addEventListener('DOMContentLoaded', () => {
    let facturas = [];  // Array para almacenar las facturas
    let clientes = [];  // Array para almacenar los clientes

    // Función para obtener los clientes desde el servidor (base de datos)
    function obtenerClientes() {
        fetch('http://localhost:3001/clientes')  // Asumiendo que tu backend está corriendo en el puerto 3001
            .then(response => response.json())
            .then(data => {
                clientes = data;  // Almacenar los clientes obtenidos
                llenarOpcionesClientes();  // Llenar el select con los clientes
                actualizarClientes();  // Actualizar la tabla de clientes
            })
            .catch(error => console.error('Error al obtener clientes:', error));
    }

    // Función para llenar el select de clientes en el formulario de facturas
    function llenarOpcionesClientes() {
        const selectCliente = document.getElementById('cliente');
        selectCliente.innerHTML = '<option value="">Seleccione un cliente</option>';  // Resetear las opciones

        // Llenar el select con los clientes registrados
        clientes.forEach((cliente) => {
            const option = document.createElement('option');
            option.value = cliente.id;  // Usar el ID del cliente como valor (proveniente de la base de datos)
            option.text = `${cliente.nombre} - ${cliente.nit}`;  // Texto visible en el select
            selectCliente.appendChild(option);
        });
    }

    // Evento para manejar el formulario de agregar cliente
    const clienteForm = document.getElementById('cliente-form');
    clienteForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevenir la recarga de la página al enviar el formulario

        // Obtener los datos del formulario de clientes
        const nombre = document.getElementById('nombre-cliente').value;
        const nit = document.getElementById('nit-cliente').value;
        const direccion = document.getElementById('direccion-cliente').value;

        // Validar que todos los campos estén llenos
        if (!nombre || !nit || !direccion) {
            alert('Por favor, llene todos los campos.');
            return;
        }

        // Enviar el nuevo cliente al servidor para que se guarde en la base de datos
        fetch('http://localhost:3001/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, nit, direccion })
        })
        .then(response => response.json())
        .then(data => {
            alert('Cliente agregado correctamente');
            obtenerClientes();  // Obtener nuevamente los clientes actualizados desde la base de datos
        })
        .catch(error => console.error('Error al agregar cliente:', error));

        // Limpiar el formulario de cliente
        clienteForm.reset();
    });

    // Actualizar la tabla de clientes y el select de clientes
    function actualizarClientes() {
        const tablaClientes = document.getElementById('tabla-clientes').getElementsByTagName('tbody')[0];
        tablaClientes.innerHTML = '';  // Limpiar la tabla

        // Agregar cada cliente a la tabla
        clientes.forEach((cliente, index) => {
            let row = tablaClientes.insertRow();
            row.innerHTML = `<td>${cliente.nombre}</td><td>${cliente.nit}</td><td>${cliente.direccion}</td>
                             <td><button onclick="eliminarCliente(${cliente.id})">Eliminar</button></td>`;
        });

        // Actualizar el contador de clientes en el Dashboard
        document.getElementById('total-clientes').innerText = clientes.length;
    }

    // Función para eliminar un cliente
    window.eliminarCliente = function(id) {
        // Enviar solicitud para eliminar cliente en el servidor
        fetch(`http://localhost:3001/clientes/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Cliente eliminado correctamente');
                obtenerClientes();  // Actualizar la lista de clientes
            } else {
                alert('Error al eliminar cliente');
            }
        })
        .catch(error => console.error('Error al eliminar cliente:', error));
    };

    // Agregar nueva factura
    const facturaForm = document.getElementById('factura-form');
    facturaForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevenir recarga de la página

        // Obtener los datos del formulario de facturas
        const cliente_id = document.getElementById('cliente').value;
        const producto = document.getElementById('producto').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const precio = parseFloat(document.getElementById('precio').value);

        // Validar que todos los campos estén llenos
        if (!cliente_id || !producto || isNaN(cantidad) || isNaN(precio) || cantidad <= 0 || precio < 0) {
            alert('Por favor, llene todos los campos correctamente.');
            return;
        }

        const total = cantidad * precio;

        // Enviar la nueva factura al servidor para que se guarde en la base de datos
        fetch('http://localhost:3001/facturas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cliente_id, producto, cantidad, precio, total })
        })
        .then(response => response.json())
        .then(data => {
            alert('Factura agregada correctamente');
            obtenerFacturas();  // Obtener nuevamente las facturas actualizadas desde la base de datos
        })
        .catch(error => console.error('Error al agregar factura:', error));

        // Limpiar el formulario de factura
        facturaForm.reset();
    });

    // Obtener facturas del servidor (base de datos)
    function obtenerFacturas() {
        fetch('http://localhost:3001/facturas')
            .then(response => response.json())
            .then(data => {
                facturas = data;
                actualizarFacturas();
            })
            .catch(error => console.error('Error al obtener facturas:', error));
    }

    // Actualizar la tabla de facturas
    function actualizarFacturas() {
        const tablaFacturas = document.getElementById('tabla-facturas').getElementsByTagName('tbody')[0];
        tablaFacturas.innerHTML = '';  // Limpiar la tabla de facturas

        // Agregar cada factura a la tabla
        facturas.forEach((factura, index) => {
            let row = tablaFacturas.insertRow();
            row.innerHTML = `
                <td>${factura.numeroFactura}</td>
                <td>${factura.cliente_nombre}</td>  <!-- Asegúrate de obtener el nombre del cliente con un JOIN -->
                <td>${factura.producto}</td>
                <td>$${factura.total.toFixed(2)}</td>
                <td><button onclick="eliminarFactura(${factura.id})">Eliminar</button> 
                    <button onclick="exportarXML(${factura.id})">Exportar XML</button></td>`;
        });

        // Actualizar el contador de facturas en el Dashboard
        document.getElementById('total-facturas').innerText = facturas.length;
    }

    // Función para eliminar una factura
    window.eliminarFactura = function(id) {
        // Enviar solicitud para eliminar factura en el servidor
        fetch(`http://localhost:3001/facturas/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Factura eliminada correctamente');
                obtenerFacturas();  // Actualizar la lista de facturas
            } else {
                alert('Error al eliminar factura');
            }
        })
        .catch(error => console.error('Error al eliminar factura:', error));
    };

    // Inicializar la página cargando clientes y facturas desde la base de datos
    obtenerClientes();
    obtenerFacturas();
});
