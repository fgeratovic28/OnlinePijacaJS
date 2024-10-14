const trenutnaSlika = document.querySelector('.trenutna-slika');
const prethodniDugme = document.getElementById('prethodniBtn');
const sledeciDugme = document.getElementById('sledeciBtn');

const slike = [
    "pijace slike/liman.jpg",
    "pijace slike/futoska.jpg",
    "pijace slike/detelinara.jpg"
];
let trenutniIndeksSlike = 0;

function prikaziSledecuSliku() {
    trenutniIndeksSlike++;
    if (trenutniIndeksSlike >= slike.length) {
        trenutniIndeksSlike = 0;
    }
    azurirajSliku();
}

function prikaziPrethodnuSliku() {
    trenutniIndeksSlike--;
    if (trenutniIndeksSlike < 0) {
        trenutniIndeksSlike = slike.length - 1;
    }
    azurirajSliku();
}

function azurirajSliku() {
    trenutnaSlika.src = slike[trenutniIndeksSlike];
}

prethodniDugme.addEventListener('click', prikaziPrethodnuSliku);
sledeciDugme.addEventListener('click', prikaziSledecuSliku);

const proizvodi = [
    { id: 1, ime: 'Jabuke', cena: 90 , kategorija: 'Voće', slika: 'proizvodi/jabuke.jpg',  jedinica: "kg"},
    { id: 2, ime: 'Banane', cena: 150, kategorija: 'Voće', slika: 'proizvodi/banane.jpg',  jedinica: "kg" },
    { id: 3, ime: 'Paradajz', cena: 200, kategorija: 'Povrće', slika: 'proizvodi/paradajz.jpg',  jedinica: "kg" },
    { id: 4, ime: 'Krastavci', cena: 70, kategorija: 'Povrće', slika: 'proizvodi/krastavac.jpg',  jedinica: "kom" },
    { id: 5, ime: 'Krompir', cena: 100, kategorija: 'Povrće', slika: 'proizvodi/krompir.jpg',  jedinica: "kg" },
    { id: 6, ime: 'Luk', cena: 220, kategorija: 'Povrće', slika: 'proizvodi/luk.jpg',  jedinica: "kg" },
    { id: 7, ime: 'Paprika', cena: 100, kategorija: 'Povrće', slika: 'proizvodi/paprika.jpg',  jedinica: "kg" },
    { id: 8, ime: 'Ljuta paprika', cena: 60, kategorija: 'Povrće', slika: 'proizvodi/ljuta paprika.jpg',  jedinica: "kom" },
    { id: 9, ime: 'Jaja', cena: 15, kategorija: 'Hrana', slika: 'proizvodi/jaja.jpg',  jedinica: "kom" },
    { id: 10, ime: 'Jagode', cena: 250, kategorija: 'Voće', slika: 'proizvodi/jagode.jpg',  jedinica: "kg" },
    { id: 11, ime: 'Limun', cena: 60, kategorija: 'Voće', slika: 'proizvodi/limun.jpg',  jedinica: "kg" },
    { id: 12, ime: 'Groždje', cena: 200, kategorija: 'Voće', slika: 'proizvodi/grozdje.jpg',  jedinica: "kg" },
    { id: 13, ime: 'Kajmak', cena: 900, kategorija: 'Mlečni proizvodi', slika: 'proizvodi/kajmak.jpg',  jedinica: "kg" },
    { id: 14, ime: 'Sir', cena: 700, kategorija: 'Mlečni proizvodi', slika: 'proizvodi/sir.jpg',  jedinica: "kg" },
    { id: 15, ime: 'KObasica', cena: 1100, kategorija: 'Hrana', slika: 'proizvodi/kobasica.jpg',  jedinica: "kg" },
    { id: 16, ime: 'Slanina', cena: 850, kategorija: 'Hrana', slika: 'proizvodi/slanina.jpg',  jedinica: "kg" }
];

function prikaziProizvode() {
    const sekcijaProizvoda = document.getElementById('proizvodi');
    sekcijaProizvoda.innerHTML = '';

    for (let i = 0; i < proizvodi.length; i++) {
        const proizvod = proizvodi[i];
        const karticaProizvoda = document.createElement('div');
        karticaProizvoda.classList.add('proizvodi-kartica');
        karticaProizvoda.innerHTML = `
            <img src="${proizvod.slika}" alt="${proizvod.ime}">
            <h3>${proizvod.ime}</h3>
            <p>Cena: ${proizvod.cena.toFixed(2)} din/${proizvod.jedinica}</p>
            <p>Kategorija: ${proizvod.kategorija}</p>
            <label for="kolicina-${proizvod.id}">Količina:</label>
            <input type="number" id="kolicina-${proizvod.id}" min="1" value="1">
            <span>${proizvod.jedinica}</span>
            <button onclick="dodajUKorpu(${proizvod.id})">Dodaj u korpu</button>
            <button onclick="ukloniIzKorpe(${proizvod.id})">Ukloni</button>
        `;
        sekcijaProizvoda.appendChild(karticaProizvoda);
    }
}

function sortirajProizvode() {
    var selectElement = document.getElementById("kriterijum-sortiranja");
    var kriterijum = selectElement.value;

    var sortirajFunkcija;
    if (kriterijum === "ime") {
        sortirajFunkcija = (a, b) => a.ime.localeCompare(b.ime);
    } else if (kriterijum === "cena") {
        sortirajFunkcija = (a, b) => a.cena - b.cena;
    } else if (kriterijum === "kategorija") {
        sortirajFunkcija = (a, b) => a.kategorija.localeCompare(b.kategorija);
    }

    proizvodi.sort(sortirajFunkcija);

    prikaziProizvode();
}


function ukloniIzKorpe(proizvodId) {
    const proizvod = proizvodi.find(p => p.id === proizvodId);
    if (proizvod) {
        const inputKolicine = document.getElementById(`kolicina-${proizvodId}`);
        const kolicina = parseInt(inputKolicine.value);
        if (kolicina > 0) {
            const stavkeKorpe = document.getElementById('stavke-korpe');
            const stavkaKorpe = stavkeKorpe.querySelector(`li[data-proizvod-id="${proizvodId}"]`);
            if (stavkaKorpe) {
                stavkeKorpe.removeChild(stavkaKorpe);
                
                const ukupnaCena = document.getElementById('ukupna-cena');
                ukupnaCena.textContent = (parseFloat(ukupnaCena.textContent) - (proizvod.cena * kolicina)).toFixed(2);
            }
        }
    }
}

function dodajUKorpu(proizvodId) {
    const proizvod = proizvodi.find(p => p.id === proizvodId);
    if (proizvod) {
        const inputKolicine = document.getElementById(`kolicina-${proizvodId}`);
        const kolicina = parseInt(inputKolicine.value);
        if (kolicina > 0) {
            const stavkeKorpe = document.getElementById('stavke-korpe');
            const stavkaKorpe = document.createElement('li');
            stavkaKorpe.setAttribute('data-proizvod-id', proizvodId);
            stavkaKorpe.textContent = `${proizvod.ime} x ${kolicina} ${proizvod.jedinica} - ${(proizvod.cena * kolicina).toFixed(2)} din`;
            stavkeKorpe.appendChild(stavkaKorpe);

            const ukupnaCena = document.getElementById('ukupna-cena');
            ukupnaCena.textContent = (parseFloat(ukupnaCena.textContent) + (proizvod.cena * kolicina)).toFixed(2);
        }
    }
}

function kupovina() {
    const stavkeKorpe = document.getElementById('stavke-korpe');
    stavkeKorpe.innerHTML = '';
    const ukupnaCena = document.getElementById('ukupna-cena');
    ukupnaCena.textContent = '0.00';

    const porukaKorpe = document.getElementById('poruka-korpa');
    porukaKorpe.innerText = 'Hvala na kupovini.';
    porukaKorpe.style.display = 'block';

    setTimeout(function() {
        porukaKorpe.style.display = 'none';
    }, 2000);
}


function proveriEmail(email) {
    var Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Email.test(email)) {
        document.getElementById('poruka').innerText = 'Unesite validnu email adresu.';
        document.getElementById('poruka').style.display = 'block';
        return false; 
    }
    return true;
}


function proveriBrojTelefona(brojTelefona) {
    var BrojTelefona = /^\d{10}$/;
    if (!BrojTelefona.test(brojTelefona)) {
        document.getElementById('poruka').innerText = 'Broj telefona mora sadržati 10 cifara.';
        document.getElementById('poruka').style.display = 'block';
        return false; 
    }
    return true; 
}

 
 function proveriLozinku(lozinka) {

    if (lozinka.length < 8) {
        document.getElementById('poruka').innerText = 'Lozinka mora sadržati najmanje 8 karaktera.';
        document.getElementById('poruka').style.display = 'block';
        return false;
    }

    
    var MalaSlova = /[a-z]/;
    if (!MalaSlova.test(lozinka)) {
        document.getElementById('poruka').innerText = 'Lozinka mora sadržati barem jedno malo slovo.';
        document.getElementById('poruka').style.display = 'block';
        return false; 
    }

    
    var VelikaSlova = /[A-Z]/;
    if (!VelikaSlova.test(lozinka)) {
        document.getElementById('poruka').innerText = 'Lozinka mora sadržati barem jedno veliko slovo.';
        document.getElementById('poruka').style.display = 'block';
        return false;
    }

   
    var PosebniZnakovi = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!PosebniZnakovi.test(lozinka)) {
        document.getElementById('poruka').innerText = 'Lozinka mora sadržati barem jedan poseban znak (!@#$%^&*()_+-=[]{};\'\\|,.<>\/?).';
        document.getElementById('poruka').style.display = 'block';
        return false;
    }

    return true;
}


function proveriKorisnickoIme(korisnickoIme) {
    if (korisnickoIme.length < 5) {
        document.getElementById('poruka').innerText = 'Korisničko ime mora imati barem 5 karaktera.';
        document.getElementById('poruka').style.display = 'block';
        return false; 
    }
    var rezervisanaImena = ['admin', 'root', 'guest']; 
    if (rezervisanaImena.includes(korisnickoIme.toLowerCase())) {
        document.getElementById('poruka').innerText = 'Korisničko ime je rezervisano. Molimo vas, izaberite drugo.';
        document.getElementById('poruka').style.display = 'block';
        return false;
    }
    return true;
}

document.getElementById('forma-registracija').addEventListener('submit', function(event) {
    event.preventDefault();

    const korisnickoIme = document.getElementById('korisnicko_ime').value;
    const lozinka = document.getElementById('lozinka').value;
    const email = document.getElementById('email').value;
    const brojTelefona = document.getElementById('broj_telefona').value;


    
    if (!proveriLozinku(lozinka)) {
        return; 
    }

    if (!proveriKorisnickoIme(korisnickoIme)) {
        return; 
    }

    if (!proveriEmail(email)) {
        return; 
    }

    if (!proveriBrojTelefona(brojTelefona)) {
        return;
    }

    console.log('Korisničko ime:', korisnickoIme);
    console.log('Lozinka:', lozinka);
    console.log('Email:', email);
    console.log('Broj telefona:', brojTelefona);

    document.getElementById('poruka').innerText = 'Uspesno ste se registrovali!';
    document.getElementById('poruka').style.display = 'block';
    document.getElementById('forma-registracija').reset();
});

prikaziProizvode();




