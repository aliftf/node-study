function cetakNama(nama) {
  return `Halo, nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
    nim : '101',
    nama : 'Fikri',
    cetakMhs(){
        return `Halo, nama saya ${this.nama} dengan NIM ${this.nim}`;
    }
}

class Person {
    constructor(){
        console.log('Objek Person telah dibuat');
    }
}

// module.exports = {cetakNama, PI};
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Person = Person;

// module.exports = {
//     cetakNama, PI, mahasiswa, Person
// };

module.exports = {
    cetakNama: cetakNama,
    PI: PI,
    mahasiswa: mahasiswa,
    Person: Person
};