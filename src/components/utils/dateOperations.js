const mesesEsp = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const diasEsp = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

/*
  Recibe número de mes de 0 a 11
*/
function mesAString(numeroDeMes) {
    return(mesesEsp[numeroDeMes]);
}

/*
  Recibe número de día de 0 a 6 (0 es Domingo)
*/
function diaAString(numeroDeDia) {
  return(diasEsp[numeroDeDia]);
}

export {mesAString, diaAString};