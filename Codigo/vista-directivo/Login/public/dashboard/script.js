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
const menuItems = document.querySelectorAll('.menu-item');
document.addEventListener("DOMContentLoaded", () => {
    const interfaceSection = document.getElementById("interface");
  
    // Estado inicial
    let tareasEntregadas = 8;
    let tareasPendientes = 4;
    let asistencias = 15;
    let faltas = 2;
  
    // Crear contenedor interactivo
    const contenedor = document.createElement("div");
    contenedor.innerHTML = `
      <!-- Tareas -->
      <div style="margin: 20px; background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h3 style="color: #0b2545;">Tareas</h3>
          <p>✅ Entregadas: <strong id="entregadas">${tareasEntregadas}</strong></p>
          <p>🕒 Pendientes: <strong id="pendientes">${tareasPendientes}</strong></p>
          <div style="margin-top: 10px;">
              <button id="add-entregada" style="margin-right: 10px;">➕ Entregada</button>
              <button id="add-pendiente">➕ Pendiente</button>
          </div>
      </div>
  
      <!-- Asistencia -->
      <div style="margin: 20px; background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h3 style="color: #0b2545;">Asistencia semanal</h3>
          <p>✔️ Asistencias: <strong id="asistencias">${asistencias}</strong></p>
          <p>❌ Faltas: <strong id="faltas">${faltas}</strong></p>
          <div style="margin-top: 10px;">
              <button id="add-asistencia" style="margin-right: 10px;">✔️ Añadir asistencia</button>
              <button id="remove-asistencia" style="margin-right: 10px;">➖ Quitar asistencia</button>
              <button id="add-falta" style="margin-right: 10px;">❌ Añadir falta</button>
              <button id="remove-falta">➖ Quitar falta</button>
          </div>
      </div>
    `;
    interfaceSection.appendChild(contenedor);
  
    // Funciones interactivas
    document.getElementById("add-entregada").addEventListener("click", () => {
      tareasEntregadas++;
      document.getElementById("entregadas").textContent = tareasEntregadas;
    });
  
    document.getElementById("add-pendiente").addEventListener("click", () => {
      tareasPendientes++;
      document.getElementById("pendientes").textContent = tareasPendientes;
    });
  
    document.getElementById("add-asistencia").addEventListener("click", () => {
      asistencias++;
      document.getElementById("asistencias").textContent = asistencias;
    });
  
    document.getElementById("remove-asistencia").addEventListener("click", () => {
      if (asistencias > 0) {
        asistencias--;
        document.getElementById("asistencias").textContent = asistencias;
      }
    });
  
    document.getElementById("add-falta").addEventListener("click", () => {
      faltas++;
      document.getElementById("faltas").textContent = faltas;
    });
  
    document.getElementById("remove-falta").addEventListener("click", () => {
      if (faltas > 0) {
        faltas--;
        document.getElementById("faltas").textContent = faltas;
      }
    });
  });