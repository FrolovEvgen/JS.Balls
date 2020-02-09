/**
 * Generate random number between user defined range.
 * @param {number} min - Minimal value.
 * @param {number} max - (optional) Maximum value (include this!).
 * @returns {number} Generated number.
 */
function random(min, max) {
    // If 'max' is not defined, then 'min' is maximum and 0 is minimum.
    var _max = max || min;

    // If only minimum defined.
    if (_max === min) {
        // Generate number from 0 to maximum.
        return Math.floor(Math.random() * (_max + 1));
    } else {
        // Otherwise generate number between range.
        return (min + Math.floor(Math.random() * (max + 1 - min)));
    }
}
/**
 * Create HTML element with id.
 * @param {string} typeName - tag name.
 * @param {string} id - (optional) ID created element.
 * @returns {HTMLElement} - HTML element..
 */
function createEl(typeName, id) {
    id = id || null;

    // Create element.
    var htmlElement = document.createElement(typeName);

    // Apply ID.
    if (null !== id) {
        htmlElement.id = id;
    } else {
        // If not set we generate new.
        htmlElement.id = typeName + '_' + elementCounter++;
    }
    return htmlElement;
}