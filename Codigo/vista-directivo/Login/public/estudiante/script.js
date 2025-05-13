const menusItemsDropDown = document.querySelectorAll('.menu-item-dropdown');
const menusItemsStatic = document.querySelectorAll('.menu-item-static');
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');
const sidebarBtn = document.getElementById('sidebar-btn');
const darkModeBtn = document.getElementById('dark-mode-btn');

darkModeBtn.addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode');
});

sidebarBtn.addEventListener('click',()=>{
    document.body.classList.toggle('sidebar-hidden');
});

menuBtn.addEventListener('click',()=>{
    sidebar.classList.toggle('minimize');
});

menusItemsDropDown.forEach((menuItem)=>{
    menuItem.addEventListener('click',()=>{
        const subMenu = menuItem.querySelector('.sub-menu');
        const isActive =  menuItem.classList.toggle('sub-menu-toggle');
        if(subMenu){
            if(isActive){
                subMenu.style.height = `${subMenu.scrollHeight + 6}px`;
                subMenu.style.padding = '0.2rem 0';
            }else{
                subMenu.style.height = '0';
                subMenu.style.padding = '0';
            }
        }
        menusItemsDropDown.forEach((item)=>{
            if(item !== menuItem){
                const otherSubmenu = item.querySelector('.sub-menu');
                if(otherSubmenu){
                    item.classList.remove('sub-menu-toggle');
                    otherSubmenu.style.height = '0';
                    otherSubmenu.style.padding = '0'; 
                }
            }
        });
    });
});

menusItemsStatic.forEach((menuItem)=>{
    menuItem.addEventListener('mouseenter',()=>{

        if(!sidebar.classList.contains('minimize')) return;

        menusItemsDropDown.forEach((item)=>{
            const otherSubmenu = item.querySelector('.sub-menu');
            if(otherSubmenu){
                item.classList.remove('sub-menu-toggle');
                otherSubmenu.style.height = '0';
                otherSubmenu.style.padding = '0'; 
            }
        });
    });
});

function checkWindowsSize(){
    sidebar.classList.remove('minimize');
}
checkWindowsSize();
window.addEventListener('resize',checkWindowsSize);


const btnAddestudiante=document.getElementById('btnAddestudiante');
const modalAdd=document.getElementById('modalAddestudiante');
const modalSuccess=document.getElementById('modalSuccess');
const btnCancelAdd=document.getElementById('btnCancelAdd');
const btnSuccessOk=document.getElementById('btnSuccessOk');
const formAdd=document.getElementById('formAddestudiante');
const tbody=document.getElementById('tbodyestudiante');

btnAddestudiante.addEventListener('click',()=>{
  modalAdd.classList.remove('hidden');
});
btnCancelAdd.addEventListener('click',()=>modalAdd.classList.add('hidden'));
btnSuccessOk.addEventListener('click',()=>modalSuccess.classList.add('hidden'));

formAdd.addEventListener('submit', e => {
  e.preventDefault();
  const nombre = document.getElementById('inpNombre').value.trim();
  const apellido = document.getElementById('inpApellido').value.trim();
  const correo = document.getElementById('inpCorreo').value.trim();
  const estadoEl = '<span style="background:#c6f6d5;color:#256029;padding:4px 10px;border-radius:12px;font-size:0.8rem;">Activo</span>';

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${nombre} ${apellido}</td>
    <td>${correo}</td>
    <td>${estadoEl}</td>
    <td>
      <button class='btn-secondary btn-ver'>Ver</button>
      <button class='btn-primary btn-editar'>Editar</button>
      <button class='btn-secondary btn-eliminar'>Eliminar</button>
    </td>
  `;
  tbody.appendChild(row);

  modalAdd.classList.add('hidden');
  modalSuccess.classList.remove('hidden');
  formAdd.reset();
});




// Cambiar imagen de perfil
document.getElementById('fotoPerfil').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      document.getElementById('fotoEstudiante').src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
});
// Abrir modal con datos del estudiante (no editable)
tbody.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-secondary')) {
    const row = e.target.closest('tr');
    const nombre = row.children[0].textContent;
    const correo = row.children[1].textContent;

    document.getElementById('verNombre').textContent = nombre;
    document.getElementById('verCorreo').textContent = correo;
    document.getElementById('verCurso').textContent = '10°A'; // Simulado

    document.getElementById('modalDetalleEstudiante').classList.remove('hidden');
  }
});

// Cerrar modal
document.getElementById('btnCerrarDetalle').addEventListener('click', () => {
  document.getElementById('modalDetalleEstudiante').classList.add('hidden');
});

// Cambiar imagen de perfil
document.getElementById('fotoPerfil').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      document.getElementById('fotoEstudiante').src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
});
tbody.addEventListener('click', function (e) {
  const row = e.target.closest('tr');

  // VER
  if (e.target.classList.contains('btn-ver')) {
    const nombre = row.children[0].textContent;
    const correo = row.children[1].textContent;
    document.getElementById('verNombre').textContent = nombre;
    document.getElementById('verCorreo').textContent = correo;
    document.getElementById('verCurso').textContent = '10°A'; // Simulado
    document.getElementById('modalDetalleEstudiante').classList.remove('hidden');
  }

  // ELIMINAR
  if (e.target.classList.contains('btn-eliminar')) {
    if (confirm('¿Seguro que quieres eliminar este estudiante?')) {
      row.remove();
    }
  }

  // EDITAR
  if (e.target.classList.contains('btn-editar')) {
    const nombreCompleto = row.children[0].textContent.split(' ');
    const correo = row.children[1].textContent;

    document.getElementById('inpNombre').value = nombreCompleto[0] || '';
    document.getElementById('inpApellido').value = nombreCompleto[1] || '';
    document.getElementById('inpCorreo').value = correo;
    document.getElementById('inpPass').value = ''; // Vacio para editar manual

    modalAdd.classList.remove('hidden');

    // Al editar, eliminamos la fila vieja cuando se confirme
    formAdd.onsubmit = function (e) {
      e.preventDefault();
      const nuevoNombre = document.getElementById('inpNombre').value.trim();
      const nuevoApellido = document.getElementById('inpApellido').value.trim();
      const nuevoCorreo = document.getElementById('inpCorreo').value.trim();

      row.innerHTML = `
        <td>${nuevoNombre} ${nuevoApellido}</td>
        <td>${nuevoCorreo}</td>
        <td><span style="background:#c6f6d5;color:#256029;padding:4px 10px;border-radius:12px;font-size:0.8rem;">Activo</span></td>
        <td>
          <button class='btn-secondary btn-ver'>Ver</button>
          <button class='btn-primary btn-editar'>Editar</button>
          <button class='btn-secondary btn-eliminar'>Eliminar</button>
        </td>
      `;
      modalAdd.classList.add('hidden');
      modalSuccess.classList.remove('hidden');
      formAdd.reset();
      formAdd.onsubmit = null; // restaurar comportamiento
    };
  }
});
