const fecha = new Date();
const hora = fecha.toLocaleTimeString();
const horaMin = hora.substr(0, 5);
const horas = ((fecha.getHours() < 10) ? "0" : "") + fecha.getHours();
const minutos = ((fecha.getMinutes() < 10) ? "0" : "") + fecha.getMinutes();

//const urlPrueba = "https://www.ktronix.com/nuestra-compania/tiendas/bucaramanga";
//const urlSite = urlPrueba.split("/")[2];
const urlSite = window.location.href.split("/")[2];




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


const festivosCol = [
    [1, 6],
    [],
    [24],
    [17, 18],
    [1],
    [2, 23, 30],
    [20],
    [7, 18],
    [],
    [13],
    [3, 17],
    [8, 25]
]

const mesActual = festivosCol[fecha.getMonth()];
const diaActual = fecha.getDate();
let filtroFestivo = mesActual.filter(fest => fest == diaActual);
const esFestivo = filtroFestivo.length > 0 && filtroFestivo[0] === diaActual;

const listaCoincidencias = document.getElementById('listaCoincidencias');
const content = document.getElementById('content');

const resultSearch = document.querySelector("#result-search");
const svConfianza = document.querySelector("#sv-confianza");
const carrusel = document.querySelector("#cont-carrusel");
const titleServ = document.querySelector("#title-serv");
const contInput = document.querySelector("#cont-input");

let urlKT = "https://feeds.datafeedwatch.com/95958/fb2f5eb90322be8f5cb1aea469a4551436034440.json";
let urlAK = "https://feeds.datafeedwatch.com/95958/3a4f7dba63e51e01ff8ad165f123a825cf30f99b.json";
let urlALKP = "https://feeds.datafeedwatch.com/95958/c75c33c5369da362ae3e6fafb56ecd0b0ef78319.json";
let textoIngresado = "";

let opSelect;

let urlAPI;
let site;
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
        .toLowerCase()
        .trim();
    return retorno;
}


for (let index = numeroDia; index < dias.length; index++) {
    const element = dias[index];
    for (let j = numeroDia; j > dias.length; j--) {
        const menor = array[j];
    }
}

async function allTiendas() {

    try {
        const resp = await fetch(urlAPI);
        if (!resp.ok) throw new Error("Error en respuesta del servidor");

        const dataStores = await resp.json();

        const urlCiudades = window.location.pathname.split("/");

        let urlFiltroCiudad = urlCiudades[urlCiudades.length - 1].split("?")[0]


        let filtroTienda = dataStores.products.filter((element => {
            let ciudadTienda = limpiarTexto(element.ciudad_tienda)
            let ciudadUrl = limpiarTexto(urlFiltroCiudad);

            return element.tienda == site && ciudadTienda.includes(ciudadUrl);
        }))



        const orderTiendas = filtroTienda.sort((a, b) => {
            a.nombre_tienda.localeCompare(b.nombre_tienda)
        });

        globalData["info-all"] = orderTiendas;
        infoTiendas(orderTiendas)

    } catch (error) {
        console.error("error al obtener tiendas", error);

    }

}


const infoTiendas = info => {

    const tituloPagina = document.title;
    const regex = /Tiendas (.+)/i;
    const match = tituloPagina.match(regex);

    let ciudadName = match ? match[1].trim() : "";

    document.querySelector("#ciudadName").innerHTML = `${ciudadName}`;

    if (info.length >= 1) {
        let filtroTienda = info.filter(element => element.tienda == site);
        const orderTiendas = filtroTienda.sort((a, b) =>
            a.nombre_tienda.localeCompare(b.nombre_tienda)
        );

        if (orderTiendas.length >= 1) {

            let mapTiendas = orderTiendas.map((t, id) => {
                let idTienda = id;
                let direccion = t.dir_tienda;
                let mapsUrl = t.url_llegar;
                let urlTienda = t.url_tienda;
                let horarioDia = "";
                horLunes = "";

                t.ap_lun == "Cerrado" && t.cie_lun == "Cerrado" ? horLunes = "Cerrado" : horLunes = `${t.ap_lun.substr(0, 5)} a. m. - ${t.cie_lun.substr(0, 2) - 12}${t.cie_lun.substr(2, 3)} p. m.`;
                horMartes = "";
                t.ap_mar == "Cerrado" && t.cie_mar == "Cerrado" ? horMartes = "Cerrado" : horMartes = `${t.ap_mar.substr(0, 5)} a. m. - ${t.cie_mar.substr(0, 2) - 12}${t.cie_mar.substr(2, 3)} p. m.`;
                horMie = "";
                t.ap_mie == "Cerrado" && t.cie_mie == "Cerrado" ? horMie = "Cerrado" : horMie = `${t.ap_mie.substr(0, 5)} a. m. - ${t.cie_mie.substr(0, 2) - 12}${t.cie_mie.substr(2, 3)} p. m.`;
                horJueves = "";
                t.ap_jue == "Cerrado" && t.cie_jue == "Cerrado" ? horJueves = "Cerrado" : horJueves = `${t.ap_jue.substr(0, 5)} a. m. - ${t.cie_jue.substr(0, 2) - 12}${t.cie_jue.substr(2, 3)} p. m.`;
                horViernes = "";
                t.ap_vie == "Cerrado" && t.cie_vie == "Cerrado" ? horViernes = "Cerrado" : horViernes = `${t.ap_vie.substr(0, 5)} a. m. - ${t.cie_vie.substr(0, 2) - 12}${t.cie_vie.substr(2, 3)} p. m.`;
                horSab = "";
                t.ap_sab == "Cerrado" && t.cie_sab == "Cerrado" ? horSab = "Cerrado" : horSab = `${t.ap_sab.substr(0, 5)} a. m. - ${t.cie_sab.substr(0, 2) - 12}${t.cie_sab.substr(2, 3)} p. m.`;
                horDom = "";
                t.ap_dom == "Cerrado" && t.cie_dom == "Cerrado" ? horDom = "Cerrado" : horDom = `${t.ap_dom.substr(0, 5)} a. m. - ${t.cie_dom.substr(0, 2) - 12}${t.cie_dom.substr(2, 3)} p. m.`;
                switch (numeroDia) {
                    case 1:
                        if (t.ap_lun != "Cerrado" || t.cie_lun != "Cerrado") {
                            if (esFestivo) {
                                hora_apertura = t.ap_dom.substr(0, 5)
                                aj_hora_cierre = t.cie_dom.substr(0, 2);
                                aj_hora_cierre2 = t.cie_dom.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            } else {
                                hora_apertura = t.ap_lun.substr(0, 5);
                                aj_hora_cierre = t.cie_lun.substr(0, 2);
                                aj_hora_cierre2 = t.cie_lun.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            }
                            horTienda = hora_apertura <= formatoHora && t.cie_lun >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${aj_hora_cierre-12}${aj_hora_cierre2} p. m.</p>`;

                        } else {
                            horTienda = `<h2 class="card-subtitle">
                            ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                        }
                        break;
                    case 2:
                        if (t.ap_mar != "Cerrado" || t.cie_mar != "Cerrado") {
                            if (esFestivo) {
                                hora_apertura = t.ap_dom.substr(0, 5)
                                aj_hora_cierre = t.cie_dom.substr(0, 2);
                                aj_hora_cierre2 = t.cie_dom.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            } else {
                                hora_apertura = t.ap_mar.substr(0, 5);
                                aj_hora_cierre = t.cie_mar.substr(0, 2);
                                aj_hora_cierre2 = t.cie_mar.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            }
                            horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${aj_hora_cierre-12}${aj_hora_cierre2} p. m.</p>`;

                        } else {
                            horTienda = `<h2 class="card-subtitle">
                        ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                        }

                        break;
                    case 3:
                        if (t.ap_mie != "Cerrado" || t.cie_mie != "Cerrado") {

                            if (esFestivo) {
                                hora_apertura = t.ap_dom.substr(0, 5)
                                aj_hora_cierre = t.cie_dom.substr(0, 2);
                                aj_hora_cierre2 = t.cie_dom.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            } else {
                                hora_apertura = t.ap_mie.substr(0, 5);
                                aj_hora_cierre = t.cie_mie.substr(0, 2);
                                aj_hora_cierre2 = t.cie_mie.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            }
                            txtBadge = "";
                            horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda}</h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${aj_hora_cierre-12}${aj_hora_cierre2} p. m.</p>`;

                        } else {
                            horTienda = `<h2 class="card-subtitle">
                        ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                        }

                        break;
                    case 4:
                        if (t.ap_jue != "Cerrado" || t.cie_jue != "Cerrado") {

                            if (esFestivo) {
                                hora_apertura = t.ap_dom.substr(0, 5)
                                aj_hora_cierre = t.cie_dom.substr(0, 2);
                                aj_hora_cierre2 = t.cie_dom.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            } else {
                                hora_apertura = t.ap_jue.substr(0, 5);
                                aj_hora_cierre = t.cie_jue.substr(0, 2);
                                aj_hora_cierre2 = t.cie_jue.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            }

                            txtBadge = "";
                            horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda}</h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${aj_hora_cierre-12}${aj_hora_cierre2} p. m.</p>`;
                        } else {
                            horTienda = `<h2 class="card-subtitle">
                        ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                        }
                        break;
                    case 5:
                        if (t.ap_vie != "Cerrado" || t.cie_vie != "Cerrado") {
                            if (esFestivo) {
                                hora_apertura = t.ap_dom.substr(0, 5)
                                aj_hora_cierre = t.cie_dom.substr(0, 2);
                                aj_hora_cierre2 = t.cie_dom.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            } else {
                                hora_apertura = t.ap_vie.substr(0, 5);
                                aj_hora_cierre = t.cie_vie.substr(0, 2);
                                aj_hora_cierre2 = t.cie_vie.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            }
                            txtBadge = "";
                            horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda}</h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${aj_hora_cierre-12}${aj_hora_cierre2} p. m.</p>`;
                            break;
                        } else {
                            horTienda = `<h2 class="card-subtitle">
                        ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                        }
                        case 6:
                            if (t.ap_sab != "Cerrado" || t.cie_sab != "Cerrado") {
                                if (esFestivo) {
                                    hora_apertura = t.ap_dom.substr(0, 5)
                                    aj_hora_cierre = t.cie_dom.substr(0, 2);
                                    aj_hora_cierre2 = t.cie_dom.substr(2, 3);
                                    hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                                } else {
                                    hora_apertura = t.ap_sab.substr(0, 5);
                                    aj_hora_cierre = t.cie_sab.substr(0, 2);
                                    aj_hora_cierre2 = t.cie_sab.substr(2, 3);
                                    hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                                }
                                horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda}</h2><span class="badge bg-danger">Cerrado</span>`;
                                horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${aj_hora_cierre-12}${aj_hora_cierre2} p. m.</p>`;
                            } else {
                                horTienda = `<h2 class="card-subtitle">
                            ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                                horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                            }
                            break;
                        case 0:
                            if (t.ap_dom != "Cerrado" || t.cie_dom != "Cerrado") {

                                hora_apertura = t.ap_dom.substr(0, 5);
                                aj_hora_cierre = t.cie_dom.substr(0, 2);
                                aj_hora_cierre2 = t.cie_dom.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                                horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                                horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${aj_hora_cierre-12}${aj_hora_cierre2} p. m.</p>`;
                            } else {
                                horTienda = `<h2 class="card-subtitle">
                            ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                                horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                            }
                            break;

                        default:
                            break;
                }

                return `
                                <div class="col-sm-6 col-md-4">
                                <div class="card">
                                <div class="card-header">
                                ${horTienda}
                                </div>
                                <div class="card-body">
                                <div class="cont-info-card">
                                <p class="horario-tienda">${direccion}</p>
                                <div data-toggle="collapse" data-target="#horariosAcordion${idTienda}" class="accordion-button collapsed">
                                ${horarioDia}
                                </div>
                                <div class="collapse" id="horariosAcordion${idTienda}">
                                <ul class="list-horario">
                                <li>Lunes: ${horLunes} </li>
                                <li>Martes: ${horMartes}</li>
                                <li>Miércoles: ${horMie}</li>
                                <li>Jueves: ${horJueves}</li>
                                <li>Viernes: ${horViernes}</li>
                                <li>Sábado: ${horSab}</li>
                                <li>Domingo: ${horDom}</li>
                                </ul>
                                </div>
                                </div>
                                <div class="row d-flex">
                                <a class="btn-detail" href="${urlTienda}" title="ir a tienda ${t.nombre_tienda}">
                                <div class="btn-card">
                                Ver detalle
                                </div>
                                </a>
                                <a class="btn-detail" href="${mapsUrl}" title="Como llegar a ${t.nombre_tienda}">
                                <div class="btn-card bl-d">
                                Cómo llegar
                                </div>
                                </a>
                                </div>
                                </div>
                                </div>
                                </div>
                                `;
            }).join("");


            document.addEventListener('click', function (event) {
                if (!event.target.classList.contains('accordion-button')) {
                    let collapses = document.querySelectorAll('.collapse.show');
                    collapses.forEach(function (collapse) {
                        let bootstrapCollapse = new bootstrap.Collapse(collapse, {
                            toggle: false
                        });
                        bootstrapCollapse.hide();
                    });
                }
            });
            content.innerHTML = mapTiendas;


            return;
        } else {

            info.map((e) => {
                content.innerHTML = `
                <div class="col-md-12">
                <p>Actualmente no contamos con una tienda física en tu destino, pero recuerda que tienes <b>envío gratis a ${e.ciudad_tienda}</b> por todas tus compras en línea.</p>
                </div>
                <div class="col-sm-6 col-md-4">
                <div class="cont-card">
                    <div class="card">
                        <div class="card-header header-envio">
                            <h2 class="card-subtitle">${e.ciudad_tienda}</h2>
                            <span class="badge bg-primary">Envío gratis</span>
                        </div>
                        <div class="card-body">
                        <p class="txt-blue">Tiempo estimado de entrega: ${e.dias_entrega} días hábiles.</p>
                        <div class="cont-horario">
                            <div class="cnt-icon">
                                <i class="alk-icon-clock"></i>
                            </div>
                            <div class="txt-horario">
                                <p class="m-0">Lunes a Domingo</p>
                                <p>${e.hor_entrega}</p>
                            </div>
                        </div>
                        </div>
                        <a href="/entregas-devoluciones/envio-gratis" class="btn-envio">
                        <div class="cnt-btn-envio">
                            Conoce más sobre envío gratis
                            </div>
                            </a>
                    </div>
                </div>
                </div>
                `;
            })
            let cardBadge = document.querySelector(".card-subtitle");
            cardBadge.style.width = "65%";
        }
    }
}



allTiendas()