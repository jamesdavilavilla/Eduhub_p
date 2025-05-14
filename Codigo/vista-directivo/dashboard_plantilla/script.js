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
document.addEventListener("DOMContentLoaded", () => {
    const tarjetas = [
      { valor: 7, texto: "Roles registrados", color: "#a0b4d6", icon: "bx bx-book-bookmark" },
      { valor: 62, texto: "Usuarios registrados", color: "#93c5c0", icon: "bx bx-user" },
      { valor: 3, texto: "Usuarios registrados", color: "#91d2b4", icon: "bx bx-grid-alt" },
      { valor: 12, texto: "Usuarios registrados", color: "#f2c087", icon: "bx bx-menu" },
      { valor: 5, texto: "Materias registradas", color: "#e38989", icon: "bx bx-notepad" },
      { valor: 0, texto: "Administrativos registrados", color: "#f4f4f4", icon: "bx bx-group" },
      { valor: 25, texto: "Docentes registrados", color: "#999", icon: "bx bx-id-card" },
      { valor: 56, texto: "Estudiantes registrados", color: "#8baee8", icon: "bx bx-user-circle" }
    ];
  
    const contenedor = document.getElementById("cards-dashboard");
  
    tarjetas.forEach((t) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.backgroundColor = t.color;
  
      card.innerHTML = `
        <i class="${t.icon}"></i>
        <h3>${t.valor}</h3>
        <p>${t.texto}</p>
        <button>Más información</button>
      `;
  
      contenedor.appendChild(card);
    });
  });
  
