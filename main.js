const API = 'https://pokeapi.co/api/v2/pokemon/';

async function obtenerPokemones() {
    const container = document.getElementById('pokemon');
    try {
        const respuesta = await fetch(API);
        const datos = await respuesta.json();
        const listaPokemones = datos.results;

        container.innerHTML = '';

        for (const pokemon of listaPokemones) {
            const detalleRespuesta = await fetch(pokemon.url);
            const detalleDatos = await detalleRespuesta.json();

            const nombre = pokemon.name;
            const pokemonId = detalleDatos.id;
            const imagen = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemonId + ".png";
            const tipo = detalleDatos.types[0].type.name;
            const tarjeta = `
            <div class="card ${tipo}">
                <img src="${imagen}" alt="${nombre}">
                <h3>${nombre}</h3>
                <span class="badge">${tipo}</span>
            </div>
        `;
            container.innerHTML += tarjeta;
        }
    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = `<div class="error-container"><img src="https://http.cat/500.jpg" alt="Error de servidor" class="error-img"></div>`;
    }
}
document.addEventListener('DOMContentLoaded', obtenerPokemones);