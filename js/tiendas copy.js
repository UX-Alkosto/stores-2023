// Configuración inicial
const fecha = new Date();
const horas = String(fecha.getHours()).padStart(2, '0');
const minutos = String(fecha.getMinutes()).padStart(2, '0');
const formatoHora = `${horas}:${minutos}`;

const urlSite = window.location.href.split("/")[2];

const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const numeroDia = fecha.getDay();
const mesActual = fecha.getMonth();
const diaActual = fecha.getDate();

// URLs de las APIs
const urlAPIs = {
    "www.alkosto.com": {
        url: "https://feeds.datafeedwatch.com/95958/3a4f7dba63e51e01ff8ad165f123a825cf30f99b.json",
        nombre: "Tiendas Alkosto"
    },
    "www.ktronix.com": {
        url: "https://feeds.datafeedwatch.com/95958/fb2f5eb90322be8f5cb1aea469a4551436034440.json",
        nombre: "Tiendas Ktronix"
    },
    "www.alkomprar.com": {
        url: "https://feeds.datafeedwatch.com/95958/c75c33c5369da362ae3e6fafb56ecd0b0ef78319.json",
        nombre: "Tiendas Alkomprar"
    }
};

const urlFestivos = "https://feeds.datafeedwatch.com/95958/8f39d01dbf20fb76ea7b59f3edbbaddc82cfe4ba.json";

// Elementos del DOM
const buscador = document.getElementById('search');
const listaCoincidencias = document.getElementById('listaCoincidencias');
const content = document.getElementById('content');
const resultSearch = document.querySelector("#result-search");
const carrusel = document.querySelector("#cont-carrusel");

const contInput = document.querySelector("#cont-input");

// Variables globales
let globalData = {};
let festivosData = [];
let esFestivo = false;
let todasLasTiendas = []; // Guardar todas las tiendas filtradas
let ciudadesDisponibles = []; // Guardar ciudades disponibles

const configSitio = urlAPIs[urlSite] || urlAPIs["www.ktronix.com"];
const urlAPI = configSitio.url;
const site = configSitio.nombre;

// Función para normalizar texto
function limpiarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[ñ]/gi, "n")
        .replace(/[\s()/*´'{}]+/gi, "-")
        .toLowerCase();
}

// Cargar festivos desde JSON
async function cargarFestivos() {
    try {
        const response = await fetch(urlFestivos);
        const data = await response.json();
        festivosData = data.products;

        const festivoMes = festivosData[mesActual];

        if (festivoMes && festivoMes.festivos) {
            const festivosArray = JSON.parse(festivoMes.festivos);
            esFestivo = festivosArray.includes(diaActual);
        }
    } catch (error) {
        console.error("Error cargando festivos:", error);
        esFestivo = false;
    }
}

// Cargar todas las tiendas
async function allTiendas() {
    try {
        const response = await fetch(urlAPI);
        const data = await response.json();
        globalData["info-all"] = data.products;
        infoTiendas(globalData["info-all"]);
    } catch (error) {
        console.error("Error cargando tiendas:", error);
    }
    buscador.setAttribute("placeholder", "Ingresa el nombre de tu municipio");
    buscador.value = "";
    contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
}

// Mostrar todas las tiendas
function allStores() {
    buscador.setAttribute("placeholder", "Ingresa tu municipio o departamento");
    infoTiendas(globalData["info-all"]);
}

// Formatear horario
function formatearHorario(apertura, cierre) {
    if (apertura === "Cerrado" || cierre === "Cerrado") {
        return "Cerrado";
    }
    const horaCierre = parseInt(cierre.substr(0, 2)) - 12;
    const minutosCierre = cierre.substr(2, 3);
    return `${apertura.substr(0, 5)} a. m. - ${horaCierre}${minutosCierre} p. m.`;
}

// Obtener horario del día
function obtenerHorarioDia(tienda, dia) {
    const horarios = {
        1: { ap: tienda.ap_lun, cie: tienda.cie_lun },
        2: { ap: tienda.ap_mar, cie: tienda.cie_mar },
        3: { ap: tienda.ap_mie, cie: tienda.cie_mie },
        4: { ap: tienda.ap_jue, cie: tienda.cie_jue },
        5: { ap: tienda.ap_vie, cie: tienda.cie_vie },
        6: { ap: tienda.ap_sab, cie: tienda.cie_sab },
        0: { ap: tienda.ap_dom, cie: tienda.cie_dom }
    };

    const horario = esFestivo && dia !== 0 ? horarios[0] : horarios[dia];
    return horario;
}

// Verificar si está abierto
function estaAbierto(horario) {
    if (!horario || horario.ap === "Cerrado" || horario.cie === "Cerrado") {
        return false;
    }

    const apertura = horario.ap.substr(0, 5);
    const cierreHora = parseInt(horario.cie.substr(0, 2));
    const cierreMin = horario.cie.substr(2, 3);
    const cierre = `${cierreHora}${cierreMin}`;

    return apertura <= formatoHora && cierre >= formatoHora;
}

// Generar card de tienda
function generarCardTienda(tienda, index) {
    const horario = obtenerHorarioDia(tienda, numeroDia);
    const abierto = estaAbierto(horario);

    const badge = abierto
        ? '<span class="badge bg-primary">Abierto</span>'
        : '<span class="badge bg-danger">Cerrado</span>';

    let horarioDia = "";
    if (horario && horario.ap !== "Cerrado" && horario.cie !== "Cerrado") {
        const horaCierre = parseInt(horario.cie.substr(0, 2)) - 12;
        const minCierre = horario.cie.substr(2, 3);
        horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i> hoy de ${horario.ap.substr(0, 5)} a. m. - ${horaCierre}${minCierre} p. m.</p>`;
    } else {
        horarioDia = `<p class="horario abierto"><i class="alk-icon-clock"></i>Cerrado</p>`;
    }

    const horariosCompletos = {
        lunes: formatearHorario(tienda.ap_lun, tienda.cie_lun),
        martes: formatearHorario(tienda.ap_mar, tienda.cie_mar),
        miercoles: formatearHorario(tienda.ap_mie, tienda.cie_mie),
        jueves: formatearHorario(tienda.ap_jue, tienda.cie_jue),
        viernes: formatearHorario(tienda.ap_vie, tienda.cie_vie),
        sabado: formatearHorario(tienda.ap_sab, tienda.cie_sab),
        domingo: formatearHorario(tienda.ap_dom, tienda.cie_dom)
    };

    return `
        <div class="col-sm-6 col-md-4">
            <div class="card">
                <div class="card-header">
                    <h2 class="card-subtitle">${tienda.nombre_tienda}</h2>
                    ${badge}
                </div>
                <div class="card-body">
                    <div class="cont-info-card">
                        <p class="horario-tienda">${tienda.dir_tienda}</p>
                        <p class="ciudad-tienda">${tienda.ciudad_tienda}</p>
                        <div data-toggle="collapse" data-target="#horariosAcordion${index}" class="accordion-button collapsed">
                            ${horarioDia}
                        </div>
                        <div class="collapse" id="horariosAcordion${index}">
                            <ul class="list-horario">
                                <li>Lunes: ${horariosCompletos.lunes}</li>
                                <li>Martes: ${horariosCompletos.martes}</li>
                                <li>Miércoles: ${horariosCompletos.miercoles}</li>
                                <li>Jueves: ${horariosCompletos.jueves}</li>
                                <li>Viernes: ${horariosCompletos.viernes}</li>
                                <li>Sábado: ${horariosCompletos.sabado}</li>
                                <li>Domingo: ${horariosCompletos.domingo}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row d-flex">
                        <a class="btn-detail" href="${tienda.url_tienda}" title="ir a tienda ${tienda.nombre_tienda}">
                            <div class="btn-card">Ver detalle</div>
                        </a>
                        <a class="btn-detail" href="${tienda.url_llegar}" title="Como llegar a ${tienda.nombre_tienda}">
                            <div class="btn-card bl-d">Cómo llegar</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generar badges de ciudades (MEJORADO)
function generarBadgesCiudades(tiendasOrdenadas, ciudadSeleccionada = null) {
    const contBadges = document.querySelector("#cont-badge-city");
    if (!contBadges) return;

    // Obtener ciudades únicas
    ciudadesDisponibles = [...new Set(tiendasOrdenadas.map(tienda =>
        tienda.ciudad_tienda?.trim().split(",")[0]
    ).filter(Boolean))];

    // Ordenar alfabéticamente
    ciudadesDisponibles.sort();

    // Generar HTML de badges
    let badgesHTML = `
        <div class="badges_item badges_item-html ${!ciudadSeleccionada ? 'badge-selected-cyd' : ''}" data-ciudad="todas">
            <div class="badges_item_text">Todas las tiendas</div>
        </div>
    `;

    badgesHTML += ciudadesDisponibles.map(ciudad => `
        <div class="badges_item badges_item-html ${limpiarTexto(ciudad) === ciudadSeleccionada ? 'badge-selected-cyd' : ''}" data-ciudad="${limpiarTexto(ciudad)}">
            <div class="badges_item_text">${ciudad}</div>
        </div>
    `).join("");

    badgesHTML += `
        <div class="badges_item badges_item-html badges_item-otras" data-ciudad="otras">
            <div class="badges_item_text"><i class="alk-icon-search-mobile icon-search"></i>Otras ciudades</div>
        </div>
    `;

    contBadges.innerHTML = badgesHTML;

    // Agregar event listeners
    const optionsBadge = document.querySelectorAll(".badges_item-html");
    optionsBadge.forEach((badge) => {
        badge.addEventListener("click", function () {
            const ciudadData = this.getAttribute('data-ciudad');

            if (ciudadData === 'todas') {
                // Mostrar todas las tiendas
                optionsBadge.forEach(b => b.classList.remove("badge-selected-cyd"));
                this.classList.add("badge-selected-cyd");
                mostrarTiendasFiltradas(todasLasTiendas);
                listaCoincidencias.style.display = "none";
                listaCoincidencias.innerHTML = "";
                buscador.value = "";
                contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
            } else if (ciudadData === 'otras') {
                // Focus en buscador
                buscador.focus();
                buscador.value = "";
                listaCoincidencias.innerHTML = "";
                listaCoincidencias.style.display = "none";
            } else {
                // Filtrar por ciudad específica
                optionsBadge.forEach(b => b.classList.remove("badge-selected-cyd"));
                this.classList.add("badge-selected-cyd");
                cardSeleccionada(ciudadData, false); // false = no regenerar badges
            }
        });
    });
}

// Mostrar tiendas filtradas (NUEVA FUNCIÓN)
function mostrarTiendasFiltradas(tiendas) {

    if (tiendas.length > 0) {
        const cardsHTML = tiendas.map((tienda, index) =>
            generarCardTienda(tienda, index)
        ).join("");

        content.innerHTML = cardsHTML;

        document.addEventListener('click', function (event) {
            if (!event.target.classList.contains('accordion-button')) {
                const collapses = document.querySelectorAll('.collapse.show');
                collapses.forEach(collapse => {
                    if (typeof bootstrap !== 'undefined') {
                        const bsCollapse = new bootstrap.Collapse(collapse, { toggle: false });
                        bsCollapse.hide();
                    }
                });
            }
        });
    }
}

// Mostrar información de tiendas (MEJORADO)
function infoTiendas(info) {
    listaCoincidencias.innerHTML = "";
    content.innerHTML = "";
    resultSearch.innerHTML = "";

    if (!info || info.length === 0) return;

    const tiendasFiltradas = info.filter(element => element.tienda === site);
    const tiendasOrdenadas = tiendasFiltradas.sort((a, b) =>
        a.ciudad_tienda.localeCompare(b.ciudad_tienda)
    );

    // Guardar todas las tiendas globalmente
    todasLasTiendas = tiendasOrdenadas;

    // Generar badges (sin ciudad seleccionada = mostrar todas)
    generarBadgesCiudades(tiendasOrdenadas);

    if (tiendasOrdenadas.length > 0) {
        mostrarTiendasFiltradas(tiendasOrdenadas);
    } else {
        const ciudadEnvio = info[0];
        content.innerHTML = `
            <div class="col-md-12">
                <p>Actualmente no contamos con una tienda física en tu destino, pero recuerda que tienes <b>envío gratis a ${ciudadEnvio.ciudad_tienda}</b> por todas tus compras en línea.</p>
            </div>
            <div class="col-sm-6 col-md-4">
                <div class="cont-card">
                    <div class="card">
                        <div class="card-header header-envio">
                            <h2 class="card-subtitle env">${ciudadEnvio.ciudad_tienda}</h2>
                            <span class="badge bg-primary">Envío gratis</span>
                        </div>
                        <div class="card-body">
                            <p class="txt-blue">Tiempo estimado de entrega: ${ciudadEnvio.dias_entrega} días hábiles.</p>
                            <div class="cont-horario">
                                <div class="cnt-icon">
                                    <i class="alk-icon-clock"></i>
                                </div>
                                <div class="txt-horario">
                                    <p class="m-0">Lunes a Domingo</p>
                                    <p>${ciudadEnvio.hor_entrega}</p>
                                </div>
                            </div>
                        </div>
                        <a href="/entregas-devoluciones/envio-gratis" class="btn-envio">
                            <div class="cnt-btn-envio">Conoce más sobre envío gratis</div>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Buscar resultados
let resultadosPrevios = new Set();

async function buscarResultados(searchText) {

    const consulta = globalData["info-all"];

    if (searchText.length < 3) {
        listaCoincidencias.innerHTML = "";
        contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
        resultadosPrevios.clear();
        return;
    }

    const compararResultado = consulta.filter(resultado => {
        const ciudad = limpiarTexto(resultado.ciudad_tienda);
        return ciudad.includes(limpiarTexto(searchText));
    });

    const nuevosResultados = new Set(compararResultado.map(r => limpiarTexto(r.ciudad_tienda)));

    if (compararSets(resultadosPrevios, nuevosResultados)) return;

    resultadosPrevios = nuevosResultados;
    printRes(compararResultado);
}

// Comparar sets
function compararSets(set1, set2) {
    if (set1.size !== set2.size) return false;
    for (let item of set1) {
        if (!set2.has(item)) return false;
    }
    return true;
}

// Imprimir resultados de búsqueda
function printRes(compararResultado) {
    listaCoincidencias.innerHTML = "";
    content.innerHTML = "";
    resultSearch.innerHTML = "";

    if (carrusel) carrusel.style.display = "none";

    if (compararResultado.length === 0) {
        mostrarNoResultados();
        return;
    }

    contInput.innerHTML = `<i class="alk-icon-close icon-search" title="Limpiar campo"></i>`;

    const ciudadesUnicas = new Set();
    const textoBusqueda = limpiarTexto(buscador.value);

    compararResultado.forEach(card => {
        const ciudadLimpia = limpiarTexto(card.ciudad_tienda);

        if (ciudadLimpia.includes(textoBusqueda) && !ciudadesUnicas.has(ciudadLimpia)) {
            buscador.style.border = "";
            listaCoincidencias.style.display = "block";
            listaCoincidencias.innerHTML += `
                <span id="${ciudadLimpia}" class="selectOp">
                    <div class="dropdown-item">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <p><i class="alk-icon-pin-generico"></i> ${card.ciudad_tienda}</p>
                            </div>
                        </div>
                    </div>
                </span>
            `;
            ciudadesUnicas.add(ciudadLimpia);
        }
    });

    const opciones = listaCoincidencias.querySelectorAll("span");
    opciones.forEach(opcion => {
        opcion.addEventListener('click', function () {
            buscador.setAttribute("placeholder", this.innerText);
            cardSeleccionada(this.id, true);
        });
    });
}

// Mostrar mensaje de no resultados
function mostrarNoResultados() {
    listaCoincidencias.style.display = "block";
    listaCoincidencias.innerHTML = `
        <div class="cont-no-results txt-center">
            <img class="img img-responsive" src="https://media.aws.alkomprar.com/ymarketingcolcomercio/Alkosto/envio-gratis/envio_no_encontrado.png"/>
            <div class="txt-no-results txt-center">
                <h4>¡Aún no llegamos a tu destino! Seguimos trabajando para ello.</h4>
            </div>
        </div>
    `;
    buscador.style.border = "1px solid #DD171B";
    contInput.innerHTML = `<i class="alk-icon-close icon-borrar" title="Limpiar campo"></i>`;
}

// Seleccionar ciudad (MEJORADO)
function cardSeleccionada(ciudadId, regenerarBadges = true) {

    buscador.setAttribute("placeholder", "Ingresa el nombre de tu municipio");
    buscador.value = "";
    

    contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
    listaCoincidencias.style.display = "none";

    const filterCiudad = todasLasTiendas.filter(tienda =>
        limpiarTexto(tienda.ciudad_tienda?.trim().split(",")[0]) === ciudadId?.trim().split(",")[0]
    );

    buscador.value = "";

    // Mostrar tiendas filtradas
    if (filterCiudad.length === 0) {
        console.log("cero", ciudadId);

        const info = globalData["info-all"].filter(tienda =>
            limpiarTexto(tienda.ciudad_tienda?.trim().split(",")[0]) === ciudadId?.trim().split(",")[0]
        );

        console.log(info);



        const ciudadEnvio = info[0];
        content.innerHTML = `
             <div class="col-md-12">
                 <p>Actualmente no contamos con una tienda física en tu destino, pero recuerda que tienes <b>envío gratis a ${ciudadEnvio.ciudad_tienda}</b> por todas tus compras en línea.</p>
             </div>
             <div class="col-sm-6 col-md-4">
                 <div class="cont-card">
                     <div class="card">
                         <div class="card-header header-envio">
                             <h2 class="card-subtitle">${ciudadEnvio.ciudad_tienda}</h2>
                             <span class="badge bg-primary">Envío gratis</span>
                         </div>
                         <div class="card-body">
                             <p class="txt-blue">Tiempo estimado de entrega: ${ciudadEnvio.dias_entrega} días hábiles.</p>
                             <div class="cont-horario">
                                 <div class="cnt-icon">
                                     <i class="alk-icon-clock"></i>
                                 </div>
                                 <div class="txt-horario">
                                     <p class="m-0">Lunes a Domingo</p>
                                     <p>${ciudadEnvio.hor_entrega}</p>
                                 </div>
                             </div>
                         </div>
                         <a href="/entregas-devoluciones/envio-gratis" class="btn-envio">
                             <div class="cnt-btn-envio">Conoce más sobre envío gratis</div>
                         </a>
                     </div>
                 </div>
             </div>
         `;
    } else {
        mostrarTiendasFiltradas(filterCiudad);
    }


    // Regenerar badges manteniendo la selección
    if (regenerarBadges) {
        generarBadgesCiudades(todasLasTiendas, ciudadId);
    }
}

// Event listeners
contInput.addEventListener('click', () => {
    if (contInput.querySelector('.icon-borrar') || contInput.querySelector('.icon-search.alk-icon-close')) {
        buscador.value = "";
        contInput.innerHTML = `<i class="alk-icon-search-mobile icon-search"></i>`;
        listaCoincidencias.innerHTML = "";
        buscador.style.border = "";
        buscador.setAttribute("placeholder", "Ingresa tu municipio o departamento");
        buscador.focus();
        allStores();
    } else {
        buscador.focus();
    }
});


buscador.addEventListener('input', () => buscarResultados(buscador.value));

// Inicialización
async function init() {
    await cargarFestivos();
    await allTiendas();
}

init();