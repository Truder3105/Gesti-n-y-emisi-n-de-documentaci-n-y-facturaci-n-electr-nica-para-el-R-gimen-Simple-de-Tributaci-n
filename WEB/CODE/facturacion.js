function calcularSubtotal(row) {
    const cantidad = row.cells[1].querySelector("input").value;
    const precio = row.cells[2].querySelector("input").value;
    const subtotal = cantidad * precio;
    row.cells[3].querySelector("input").value = subtotal;
    actualizarTotal();
}

function actualizarTotal() {
    const subtotalInputs = document.querySelectorAll("table tbody tr td input[placeholder='Subtotal']");
    let total = 0;
    subtotalInputs.forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    document.getElementById("total").value = total;
}

function generarFactura() {
    // Aquí debes escribir la lógica para generar la factura electrónica
    // Puedes crear un objeto con los datos de la factura y devolverlo en el formato necesario
    const cliente = document.getElementById("cliente").value;
    const fecha = document.getElementById("fecha").value;
    const productos = [];
    
    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach(row => {
        const nombre = row.cells[0].querySelector("input").value;
        const cantidad = row.cells[1].querySelector("input").value;
        const precio = row.cells[2].querySelector("input").value;
        const subtotal = row.cells[3].querySelector("input").value;

        if (nombre && cantidad && precio && subtotal) {
            productos.push({
                nombre: nombre,
                cantidad: cantidad,
                precio: precio,
                subtotal: subtotal
            });
        }
    });

    const total = document.getElementById("total").value;

    const factura = {
        cliente: cliente,
        fecha: fecha,
        productos: productos,
        total: total
    };

    return factura;
}

function enviarFactura() {
    // Generar la factura electrónica
    var factura = generarFactura();
  
    // Enviar la factura electrónica por correo electrónico
    var email = document.getElementById("email").value;
    var asunto = document.getElementById("asunto").value;
    var cuerpo = "La factura electrónica se adjunta.";
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/enviar-factura", true);
    xhr.setRequestHeader("Content-Type", "application/json");
  
    var data = JSON.stringify({
        factura: factura,
        email: email,
        asunto: asunto,
        cuerpo: cuerpo
    });
  
    xhr.send(data);
}
