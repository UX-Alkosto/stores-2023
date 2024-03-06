const fecha = new Date();
const hora = fecha.toLocaleTimeString();
const horaMin = hora.substr(0, 5);
const horas = ((fecha.getHours() < 10) ? "0" : "") + fecha.getHours();
const minutos = ((fecha.getMinutes() < 10) ? "0" : "") + fecha.getMinutes();

const urlPrueba = "https://www.alkomprar.com/nuestras-tiendas/bucaramanga/barrio-soto-mayor";
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
        });
}
const printInfo = (i) => {
    console.log(i);
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
    <p class="apertura verde">Abierto, cierra a las 9:00 p.&nbsp;m.</p>
    <span class="tit_horario"><i class="alk-icon-clock"></i> Horarios</span>
    <div class="horarios_detalle">
    <p><strong>Lun a Vie</strong> <br> 7:00 a.m a 9:00 p.m</p><p><strong>Dom y Fes</strong> <br> 7:00 a.m a 9:00 p.m</p>
    </div>
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
infoStore();