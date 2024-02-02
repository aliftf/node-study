// urutan prioritas module: core module, local module, third party module

const fs = require('fs'); // fs adalah core module
const coba = require('./coba'); // ./ berarti local module dan file coba.js berada di folder yang sama dengan file index.js
// const moment = require('moment'); // moment adalah third party module

console.log(
    coba.cetakNama('Fikri'),
    coba.PI,
    coba.mahasiswa.cetakMhs(),
    new coba.Person()
);
