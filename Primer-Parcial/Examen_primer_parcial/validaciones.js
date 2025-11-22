 /**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid 
 * @property {string} [errorMessage] 
 * @property {string} [errorCode] 
 * @property {Object} [parameters] 
 * */

 export function validarRequerido(value = '') {
    if (value == null) value = '';
    return value.trim() === ''
        ? { isValid: false, errorMessage: 'Este campo es obligatorio.' }
        : { isValid: true, errorMessage: '' };
}

