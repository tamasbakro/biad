document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Hungarian favorite verses
const hungarianFavoriteVerses = [
    {
        ref: '1Korinthus 13:4–7',
        title: 'A szeretet himnusza:',
        text: `A szeretet türelmes, a szeretet jóságos,
nem irigykedik, a szeretet nem kérkedik,
nem fuvalkodik fel.
Nem viselkedik bántóan,
nem keresi a maga hasznát,
nem gerjed haragra,
nem rója fel a rosszat,
nem örül a hamisságnak,
de együtt örül az igazsággal.
Mindent elfedez,
mindent hisz,
mindent remél,
mindent eltűr.`
    },
    {
        ref: 'Zsoltárok 23:1–4',
        text: `Az Úr az én pásztorom,
nem szűkölködöm.
Füves legelőkön terelget,
csendes vizekhez vezet engem.
Lelkemet felüdíti,
igaz ösvényen vezet az ő nevéért.
Ha a halál árnyékának völgyében járok is,
nem félek semmi bajtól,
mert te velem vagy;
vessződ és botod, azok vigasztalnak engem.`
    },
    {
        ref: 'Máté 5:3–10',
        title: 'A boldogmondások',
        text: `Boldogok a lelki szegények,
mert övék a mennyek országa.
Boldogok, akik sírnak,
mert ők megvigasztaltatnak.
Boldogok a szelídek,
mert ők öröklik a földet.
Boldogok, akik éhezik és szomjazzák az igazságot,
mert ők megelégíttetnek.`
    },
    {
        ref: 'Róma 8:38–39',
        text: `Meg vagyok győződve, hogy sem halál, sem élet,
sem angyalok, sem fejedelemségek,
sem jelenvalók, sem eljövendők,
sem hatalmak, sem magasság, sem mélység,
sem semmiféle más teremtmény
nem választhat el minket az Isten szeretetétől,
amely megjelent Jézus Krisztusban, a mi Urunkban.`
    },
    {
        ref: 'János 14:27',
        text: `Békességet hagyok nektek,
az én békességemet adom nektek;
nem úgy adom nektek, ahogy a világ adja.
Ne nyugtalankodjék a ti szívetek,
se ne féljen.`
    },
    {
        ref: 'Jeremiás 29:11',
        text: `Mert én ismerem a terveket, amelyeket terveztem felőletek – így szól az ÚR –, békességre és nem veszedelemre, hogy jövőt és reménységet adjak nektek.`
    },
    {
        ref: 'Zsoltárok 27:1',
        text: `Az Úr az én világosságom és segítségem,
kitől félnék?
Az Úr az életem erőssége,
kitől rettegnék?`
    },
    {
        ref: 'Ézsaiás 40:31',
        text: `De akik az Úrban bíznak,
erejük megújul,
szárnyra kelnek, mint a sasok,
futnak, és nem lankadnak meg,
járnak, és nem fáradnak el.`
    },
    {
        ref: '1János 4:7–8',
        text: `Szeretteim, szeressük egymást,
mert a szeretet Istentől van,
és mindaz, aki szeret, Istentől született, és ismeri Istent.
Aki nem szeret, nem ismerte meg Istent,
mert Isten szeretet.`
    },
    {
        ref: 'Mikeás 6:8',
        text: `Megmondta neked, ó ember,
hogy mi a jó,
és mit kíván tőled az Úr:
csak azt, hogy igazságot cselekedj,
szeresd az irgalmasságot,
és alázatosan járj Isteneddel.`
    },
    {
        ref: 'Filippi 4:13',
        text: `Mindenre van erőm a Krisztusban, aki megerősít engem.`
    },
    {
        ref: 'Józsué 1:9',
        text: `Megparancsoltam neked: légy erős és bátor!
Ne félj, és ne rettegj,
mert veled van Istened, az ÚR, mindenütt, amerre csak jársz.`
    },
    {
        ref: '2Timóteus 1:7',
        text: `Mert nem a félelem lelkét adta nekünk az Isten,
hanem az erő, a szeretet és a józanság lelkét.`
    },
    {
        ref: '2Korinthus 5:17',
        text: `Azért ha valaki Krisztusban van, új teremtés az;
a régi elmúlt, és íme: új jött létre.`
    },
    {
        ref: 'Ezékiel 36:26',
        text: `Új szívet adok nektek,
és új lelket adok belétek;
eltávolítom testetekből a kőszívet,
és hússzívet adok nektek.`
    }
];

// Romanian favorite verses
const romanianFavoriteVerses = [
    {
        reference: "Ieremia 29:11",
        text: `„Căci Eu ştiu gândurile, pe care le am cu privire la voi, zice Domnul,\ngânduri de pace şi nu de nenorocire,\nca să vă dau un viitor şi o nădejde.”`
    },
    {
        reference: "Isaia 40:31",
        text: `„Dar cei ce se încred în Domnul îşi înnoiesc puterea,\nei zboară ca vulturii; aleargă şi nu obosesc,\numblă şi nu ostenesc.”`
    },
    {
        reference: "Psalmii 27:1",
        text: `„Domnul este lumina şi mântuirea mea:\nde cine să mă tem?\nDomnul este sprijinul vieţii mele:\nde cine să-mi fie frică?”`
    },
    {
        reference: "Filipeni 4:13",
        text: `„Pot totul în Hristos care mă întăreşte.”`
    },
    {
        reference: "Iosua 1:9",
        text: `„Nu ţi-am dat Eu oare porunca aceasta: 'Întăreşte-te şi îmbărbătează-te'?\nNu te înspăimânta şi nu te îngrozi,\ncăci Domnul, Dumnezeul tău, este cu tine în tot ce vei face.”`
    },
    {
        reference: "2 Timotei 1:7",
        text: `„Căci Dumnezeu nu ne-a dat un duh de frică,\nci de putere, de dragoste şi de chibzuinţă.”`
    },
    {
        reference: "Ioan 14:27",
        text: `„Vă las pacea, vă dau pacea Mea.\nNu v-o dau cum o dă lumea.\nSă nu vi se tulbure inima, nici să nu se înspăimânte.”`
    },
    {
        reference: "Psalmii 46:1–2",
        text: `„Dumnezeu este adăpostul şi sprijinul nostru,\nun ajutor care nu lipseşte niciodată în nevoi.\nDe aceea nu ne temem, chiar dacă s-ar zgudui pământul\nşi s-ar clătina munţii în inima mărilor.”`
    },
    {
        reference: "Ioan 16:33",
        text: `„V-am spus aceste lucruri ca să aveţi pace în Mine.\nÎn lume veţi avea necazuri;\ndar îndrăzniţi, Eu am biruit lumea.”`
    },
    {
        reference: "2 Corinteni 5:17",
        text: `„Căci, dacă este cineva în Hristos,\neste o făptură nouă.\nCele vechi s-au dus;\niată că toate lucrurile s-au făcut noi.”`
    },
    {
        reference: "Ezechiel 36:26",
        text: `„Vă voi da o inimă nouă\nşi voi pune în voi un duh nou;\nvoi scoate din trupul vostru inima de piatră\nşi vă voi da o inimă de carne.”`
    }
];

function loadVerseOfTheDay(lang) {
    const verseTextEl = document.getElementById('daily-quote-content');
    const verseRefEl = document.getElementById('daily-quote-ref');
    if (!verseTextEl || !verseRefEl) return;

    if (lang === 'hu') {
        const randomIndex = Math.floor(Math.random() * hungarianFavoriteVerses.length);
        const verse = hungarianFavoriteVerses[randomIndex];
        let text = '';
        if (verse.title) {
            text += verse.title + '\n';
        }
        text += verse.text;
        verseTextEl.textContent = text;
        verseRefEl.textContent = verse.ref;
        return;
    }

    if (lang === 'ro') {
        const randomIndex = Math.floor(Math.random() * romanianFavoriteVerses.length);
        const verse = romanianFavoriteVerses[randomIndex];
        verseTextEl.textContent = verse.text;
        verseRefEl.textContent = verse.reference;
        return;
    }

    // fallback: clear
    verseTextEl.textContent = '';
    verseRefEl.textContent = '';
} 