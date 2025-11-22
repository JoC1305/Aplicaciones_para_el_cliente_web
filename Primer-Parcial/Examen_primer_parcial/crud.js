import entidades from './entidades.js';
import { validarRequerido } from './validaciones.js';

const nowISO = () => new Date().toISOString();


function añadirCategoria({ nombre } = {}) {
    if (!nombre) throw new Error("nombre requerido");
    const ids = entidades.categoria.map(c => c.id);
    const newId = ids.length ? Math.max(...ids) + 1 : 0;
    const categoria = { id: newId, nombre };
    entidades.categoria.push(categoria);
    return categoria;
}


function añadirFlashcard({ img = "", pregunta, respuesta, categoriaId = [0] } = {}) {
    const vPregunta = validarRequerido(pregunta);
    if (!vPregunta.isValid) throw new Error(vPregunta.errorMessage);
    const vRespuesta = validarRequerido(respuesta);
    if (!vRespuesta.isValid) throw new Error(vRespuesta.errorMessage);

    const id = "F" + Date.now();
    const card = {
        id,
        img,
        pregunta,
        respuesta,
        categoriaId: Array.isArray(categoriaId) ? categoriaId : [categoriaId],
        fechaCreacion: nowISO(),
        fechaActualizacion: null
    };
    entidades.flashcards.push(card);
    return card;
}


function crearSesionEstudio({ categoriaID = 0, cuentaReviews = 0, userId = null, flashcardsId = [] } = {}) {
    const id = "S" + Date.now();
    const session = {
        id,
        fechaInicio: nowISO(),
        fechaFin: null,
        categoriaID,
        cuentaReviews,
        userId,
        flashcardsId: Array.isArray(flashcardsId) ? flashcardsId : [flashcardsId],
        items: []
    };
    if (!Array.isArray(entidades.sesionEstudio)) entidades.sesionEstudio = [];
    entidades.sesionEstudio.push(session);
    return session;
}


function getAll(entidad) {
    if (!entidad || !entidades.hasOwnProperty(entidad)) {
        throw new Error(`Entidad "${entidad}" no encontrada`);
    }
    const col = entidades[entidad];
    return Array.isArray(col) ? col.slice() : JSON.parse(JSON.stringify(col));
}


function getById(entidad, id) {
    if (!entidad || !entidades.hasOwnProperty(entidad)) {
        throw new Error(`Entidad "${entidad}" no encontrada`);
    }
    const collection = entidades[entidad];
    if (!Array.isArray(collection)) return null;
    return collection.find(item => item != null && String(item.id) === String(id)) || null;
}


function updateById(entidad, id, cambios = {}) {
    if (!entidad || !entidades.hasOwnProperty(entidad)) {
        throw new Error(`Entidad "${entidad}" no encontrada`);
    }
    const collection = entidades[entidad];
    if (!Array.isArray(collection)) throw new Error(`Entidad "${entidad}" no es coleccionable`);
    const idx = collection.findIndex(item => String(item.id) === String(id));
    if (idx === -1) return null;

    if ('pregunta' in cambios) {
        const v = validarRequerido(cambios.pregunta);
        if (!v.isValid) throw new Error(v.errorMessage);
    }
    if ('respuesta' in cambios) {
        const v = validarRequerido(cambios.respuesta);
        if (!v.isValid) throw new Error(v.errorMessage);
    }

    const actual = collection[idx];
    const actualizado = Object.assign({}, actual, cambios);

    if ('fechaActualizacion' in actual || 'fechaActualizacion' in actualizado) {
        actualizado.fechaActualizacion = nowISO();
    }
    if ('updatedAt' in actual || 'updatedAt' in actualizado) {
        actualizado.updatedAt = nowISO();
    }

    collection[idx] = actualizado;
    return actualizado;
}
function deleteById(entidad, id) {
    if (!entidad || !entidades.hasOwnProperty(entidad)) {
        throw new Error(`Entidad "${entidad}" no encontrada`);
    }
    const collection = entidades[entidad];
    if (!Array.isArray(collection)) throw new Error(`Entidad "${entidad}" no es coleccionable`);
    const idx = collection.findIndex(item => String(item.id) === String(id));
    if (idx === -1) return null;
    const [removed] = collection.splice(idx, 1);
    return removed;
}

export {
    añadirCategoria,
    añadirFlashcard,
    crearSesionEstudio,
    getAll,
    getById,
    updateById,
    deleteById
};

export default entidades;