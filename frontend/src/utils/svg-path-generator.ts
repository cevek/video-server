export function svgPathGenerator(topLeft:number, bottomLeft:number, topRight:number, bottomRight:number, width:number) {
    var bx = width / 2;
    var path = '';

    path += 'M0,' + topLeft + ' ';

    path += 'C' + bx + ',' + topLeft + ' ';
    path += bx + ',' + topRight + ' ';
    path += width + ',' + topRight + ' ';

    path += 'L' + width + ',' + bottomRight + ' ';

    path += 'C' + bx + ',' + bottomRight + ' ';
    path += bx + ',' + bottomLeft + ' ';
    path += '0,' + bottomLeft + 'Z';
    return path;
}
