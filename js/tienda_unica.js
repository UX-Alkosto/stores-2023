const fecha = new Date();
const hora = fecha.toLocaleTimeString();
const horaMin = hora.substr(0, 5);
const horas = ((fecha.getHours() < 10) ? "0" : "") + fecha.getHours();
const minutos = ((fecha.getMinutes() < 10) ? "0" : "") + fecha.getMinutes();

const urlPrueba = "https://www.alkomprar.com/nuestras-tiendas/armenia/unicentro";
const urlSite = urlPrueba.split("/")[2];
console.log(urlSite);
/* const urlSite = window.location.href.split("/")[2]; */
const formatoHora = `${horas}:${minutos}`;

const fechaComoCadena = fecha;
const dias = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
];

const content = document.getElementById('cont-principal');

var urlKT = "https://feeds.datafeedwatch.com/95958/fb2f5eb90322be8f5cb1aea469a4551436034440.json";
var urlAK = "https://feeds.datafeedwatch.com/95958/3a4f7dba63e51e01ff8ad165f123a825cf30f99b.json";
var urlALKP = "https://feeds.datafeedwatch.com/95958/c75c33c5369da362ae3e6fafb56ecd0b0ef78319.json";
var textoIngresado = "";

let opSelect;

let urlAPI;
switch (urlSite) {
    case "www.alkosto.com":
        urlAPI = urlAK
        site = "Tiendas Alkosto";
        break;
    case "www.ktronix.com":
        urlAPI = urlKT
        site = "Tiendas Ktronix";
        break;
    case "www.alkomprar.com":
        urlAPI = urlALKP
        site = "Tiendas Alkomprar";
        break;

    default:
        break;
}
let globalData = {};
const numeroDia = new Date(fechaComoCadena).getDay();

const nombreDia = dias[numeroDia];

function limpiarTexto(texto) {
    let retorno = texto.replace()
        .replace(/[áàäâå]/, "a")
        .replace(/[éèëê]/, "e")
        .replace(/[íìïî]/, "i")
        .replace(/[óòöô]/, "o")
        .replace(/[úúüû]/, "u")
        .replace(/[ñ]/, "n")
        .replace(/[\s()/*´'{}]+/gi, "-")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    return retorno;
}

function infoStore() {
    const resp = fetch(`${urlAPI}`)
        .then(response => response.json())
        .then(data => {
            globalData["info-all"] = data.products;
            let info = globalData["info-all"].filter(item => item.tienda != null && item.url_tienda == urlPrueba);

            printInfo(info[0])
            let otStores = globalData["info-all"].filter(item => item.tienda != null && item.ciudad_tienda == info[0].ciudad_tienda && item.nombre_tienda != info[0].nombre_tienda);
            if (otStores.length >= 1) {
                otherStores(otStores);
                return;
            }
        });
}
const printInfo = (i) => {
    let hor1;
    let hor2;
    let hor3;
    let msjAlert;
    let msjVig = new Date(`${i.vig_msj} 23:59:00 GMT-0500`);
    console.log(msjVig, "__", fecha);

    fecha <= msjVig ? msjAlert = `<div class="cont-alert">
    <div class="alert alert-info">
    <p>${i.msj_alert}. Te invitamos a seguir comprando en <a class="alert-link" href="/">Alkomprar.com</a></p>
    </div>
    </div>` : msjAlert = "";
    i.dias_hor_1 !== "" ? hor1 = `<div class="c-horario">
    <p class="days-hor">${i.dias_hor_1}</p>
    <div class="cont-hours">
    <span class="info-hor">
    <i class="alk-icon-dia icons-store"></i>
    ${i.hora_ap_hor_1.slice(0, 5)} a.m.
    </span>
    <span class="info-hor">
    <img class="moon img img-responsive" src="../img/luna.png"/>
    ${i.hora_cie_hor_1.slice(0, 5)} p.m.
    </span>
    </div>
    </div>` : hor1 = "";

    i.dias_hor_2 !== "" ? hor2 = `<div class="c-horario">
    <p class="days-hor">${i.dias_hor_2}</p>
    <div class="cont-hours">
    <span class="info-hor">
    <i class="alk-icon-dia icons-store"></i>
    ${i.hora_ap_hor_2.slice(0, 5)} a.m.
    </span>
    <span class="info-hor">
    <img class="moon img img-responsive" src="../img/luna.png"/>
    ${i.hora_cie_hor_2.slice(0, 5)} p.m.
    </span>
    </div>
    </div>` : hor2 = "";

    i.dias_hor_3 !== "" ? hor3 = `<div class="c-horario">
    <p class="days-hor">${i.dias_hor_3}</p>
    <div class="cont-hours">
    <span class="info-hor">
    <i class="alk-icon-dia icons-store"></i>
    ${i.hora_ap_hor_3.slice(0, 5)} a.m.
    </span>
    <span class="info-hor">
    <img class="moon img img-responsive" src="../img/luna.png"/>
    ${i.hora_cie_hor_3.slice(0, 5)} p.m.
    </span>
    </div>
    </div>` : hor3 = "";

    const store =
        `
    <div class="contenedor_tienda_detalle">
    <div class="imagen_tienda">
    <img src="${i.img_tienda}" alt="${i.nombre_tienda}">
    </div>
    <div class="detalle_tienda">
    <div class="info_detalle">
    <h2>${i.nombre_tienda}</h2>
    <span class="direc">${i.dir_tienda}</span>
    <span class="tit_horario"><i class="alk-icon-clock"></i> Horarios</span>
    <p class="apertura verde">Abierto, cierra a las 9:00 p.&nbsp;m.</p>
    <div class="cont-hors">
    ${hor1}
    ${hor2}
    ${hor3}
    </div>
    ${msjAlert}
    <div class="links_detalle">
    <span><a target="_blank" rel="noopener" title="Como llegar" href="${i.url_llegar}"><i class="alk-icon-arrive"></i> Como llegar</a></span>
    <span><a target="_blank" rel="noopener" title="Ver mapa" href="${i.url_maps}"><i class="alk-icon-ver-mapa"></i> Ver mapa y horarios</a></span>
    </div>
    </div>
    </div>
    </div>
    `
    content.innerHTML = store;
}

const otherStores = (i) => {
    console.log(i);
}
infoStore();