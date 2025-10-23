// Variables referenciando elementos del DOM (siguiendo IDs de index.html)
let unidades = document.getElementById('unidades');
// Selects - columna izquierda
let medidaLongitud = document.getElementById('medidaLongitud');
let medidaMasa = document.getElementById('medidaMasa');
let medidaTiempo = document.getElementById('medidaTiempo');
let medidaTemperatura = document.getElementById('medidaTemperatura');
let medidaArea = document.getElementById('medidaArea');
let medidaVolumen = document.getElementById('medidaVolumen');
let medidaVelocidad = document.getElementById('medidaVelocidad');
// Selects - columna derecha
let medidaLongitud2 = document.getElementById('medidaLongitud2');
let medidaMasa2 = document.getElementById('medidaMasa2');
let medidaTiempo2 = document.getElementById('medidaTiempo2');
let medidaTemperatura2 = document.getElementById('medidaTemperatura2');
let medidaArea2 = document.getElementById('medidaArea2');
let medidaVolumen2 = document.getElementById('medidaVolumen2');
let medidaVelocidad2 = document.getElementById('medidaVelocidad2');
const valorIzquierda = document.getElementById('valorIzquierda');
const valorDerecha = document.getElementById('valorDerecha')

let pairs = {
        "Longitud": [medidaLongitud, medidaLongitud2],
        "Masa": [medidaMasa, medidaMasa2],
        "Tiempo": [medidaTiempo, medidaTiempo2],
        "Temperatura": [medidaTemperatura, medidaTemperatura2],
        "Area": [medidaArea, medidaArea2],
        "Volumen": [medidaVolumen, medidaVolumen2],
        "Velocidad": [medidaVelocidad, medidaVelocidad2]
    };

function selectUnidadesMedida(){
    // Lista de pares (columna izquierda / columna derecha) por tipo de medida
    // Oculta todos los selects primero
    Object.keys(pairs).forEach(function(key){
        let elems = pairs[key];
        elems.forEach(function(el){
            if (el) el.style.display = 'none';
        });
    });

    // Mostrar sólo los correspondientes al valor seleccionado
    let selected = unidades && unidades.value;
    if (selected && pairs[selected]){
        pairs[selected].forEach(function(el){
            if (el) el.style.display = 'block';
        });
    }
}

// Inicializar visibilidad al cargar y cuando cambie la selección
if (unidades) unidades.addEventListener('change', selectUnidadesMedida);
// Ejecutar en DOMContentLoaded por si el script se carga en el head
document.addEventListener('DOMContentLoaded', selectUnidadesMedida);
//Operaciones Longitud

// Referencias a elementos <option> (ids definidos en index.html)
const unities = {
    Longitud: ['Milimetro', 'Centimetro', 'Metro', 'Kilometro', 'Pulgada', 'Pie', 'Yarda', 'Milla'],
    Masa: ['Miligramo', 'Gramo', 'Kilogramo', 'Tonelada', 'Libra', 'Onza'],
    Tiempo: ['Segundo', 'Minuto', 'Hora', 'Dia'],
    Temperatura: ['Celsius', 'Fahrenheit', 'Kelvin'],
    Area: ['Metro2', 'Kilometro2', 'Pie2', 'Pulgada2'],
    Volumen: ['Mililitro', 'Litro', 'MetroCubico', 'Galon'],
    Velocidad: ['MetroPorSegundo', 'KilometroPorHora', 'MillaPorHora', 'Nudo']
}



// Crear mapa de referencias a los elementos (undefined si no existe)
function crearMapaElementos(tipo){
    const mapa = {}
    unities[tipo].forEach(function(u){
        mapa[u] = document.getElementById(u)
    })
    return mapa
}

function crearPares(units, elems){
    const pares = {}
    for (let i =0; i < units.length; i++){
        const u1 = units[i]
        for (let j = 0; j < units.length; j++){
            const u2 = units[j]
            if (u1 == u2) continue
            const key = u1 + '_' + u2
            pares[key] = [elems[u1], elems[u2]]
        }
    }
    return pares
}

let relacionConversion = {
    Longitud: {
        Metro: {
            Metro: 1,
            Kilometro: 0.001,
            Milimetro: 1000,
            Centimetro: 100,
            Pulgada: 39.37,
            Pie: 3.28084,
            Yarda: 1.093613,
            Milla: 0.0006213712
        }
        ,
        Kilometro: {
            Metro: 1000,
            Kilometro: 1,
            Milimetro: 1000000,
            Centimetro: 100000,
            Pulgada: 39370.07874,
            Pie: 3280.84,
            Yarda: 1093.613,
            Milla: 0.6213712
        },
        Milimetro: {
            Metro: 0.001,
            Kilometro: 0.000001,
            Milimetro: 1,
            Centimetro: 0.1,
            Pulgada: 0.03937,
            Pie: 0.00328084,
            Yarda: 0.001093613,
            Milla: 0.0000006213712
        },
        Centimetro: {
            Metro: 0.01,
            Kilometro: 0.00001,
            Milimetro: 10,
            Centimetro: 1,
            Pulgada: 0.3937,
            Pie: 0.0328084,
            Yarda: 0.01093613,
            Milla: 0.000006213712
        },
        Pulgada: {
            Metro: 0.0254,
            Kilometro: 0.0000254,
            Milimetro: 25.4,
            Centimetro: 2.54,
            Pulgada: 1,
            Pie: 0.0833333,
            Yarda: 0.0277778,
            Milla: 0.000015782828
        },
        Pie: {
            Metro: 0.3048,
            Kilometro: 0.0003048,
            Milimetro: 304.8,
            Centimetro: 30.48,
            Pulgada: 12,
            Pie: 1,
            Yarda: 0.333333,
            Milla: 0.0001893939
        },
        Yarda: {
            Metro: 0.9144,
            Kilometro: 0.0009144,
            Milimetro: 914.4,
            Centimetro: 91.44,
            Pulgada: 36,
            Pie: 3,
            Yarda: 1,
            Milla: 0.0005681818
        },
        Milla: {
            Metro: 1609.344,
            Kilometro: 1.609344,
            Milimetro: 1609344,
            Centimetro: 160934.4,
            Pulgada: 63360,
            Pie: 5280,
            Yarda: 1760,
            Milla: 1
        }
    },
    Masa: {
        Miligramo: {
            Miligramo: 1,
            Gramo: 0.001,
            Kilogramo: 0.000001,
            Tonelada: 0.000000001,
            Libra: 0.0000022046226218,
            Onza: 0.0000352739619496
        },
        Gramo: {
            Miligramo: 1000,
            Gramo: 1,
            Kilogramo: 0.001,
            Tonelada: 0.000001,
            Libra: 0.0022046226218,
            Onza: 0.0352739619496
        },
        Kilogramo: {
            Miligramo: 1000000,
            Gramo: 1000,
            Kilogramo: 1,
            Tonelada: 0.001,
            Libra: 2.2046226218,
            Onza: 35.2739619496
        },
        Tonelada: {
            Miligramo: 1000000000,
            Gramo: 1000000,
            Kilogramo: 1000,
            Tonelada: 1,
            Libra: 2204.6226218488,
            Onza: 35273.9619496
        },
        Libra: {
            Miligramo: 453592.37,
            Gramo: 453.59237,
            Kilogramo: 0.45359237,
            Tonelada: 0.00045359237,
            Libra: 1,
            Onza: 16
        },
        Onza: {
            Miligramo: 28349.523125,
            Gramo: 28.349523125,
            Kilogramo: 0.028349523125,
            Tonelada: 0.000028349523125,
            Libra: 0.0625,
            Onza: 1
        }
    },
    Tiempo: {
        Nanosegundo: {
            Nanosegundo: 1,
            Microsegundo: 0.001,
            Milisegundo: 0.000001,
            Segundo: 0.000000001,
            Minuto: 1.6666666666666668e-11,
            Hora: 2.7777777777777776e-13,
            Dia: 1.1574074074074073e-14,
            Semana: 1.6534391534391535e-15,
            Mes: 3.8025708502020204e-16,
            Ano: 3.168808781402895e-17
        },
        Microsegundo: {
            Nanosegundo: 1000,
            Microsegundo: 1,
            Milisegundo: 0.001,
            Segundo: 0.000001,
            Minuto: 1.6666666666666667e-8,
            Hora: 2.7777777777777776e-10,
            Dia: 1.1574074074074074e-11,
            Semana: 1.6534391534391534e-12,
            Mes: 3.8025708502020206e-13,
            Ano: 3.168808781402895e-14
        },
        Milisegundo: {
            Nanosegundo: 1000000,
            Microsegundo: 1000,
            Milisegundo: 1,
            Segundo: 0.001,
            Minuto: 0.000016666666666666666,
            Hora: 2.7777777777777776e-7,
            Dia: 1.1574074074074074e-8,
            Semana: 1.6534391534391534e-9,
            Mes: 3.8025708502020206e-10,
            Ano: 3.168808781402895e-11
        },
        Segundo: {
            Nanosegundo: 1000000000,
            Microsegundo: 1000000,
            Milisegundo: 1000,
            Segundo: 1,
            Minuto: 0.016666666666666666,
            Hora: 0.0002777777777777778,
            Dia: 0.000011574074074074073,
            Semana: 1.6534391534391535e-6,
            Mes: 3.8025708502020206e-8,
            Ano: 3.168808781402895e-8
        },
        Minuto: {
            Nanosegundo: 60000000000,
            Microsegundo: 60000000,
            Milisegundo: 60000,
            Segundo: 60,
            Minuto: 1,
            Hora: 0.016666666666666666,
            Dia: 0.0006944444444444445,
            Semana: 9.92063492063492e-5,
            Mes: 1.2683805101206068e-5,
            Ano: 1.9017583212045363e-6
        },
        Hora: {
            Nanosegundo: 3600000000000,
            Microsegundo: 3600000000,
            Milisegundo: 3600000,
            Segundo: 3600,
            Minuto: 60,
            Hora: 1,
            Dia: 0.041666666666666664,
            Semana: 0.005952380952380952,
            Mes: 0.00027473008568223614,
            Ano: 0.00011407777777777777
        },
        Dia: {
            Nanosegundo: 86400000000000,
            Microsegundo: 86400000000,
            Milisegundo: 86400000,
            Segundo: 86400,
            Minuto: 1440,
            Hora: 24,
            Dia: 1,
            Semana: 0.14285714285714285,
            Mes: 0.011574074074074073,
            Ano: 0.002737909090909091
        },
        Semana: {
            Nanosegundo: 604800000000000,
            Microsegundo: 604800000000,
            Milisegundo: 604800000,
            Segundo: 604800,
            Minuto: 10080,
            Hora: 168,
            Dia: 7,
            Semana: 1,
            Mes: 0.08001851851851852,
            Ano: 0.021564363636363636
        },
        Mes: {
            Nanosegundo: 2629746000000000,
            Microsegundo: 2629746000000,
            Milisegundo: 2629746000,
            Segundo: 2629746,
            Minuto: 43829.1,
            Hora: 730.485,
            Dia: 30.436875,
            Semana: 4.348125,
            Mes: 1,
            Ano: 0.08333333333333333
        },
        Ano: {
            Nanosegundo: 31556952000000000,
            Microsegundo: 31556952000000,
            Milisegundo: 31556952000,
            Segundo: 31556952,
            Minuto: 525949.2,
            Hora: 8765.82,
            Dia: 365.2425,
            Semana: 52.1775,
            Mes: 12,
            Ano: 1
        }
    },
    Temperatura: {
        // Para temperatura usamos transformaciones afines: valor_destino = valor_origen * factor + offset
        // Representado como objeto {factor: <n>, offset: <m>} para cada par
        Celsius: {
            Celsius: {factor: 1, offset: 0},
            Fahrenheit: {factor: 9/5, offset: 32},
            Kelvin: {factor: 1, offset: 273.15}
        },
        Fahrenheit: {
            Celsius: {factor: 5/9, offset: -32 * 5/9},
            Fahrenheit: {factor: 1, offset: 0},
            Kelvin: {factor: 5/9, offset: 255.3722222222222} // (F-32)*5/9 +273.15 -> factor=5/9 offset = -32*5/9+273.15
        },
        Kelvin: {
            Celsius: {factor: 1, offset: -273.15},
            Fahrenheit: {factor: 9/5, offset: -459.67}, // K to F: (K-273.15)*9/5 +32 = K*9/5 -459.67
            Kelvin: {factor: 1, offset: 0}
        }
    },
    Area: {
        MilimetroCuadrado: {
            MilimetroCuadrado: 1,
            CentimetroCuadrado: 0.01,
            MetroCuadrado: 0.000001,
            KilometroCuadrado: 1e-12,
            Hectarea: 1e-8,
            Acre: 2.471053814671653e-10
        },
        CentimetroCuadrado: {
            MilimetroCuadrado: 100,
            CentimetroCuadrado: 1,
            MetroCuadrado: 0.0001,
            KilometroCuadrado: 1e-10,
            Hectarea: 1e-6,
            Acre: 2.471053814671653e-8
        },
        MetroCuadrado: {
            MilimetroCuadrado: 1000000,
            CentimetroCuadrado: 10000,
            MetroCuadrado: 1,
            KilometroCuadrado: 0.000001,
            Hectarea: 0.0001,
            Acre: 0.0002471053814671653
        },
        KilometroCuadrado: {
            MilimetroCuadrado: 1e12,
            CentimetroCuadrado: 1e10,
            MetroCuadrado: 1000000,
            KilometroCuadrado: 1,
            Hectarea: 100,
            Acre: 247.10538146716537
        },
        Hectarea: {
            MilimetroCuadrado: 10000000000,
            CentimetroCuadrado: 100000000,
            MetroCuadrado: 10000,
            KilometroCuadrado: 0.01,
            Hectarea: 1,
            Acre: 2.471053814671653
        },
        Acre: {
            MilimetroCuadrado: 4046856422.4,
            CentimetroCuadrado: 40468564.224,
            MetroCuadrado: 4046.8564224,
            KilometroCuadrado: 0.0040468564224,
            Hectarea: 0.40468564224,
            Acre: 1
        }
    },
    Volumen: {
        Mililitro: {
            Mililitro: 1,
            CentimetroCubico: 1,
            Litro: 0.001,
            MetroCubico: 0.000001,
            Galon: 0.0002641720523581484,
            OnzaLiquida: 0.033814022701843
        },
        CentimetroCubico: {
            Mililitro: 1,
            CentimetroCubico: 1,
            Litro: 0.001,
            MetroCubico: 0.000001,
            Galon: 0.0002641720523581484,
            OnzaLiquida: 0.033814022701843
        },
        Litro: {
            Mililitro: 1000,
            CentimetroCubico: 1000,
            Litro: 1,
            MetroCubico: 0.001,
            Galon: 0.2641720523581484,
            OnzaLiquida: 33.814022701843
        },
        MetroCubico: {
            Mililitro: 1000000,
            CentimetroCubico: 1000000,
            Litro: 1000,
            MetroCubico: 1,
            Galon: 264.1720523581484,
            OnzaLiquida: 33814.022701843
        },
        Galon: {
            Mililitro: 3785.411784,
            CentimetroCubico: 3785.411784,
            Litro: 3.785411784,
            MetroCubico: 0.003785411784,
            Galon: 1,
            OnzaLiquida: 128
        },
        OnzaLiquida: {
            Mililitro: 29.5735295625,
            CentimetroCubico: 29.5735295625,
            Litro: 0.0295735295625,
            MetroCubico: 0.0000295735295625,
            Galon: 0.0078125,
            OnzaLiquida: 1
        }
    },
    Velocidad: {
        MetroPorSegundo: {
            MetroPorSegundo: 1,
            KilometroPorHora: 3.6,
            MillaPorHora: 2.2369362920544,
            Nudo: 1.9438444924406046,
            PiePorSegundo: 3.280839895013123
        },
        KilometroPorHora: {
            MetroPorSegundo: 0.2777777777777778,
            KilometroPorHora: 1,
            MillaPorHora: 0.6213711922373339,
            Nudo: 0.5399568034557235,
            PiePorSegundo: 0.9113444152759859
        },
        MillaPorHora: {
            MetroPorSegundo: 0.44704,
            KilometroPorHora: 1.609344,
            MillaPorHora: 1,
            Nudo: 0.8689762419006486,
            PiePorSegundo: 1.4666666666666666
        },
        Nudo: {
            MetroPorSegundo: 0.5144444444444445,
            KilometroPorHora: 1.852,
            MillaPorHora: 1.1507794480235425,
            Nudo: 1,
            PiePorSegundo: 1.6878098578333333
        },
        PiePorSegundo: {
            MetroPorSegundo: 0.3048,
            KilometroPorHora: 1.09728,
            MillaPorHora: 0.6818181818181818,
            Nudo: 0.5924838016528925,
            PiePorSegundo: 1
        }
    }
}
function convertir(){
    const tipoUnidad = unidades.value
    const valor = parseFloat(valorIzquierda.value)
    if(isNaN (valor)) return

    const [selectOrigen, selectDestino] = pairs[tipoUnidad]
    const unidadOrigen = selectOrigen.value
    const unidadDestino = selectDestino.value
    const conversion = relacionConversion[tipoUnidad]
    let resultado

    if (tipoUnidad === "Temperatura"){
        const { factor, offset } = conversion[unidadOrigen][unidadDestino]
        resultado = valor * factor + offset
    } else{
        const factor = conversion[unidadOrigen][unidadDestino]
        resultado = valor * factor
    }

    valorDerecha.value = resultado
}