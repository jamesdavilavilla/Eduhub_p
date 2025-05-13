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

document.addEventListener('scroll', () => {
    const body = document.querySelector('body');
    if (window.scrollY > 50) { // Cuando se haya desplazado 50px hacia abajo
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  });
  


function checkWindowsSize(){
    sidebar.classList.remove('minimize');
}


checkWindowsSize();
window.addEventListener('resize',checkWindowsSize);
 // Mostrar el modal al hacer clic en "Crear Post"
 document.getElementById("openModalBtn").onclick = function() {
    let modal = document.getElementById("crearPostModal");
    modal.style.display = "flex"; // Muestra el modal
    modal.classList.remove("hide"); // Asegúrate de eliminar la clase hide
}

// Cerrar el modal al hacer clic en la "X"
document.getElementById("closeModalBtn").onclick = function() {
    let modal = document.getElementById("crearPostModal");
    modal.classList.add("hide"); // Aplica la animación de salida
    setTimeout(function() {
        modal.style.display = "none"; // Oculta el modal después de la animación
    }, 300); // Tiempo de espera para la animación
}

document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const crearPostModal = document.getElementById('crearPostModal');
    const publicarBtn = document.getElementById('publicarBtn');
    const textarea = crearPostModal.querySelector('textarea');
    const wrapper = document.querySelector('.comunicados-wrapper');
    const imagenInput = document.getElementById('imagenInput');

    let imagenSeleccionada = null;

    openModalBtn.addEventListener('click', () => {
      crearPostModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
      crearPostModal.style.display = 'none';
    });

    imagenInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        imagenSeleccionada = URL.createObjectURL(file);
      }
    });

    publicarBtn.addEventListener('click', () => {
      const contenido = textarea.value.trim();
      if (contenido === '') return;

      const nuevoPost = document.createElement('div');
      nuevoPost.style.cssText = 'background: var(--color-surface); padding: 1rem; border-radius: 12px; box-shadow: 0 2px 8px var(--shadow-border); max-width: 800px; margin-top: 1rem;';
      nuevoPost.innerHTML = `
        ${imagenSeleccionada ? `<img src="${imagenSeleccionada}" alt="Post image" style="width: 100%; border-radius: 10px; margin-bottom: 1rem;">` : ''}
        <p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5;">
          ${contenido.replace(/\n/g, '<br>')}
        </p>
        <div style="text-align: right; font-size: 0.75rem; color: var(--color-border); margin-top: 0.5rem;">Posteado ${new Date().toLocaleDateString()}</div>
      `;
      
      const insertAfter = wrapper.querySelector('.flex');
      insertAfter.insertAdjacentElement('afterend', nuevoPost);

      alert('✅ Publicación exitosa');

      // Reset modal
      crearPostModal.style.display = 'none';
      textarea.value = '';
      imagenInput.value = '';
      imagenSeleccionada = null;
    });
  });

