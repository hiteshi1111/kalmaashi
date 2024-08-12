export function numberWithCommas(x) {
    return parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}