// script.js

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
      if (isActive) {
        subMenu.style.height = `${subMenu.scrollHeight + 6}px`;
        subMenu.style.padding = '0.2rem 0';
      } else {
        subMenu.style.height = '0';
        subMenu.style.padding = '0';
      }
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

// ✅ Mostrar/Ocultar formularios
function mostrarFormulario(id) {
    const forms = ['form-curso', 'form-editar-curso'];
    forms.forEach(formId => {
      document.getElementById(formId).style.display = formId === id ? 'block' : 'none';
    });
  }
  

let cursos = [
    { id: 1, nombre: 'Matemáticas', profesor: 'Juan', miembros: ['Ana', 'Luis'] },
    { id: 2, nombre: 'Historia', profesor: 'María', miembros: ['Carlos', 'Lucía'] }
  ];
  
  function mostrarCursos() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    cursos.forEach(curso => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${curso.nombre}</td>
        <td>${curso.profesor}</td>
        <td>${curso.miembros.join(', ')}</td>
        <td>
          <button class="accion-btn" onclick="editarCurso(${curso.id})">✏️ Editar</button>
          <button class="accion-btn" onclick="eliminarCurso(${curso.id})" style="background:#dc3545;">🗑️ Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  function editarCurso(id) {
    const curso = cursos.find(c => c.id === id);
    if (!curso) return;
  
    document.getElementById('editar-id-curso').value = curso.id;
    document.getElementById('editar-nombre').value = curso.nombre;
    document.getElementById('editar-profesor').value = curso.profesor;
    document.getElementById('editar-miembros').value = curso.miembros.join(', ');
  
    mostrarFormulario('form-editar-curso');
  }
  
  function actualizarCurso() {
    const id = parseInt(document.getElementById('editar-id-curso').value);
    const nombre = document.getElementById('editar-nombre').value;
    const profesor = document.getElementById('editar-profesor').value;
    const miembros = document.getElementById('editar-miembros').value.split(',').map(m => m.trim());
  
    const index = cursos.findIndex(c => c.id === id);
    if (index >= 0) {
      cursos[index] = { id, nombre, profesor, miembros };
      mostrarFormulario(null);
      mostrarCursos();
    }
  }
  
  function eliminarCurso(id) {
    cursos = cursos.filter(c => c.id !== id);
    mostrarCursos();
  }
    
  function mostrarFormulario(id) {
    cerrarModal();
    if (id) document.getElementById(id).style.display = 'block';
  }
  
  function cerrarModal() {
    ['form-curso', 'form-editar-curso'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal) modal.style.display = 'none';
    });
  }
  function guardarCurso() {
    const nombre = document.getElementById('nuevo-curso').value;
    const profesor = document.getElementById('nuevo-profesor').value;
    const miembros = document.getElementById('nuevo-miembros').value.split(',').map(m => m.trim());
  
    if (!nombre || !profesor) return alert("Completa todos los campos.");
  
    const id = Date.now(); // ID único
    cursos.push({ id, nombre, profesor, miembros });
    cerrarModal();
    mostrarCursos();
  }
    