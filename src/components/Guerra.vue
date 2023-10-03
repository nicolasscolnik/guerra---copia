<script setup>
import { ref, computed, onMounted } from 'vue'
import Luchador from './Luchador.vue'

// const SWAPS_PERMITIDOS = 1;
let bitacora = ref([]);
let stamina1 = ref(0);
let stamina2 = ref(0);
let poderAtaque1 = ref(0);
let poderAtaque2 = ref(0);
let poderCurar1 = ref(0);
let poderCurar2 = ref(0);
let esTurno1 = ref(true);
let swap1 = ref(1);
let swap2 = ref(1);
let juegoON = ref(false);
let jugador1 = ref(false);
let jugador2 = ref(false);

const cambiaTurno = () => {
    debugger
    esTurno1 = !esTurno1;
    insertaItem();
    impirimeStaminas();
    Actualizar();
}

const impirimeStaminas = () => {
    bitacora.value.forEach((item, index) => {
        const staminaJugador1 = item.luchador1.stamina;
        const staminaJugador2 = item.luchador2.stamina;
        console.log(`Turno ${index + 1}: Stamina Jugador 1 = ${staminaJugador1}, Stamina Jugador 2 = ${staminaJugador2}`);
    });
}


const insertaItem = () => {
    let luchador1 = {
        stamina: stamina1.value,
        poderAtaque: poderAtaque1.value,
        esTurno1: true,
        swapDisponible: (swap1.value),
        poderCurar: (poderCurar1.value),
    };

    let luchador2 = {
        stamina: (stamina2.value),
        poderAtaque: (poderAtaque2.value),
        esTurno1: false,
        swapDisponible: (swap2.value),
        poderCurar: (poderCurar2.value),
    };

    let item = {
        luchador1: null,
        luchador2: null,
    }
    item.luchador1 = luchador1;
    item.luchador2 = luchador2;

    bitacora.value.push(item);
}


const staminaRnd = () => ref((Math.floor(Math.random() * 100) + 1));


const poderRnd = () => ref((Math.floor(Math.random() * 10) + 1));


const setJuego = () => {
    stamina1 = staminaRnd();
    stamina2 = staminaRnd();
    poderAtaque1 = poderRnd();
    poderAtaque2 = poderRnd();
    poderCurar1 = poderRnd();
    poderCurar2 = poderRnd();
    juegoON = ref(false);
    bitacora = ref([]);
}

const atacar = (id) => {
    if (id == 1) {
        stamina2.value = stamina2.value - poderAtaque1.value;
        console.log('ataco el 1')
    } else {
        stamina1.value = stamina1.value - poderAtaque2.value;
        console.log('ataco el 2')
    }
    if (checkGanador()) {
        setJuego();
    }
    cambiaTurno();

}

const checkGanador = () => {
    if (stamina1.value <= 0 || stamina2.value <= 0) {
        alert('Acabo el juego SOQUETES!');
        return true;
    }
    console.log('ok checkGanador')
}

const checkVidaMax = (curacion, vidaActual) => (curacion + vidaActual) > 100 ? 100 : (curacion + vidaActual);


const curar = (id) => {
    if (id == 1) {
        stamina1.value = checkVidaMax(poderCurar1.value, stamina1.value);
        datosPeleaActuales.value.luchador1.stamina1 = stamina1.value;
        console.log('se curo el 1')
    } else {
        stamina2.value = checkVidaMax(poderCurar2.value, stamina2.value);
        datosPeleaActuales.value.luchador1.stamina1 = stamina1.value;
        console.log('se curo el 2')
    }
    cambiaTurno();
}

const swap = (id) => {
    let staminaTransicion = stamina1.value;
    stamina1.value = stamina2.value;
    stamina2.value = staminaTransicion;
    if (id == 1) {
        swap1.value = swap1.value - 1;
    } else {
        swap2.value = swap2.value - 1;
    }
    console.log('Hizo SWAP el jugador n' + id);
    cambiaTurno();
}

const restablecerValores = (item) => {
    // Restablecer los valores de los jugadores
    stamina1 = ref(item.luchador1.stamina);
    stamina2 = ref(item.luchador2.stamina);
    poderAtaque1 = ref(item.luchador1.poderAtaque);
    poderAtaque2 = ref(item.luchador2.poderAtaque);
    poderCurar1 = ref(item.luchador1.poderCurar);
    poderCurar2 = ref(item.luchador2.poderCurar);
    esTurno1 = ref(esTurno1);
    swap1 = ref(item.luchador1.swapDisponible);
    swap2 = ref(item.luchador2.swapDisponible);
    // Restablecer otros valores según ItemBitacora si es necesario

    // Eliminar los elementos de la bitácora a partir de este turno
    // bitacora = ref(bitacora.value.slice(0, bitacora.value.indexOf(item)));
    const index = bitacora.value.indexOf(item);
    settingLocal();
    Actualizar();
    if (index !== -1) {
        // Usar splice para eliminar el elemento y mantener la reactividad
        bitacora.value.splice(index + 1);
    }
}



setJuego();


const url = 'https://651385e18e505cebc2e9ece5.mockapi.io/dinamica/2'
let datosPeleaActuales = ref({})
let datosSala = ref({})

const entrarASala = () => {
    let pude = false;
    if (datosSala.value.hayJ1 === false) {
        datosPeleaActuales.value.hayJ1 = true;
        jugador1 = true;
        pude = true;
        // setJuego();
    } else if (datosSala.value.hayJ2 === false) {
        datosPeleaActuales.value.hayJ2 = true;
        jugador2 = true;
        pude = true;
        // restablecerValores(datosPeleaActuales.value);
    }
    Actualizar();
    if (!pude) {
        alert('La sala esta llena PELELE!')
    }
    return pude;
}

const Actualizar = () => {
    let jugador1Local = datosPeleaActuales.value.luchador1;
    let jugador2Local = datosPeleaActuales.value.luchador2;
    let turnoLocal = datosPeleaActuales.value.turno;
    let hayJ1Local = datosPeleaActuales.value.hayJ1;
    let hayJ2Local = datosPeleaActuales.value.hayJ2;

    const requestBody = {
        luchador1: jugador1Local,
        luchador2: jugador2Local,
        turno: turnoLocal,
        hayJ1: hayJ1Local,
        hayJ2: hayJ2Local
    };

    fetch(url, {
        method: 'PUT', // or PATCH
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(requestBody)
    })
        .then(res => {
            if (res.ok) {
                console.log(datosPeleaActuales.value);
                return res.json();
            }
            // handle error
        })
        .then(task => {
            // Do something with updated task
        })
        .catch(error => {
            throw new Error(error.message);
        });
}


const ObtenerValor = () => {
    // console.log('Llamando')
    //Arma el link con la pagina 
    fetch(url)
        .then(response => {
            if (response.status === 200) {
                return response.json(); // Convierte la respuesta a JSON
            } else {
                throw new Error('No se pudo obtener la información');
            }
        })
        .then(data => {
            datosSala.value = data //Obtengo el results que es donde esta mi vector que quiero trabajar
            // console.log(datosSala.value)
            console.log('ok obtenerValor')
        })
        .catch(error => {
            console.error(error);
        });
}

const settingLocal = () => {
    datosPeleaActuales.value.luchador1 = {
        stamina1: ref(stamina1),
        poderAtaque1: ref(poderAtaque1),
        poderCurar1: ref(poderCurar1),
        swap1: ref(swap1)
    }

    datosPeleaActuales.value.luchador2 = {
        stamina2: ref(stamina2),
        poderAtaque2: ref(poderAtaque2),
        poderCurar2: ref(poderCurar2),
        swap2: ref(swap2)
    }
    datosPeleaActuales.value.turno = ref(esTurno1);
    // console.log(datosPeleaActuales.value, esTurno1.value)
}




onMounted(() => {
    const intervalo = setInterval(ObtenerValor, 5000)
    const intervalo2 = setInterval(checkGanador, 5000)
    ObtenerValor()
    settingLocal()
})

const comienzaJuego = () => {
    if (entrarASala()) {
        juegoON.value = true;
    }
};

</script>
<template>
    <h4>Turno j1: {{ jugador1 }}</h4>
    <h4>Turno j2: {{ jugador2 }}</h4>
    <button type="button" class="btn btn-danger" @click="comienzaJuego">Comenzar!</button>
    <hr>
    <hr>
    <div class="luchadores-container" v-if="juegoON">
        <Luchador @lastimar="atacar(1)" @curar="curar(1)" @swap="swap(1)" :swapDisponible="swap1" :stamina="stamina1"
            :poderAtaque="poderAtaque1" :poderCurar="poderCurar1" :esTurno1="esTurno1" :identidad="jugador1" id="1">Luchador
            1
        </Luchador>
        <Luchador @lastimar="atacar(2)" @curar="curar(2)" @swap="swap(2)" :swapDisponible="swap2" :stamina="stamina2"
            :poderAtaque="poderAtaque2" :poderCurar="poderCurar2" :esTurno1="!esTurno1" :identidad="jugador2" id="2">
            Luchador 2</Luchador>
    </div>
    <hr>
    <hr>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Turno</th>
                    <th>Stamina Jugador 1</th>
                    <th>Stamina Jugador 2</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in bitacora" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.luchador1.stamina }}</td>
                    <td>{{ item.luchador2.stamina }}</td>
                    <td>
                        <button @click="restablecerValores(item)">Restablecer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>


    <p>
        tarea
    <ol>
        <li>Crear un boton SWAP que intercambie la Staimna de Jugadro 1 por 2</li>
        <li>El swap Solamente puede ser tocado 1 vez por jugador</li>
        <li>Hacer una bitacora de cada accion que va pasando en el juego y mostrarlo debajo en un table</li>
        <li>Hacer que al prinicpio la Stamina y la fuerza/cura sea variable a entender
            <ul>
                <li>FuerzaMax : Maximo Golpe</li>
                <li>FuerzaMin : Minimo Golpe Golpe</li>
                <li>Fuerza de Golpe = Random enrte FuerzaMax y FuerzaMin</li>
                <li>CuraMax : Maximo Cura</li>
                <li>CuraMin : Minimo Cura</li>
                <li>Cura = Random enrte CuraMax y CuraMin</li>
            </ul>
        </li>
        <li>Mostra en el jugador los atributos de Max/Min de Fuerza y cura</li>
        <li>En la bitacora, guardar el historial de cuanta Stamina tenia para poder hacer rollback de jugadas</li>

    </ol>
    </p>
</template>

<style scoped>
.luchadores-container {
    display: flex;
    justify-content: space-between;
    /* Distribuye los elementos a lo largo del contenedor */
    align-items: center;
    /* Centra verticalmente los elementos */
}
</style>