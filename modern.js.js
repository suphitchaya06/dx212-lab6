
function greet(name, faculty) {
  return "สวัสดี " + name + " จากคณะ " + faculty + "!";
}

const greet_modern = (name, faculty) => `สวัสดี ${name} จากคณะ ${faculty}!`;

console.log(greet("Pong", "IT"));
console.log(greet_modern("Pong","IT"));

const buses = [
  { route: "NGV-1", passengers: 45, late: false },
  { route: "NGV-2", passengers: 62, late: true },
  { route: "NGV-3", passengers: 38, late: true },
  { route: "NGV-4", passengers: 51, late: false },
];

for ( let i  =0;i < buses.length; i++){
    console.log (buses[i].route.buses[i].passengers,buses[i].late);
}

for (const bus of buses){
}

const route = buses.map( bus=> bus.route);
//console.log(routes);

const lateBuses = buses.filter((bus) => bus.late === true);
const heavyBuses = buses.filter((bus) ==> bus.passengers > 50);

console.log(lateBuses);
console.log(heavyBuses);

const totalPassengers = buses.reduce(
    (total, {passengers}) ==> total + Passengers, 0
);

const totalPassengersOfHaevyBuses = buses.filter(((Passengers)) ==> Passengers > 50).reduce(
);

console.log(totalPassengers);
console.log(totalPassengersOfHaevyBuses)