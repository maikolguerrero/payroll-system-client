import Swal from 'sweetalert2'

// Configuración común para modo oscuro
const darkTheme = {
    background: '#1e1e1e', // Fondo oscuro
    color: '#ffffff', // Texto blanco
    confirmButtonColor: "#008DEB", // Color del botón de confirmación
};

export const alertBasic = (message) => {
    Swal.fire({
        title: message,
        confirmButtonColor: darkTheme.confirmButtonColor,
        background: darkTheme.background,
        color: darkTheme.color,
    });
}

export const alertConfirm = (message) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 2000,
        background: darkTheme.background,
        color: darkTheme.color,
        didOpen: () => {
            Swal.getContainer().style.borderColor = darkTheme.confirmButtonColor;
        }
    });
}

export const alertError = (message) => {
    Swal.fire({
        position: "center",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 2000,
        background: darkTheme.background,
        color: darkTheme.color,
        didOpen: () => {
            Swal.getContainer().style.borderColor = '#ff4d4d'; // Color rojo para errores
        }
    });
}

export const alertInfo = (message) => {
    Swal.fire({
        position: "center",
        icon: "info",
        title: message,
        showConfirmButton: false,
        timer: 2000,
        background: darkTheme.background,
        color: darkTheme.color,
        didOpen: () => {
            Swal.getContainer().style.borderColor = '#17a2b8'; // Color azul para información
        }
    });
}
