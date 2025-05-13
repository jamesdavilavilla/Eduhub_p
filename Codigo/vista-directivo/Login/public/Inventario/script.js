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


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModal = document.getElementById("closeModal");
  const formEquipo = document.getElementById("formEquipo");
  const tablaEquipos = document.getElementById("tabla-equipos");

  openModalBtn.onclick = () => {
    modal.style.display = "block";
  };

  closeModal.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  formEquipo.addEventListener("submit", function (e) {
    e.preventDefault();

    const descripcion = document.getElementById("descripcion").value;
    const marca = document.getElementById("marca").value;
    const serie = document.getElementById("serie").value;
    const patrimonio = document.getElementById("patrimonio").value;
    const sala = document.getElementById("sala").value;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${descripcion}</td>
      <td>${marca}</td>
      <td>${serie}</td>
      <td>${patrimonio}</td>
      <td><span class="badge">Activo</span></td>
      <td>
        <button class="btn-editar">Editar</button>
        <button class="btn-eliminar">Eliminar</button>
      </td>
    `;

    tablaEquipos.appendChild(row);
    modal.style.display = "none";
    formEquipo.reset();

    row.querySelector(".btn-eliminar").onclick = () => row.remove();

    row.querySelector(".btn-editar").onclick = () => {
      document.getElementById("descripcion").value = descripcion;
      document.getElementById("marca").value = marca;
      document.getElementById("serie").value = serie;
      document.getElementById("patrimonio").value = patrimonio;
      document.getElementById("sala").value = sala;
      row.remove();
      modal.style.display = "block";
    };
  });
});
