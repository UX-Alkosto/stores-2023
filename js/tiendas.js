const fecha = new Date();
const hora = fecha.toLocaleTimeString();
const horaMin = hora.substr(0, 5);
const horas = ((fecha.getHours() < 10) ? "0" : "") + fecha.getHours();
const minutos = ((fecha.getMinutes() < 10) ? "0" : "") + fecha.getMinutes();

const urlPrueba = "https://www.alkosto.com/nuestra-compania/tiendas/c/tiendas";
/* const urlSite = urlPrueba.split("/")[2]; */
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

const buscador = document.getElementById('search');
const listaCoincidencias = document.getElementById('listaCoincidencias');
const content = document.getElementById('content');
const resultSearch = document.querySelector("#result-search");
const svConfianza = document.querySelector("#sv-confianza");
const carrusel = document.querySelector("#cont-carrusel");
const titleServ = document.querySelector("#title-serv");
const btn_tiendas = document.querySelector("#all-tiendas");
const contInput = document.querySelector("#cont-input");

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

contInput.addEventListener('click', () => {
    buscador.focus();
})

for (let index = numeroDia; index < dias.length; index++) {
    const element = dias[index];
    for (let j = numeroDia; j > dias.length; j--) {
        const menor = array[j];
    }
}

function allTiendas() {
    const resp = fetch(`${urlAPI}`)
        .then(response => response.json())
        .then(data => {
            globalData["info-all"] = data.products;
            let info = globalData["info-all"];
            infoTiendas(info);
        });
    buscador.setAttribute("placeholder", "Ingresa el nombre de tu municipio");
    buscador.value = "";
    contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
}

function allStores() {
    btn_tiendas.classList.add("hidden");
    buscador.setAttribute("placeholder", "Ingresa tu municipio o departamento");
    infoTiendas(globalData["info-all"]);

}
const infoTiendas = info => {
    listaCoincidencias.innerHTML = "";
    content.innerHTML = "";
    resultSearch.innerHTML = "";
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
                console.log(horDom);
                console.log(t.ap_dom);
                switch (numeroDia) {
                    case 1:
                        if (t.ap_lun != "Cerrado" || t.cie_lun != "Cerrado") {
                            hora_apertura = t.ap_lun.substr(0, 5);
                            aj_hora_cierre = t.cie_lun.substr(0, 2) - 12;
                            aj_hora_cierre2 = t.cie_lun.substr(2, 3);
                            hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            horTienda = hora_apertura <= formatoHora && t.cie_lun >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${hora_cierre} p. m.</p>`;

                        } else {
                            horTienda = `<h2 class="card-subtitle">
                            ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                        }
                        break;
                    case 2:
                        if (t.ap_mar != "Cerrado" || t.ap_mar != "Cerrado") {

                            hora_apertura = t.ap_mar.substr(0, 5);
                            aj_hora_cierre = t.cie_mar.substr(0, 2) - 12;
                            aj_hora_cierre2 = t.cie_mar.substr(2, 3);
                            hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${hora_cierre} p. m.</p>`;

                        } else {
                            horTienda = `<h2 class="card-subtitle">
                        ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                        }

                        break;
                    case 3:
                        if (t.ap_mie != "Cerrado" || t.cie_mie != "Cerrado") {

                            hora_apertura = t.ap_mie.substr(0, 5);
                            aj_hora_cierre = t.cie_mie.substr(0, 2) - 12;
                            aj_hora_cierre2 = t.cie_mie.substr(2, 3);
                            hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            txtBadge = "";
                            horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda}</h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${hora_cierre} p. m.</p>`;

                        } else {
                            horTienda = `<h2 class="card-subtitle">
                        ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                        }

                        break;
                    case 4:
                        if (t.ap_jue != "Cerrado" || t.cie_jue != "Cerrado") {

                            hora_apertura = t.ap_jue.substr(0, 5);
                            aj_hora_cierre = t.cie_jue.substr(0, 2) - 12;
                            aj_hora_cierre2 = t.cie_jue.substr(2, 3);
                            hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            txtBadge = "";
                            horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda}</h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${hora_cierre} p. m.</p>`;
                        } else {
                            horTienda = `<h2 class="card-subtitle">
                        ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                        }
                        break;
                    case 5:
                        if (t.ap_vie != "Cerrado" || t.cie_vie != "Cerrado") {
                            hora_apertura = t.ap_vie.substr(0, 5);
                            aj_hora_cierre = t.cie_vie.substr(0, 2) - 12;
                            aj_hora_cierre2 = t.cie_vie.substr(2, 3);
                            hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                            txtBadge = "";
                            horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda}</h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${hora_cierre} p. m.</p>`;
                            console.log("Viernes");
                            break;
                        } else {
                            horTienda = `<h2 class="card-subtitle">
                        ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                            horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                        }
                        case 6:
                            if (t.ap_sab != "Cerrado" || t.cie_sab != "Cerrado") {

                                hora_apertura = t.ap_sab.substr(0, 5);
                                aj_hora_cierre = t.cie_sab.substr(0, 2) - 12;
                                aj_hora_cierre2 = t.cie_sab.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                                horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda}</h2><span class="badge bg-danger">Cerrado</span>`;
                                horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${hora_cierre} p. m.</p>`;
                                console.log("Sabado");
                            } else {
                                horTienda = `<h2 class="card-subtitle">
                            ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                                horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
                            }
                            break;
                        case 0:
                            if (t.ap_dom != "Cerrado" || t.cie_dom != "Cerrado") {

                                hora_apertura = t.ap_dom.substr(0, 5);
                                aj_hora_cierre = t.cie_dom.substr(0, 2) - 12;
                                aj_hora_cierre2 = t.cie_dom.substr(2, 3);
                                hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                                horTienda = hora_apertura <= formatoHora && hora_cierre >= formatoHora ? `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2> <span class="badge bg-primary">Abierto</span>` : `<h2 class="card-subtitle">
                    ${t.nombre_tienda} </h2><span class="badge bg-danger">Cerrado</span>`;
                                horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a. m. - ${hora_cierre} p. m.</p>`;
                                console.log("Domingo");
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
                    var collapses = document.querySelectorAll('.collapse.show');
                    collapses.forEach(function (collapse) {
                        var bootstrapCollapse = new bootstrap.Collapse(collapse, {
                            toggle: false
                        });
                        bootstrapCollapse.hide();
                    });
                }
            });
            content.innerHTML = content.innerHTML + mapTiendas;

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
                        <a href="/entregas-devoluciones/envio-gratis/c/envio-gratis" class="btn-envio">
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

const buscarResultados = async searchText => {
    btn_tiendas.classList.add("hidden");
    consulta = globalData["info-all"];
    let compararResultado = consulta.filter(
        resultado => {
            const newResult = new RegExp(`^${limpiarTexto(searchText)}`, 'gi');

            textoIngresado = searchText;

            let ciud = resultado.ciudad_tienda;

            let ciudad = limpiarTexto(ciud);

            return ciudad;
        }
    );

    if (searchText.length === 0) {
        compararResultado = [];
        contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
    } else if (searchText.length > 2) {
        printRes(compararResultado);
    }

}
const printRes = compararResultado => {
    listaCoincidencias.innerHTML = "";
    content.innerHTML = "";
    resultSearch.innerHTML = "";
    let lists = "";
    carrusel.style.display = "none";
    if (compararResultado.length > 0) {
        contInput.innerHTML = `<i class="alk-icon-close icon-search" title="Limpiar campo"></i>`;
        contInput.addEventListener('click', () => {
            buscador.value = "";
            contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
            listaCoincidencias.innerHTML = "";
            buscador.setAttribute("placeholder", "Ingresa tu municipio o departamento");
            buscador.focus();
        }, 4000);
        let ciudadesEx = new Set();
        const opciones = compararResultado.map(card => {

            let ciudad = card.ciudad_tienda;
            let text = buscador.value;
            let textLimpio = limpiarTexto(text);
            let ciudLimpio = limpiarTexto(ciudad);
            if (ciudLimpio.includes(textLimpio) && !ciudadesEx.has(ciudLimpio)) {

                buscador.style.border = "";
                listaCoincidencias.style.display = "block";
                listaCoincidencias.innerHTML +=
                    `<span id="${ciudLimpio}" class="selectOp"><div class="dropdown-item">
            <div class="panel panel-default">
            <div class="panel-heading">
            <p><i class="alk-icon-pin-generico"></i> ${ciudad}</p>
            </div>
            </div>
            </div></span>`;
                ciudadesEx.add(ciudLimpio);
            }
        }).join('');
    }
    lists = listaCoincidencias.querySelectorAll("span");

    for (let i = 0; i < lists.length; i++) {
        opSelect = lists[i].id;
        lists[i].addEventListener('click', function selectCard() {
            console.log(lists[i].id);
            buscador.setAttribute("placeholder", lists[i].innerText);
            cardSeleccionada(lists[i].id);
        });
    }
    if (lists.length === 0) {
        listaCoincidencias.style.display = "block";
        listaCoincidencias.innerHTML = `<div class="cont-no-results txt-center">
        
        <img class="img img-responsive" src="https://www.alkosto.com/medias/no-resultados-envio.png?context=bWFzdGVyfG1ldG9kb3MtZW52aW98MTA4MjB8aW1hZ2UvcG5nfGhjNS9oYWQvMTM1Njg3MDk1MjU1MzQvbm9fcmVzdWx0YWRvc19lbnZpby5wbmd8NDFjYmNlYWQ1YzFmYTRkNmEyZjdkOGY3Yzg5Mzk2Mjc2OWQ2NGI1ZTM0ZjhkMzU0ZmU1ZWEwZDA1ODBhZmNmYQ"/>
        <div class="txt-no-results txt-center">
        <h4>¡Aún no llegamos a tu destino!
        Seguimos trabajando para ello.</h4>
        </div>
        </div>`;
        buscador.style.border = "1px solid #DD171B";
        contInput.innerHTML = `<i class="alk-icon-close icon-borrar" title="Limpiar campo"></i>`;
        contInput.addEventListener('click', () => {
            contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
            buscador.value = "";
            buscador.style.border = "";
            buscador.setAttribute("placeholder", "Ingresa el nombre de tu municipio");
            buscador.focus();
            allStores();
        })
    }
}


const cardSeleccionada = sel => {
    contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
    listaCoincidencias.style.display = "none";
    filterCiudad = globalData["info-all"].filter((i) => {
        return limpiarTexto(i.ciudad_tienda) == sel;
    })
    btn_tiendas.classList.remove("hidden");
    buscador.value = "";
    infoTiendas(filterCiudad)
    return filterCiudad;
}
allTiendas()
btn_tiendas.addEventListener("click", allStores);
buscador.addEventListener('input', () => buscarResultados(buscador.value));