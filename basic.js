let personas = [{
    "name": "Julen Melgar Montenegro",
    "email": "jmelgar@hiberus.com"
  },
  {
    "name": "Usuario 2",
    "email": "usuario2@hiberus.com"
  },
  {
    "name": "Usuario 3",
    "email": "usuario3@hiberus.com"
  }
];

// Array map

const employees = personas.map(employee => {
  return employee.name;
});

// Slice

console.log(employees.slice(0, 2));

// Sort

console.log(employees.sort(
  (a, b) => {
    return a.length - b.length;
  }
));
