// -------------------- Sidebar + Theme --------------------
const menusItemsDropDown = document.querySelectorAll('.menu-item-dropdown');
const menusItemsStatic = document.querySelectorAll('.menu-item-static');
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');
const sidebarBtn = document.getElementById('sidebar-btn');
const darkModeBtn = document.getElementById('dark-mode-btn');

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

sidebarBtn.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-hidden');
});

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('minimize');
});

menusItemsDropDown.forEach((menuItem) => {
    menuItem.addEventListener('click', () => {
        const subMenu = menuItem.querySelector('.sub-menu');
        const isActive = menuItem.classList.toggle('sub-menu-toggle');
        if (subMenu) {
            subMenu.style.height = isActive ? `${subMenu.scrollHeight + 6}px` : '0';
            subMenu.style.padding = isActive ? '0.2rem 0' : '0';
        }
        menusItemsDropDown.forEach((item) => {
            if (item !== menuItem) {
                const otherSubmenu = item.querySelector('.sub-menu');
                if (otherSubmenu) {
                    item.classList.remove('sub-menu-toggle');
                    otherSubmenu.style.height = '0';
                    otherSubmenu.style.padding = '0';
                }
            }
        });
    });
});

menusItemsStatic.forEach((menuItem) => {
    menuItem.addEventListener('mouseenter', () => {
        if (!sidebar.classList.contains('minimize')) return;
        menusItemsDropDown.forEach((item) => {
            const otherSubmenu = item.querySelector('.sub-menu');
            if (otherSubmenu) {
                item.classList.remove('sub-menu-toggle');
                otherSubmenu.style.height = '0';
                otherSubmenu.style.padding = '0';
            }
        });
    });
});

function checkWindowsSize() {
    sidebar.classList.remove('minimize');
}
checkWindowsSize();
window.addEventListener('resize', checkWindowsSize);


// -------------------- Modal Helpers --------------------
function showModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function hideModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // mismo tiempo que en CSS
}


// -------------------- Agregar Aula --------------------
function openAddModal() {
    showModal('addModal');
}

document.getElementById('formAddAula').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('addNombreAula').value.trim();
    const capacidad = document.getElementById('addCapacidad').value.trim();

    if (!nombre || !capacidad) return;

    const tbody = document.querySelector('.aulas-table tbody');
    const newRow = document.createElement('tr');
    const newId = tbody.rows.length + 101;

    newRow.innerHTML = `
        <td>${newId}</td>
        <td>${nombre}</td>
        <td>${capacidad}</td>
        <td>
            <button class="btn-table btn-edit">Editar</button>
            <button class="btn-table btn-delete">Eliminar</button>
        </td>
    `;

    tbody.appendChild(newRow);
    document.getElementById('formAddAula').reset();
    hideModal('addModal');
});

// -------------------- Editar y Eliminar Aulas --------------------
let currentRowToEdit = null;

document.querySelector('.aulas-table tbody').addEventListener('click', function (e) {
    const row = e.target.closest('tr');
    if (!row) return;

    // Eliminar
    if (e.target.classList.contains('btn-delete')) {
        row.classList.add('fade-out');
        setTimeout(() => row.remove(), 500);
    }

    // Editar
    if (e.target.classList.contains('btn-edit')) {
        currentRowToEdit = row;
        const nombre = row.children[1].textContent;
        const capacidad = row.children[2].textContent;

        document.getElementById('nombreAula').value = nombre;
        document.getElementById('capacidad').value = capacidad;

        showModal('editModal');
    }
});

document.querySelector('#editModal form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!currentRowToEdit) return;

    const nuevoNombre = document.getElementById('nombreAula').value.trim();
    const nuevaCapacidad = document.getElementById('capacidad').value.trim();

    currentRowToEdit.children[1].textContent = nuevoNombre;
    currentRowToEdit.children[2].textContent = nuevaCapacidad;

    hideModal('editModal');
});
