const pages = ["Home","About","Menu","Gallery","Reservation","Contact"];
const foodImages = [
  "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1000&q=85"
];
const dishes = [
  {name:"Margherita Pizza",category:"Pizza",price:"$14.90",description:"Tomato, mozzarella, basil",image:foodImages[0]},
  {name:"Alfredo Pasta",category:"Pasta",price:"$16.90",description:"Parmesan cream, fettuccine",image:foodImages[1]},
  {name:"Lasagna Classico",category:"Main Course",price:"$17.90",description:"Slow cooked ragù",image:foodImages[2]},
  {name:"Caesar Salad",category:"Salad",price:"$12.00",description:"Crisp greens, parmesan",image:foodImages[4]},
  {name:"Tiramisu",category:"Dessert",price:"$9.50",description:"Espresso, mascarpone",image:foodImages[3]},
  {name:"Panna Cotta",category:"Dessert",price:"$8.90",description:"Vanilla cream, berry coulis",image:foodImages[5]}
];
const categories = ["All","Pizza","Pasta","Salad","Main Course","Dessert"];

function dishCard(item){
  return `<article class="dish-card"><div class="dish-image"><img src="${item.image}" alt="${item.name}" loading="lazy"><span class="price-pill">${item.price}</span></div><div class="dish-content"><div><h3>${item.name}</h3><p>${item.description}</p></div><button class="favorite" aria-label="Add ${item.name} to favorites" title="Favorite">♡</button></div></article>`;
}
document.querySelector("#signature-grid").innerHTML = dishes.slice(0,3).map(dishCard).join("");
const menuFilters = document.querySelector("#menu-filters");
const menuGrid = document.querySelector("#menu-grid");
function renderMenu(category="All"){
  menuFilters.innerHTML = categories.map(c=>`<button class="${c===category?"active":""}" data-category="${c}">${c}</button>`).join("");
  menuGrid.innerHTML = dishes.filter(d=>category==="All"||d.category===category).map(dishCard).join("");
}
renderMenu();
menuFilters.addEventListener("click",event=>{
  const button=event.target.closest("[data-category]");
  if(button) renderMenu(button.dataset.category);
});
const galleryImages = [...foodImages,...foodImages];
const galleryGrid = document.querySelector("#gallery-grid");
galleryGrid.innerHTML = galleryImages.map((src,i)=>`<button class="gallery-tile" data-image="${src}" aria-label="Open gallery photo ${i+1}"><img src="${src}" alt="The Italia gallery photo ${i+1}" loading="lazy"></button>`).join("");
const lightbox=document.querySelector("#lightbox");
const lightboxImg=lightbox.querySelector("img");
galleryGrid.addEventListener("click",event=>{
  const tile=event.target.closest("[data-image]");
  if(!tile)return;
  lightboxImg.src=tile.dataset.image;
  lightbox.hidden=false;
});
function closeLightbox(){lightbox.hidden=true;lightboxImg.src="";}
lightbox.addEventListener("click",event=>{if(event.target===lightbox||event.target.closest(".lightbox-close"))closeLightbox();});
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeLightbox();});

function showPage(page){
  const selected=pages.includes(page)?page:"Home";
  document.querySelectorAll("[data-view]").forEach(section=>section.hidden=section.dataset.view!==selected);
  document.querySelectorAll(".nav-link").forEach(button=>button.classList.toggle("active",button.dataset.page===selected));
  document.querySelector(".main-nav").classList.remove("open");
  document.querySelector(".mobile-menu").setAttribute("aria-expanded","false");
  window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("click",event=>{
  const target=event.target.closest("[data-page]");
  if(!target)return;
  event.preventDefault();
  showPage(target.dataset.page);
});
document.querySelector(".mobile-menu").addEventListener("click",()=>{
  const nav=document.querySelector(".main-nav");
  const open=nav.classList.toggle("open");
  document.querySelector(".mobile-menu").setAttribute("aria-expanded",String(open));
});
document.querySelector(".footer-nav").innerHTML=pages.map(p=>`<button data-page="${p}">${p}</button>`).join("");

function handleDemoForm(formId,message){
  const form=document.getElementById(formId);
  if(!form)return;
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const output=form.querySelector(".form-message");
    output.textContent=message;
    form.reset();
  });
}
handleDemoForm("reservation-form","Thank you! Your reservation request has been received. This demo form is not connected to a booking backend.");
handleDemoForm("contact-form","Thank you! Your message has been received. This demo form is not connected to an email service.");

document.querySelectorAll(".favorite").forEach(button=>button.addEventListener("click",()=>{
  button.textContent=button.textContent==="♡"?"♥":"♡";
  button.style.color=button.textContent==="♥"?"#971B24":"";
}));
