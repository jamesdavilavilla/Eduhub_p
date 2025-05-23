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


const btnAddDocente=document.getElementById('btnAddDocente');
const modalAdd=document.getElementById('modalAddDocente');
const modalSuccess=document.getElementById('modalSuccess');
const btnCancelAdd=document.getElementById('btnCancelAdd');
const btnSuccessOk=document.getElementById('btnSuccessOk');
const formAdd=document.getElementById('formAddDocente');
const tbody=document.getElementById('tbodyDocentes');

btnAddDocente.addEventListener('click',()=>{
  modalAdd.classList.remove('hidden');
});
btnCancelAdd.addEventListener('click',()=>modalAdd.classList.add('hidden'));
btnSuccessOk.addEventListener('click',()=>modalSuccess.classList.add('hidden'));

formAdd.addEventListener('submit',e=>{
  e.preventDefault();
  const nombre=document.getElementById('inpNombre').value.trim();
  const apellido=document.getElementById('inpApellido').value.trim();
  const correo=document.getElementById('inpCorreo').value.trim();
  const estadoEl='<span style="background:#c6f6d5;color:#256029;padding:4px 10px;border-radius:12px;font-size:0.8rem;">Activo</span>';
  const row=document.createElement('tr');
  row.innerHTML=`<td>${nombre} ${apellido}</td><td>${correo}</td><td>${estadoEl}</td><td><button class='btn-secondary'>Ver</button></td>`;
  tbody.appendChild(row);
  modalAdd.classList.add('hidden');
  modalSuccess.classList.remove('hidden');
  formAdd.reset();
});