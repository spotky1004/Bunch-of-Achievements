/**
 * @param {number} x
 * @param {number} y
 * @returns { {x: number, y: number} }
 */
export function pxToRatio(x, y) {
    return {
        x: x/innerWidth,
        y: y/innerHeight
    };
}

/**
 * @param {?HTMLElement} ele
 * @param {string} str - Name of the class or id that element itself or parent has.
 */
export function checkElementQuery(ele, str) {
    if (ele === null) return false;

    if (
        ele.classList.contains(str) ||
        ele.id === str
    ) return ele;
    if (
        ele.parentElement.classList.contains(str) ||
        ele.parentElement.id === str
    ) return ele.parentElement;

    return false;
}

export const Effect = {
    /**
     * @param {object} obj
     * @param {HTMLElement} obj.ele
     * @param {number} obj.x
     * @param {number} obj.y
     * @param {number} obj.div
     * @return {undefined}
     */
    Parallax: function({ele, x, y, div=1}) {
        ele.style.position = "relative";
        ele.style.left = x*100/div + "vw";
        ele.style.top = y*100/div + "vh";
    }
};