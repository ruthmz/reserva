// declarar array que declara asientos vacios con false
// ocupado = true

var airlineSeats = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
];

//contador para rastrear el numero de asientos ocupados
var busySeats = 0;

var paintSeats = function(array) {
    var containerSeats = document.getElementById('seats');
    
    for(var i = 0; i < array.length; i++){
        var seat = document.createElement('div');
        seat.className = 'seats';
        
    //del primer elemento al cuarto nuestro arreglo va a ser primera clase
    // que seria del indice 0 al indice 3
        if(i < 4) {
            seat.style.background = 'purple';
        } else {
            seat.style.background = 'yellow';
        }
        containerSeats.appendChild(seat);
    }
};

var reserve = function() {
    var btn = document.getElementById('btn');
    btn.addEventListener('click', chooseZone);
};

var chooseZone = function() {
    var choice = prompt (
        'En que zona prefieres reservar \n 1. Primera clase \n 2. Económica \n \n Por favor ingresa el número de tu preferencia');
        if(choice == 1){
            checkFirstClassZone();
        } else if(choice == 2) {
            checkEconomicZone();
        } else {
            alert('Por favor ingresa un numero válido')
        }
};

var checkFirstClassZone = function (){
    var zone = 'Primera Clase';
    // recorre del elemento 0 al 3 y verifica su disponibilidad
    for (var index = 0; index < 4; index++){
        if(airlineSeats[index] == false) {
            airlineSeats[index] = true;
            reserveSeat(index);
            paintTicket(index, zone);
            //al reservar un asiento no necesitamos seguir recorriendo nuestro arreglo
            //rompemos el for con break
            break;
            // sino hay asientos disponibles en 1era clase, se le da posibilidad de reserva en clase económica
        } else if (index == 3 && airlineSeats[index] == true) {
            reasignEconomicZone(zone);
        }
    }
};

var checkEconomicZone = function (){
    var zone = 'Economica';
    for(var index = 4; index < 10; index++) {
        if(airlineSeats[index] == false) {
            airlineSeats[index] = true;
            reserveSeat(index);
            //creamos una funcion para que nos muestre el ticket
            paintTicket(index, zone);
            break;
            // sino hay asientos disponibles en clase economica, se le da posibilidad de reserva en 1era clase 
        } else if(index == 9 && airlineSeats[index] == true) {
            reasignFirstClassZone(zone);
        }
    }
};

var reasignEconomicZone = function(zone) {
    var reasign = confirm(
        'Ya no quedan asientos disponibles en ' + zone + ' :( \n ¿Quieres reservar en zona Economica?'
        );
    if(reasign == true) {
        checkEconomicZone();
    } else {
        nextFlight();
    }
};

// nos ayuda a saber cual de nuestros asientos ha sido reservado
var reserveSeat = function(indexToPaint) {
    var seat = document.getElementsByClassName('seats');
    seat[indexToPaint].textContent = 'Ocupado'

};

var reasignFirstClassZone = function(zone) {
    var reasign = confirm (
        'Ya no quedan asientos en' + zone + ' :( \n ¿Quieres reservar en Primera Clase?'
        );
    if(reasign == true) {
        checkFirstClassZone();
    } else {
        nextFlight();
    }
};

var paintTicket = function(index, zone){
    //debemos tener un espacio en html para imprimir los tickets
    var containerTickets = document.getElementById('tickets');
    var ticket = document.createElement('div');
    ticket.className = 'seats';
    var title = document.createElement('p');
    var reservedSeating = document.createElement('p');
    var zoneClass = document.createElement('p');
    title.textContent = 'PASE DE ABORDAR';
    reservedSeating.textContent = 'No. de asiento: ' + (index + 1);
    zoneClass.textContent = zone;
    //Esta informacion que creamos le agregamos a nuestro div
    ticket.appendChild(title);
    ticket.appendChild(reservedSeating);
    ticket.appendChild(zoneClass);
    containerTickets.appendChild(ticket);

};

// si el usuario no quiere reservar en otra clase
var nextFlight = function() {
    alert('Nuestro próximo vuelo sale en 3 horas')
};
paintSeats(airlineSeats);
reserve();
