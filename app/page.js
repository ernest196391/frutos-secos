"use client";
import {useEffect,useMemo,useState} from "react";
import {products} from "../lib/catalog";
import Support from "./Support";
import {tenant,storeKey} from "../lib/tenant";
import {whatsappUrl} from "../lib/commerce.mjs";

const realCategories=[...new Set(products.map(p=>p.c))];
const categories=["Todos",...realCategories];
const previews=Array.isArray(tenant.categoryPreview)?tenant.categoryPreview:[];
const CART=storeKey("cart");
const money=n=>new Intl.NumberFormat(tenant.locale).format(n)+" "+tenant.currency;
const normalizeSearch=value=>String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9ñ]+/g," ").trim();
const searchTokens=value=>normalizeSearch(value).split(/\s+/).filter(Boolean).map(t=>t.length>3&&t.endsWith("s")?t.slice(0,-1):t);
const mapUrl=tenant.address?"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(tenant.address):null;
const waUrl=whatsappUrl(tenant.whatsapp,"Hola, necesito ayuda con "+tenant.name+".");

function Icon({name,...props}){
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {name==="menu"?<path d="M4 6h16M4 12h16M4 18h16"/>:
    name==="cart"?<><path d="M3 3h2l3 12h11l2-9H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>:
    name==="search"?<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>:
    name==="home"?<><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>:
    name==="spark"?<><path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z"/><path d="m19 14 .8 1.7L22 17l-2.2 1.3L19 20l-.8-1.7L16 17l2.2-1.3L19 14Z"/></>:
    name==="instagram"?<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>:
    <><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></>}
  </svg>
}

export default function Home(){
  const [menu,setMenu]=useState(false);
  const [notice,setNotice]=useState("");
  const [hydrated,setHydrated]=useState(false);
  const [cat,setCat]=useState("Todos");
  const [query,setQuery]=useState("");
  const [sort,setSort]=useState("relevance");
  const [cart,setCart]=useState({});
  const [drawer,setDrawer]=useState(false);
  const [detail,setDetail]=useState(null);
  const [activeSuggestion,setActiveSuggestion]=useState(-1);

  useEffect(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem(CART)||"{}");
      const clean={};
      for(const p of products){
        const q=saved[p.id];
        if(Number.isInteger(q)&&q>0)clean[p.id]=Math.min(q,99);
      }
      setCart(clean);
    }catch{}
    setHydrated(true);
  },[]);

  useEffect(()=>{if(hydrated)try{localStorage.setItem(CART,JSON.stringify(cart))}catch{}},[cart,hydrated]);
  useEffect(()=>{if(!notice)return;const t=setTimeout(()=>setNotice(""),4200);return()=>clearTimeout(t)},[notice]);
  useEffect(()=>{
    const close=e=>{if(e.key==="Escape"){setMenu(false);setDrawer(false);setDetail(null)}};
    window.addEventListener("keydown",close);
    return()=>window.removeEventListener("keydown",close);
  },[]);

  const filtered=useMemo(()=>{
    const terms=searchTokens(query);
    const list=products.filter(x=>{
      if(cat!=="Todos"&&x.c!==cat)return false;
      if(!terms.length)return true;
      const haystack=searchTokens(x.n+" "+x.d+" "+x.c).join(" ");
      return terms.every(term=>haystack.includes(term));
    });
    if(sort==="price-asc") return [...list].sort((a,b)=>a.p-b.p);
    if(sort==="price-desc") return [...list].sort((a,b)=>b.p-a.p);
    if(sort==="name") return [...list].sort((a,b)=>a.n.localeCompare(b.n,"es"));
    return list;
  },[cat,query,sort]);

  const suggestions=useMemo(()=>query.trim().length<2?[]:products.filter(p=>{
    const terms=searchTokens(query);
    const haystack=searchTokens(p.n+" "+p.d+" "+p.c).join(" ");
    return terms.every(term=>haystack.includes(term));
  }).slice(0,6),[query]);
  const count=Object.values(cart).reduce((a,b)=>a+b,0);
  const total=products.reduce((a,p)=>a+(cart[p.id]||0)*p.p,0);

  function add(id){
    const product=products.find(p=>p.id===id);
    if(!product)return;
    setCart(x=>({...x,[id]:Math.min((x[id]||0)+1,99)}));
    setNotice(product.n+" añadido al carrito");
  }
  function change(id,v){
    setCart(x=>{const n={...x};if(v<=0)delete n[id];else n[id]=Math.min(v,99);return n});
  }
  function goSearch(){
    document.querySelector(".premiumSearch input")?.focus();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  const categoryCards=realCategories.length
    ? realCategories.map(name=>({name,image:products.find(p=>p.c===name)?.img||"",live:true}))
    : previews.map(x=>({...x,live:false}));

  return <div className="coloStore">
    <header className="premiumHeader">
      <div className="premiumHeaderRow">
        <button className="premiumIconButton" onClick={()=>setMenu(v=>!v)} aria-label={menu?"Cerrar menú":"Abrir menú"} aria-expanded={menu}>
          <Icon name="menu"/>
        </button>
        <a className="premiumLogo" href="/" aria-label={tenant.name+", inicio"}>
          <img src={tenant.brand.logo} alt={tenant.name}/>
        </a>
        <button className="premiumCartButton" onClick={()=>setDrawer(true)} aria-label={"Abrir carrito, "+count+" productos"}>
          <Icon name="cart"/><span>{count}</span>
        </button>
      </div>

      <div className="premiumSearchWrap"><label className="premiumSearch">
        <Icon name="search"/>
        <input aria-label="Buscar productos" role="combobox" aria-autocomplete="list" aria-expanded={suggestions.length>0} aria-controls="colo-search-suggestions" value={query} onChange={e=>{setQuery(e.target.value);setCat("Todos");setActiveSuggestion(-1)}} onKeyDown={e=>{if(e.key==="ArrowDown"){e.preventDefault();setActiveSuggestion(x=>Math.min(x+1,suggestions.length-1))}if(e.key==="ArrowUp"){e.preventDefault();setActiveSuggestion(x=>Math.max(x-1,0))}if(e.key==="Escape"){setQuery("");setActiveSuggestion(-1)}if(e.key==="Enter"&&suggestions.length){e.preventDefault();const p=suggestions[Math.max(activeSuggestion,0)];setDetail(p);setQuery(p.n);setActiveSuggestion(-1)}}} placeholder="¿Qué estás buscando?" autoComplete="off"/>
        {query&&<button type="button" onClick={()=>{setQuery("");setActiveSuggestion(-1)}} aria-label="Limpiar búsqueda">×</button>}
      </label>
      {suggestions.length>0&&<ul id="colo-search-suggestions" className="coloSearchSuggestions" role="listbox">{suggestions.map((p,i)=><li key={p.id} role="option" aria-selected={activeSuggestion===i} className={activeSuggestion===i?"active":""}><button type="button" onClick={()=>{setDetail(p);setQuery(p.n);setActiveSuggestion(-1)}}><img src={p.img} alt=""/><span><b>{p.n}</b><small>{p.d||p.c}</small></span><strong>{money(p.p)}</strong></button></li>)}</ul>}
      </div>

      {menu&&<nav className="premiumMenu" aria-label="Menú principal">
        <a href="#inicio" onClick={()=>setMenu(false)}>Inicio</a>
        <a href="#categorias" onClick={()=>setMenu(false)}>Categorías</a>
        <a href="#productos" onClick={()=>setMenu(false)}>Productos</a>
        <a href="#contacto" onClick={()=>setMenu(false)}>Contacto</a>
      </nav>}
    </header>

    <main id="inicio">
      <section className="premiumHero" aria-labelledby="hero-title">
        <div className="premiumHeroPattern" aria-hidden="true"/>
        {tenant.hero.image&&<img className="premiumHeroPhoto" src={tenant.hero.image} srcSet={tenant.hero.imageSmall?tenant.hero.imageSmall+" 720w, "+tenant.hero.image+" 1024w":undefined} sizes="(min-width: 1204px) 1180px, 100vw" alt={tenant.hero.imageAlt||tenant.hero.alt} fetchPriority="high" decoding="async"/>}
        <div className="premiumHeroShade" aria-hidden="true"/>
        <div className="premiumHeroCopy">
          <h1 id="hero-title">{tenant.hero.line1}<br/><strong>{tenant.hero.line2}</strong></h1>
          <p>{tenant.hero.subtitle}</p>
          <a href="#productos" className="premiumHeroCta">{tenant.hero.cta}<span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section id="categorias" className="premiumSection premiumCategories">
        <div className="premiumSectionHead">
          <div><h2>¿Qué buscas hoy?</h2></div>
          {realCategories.length>0&&<button onClick={()=>setCat("Todos")}>Ver todo</button>}
        </div>
        <div className="premiumCategoryFilters" aria-label="Filtrar productos">
          {categories.map(name=><button key={name} className={cat===name?"active":""} onClick={()=>setCat(name)}>{name}</button>)}
        </div>
        <div className="premiumCategoryRail">
          {categoryCards.map((item,index)=>{
            const fallbackClass="tone"+(index%4+1);
            return <button
              key={item.name}
              className={"premiumCategoryCard "+fallbackClass+(cat===item.name?" selected":"")}
              onClick={()=>{if(!item.live)return;setCat(item.name);document.querySelector("#productos")?.scrollIntoView({behavior:"smooth"})}}
              disabled={!item.live}
              aria-label={item.live?"Ver "+item.name:item.name+", vista previa de categoría"}
            >
              {item.image&&<img src={item.image} alt="" loading="lazy"/>}
              <span className="premiumCategoryOverlay"/>
              <span className="premiumCategoryPattern"/>
              <b>{item.name}</b>
              {!item.live&&<small>Vista previa</small>}
            </button>
          })}
        </div>
      </section>

      <section id="productos" className="premiumSection premiumCatalog">
        <div className="premiumSectionHead">
          <div><h2>{query?"Encontramos esto":cat==="Todos"?"Elige lo que te gusta":cat}</h2></div>
          {products.length>0&&<div className="catalogTools"><small>{filtered.length} {filtered.length===1?"producto":"productos"}</small><select aria-label="Ordenar productos" value={sort} onChange={e=>setSort(e.target.value)}><option value="relevance">Orden recomendado</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option><option value="name">Nombre A–Z</option></select></div>}
        </div>

        {filtered.length>0?
          <div className="premiumProductGrid">{filtered.map(p=>
            <article className="premiumProductCard" key={p.id}>
              <button className="premiumProductPhoto" onClick={()=>setDetail(p)} aria-label={"Ver "+p.n}>
                <img src={p.img} alt={p.n} loading="lazy"/>
              </button>
              <div className="premiumProductBody">
                <button className="premiumProductName" onClick={()=>setDetail(p)}>{p.n}</button>
                <p>{p.d}</p>
                <div className="premiumProductBottom">
                  <strong>{money(p.p)}</strong>
                  <button onClick={()=>add(p.id)} aria-label={"Añadir "+p.n}>Añadir</button>
                </div>
              </div>
            </article>
          )}</div>
          :
          <div className="premiumCatalogEmpty">
            <img src={tenant.brand.isotype} alt="" aria-hidden="true"/>
            <div>
              <h3>No encontramos ese producto</h3>
              <p>Prueba con otro nombre o vuelve a ver todos.</p>
            </div>
          </div>
        }
      </section>
    </main>

    <footer id="contacto" className="premiumFooter">
      <div className="premiumFooterBrand">
        <img src={tenant.brand.logo} alt={tenant.name}/>
        <p>{tenant.tagline}</p>
      </div>
      <div className="premiumFooterMeta">
        {tenant.addressLines?.length>0&&<p>{tenant.addressLines.map((l,i)=><span key={i}>{l}{i<tenant.addressLines.length-1?<br/>:null}</span>)}</p>}
        {tenant.hours&&<p>{tenant.hours}</p>}
        {mapUrl&&<a href={mapUrl} target="_blank" rel="noopener noreferrer">Ver ubicación →</a>}
        {waUrl&&<a href={waUrl} target="_blank" rel="noopener noreferrer">WhatsApp →</a>}
        {tenant.instagram&&<a href={tenant.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram"/> Instagram</a>}
      </div>
      <small>{tenant.footerNote}</small>
    </footer>

    <nav className="premiumBottomNav" aria-label="Navegación rápida">
      <a href="#inicio"><Icon name="home"/><span>Inicio</span></a>
      <button onClick={goSearch}><Icon name="search"/><span>Buscar</span></button>
      <button onClick={()=>setDrawer(true)}><span className="navCartIcon"><Icon name="cart"/>{count>0&&<b>{count}</b>}</span><span>Carrito</span></button>
      <button onClick={()=>document.querySelector(".assistantLaunch")?.click()}><Icon name="spark"/><span>Asistente</span></button>
    </nav>

    {notice&&<div className="cartNotice"><span role="status">{notice}</span><button onClick={()=>{setDrawer(true);setNotice("")}}>Ver carrito →</button></div>}

    {drawer&&<div className="overlay" onClick={()=>setDrawer(false)}>
      <aside role="dialog" aria-modal="true" aria-label="Mi carrito" className="drawer" onClick={e=>e.stopPropagation()}>
        <div className="drawerHead"><div><small>TU COMPRA</small><h2>Mi carrito</h2></div><button autoFocus aria-label="Cerrar carrito" onClick={()=>setDrawer(false)}>×</button></div>
        {!count?
          <div className="emptyCart"><img src={tenant.brand.isotype} alt="" aria-hidden="true"/><h3>Tu carrito está vacío</h3><p>Cuando añadas productos aparecerán aquí.</p><button onClick={()=>setDrawer(false)}>Seguir comprando</button></div>
          :
          <>
            <div className="cartList">{products.filter(p=>cart[p.id]).map(p=>
              <div className="cartItem" key={p.id}>
                <img src={p.img} alt=""/>
                <div><b>{p.n}</b><small>{p.d}</small><small>{money(p.p)}</small>
                  <div className="qty"><button onClick={()=>change(p.id,cart[p.id]-1)}>−</button><span>{cart[p.id]}</span><button onClick={()=>change(p.id,cart[p.id]+1)}>＋</button></div>
                  <button className="removeProduct" onClick={()=>change(p.id,0)}>Eliminar</button>
                </div>
                <strong>{money(p.p*cart[p.id])}</strong>
              </div>
            )}</div>
            <div className="checkout"><div><span>Subtotal</span><b>{money(total)}</b></div><small>La entrega y disponibilidad se confirman al tramitar el pedido.</small><a className="checkoutPrimary" href="/checkout">Continuar pedido</a></div>
          </>
        }
      </aside>
    </div>}

    {detail&&<div className="overlay modalWrap" onClick={()=>setDetail(null)}>
      <section className="detail" onClick={e=>e.stopPropagation()}>
        <button className="close" onClick={()=>setDetail(null)}>×</button>
        <img src={detail.img} alt={detail.n}/>
        <div><small>{detail.c}</small><h2>{detail.n}</h2><p>{detail.d}</p><strong>{money(detail.p)}</strong><button onClick={()=>{add(detail.id);setDetail(null)}}>Añadir al carrito</button></div>
      </section>
    </div>}

    {!drawer&&!detail&&<Support onAdd={add} onSet={change} onClear={()=>setCart({})} cart={cart}/>}
  </div>
}
