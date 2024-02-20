const fecha = new Date();
const hora = fecha.toLocaleTimeString();
const horaMin = hora.substr(0, 5);
const horas = ((fecha.getHours() < 10) ? "0" : "") + fecha.getHours();
const minutos = ((fecha.getMinutes() < 10) ? "0" : "") + fecha.getMinutes();

const urlPrueba = "https://www.ktronix.com/nuestra-compania/tiendas/c/tiendas";
const urlSite = urlPrueba.split("/")[2];
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
        .then(data => infoTiendas(data));

    btn_tiendas.classList.add("hidden");
    buscador.setAttribute("placeholder", "Ingresa el nombre de tu municipio");
    buscador.value = "";
    contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
}


const infoTiendas = data => {
    globalData["data"] = data.products;
    let info = globalData["data"];
    listaCoincidencias.innerHTML = "";
    content.innerHTML = "";
    resultSearch.innerHTML = "";
    let filtroTienda = info.filter(element => element.tienda == site);
    const orderTiendas = filtroTienda.sort((a, b) =>
        a.nombre_tienda.localeCompare(b.nombre_tienda)
    );
    buscador.setAttribute("placeholder", "Ingresa el nombre de tu municipio");
    let mapTiendas = orderTiendas.map((t, id) => {
        let idTienda = id;
        let direccion = t.dir_tienda;
        let mapsUrl = t.url_llegar;
        let urlTienda = t.url_tienda;
        let horarioDia = "";
        horLunes = "";
        t.ap_lun == "Cerrado" && t.cie_lun == "Cerrado" ? horLunes = "Cerrado" : horLunes = `${t.ap_lun.substr(0, 5)} a.m. - ${t.cie_lun.substr(0, 2) - 12}${t.cie_lun.substr(2, 3)} p.m.`;
        horMartes = "";
        t.ap_mar == "Cerrado" && t.cie_mar == "Cerrado" ? horMartes = "Cerrado" : horMartes = `${t.ap_mar.substr(0, 5)} a.m. - ${t.cie_mar.substr(0, 2) - 12}${t.cie_mar.substr(2, 3)} p.m.`;
        horMie = "";
        t.ap_mie == "Cerrado" && t.cie_mie == "Cerrado" ? horMie = "Cerrado" : horMie = `${t.ap_mie.substr(0, 5)} a.m. - ${t.cie_mie.substr(0, 2) - 12}${t.cie_mie.substr(2, 3)} p.m.`;
        horJueves = "";
        t.ap_jue == "Cerrado" && t.cie_jue == "Cerrado" ? horJueves = "Cerrado" : horJueves = `${t.ap_jue.substr(0, 5)} a.m. - ${t.cie_jue.substr(0, 2) - 12}${t.cie_jue.substr(2, 3)} p.m.`;
        horViernes = "";
        t.ap_vie == "Cerrado" && t.cie_vie == "Cerrado" ? horViernes = "Cerrado" : horViernes = `${t.ap_vie.substr(0, 5)} a.m. - ${t.cie_vie.substr(0, 2) - 12}${t.cie_vie.substr(2, 3)} p.m.`;
        horSab = "";
        t.ap_sab == "Cerrado" && t.cie_sab == "Cerrado" ? horSab = "Cerrado" : horSab = `${t.ap_sab.substr(0, 5)} a.m. - ${t.cie_sab.substr(0, 2) - 12}${t.cie_sab.substr(2, 3)} p.m.`;
        horDom = "";
        t.ap_dom == "Cerrado" && t.cie_dom == "Cerrado" ? horDom = "Cerrado" : horDom = `${t.ap_dom.substr(0, 5)} a.m. - ${t.cie_dom.substr(0, 2) - 12}${t.cie_dom.substr(2, 3)} p.m.`;

        switch (numeroDia) {
            case 1:
                if (t.ap_lun != "Cerrado" || t.cie_lun != "Cerrado") {

                    var hora_apertura = t.ap_lun.substr(0, 5);
                    var aj_hora_cierre = t.cie_lun.substr(0, 2) - 12;
                    var aj_hora_cierre2 = t.cie_lun.substr(2, 3);
                    var hora_cierre = `${aj_hora_cierre}${aj_hora_cierre2}`;
                    var horTienda = "";

                    horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a.m. - ${hora_cierre} p.m.</p>`;

                } else {
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
                    horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a.m. - ${hora_cierre} p.m.</p>`;

                } else {
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
                    horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a.m. - ${hora_cierre} p.m.</p>`;

                } else {
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
                    horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a.m. - ${hora_cierre} p.m.</p>`;
                    console.log("Jueves");
                } else {
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
                    horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a.m. - ${hora_cierre} p.m.</p>`;
                    console.log("Viernes");
                    break;
                } else {
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
                        horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a.m. - ${hora_cierre} p.m.</p>`;
                        console.log("Sabado");
                    } else {
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
                        horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${hora_apertura} a.m. - ${hora_cierre} p.m.</p>`;
                        console.log("Domingo");
                    } else {
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
                        <p>${direccion}</p>
                        <div data-toggle="collapse" data-target="#horariosAcordion${idTienda}" aria-expanded="false" aria-controls="horariosAcordion${idTienda}" class="accordion-button collapsed">
                        ${horarioDia}
                        </div>
                        <div class="collapse" id="horariosAcordion${idTienda}">
                        <ul class="list-horario">
                        <li>Lunes: ${horLunes} </li>
                        <li>Martes: ${t.ap_mar.substr(0, 5)} a.m. - ${t.cie_mar.substr(0, 2) - 12}${t.cie_mar.substr(2, 3)} p.m.</li>
                        <li>Miércoles: ${t.ap_mie.substr(0, 5)} a.m. - ${t.cie_mie.substr(0, 2) - 12}${t.cie_mie.substr(2, 3)} p.m.</li>
                        <li>Jueves: ${t.ap_jue.substr(0, 5)} a.m. - ${t.cie_jue.substr(0, 2) - 12}${t.cie_jue.substr(2, 3)} p.m.</li>
                        <li>Viernes: ${t.ap_vie.substr(0, 5)} a.m. - ${t.cie_vie.substr(0, 2) - 12}${t.cie_vie.substr(2, 3)} p.m.</li>
                        <li>Sábado: ${t.ap_sab.substr(0, 5)} a.m. - ${t.cie_sab.substr(0, 2) - 12}${t.cie_sab.substr(2, 3)} p.m.</li>
                        <li>Domingo: ${t.ap_dom.substr(0, 5)} a.m. - ${t.cie_dom.substr(0, 2) - 12}${t.cie_dom.substr(2, 3)} p.m.</li>
                        </ul>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-xs-6 txt-center b-right-2 p-0">
                        <div class="cnt-btn border-left">
                        <a href="${urlTienda}" class="a-footer">Ver detalle</a>
                        </div>
                        </div>
                        <div class="col-xs-6 txt-center p-0">
                        <div class="cnt-btn border-right">
                        <a href="${mapsUrl}" target="_blank" rel="nofollow noopener noreferrer" class="a-footer">Cómo llegar <i class="alk-icon-arrive"></i></a>
                        </div>
                        </div>
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
}



const buscarResultados = async searchText => {

    consulta = globalData["data"];
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
        btn_tiendas.innerHTML = "";
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

            lists = listaCoincidencias.querySelectorAll("span");
            let filterCiudad;
            for (let i = 0; i < lists.length; i++) {
                opSelect = lists[i].id;
                lists[i].addEventListener('click', selectCard);


            }


        }).join('');
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
            allTiendas();
        })
    }
}

function selectCard() {
    contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
    listaCoincidencias.style.display = "none";
    cardSeleccionada(opSelect);
}
const cardSeleccionada = sel => {
    filterCiudad = globalData["data"].filter((i) => {
        return limpiarTexto(i.ciudad_tienda) == sel;
    })
    cardView(filterCiudad);
    return filterCiudad;
}

const cardView = card => {
    console.log(card);
    card.map(i => {
        console.log(i);
        /* let tiendas = i.info_tienda;
        let ciudad = i.value;
        let ciudadCorto = i.label;
        let depto = i.dep;
        let descript = i.desc;
        if (opSelect == ciudad) {
            btn_tiendas.classList.remove("hidden");
            carrusel.style.display = "block";
            buscador.setAttribute("placeholder", opSelect + ", " + depto);
            resultSearch.innerHTML = `<h4>El resultado para tu busqueda en "${opSelect}" es:</h4>`;

            buscador.value = "";
            if (descript == "tienda") {
                let infoTienda = tiendas.map(t => {
                    let idTienda = t.id_tienda;
                    let direccion = t.direccion;
                    let hora_apertura = t.hora_apertura;
                    let hora_aperturaDom = t.hora_apertura_dom;
                    let horaCloseDom = t.hora_cierre_dom;
                    let horaClose = t.hora_cierre;
                    let horaFormato1 = horaClose.substr(0, 2) - 12;
                    let horaFormato2 = horaClose.substr(2, 5);
                    let horaFormato1Dom = horaCloseDom.substr(0, 2) - 12;
                    let horaFormato2Dom = horaClose.substr(2, 5);
                    let wazeUrl = t.como_llegar_waze;
                    let mapsUrl = t.como_llegar;
                    let urlTienda = t.url_tienda;
                    let nameTienda = t.nombre_tienda;
                    let horario = numeroDia == 6 ? `<p class="horario abierto"> <i class="alk-icon-clock"></i> hoy de {hora_aperturaDom} a.m. - {horaFormato1Dom}{horaFormato2Dom} p.m.</p>` : `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de {hora_apertura} a.m. - {horaFormato1}{horaFormato2} p.m.</p>`;
                    let horTienda = hora_apertura <= formatoHora && horaClose >= formatoHora ? `<h2 class="card-subtitle">
                        ${t.nombre_tienda} <span class="badge bg-primary">Abierto</span>
                        </h2>` : `<h2 class="card-subtitle">
                        ${t.nombre_tienda} <span class="badge bg-danger">Cerrado</span>
                        </h2>`;
                    let horarioDiasHabiles = `Lun a Sab: {hora_apertura} - {horaClose}`;
                    let horarioFestivos = `Dom y Fes: {hora_aperturaDom} - {horaCloseDom}`;
                    let retorno = {
                        ciudad,
                        depto,
                        nameTienda,
                        horaFormato1,
                        horaFormato2,
                        horaFormato1Dom,
                        horaFormato2Dom,
                        hora_aperturaDom,
                        hora_apertura,
                        horario,
                        urlTienda,
                        horTienda,
                        idTienda,
                        direccion,
                        mapsUrl
                    }

                    return retorno
                });
                pintarCards(infoTienda);
            } else if (descript == "envio" || descript == undefined) {
                let desc = i.desc;
                let depto = i.dep;
                let diasEntrega = "";
                let tiempo_entrega = i.tiempo_entrega;
                tiempo_entrega == 1 ? diasEntrega = `<p class="txt-blue">Tiempo estimado de entrega: ${tiempo_entrega} día hábil.</p>` : diasEntrega = `<p class="txt-blue">Tiempo estimado de entrega: ${tiempo_entrega} días hábiles.</p>`;
                let horarioEntrega = i.horario_entrega;
                buscador.setAttribute("placeholder", opSelect + ", " + depto);

                retorno = {
                    ciudadCorto,
                    depto,
                    diasEntrega,
                    desc,
                    horarioEntrega
                }
                pintarEnvio(retorno);
            }
        } */
    });
}

function pintarCards(retorno) {
    let printCard = retorno.map((c) => renderCard(c));
    content.innerHTML = printCard.join("");
}

const renderCard = (c) => {
    btn_tiendas.innerHTML = `<a class="all-tiendas" style="float: right;" href="#" id="all-tiendas">Ver todas las
    tiendas</a>`;
    return `
   <div class="col-sm-6 col-md-4">
   <div class="card">
   <div class="card-header">
   ${c.horTienda}
   </div>
    <div class="card-body">
    <div class="cont-info-card">
<p>${c.direccion}</p>
<div data-toggle="collapse" data-target="#horariosAcordion${c.idTienda}" aria-expanded="false" aria-controls="horariosAcordion${c.idTienda}" class="accordion-button collapsed">
${c.horario}
</div>
<div class="collapse" id="horariosAcordion${c.idTienda}">
<ul class="list-horario">
<li>Lunes: ${c.hora_apertura} a.m. - ${c.horaFormato1}${c.horaFormato2} p.m. </li>
<li>Martes: ${c.hora_apertura} a.m. - ${c.horaFormato1}${c.horaFormato2} p.m. </li>
<li>Miércoles: ${c.hora_apertura} a.m. - ${c.horaFormato1}${c.horaFormato2} p.m. </li>
<li>Jueves: ${c.hora_apertura} a.m. - ${c.horaFormato1}${c.horaFormato2} p.m. </li>
<li>Viernes: ${c.hora_apertura} a.m. - ${c.horaFormato1}${c.horaFormato2} p.m. </li>
<li>Sábado: ${c.hora_apertura} a.m. - ${c.horaFormato1}${c.horaFormato2} p.m. </li>
<li>Domingo: ${c.hora_aperturaDom} a.m. - ${c.horaFormato1Dom}${c.horaFormato2Dom} p.m.</li>
</ul>
</div>
</div>

<div class="row">
<div class="col-xs-6 txt-center b-right-2 p-0">
<div class="cnt-btn border-left">
<a href="${c.urlTienda}" class="a-footer">Ver detalle</a>
</div>
</div>
<div class="col-xs-6 txt-center p-0">
<div class="cnt-btn border-right">
<a href="${c.mapsUrl}" target="_blank" rel="nofollow noopener noreferrer" class="a-footer">Cómo llegar <i class="alk-icon-arrive"></i></a>
</div>
</div>
</div>
   </div>
   </div>
   </div>
   `
}

const pintarEnvio = (e) => {
    btn_tiendas.innerHTML = `<a class="all-tiendas" style="float: right;" href="#" id="all-tiendas">Ver todas las
    tiendas</a>`;
    content.innerHTML = `
    <div class="col-md-12">
    <p>Actualmente no contamos con una tienda física en tu destino, pero recuerda que tienes <b>envío gratis a ${e.ciudadCorto}</b> por todas tus compras en línea.</p>
    </div>
    <div class="col-sm-6 col-md-4">
    <div class="cont-card">
        <div class="card">
            <div class="card-header header-envio">
                <div class="cont-depto"> <h2 class="card-subtitle">${e.ciudadCorto}</h2> <span class="txt-depto">${e.depto}</span></div> <span class="badge bg-primary">Envío gratis</span>
                
            </div>
            <div class="card-body">
            ${e.diasEntrega}
            <div class="cont-horario">
                <div class="cnt-icon">
                    <i class="alk-icon-clock"></i>
                </div>
                <div class="txt-horario">
                    <p class="m-0">Lunes a Domingo</p>
                    <p>${e.horarioEntrega}</p>
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
}


allTiendas()
btn_tiendas.addEventListener("click", allTiendas);
buscador.addEventListener('input', () => buscarResultados(buscador.value));