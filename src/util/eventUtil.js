/**
 * @param {number} x
 * @param {number*} y
 * @returns { {x: number, y: number} }
 */
export function pxToRatio(x, y) {
    return {
        x: x/innerWidth,
        y: y/innerHeight
    }
}