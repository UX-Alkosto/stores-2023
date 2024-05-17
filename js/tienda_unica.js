const fecha = new Date();
const hora = fecha.toLocaleTimeString();
const horaMin = hora.substr(0, 5);
const horas = ((fecha.getHours() < 10) ? "0" : "") + fecha.getHours();
const minutos = ((fecha.getMinutes() < 10) ? "0" : "") + fecha.getMinutes();
const segundos = ((fecha.getSeconds() < 10) ? "0" : "") + fecha.getSeconds();

const urlPrueba = "https://www.alkosto.com/nuestra-compania/tiendas/bogota/carrera-30";
const urlSite = urlPrueba.split("/")[2];
/* console.log(fecha.getDay());
console.log(fecha.getMonth()); */
const festivosCol = [
    [1, 9],
    [],
    [25, 28, 29],
    [],
    [1, 13],
    [3, 10],
    [1, 20],
    [7, 19],
    [],
    [14],
    [4, 11],
    [8, 25]
]


/* const urlSite = window.location.href.split("/")[2]; */
const formatoHora = `${horas}:${minutos}:${segundos}`;

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
const mesActual = festivosCol[fecha.getMonth()];
const diaActual = fecha.getDate();
let filtroFestivo = mesActual.filter(fest => fest == diaActual);
const esFestivo = filtroFestivo.length > 0 && filtroFestivo[0] === diaActual;
const diasSemana = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
let horarios = {};

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
    let msjFestivo = "";
    esFestivo ? msjFestivo = " festivo" : msjFestivo = "";

    diasSemana.forEach((dia, index) => {
        const diaNumero = index;
        let apertura = i[`ap_${dia}`];
        let cierre = i[`cie_${dia}`];

        if (numeroDia === diaNumero && esFestivo && apertura !== "Cerrado") {
            apertura = i.ap_dom;
            cierre = i.cie_dom;
        }
        horarios[`ap_${dia}`] = apertura;
        horarios[`cie_${dia}`] = cierre;
    });

    const horOrd = diasSemana.map((dia, index) => {
        const diaNombre = dias[index];
        return {
            apertura: horarios[`ap_${dia}`],
            cierre: horarios[`cie_${dia}`],
            dia: diaNombre,
        };
    });

    const listHor = [...horOrd.slice(numeroDia), ...horOrd.slice(0, numeroDia)];


    let horario = "";



    if (listHor[0].apertura == "Cerrado" || listHor[0].cierre == "Cerrado") {

        horario = `<p class="apertura">Hoy ${listHor[0].dia}${msjFestivo}: <br><span class="close-txt"> Cerrado, abre mañana a las ${listHor[1].apertura.substr(0, 5)} a. m. </span></p>`
    } else if (listHor[0].apertura <= formatoHora && listHor[0].cierre >= formatoHora) {
        horario = `<p class="apertura">Hoy ${listHor[0].dia}${msjFestivo}: <br> <span class="open"> abierto, cierra a las ${listHor[0].cierre.substr(0, 2)-12}${listHor[0].cierre.substr(2,3)} p. m. </span></p>`

    } else if (listHor[0].apertura >= formatoHora && listHor[0].cierre >= formatoHora) {
        horario = `<p class="apertura"><span class="close-txt">Cerrado, abre a las ${listHor[0].apertura.substr(0, 5)} a. m. </span></p>`

    } else {
        horario = `<p class="apertura">Hoy ${listHor[0].dia}${msjFestivo}: <br> <span class="close-txt"> Cerrado, abre mañana a las ${listHor[1].apertura.substr(0, 5)} a. m.</span></p>`

    }
    let listDias = "";
    listHor.map((h, i) => {
        let horDia = "";
        horDia = h.apertura == "Cerrado" || h.cierre == "Cerrado" ? horDia = `<li class='element-hor'>${h.dia.charAt(0).toUpperCase() + h.dia.slice(1)}: Cerrado</li>` : horDia = `<li class="element-hor">${h.dia.charAt(0).toUpperCase() + h.dia.slice(1)} de: ${h.apertura.substr(0, 5)} a. m. a ${h.cierre.substr(0, 2)-12}${h.cierre.substr(2,3)} p. m.</li>`

        return listDias += horDia;
    })

    let msjAlert;
    let msjVig = new Date(`${i.vig_msj} 23:59:00 GMT-0500`);

    fecha <= msjVig ? msjAlert = `<div class="cont-alert">
    <div class="alert alert-info">
    <p>${i.msj_alert}. Te invitamos a seguir comprando en <a class="alert-link" href="/">Alkomprar.com</a></p>
    </div>
    </div>` : msjAlert = "";


    const store =
        `
<div class="cont-all">
    <div class="row cont-info-store">
    <div class="col-md-5 mb-4">
    <img src="${i.img_tienda}" class="img img-responsive img-store" width="800" alt="${i.nombre_tienda}">
    </div>
    <div class="col-md-4 mb-4 info-gen">
    <div class="info_detalle">
    <h1 class="name-store">${i.nombre_tienda}</h1>
    <h2 class="txt-ciudad">${i.ciudad_tienda}</h2>
    <p class="direc">${i.dir_tienda}</p>
    </div>
    ${horario}
    <div class="links_detalle">
    <span><a target="_blank" rel="noopener" title="Como llegar" href="${i.url_llegar}"><i class="alk-icon-arrive"></i> Como llegar</a></span>
    <span><a target="_blank" rel="noopener" title="Ver mapa" href="${i.url_maps}"><i class="alk-icon-ver-mapa"></i> Ver mapa y horarios</a></span>
     </div>
   </div>
    <div class="col-md-3 mb-4 cont-horarios">
    <span class="tit_horario mb-2"><i class="alk-icon-clock"></i> Horarios</span>
   <ul class="lists-hor">
   ${listDias}
   </ul> 
    </div>
    </div>
</div>
    <div class="row">
    <div class="col-md-12">
    ${msjAlert}
    </div>
    </div>
    `
    content.innerHTML = store;
}

const otherStores = (i) => {
    const contTitle = document.querySelector("#title-other-stores");
    const content = document.querySelector("#other-stores");
    let title = `<div class="col-md-12"><h3 class="title-sect-2"><span class="span-title">Otras tiendas en ${i[0].ciudad_tienda.split(",")[0]} </span></h3></div>`
    const mapStores = i.map((s, index) => {
        diasSemana.forEach((dia, index) => {
            const diaNumero = index;
            let apertura = s[`ap_${dia}`];
            let cierre = s[`cie_${dia}`];
    
            if (numeroDia === diaNumero && esFestivo && apertura !== "Cerrado") {
                apertura = s.ap_dom;
                cierre = s.cie_dom;
            }
            horarios[`ap_${dia}`] = apertura;
            horarios[`cie_${dia}`] = cierre;
        });
    
        const horOrd = diasSemana.map((dia, index) => {
            const diaNombre = dias[index];
            return {
                apertura: horarios[`ap_${dia}`],
                cierre: horarios[`cie_${dia}`],
                dia: diaNombre,
            };
        });
        const listHor = [...horOrd.slice(numeroDia), ...horOrd.slice(0, numeroDia)]
        let horario = "";
        let badge;
        if (listHor[0].apertura == "Cerrado" || listHor[0].cierre == "Cerrado") {
            badge = '<span class="badge bg-danger">Cerrado</span>';

            horario = `<p class="horario abierto"><i class="alk-icon-clock"></i> Cerrado, abre mañana a las ${listHor[1].apertura.substr(0, 5)} a. m.</p>`
        } else if (listHor[0].apertura <= formatoHora && listHor[0].cierre >= formatoHora) {
            badge = '<span class="badge bg-primary">Abierto</span>';
            horario = `<p class="horario abierto"><i class="alk-icon-clock"></i> Hoy de ${listHor[0].apertura.substr(0, 5)} a. m. a ${listHor[0].cierre.substr(0, 2)-12}${listHor[0].cierre.substr(2,3)} p. m. </p>`

        } else if (listHor[0].apertura >= formatoHora && listHor[0].cierre >= formatoHora) {
            badge = '<span class="badge bg-danger">Cerrado</span>';
            horario = `<p class="horario abierto"><i class="alk-icon-clock"></i> Hoy de ${listHor[0].apertura.substr(0, 5)} a. m. a ${listHor[0].cierre.substr(0, 2)-12}${listHor[0].cierre.substr(2,3)} p. m. </p>`

        } else {
            badge = '<span class="badge bg-danger">Cerrado</span>';
            horario = `<p class="horario abierto"><i class="alk-icon-clock"></i> Cerrado, abre mañana a las ${listHor[1].apertura.substr(0, 5)} a. m.</p>`

        }
        return `
        <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="card">
                <div class="card-header">
                    <h2 class="card-subtitle">
                    ${s.nombre_tienda}
                    </h2>
                    ${badge}
                </div>
                        <div class="card-body">
                            <div class="cont-info-card">
                            <p class="horario-tienda">${s.dir_tienda}</p>
                            ${horario}
                            </div>
                            <div class="row d-flex">
                            <a class="btn-detail" href="${s.url_tienda}" title="ir a tienda ${s.nombre_tienda}">
                            <div class="btn-card">
                            Ver detalle
                            </div>
                            </a>
                            <a class="btn-detail" href="${s.url_llegar}" title="Como llegar a ${s.nombre_tienda}">
                            <div class="btn-card bl-d">
                            Cómo llegar
                            </div>
                            </a>
                            </div>
                         </div>  
            </div>
        </div>
        `
    }).join("");
    contTitle.innerHTML = title;
    content.innerHTML = mapStores;
}
infoStore();