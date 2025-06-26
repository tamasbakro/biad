document.add
    // This script should only run on the bible page.
    if (!document.querySelector('.bible-container')) {
        return;
    }

    try {
        // Bible book data structure - Hungarian
        const bibleBooksHu = {
            // Ószövetség
            '1Mózes könyve': { path: 'o/1-moz', chapters: 50 },
            '2Mózes könyve': { path: 'o/2-moz', chapters: 40 },
            '3Mózes könyve': { path: 'o/3-moz', chapters: 27 },
            '4Mózes könyve': { path: 'o/4-moz', chapters: 36 },
            '5Mózes könyve': { path: 'o/5-moz', chapters: 34 },
            'Józsué könyve': { path: 'o/jozs', chapters: 24 },
            'Bírák könyve': { path: 'o/bir', chapters: 21 },
            'Rút könyve': { path: 'o/ruth', chapters: 4 },
            '1Sámuel könyve': { path: 'o/1-sam', chapters: 31 },
            '2Sámuel könyve': { path: 'o/2-sam', chapters: 24 },
            '1Királyok könyve': { path: 'o/1-kir', chapters: 22 },
            '2Királyok könyve': { path: 'o/2-kir', chapters: 25 },
            '1Krónikák könyve': { path: 'o/1-kron', chapters: 29 },
            '2Krónikák könyve': { path: 'o/2-kron', chapters: 36 },
            'Ezsdrás könyve': { path: 'o/ezsdr', chapters: 10 },
            'Nehemiás könyve': { path: 'o/nehem', chapters: 13 },
            'Eszter könyve': { path: 'o/eszt', chapters: 10 },
            'Jób könyve': { path: 'o/job', chapters: 42 },
            'Zsoltárok könyve': { path: 'o/zsolt', chapters: 150 },
            'Példabeszédek könyve': { path: 'o/peld', chapters: 31 },
            'Prédikátor könyve': { path: 'o/pred', chapters: 12 },
            'Énekek éneke': { path: 'o/en', chapters: 8 },
            'Ézsaiás könyve': { path: 'o/esa', chapters: 66 },
            'Jeremiás könyve': { path: 'o/jer', chapters: 52 },
            'Jeremiás siralmai': { path: 'o/siral', chapters: 5 },
            'Ezékiel könyve': { path: 'o/ezek', chapters: 48 },
            'Dániel könyve': { path: 'o/dan', chapters: 12 },
            'Hóseás könyve': { path: 'o/hos', chapters: 14 },
            'Jóel könyve': { path: 'o/joel', chapters: 3 },
            'Ámósz könyve': { path: 'o/amos', chapters: 9 },
            'Abdiás könyve': { path: 'o/abd', chapters: 1 },
            'Jónás könyve': { path: 'o/jon', chapters: 4 },
            'Mikeás könyve': { path: 'o/mik', chapters: 7 },
            'Náhum könyve': { path: 'o/nah', chapters: 3 },
            'Habakuk könyve': { path: 'o/hab', chapters: 3 },
            'Zofóniás könyve': { path: 'o/sof', chapters: 3 },
            'Haggeus könyve': { path: 'o/agge', chapters: 2 },
            'Zakariás könyve': { path: 'o/zak', chapters: 14 },
            'Malakiás könyve': { path: 'o/malak', chapters: 4 },
            // Újszövetség
            'Máté evangéliuma': { path: 'uj/mat', chapters: 28 },
            'Márk evangéliuma': { path: 'uj/mark', chapters: 16 },
            'Lukács evangéliuma': { path: 'uj/luk', chapters: 24 },
            'János evangéliuma': { path: 'uj/jan', chapters: 21 },
            'Apostolok Cselekedetei': { path: 'uj/csel', chapters: 28 },
            'Rómaiakhoz írt levél': { path: 'uj/rom', chapters: 16 },
            '1Korinthusbeliekhez írt levél': { path: 'uj/1-kor', chapters: 16 },
            '2Korinthusbeliekhez írt levél': { path: 'uj/2-kor', chapters: 13 },
            'Galata beliekhez írt levél': { path: 'uj/gal', chapters: 6 },
            'Efezusbeliekhez írt levél': { path: 'uj/efez', chapters: 6 },
            'Filippibeliekhez írt levél': { path: 'uj/fil', chapters: 4 },
            'Kolossébeliekhez írt levél': { path: 'uj/kol', chapters: 4 },
            '1Thessalonikabeliekhez írt levél': { path: 'uj/1-thess', chapters: 5 },
            '2Thessalonikabeliekhez írt levél': { path: 'uj/2-thess', chapters: 3 },
            '1Timóteushoz írt levél': { path: 'uj/1-tim', chapters: 6 },
            '2Timóteushoz írt levél': { path: 'uj/2-tim', chapters: 4 },
            'Titushoz írt levél': { path: 'uj/tit', chapters: 3 },
            'Filemonhoz írt levél': { path: 'uj/filem', chapters: 1 },
            'Zsidókhoz írt levél': { path: 'uj/zsid', chapters: 13 },
            'Jakab levele': { path: 'uj/jak', chapters: 5 },
            '1Péter levele': { path: 'uj/1-pet', chapters: 5 },
            '2Péter levele': { path: 'uj/2-pet', chapters: 3 },
            '1János levele': { path: 'uj/1-jan', chapters: 5 },
            '2János levele': { path: 'uj/2-jan', chapters: 1 },
            '3János levele': { path: 'uj/3-jan', chapters: 1 },
            'Júdás levele': { path: 'uj/jud', chapters: 1 },
            'Jelenések könyve': { path: 'uj/jel', chapters: 22 }
        };

        // Bible book data structure - Romanian (updated, short names)
        const bibleBooksRo = {
            // Vechiul Testament
            'Geneza': { path: 'o/geneza', chapters: 50 },
            'Exodul': { path: 'o/exodul', chapters: 40 },
            'Leviticul': { path: 'o/leviticul', chapters: 27 },
            'Numeri': { path: 'o/numeri', chapters: 36 },
            'Deuteronomul': { path: 'o/deuteronomul', chapters: 34 },
            'Iosua': { path: 'o/iosua', chapters: 24 },
            'Judecători': { path: 'o/judecatori', chapters: 21 },
            'Rut': { path: 'o/rut', chapters: 4 },
            '1 Samuel': { path: 'o/1-samuel', chapters: 31 },
            '2 Samuel': { path: 'o/2-samuel', chapters: 24 },
            '1 Împărați': { path: 'o/1-regi', chapters: 22 },
            '2 Împărați': { path: 'o/2-regi', chapters: 25 },
            '1 Cronici': { path: 'o/1-cronici', chapters: 29 },
            '2 Cronici': { path: 'o/2-cronici', chapters: 36 },
            'Ezra': { path: 'o/ezra', chapters: 10 },
            'Neemia': { path: 'o/neemia', chapters: 13 },
            'Estera': { path: 'o/estera', chapters: 10 },
            'Iov': { path: 'o/iov', chapters: 42 },
            'Psalmii': { path: 'o/psalmii', chapters: 150 },
            'Proverbele lui Solomon': { path: 'o/pildele', chapters: 31 },
            'Eclesiastul': { path: 'o/eclesiastul', chapters: 12 },
            'Cântarea Cântărilor': { path: 'o/cantarea', chapters: 8 },
            'Isaia': { path: 'o/isaia', chapters: 66 },
            'Ieremia': { path: 'o/ieremia', chapters: 52 },
            'Plângerile lui Ieremia': { path: 'o/plangerile', chapters: 5 },
            'Ezechiel': { path: 'o/ezechiel', chapters: 48 },
            'Daniel': { path: 'o/daniel', chapters: 12 },
            'Osea': { path: 'o/osea', chapters: 14 },
            'Ioel': { path: 'o/ioel', chapters: 3 },
            'Amos': { path: 'o/amos', chapters: 9 },
            'Obadia': { path: 'o/obadia', chapters: 1 },
            'Iona': { path: 'o/iona', chapters: 4 },
            'Mica': { path: 'o/mica', chapters: 7 },
            'Naum': { path: 'o/naum', chapters: 3 },
            'Habacuc': { path: 'o/habacuc', chapters: 3 },
            'Țefania': { path: 'o/tefania', chapters: 3 },
            'Hagai': { path: 'o/hagai', chapters: 2 },
            'Zaharia': { path: 'o/zaharia', chapters: 14 },
            'Maleahi': { path: 'o/maleahi', chapters: 4 },
            // Noul Testament
            'Matei': { path: 'uj/matei', chapters: 28 },
            'Marcu': { path: 'uj/marcu', chapters: 16 },
            'Luca': { path: 'uj/luca', chapters: 24 },
            'Ioan': { path: 'uj/ioan', chapters: 21 },
            'Faptele Apostolilor': { path: 'uj/faptele', chapters: 28 },
            'Romani': { path: 'uj/romani', chapters: 16 },
            '1 Corinteni': { path: 'uj/1-corinteni', chapters: 16 },
            '2 Corinteni': { path: 'uj/2-corinteni', chapters: 13 },
            'Galateni': { path: 'uj/galateni', chapters: 6 },
            'Efeseni': { path: 'uj/efeseni', chapters: 6 },
            'Filipeni': { path: 'uj/filipeni', chapters: 4 },
            'Coloseni': { path: 'uj/coloseni', chapters: 4 },
            '1 Tesaloniceni': { path: 'uj/1-tesaloniceni', chapters: 5 },
            '2 Tesaloniceni': { path: 'uj/2-tesaloniceni', chapters: 3 },
            '1 Timotei': { path: 'uj/1-timotei', chapters: 6 },
            '2 Timotei': { path: 'uj/2-timotei', chapters: 4 },
            'Tit': { path: 'uj/tit', chapters: 3 },
            'Filimon': { path: 'uj/filimon', chapters: 1 },
            'Evrei': { path: 'uj/evrei', chapters: 13 },
            'Iacov': { path: 'uj/iacov', chapters: 5 },
            '1 Petru': { path: 'uj/1-petru', chapters: 5 },
            '2 Petru': { path: 'uj/2-petru', chapters: 3 },
            '1 Ioan': { path: 'uj/1-ioan', chapters: 5 },
            '2 Ioan': { path: 'uj/2-ioan', chapters: 1 },
            '3 Ioan': { path: 'uj/3-ioan', chapters: 1 },
            'Iuda': { path: 'uj/iuda', chapters: 1 },
            'Apocalipsa lui Ioan': { path: 'uj/apocalipsa', chapters: 22 }
        };

        // Book name mapping between languages (updated)
        const bookMapping = {
            // Hungarian to Romanian
            '1Mózes könyve': 'Geneza',
            '2Mózes könyve': 'Exodul',
            '3Mózes könyve': 'Leviticul',
            '4Mózes könyve': 'Numeri',
            '5Mózes könyve': 'Deuteronomul',
            'Józsué könyve': 'Iosua',
            'Bírák könyve': 'Judecători',
            'Rút könyve': 'Rut',
            '1Sámuel könyve': '1 Samuel',
            '2Sámuel könyve': '2 Samuel',
            '1Királyok könyve': '1 Împărați',
            '2Királyok könyve': '2 Împărați',
            '1Krónikák könyve': '1 Cronici',
            '2Krónikák könyve': '2 Cronici',
            'Ezsdrás könyve': 'Ezra',
            'Nehemiás könyve': 'Neemia',
            'Eszter könyve': 'Estera',
            'Jób könyve': 'Iov',
            'Zsoltárok könyve': 'Psalmii',
            'Példabeszédek könyve': 'Proverbele lui Solomon',
            'Prédikátor könyve': 'Eclesiastul',
            'Énekek éneke': 'Cântarea Cântărilor',
            'Ézsaiás könyve': 'Isaia',
            'Jeremiás könyve': 'Ieremia',
            'Jeremiás siralmai': 'Plângerile lui Ieremia',
            'Ezékiel könyve': 'Ezechiel',
            'Dániel könyve': 'Daniel',
            'Hóseás könyve': 'Osea',
            'Jóel könyve': 'Ioel',
            'Ámósz könyve': 'Amos',
            'Abdiás könyve': 'Obadia',
            'Jónás könyve': 'Iona',
            'Mikeás könyve': 'Mica',
            'Náhum könyve': 'Naum',
            'Habakuk könyve': 'Habacuc',
            'Zofóniás könyve': 'Țefania',
            'Haggeus könyve': 'Hagai',
            'Zakariás könyve': 'Zaharia',
            'Malakiás könyve': 'Maleahi',
            'Máté evangéliuma': 'Matei',
            'Márk evangéliuma': 'Marcu',
            'Lukács evangéliuma': 'Luca',
            'János evangéliuma': 'Ioan',
            'Apostolok Cselekedetei': 'Faptele Apostolilor',
            'Rómaiakhoz írt levél': 'Romani',
            '1Korinthusbeliekhez írt levél': '1 Corinteni',
            '2Korinthusbeliekhez írt levél': '2 Corinteni',
            'Galata beliekhez írt levél': 'Galateni',
            'Efezusbeliekhez írt levél': 'Efeseni',
            'Filippibeliekhez írt levél': 'Filipeni',
            'Kolossébeliekhez írt levél': 'Coloseni',
            '1Thessalonikabeliekhez írt levél': '1 Tesaloniceni',
            '2Thessalonikabeliekhez írt levél': '2 Tesaloniceni',
            '1Timóteushoz írt levél': '1 Timotei',
            '2Timóteushoz írt levél': '2 Timotei',
            'Titushoz írt levél': 'Tit',
            'Filemonhoz írt levél': 'Filimon',
            'Zsidókhoz írt levél': 'Evrei',
            'Jakab levele': 'Iacov',
            '1Péter levele': '1 Petru',
            '2Péter levele': '2 Petru',
            '1János levele': '1 Ioan',
            '2János levele': '2 Ioan',
            '3János levele': '3 Ioan',
            'Júdás levele': 'Iuda',
            'Jelenések könyve': 'Apocalipsa lui Ioan'
        };

        // Global variables
        let currentChapter = '1';
        let currentBook = '';
        let currentLanguage = 'hu';
        let bibleBooks = bibleBooksHu;

        // Get current language from localStorage or default to Hungarian
        function getCurrentLanguage() {
            return localStorage.getItem('lang') || 'hu';
        }

        // Set current language
        function setCurrentLanguage(lang, initial = false) {
            currentLanguage = lang;
            bibleBooks = lang === 'hu' ? bibleBooksHu : bibleBooksRo;
            
            if (initial) {
                currentBook = lang === 'hu' ? '1Mózes könyve' : 'Geneza';
            } else {
                const newBookName = bookMapping[currentBook] || Object.keys(bibleBooks)[0];
                currentBook = newBookName;
            }
            
            updateBookList();
            updateUI();
            loadChapter(currentChapter);
        }

        // Update book list based on current language
        function updateBookList() {
            const bookList = document.querySelector('.book-list');
            if (!bookList) {
                console.error('Book list element not found');
                return;
            }
            bookList.innerHTML = ''; // Clear existing items

            const otBooks = Object.entries(bibleBooks).filter(([_, info]) => info.path.startsWith('o/'));
            const ntBooks = Object.entries(bibleBooks).filter(([_, info]) => info.path.startsWith('uj/'));

            const otSection = document.createElement('div');
            otSection.className = 'book-section';
            otSection.innerHTML = `<h4>${currentLanguage === 'hu' ? 'Ószövetség' : 'Vechiul Testament'}</h4>`;
            otBooks.forEach(([book, info]) => {
                const li = document.createElement('li');
                li.textContent = book;
                if (book === currentBook) li.classList.add('active');
                li.addEventListener('click', () => selectBook(book));
                otSection.appendChild(li);
            });
            bookList.appendChild(otSection);

            const ntSection = document.createElement('div');
            ntSection.className = 'book-section';
            ntSection.innerHTML = `<h4>${currentLanguage === 'hu' ? 'Újszövetség' : 'Noul Testament'}</h4>`;
            ntBooks.forEach(([book, info]) => {
                const li = document.createElement('li');
                li.textContent = book;
                if (book === currentBook) li.classList.add('active');
                li.addEventListener('click', () => selectBook(book));
                ntSection.appendChild(li);
            });
            bookList.appendChild(ntSection);
        }

        // Update UI elements based on current language
        function updateUI() {
            const searchInput = document.querySelector('.search-box input');
            if (searchInput) {
                searchInput.placeholder = currentLanguage === 'hu' ? 'Keresés a Bibliában...' : 'Căutare în Biblie...';
            }

            const prevBtn = document.querySelector('.chapter-nav-btn:first-child');
            const nextBtn = document.querySelector('.chapter-nav-btn:last-child');
            if (prevBtn) prevBtn.textContent = currentLanguage === 'hu' ? 'Előző fejezet' : 'Capitolul anterior';
            if (nextBtn) nextBtn.textContent = currentLanguage === 'hu' ? 'Következő fejezet' : 'Capitolul următor';
        }
        
        function selectBook(bookName) {
            currentBook = bookName;
            currentChapter = 1;
            
            const activeBook = document.querySelector('.book-list li.active');
            if (activeBook) activeBook.classList.remove('active');
            
            const selectedBook = Array.from(document.querySelectorAll('.book-list li'))
                .find(li => li.textContent === bookName);
            if (selectedBook) selectedBook.classList.add('active');

            loadChapter(currentChapter);
        }

        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                const searchTerm = this.value.toLowerCase().trim();
                
                if (searchTerm.length < 2) {
                    clearSearchResults();
                    return;
                }

                searchTimeout = setTimeout(() => {
                    searchBible(searchTerm);
                }, 300);
            });
        }

        function searchBible(term) {
            const results = [];
            const searchPromises = [];
            const basePath = currentLanguage === 'hu' ? '../biblia/karoli_biblia_html/' : '../biblia/cornilescu_biblia_html/';

            Object.entries(bibleBooks).forEach(([bookName, bookInfo]) => {
                for (let chapter = 1; chapter <= bookInfo.chapters; chapter++) {
                    const url = `${basePath}${bookInfo.path}/chap${String(chapter).padStart(3, '0')}.html`;
                    searchPromises.push(
                        fetch(url)
                            .then(response => response.ok ? response.text() : null)
                            .then(html => {
                                if (!html) return;
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(html, 'text/html');
                                doc.querySelectorAll('ol li').forEach(verse => {
                                    if (verse.textContent.toLowerCase().includes(term)) {
                                        results.push({ book: bookName, chapter: chapter, verse: verse.textContent });
                                    }
                                });
                            })
                            .catch(error => console.error('Error searching chapter:', url, error))
                    );
                }
            });

            Promise.all(searchPromises).then(() => displaySearchResults(results));
        }

        function displaySearchResults(results) {
            clearSearchResults();
            const resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            
            if (results.length === 0) {
                resultsContainer.innerHTML = `<p>${currentLanguage === 'hu' ? 'Nincs találat' : 'Nu s-au găsit rezultate'}</p>`;
            } else {
                const resultsList = document.createElement('ul');
                results.forEach(result => {
                    const li = document.createElement('li');
                    const chapterText = currentLanguage === 'hu' ? 'fejezet' : 'capitol';
                    li.innerHTML = `<strong>${result.book} ${result.chapter}. ${chapterText}</strong>: ${result.verse}`;
                    li.addEventListener('click', () => {
                        selectBook(result.book);
                        loadChapter(result.chapter);
                        clearSearchResults();
                    });
                    resultsList.appendChild(li);
                });
                resultsContainer.appendChild(resultsList);
            }
            document.querySelector('.bible-sidebar').appendChild(resultsContainer);
        }

        function clearSearchResults() {
            const existingResults = document.querySelector('.search-results');
            if (existingResults) existingResults.remove();
        }

        const prevChapterBtn = document.querySelector('.chapter-nav-btn:first-child');
        const nextChapterBtn = document.querySelector('.chapter-nav-btn:last-child');
        
        if (prevChapterBtn && nextChapterBtn) {
            prevChapterBtn.addEventListener('click', () => {
                if (currentChapter > 1) {
                    currentChapter--;
                    loadChapter(currentChapter);
                }
            });

            nextChapterBtn.addEventListener('click', () => {
                const maxChapters = bibleBooks[currentBook].chapters;
                if (currentChapter < maxChapters) {
                    currentChapter++;
                    loadChapter(currentChapter);
                }
            });
        }

        function updateChapterLinks() {
            const maxChapters = bibleBooks[currentBook].chapters;
            const chapterLinksContainer = document.querySelector('.bible-text h2');
            if (!chapterLinksContainer) {
                console.error('Chapter links container not found');
                return
            }
            
            const chapterText = currentLanguage === 'hu' ? 'Fejezetek:' : 'Capitole:';
            chapterLinksContainer.innerHTML = `${chapterText} `;
            
            for (let i = 1; i <= maxChapters; i++) {
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = i;
                if (i === currentChapter) link.classList.add('current-chapter');
                
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    loadChapter(i);
                });
                chapterLinksContainer.appendChild(link);
                if (i < maxChapters) chapterLinksContainer.appendChild(document.createTextNode(', '));
            }
        }

        function loadChapter(chapterNum) {
            currentChapter = chapterNum;
            const bookInfo = bibleBooks[currentBook];
            if (!bookInfo) return; // a book might not exist in the other language

            const chapterTitleEl = document.querySelector('.bible-content h3');
            if (chapterTitleEl) {
                const chapterText = currentLanguage === 'hu' ? 'fejezet' : 'capitol';
                chapterTitleEl.textContent = `${currentBook} - ${chapterNum}. ${chapterText}`;
            }
            
            if(prevChapterBtn) prevChapterBtn.disabled = chapterNum === 1;
            if(nextChapterBtn) nextChapterBtn.disabled = chapterNum >= bookInfo.chapters;

            updateChapterLinks();

            const basePath = currentLanguage === 'hu' ? '../biblia/karoli_biblia_html/' : '../biblia/cornilescu_biblia_html/';
            const url = `${basePath}${bookInfo.path}/chap${String(chapterNum).padStart(3, '0')}.html`;
            
            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
                    return response.text();
                })
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const verses = doc.querySelector('ol');

                    const versesContainer = document.querySelector('.verses');
                    if (verses && versesContainer) {
                        versesContainer.innerHTML = verses.innerHTML;
                    } else if (versesContainer) {
                        versesContainer.innerHTML = `<p>${currentLanguage === 'hu' ? 'A fejezet szövege nem található.' : 'Textul capitolului nu a fost găsit.'}</p>`;
                    }
                })
                .catch(error => {
                    console.error('Error loading chapter:', error);
                    const versesContainer = document.querySelector('.verses');
                    if (versesContainer) {
                        versesContainer.innerHTML = `<p>${currentLanguage === 'hu' ? 'Hiba történt a fejezet betöltése közben.' : 'A apărut o eroare la încărcarea capitolului.'}</p>`;
                    }
                });
        }
        
        // Link language switcher from main.js to the bible page logic
        document.body.addEventListener('langChanged', (e) => {
            setCurrentLanguage(e.detail.lang);
        });

        // Initial setup
        setCurrentLanguage(getCurrentLanguage(), true);

        // --- BIBLIA JSON BETÖLTÉSE ÉS NYELVVÁLTÁS ---
        let bibleVerses = {};
        let currentLang = 'hu';
        let allBooks = [];
        let chaptersByBook = {};

        function verseDomId(verseKey) {
            return verseKey.replace(/[^a-zA-Z0-9]/g, '_');
        }

        function renderChapterFromJson(book, chapter) {
            const versesContainer = document.querySelector('.verses');
            if (!versesContainer) return;
            const verses = [];
            let i = 1;
            while (true) {
                const key = `${book} ${chapter}:${i}`;
                if (!(key in bibleVerses)) break;
                const domId = verseDomId(key);
                verses.push(`<li id="${domId}">${bibleVerses[key][currentLang] || ''}</li>`);
                i++;
            }
            versesContainer.innerHTML = verses.join('');
            // Frissítjük a fejezet címet
            const chapterTitleEl = document.querySelector('.bible-content h3');
            if (chapterTitleEl) chapterTitleEl.textContent = `${book} - ${chapter}. fejezet`;
            // Frissítjük a fejezet linkeket
            updateChapterLinksFromJson(book);
        }

        function updateBookListFromJson() {
            const bookList = document.querySelector('.book-list');
            if (!bookList) return;
            bookList.innerHTML = '';
            allBooks.forEach(book => {
                const li = document.createElement('li');
                li.textContent = book;
                if (book === currentBook) li.classList.add('active');
                li.addEventListener('click', () => {
                    currentBook = book;
                    currentChapter = '1';
                    document.querySelectorAll('.book-list li.active').forEach(el => el.classList.remove('active'));
                    li.classList.add('active');
                    renderChapterFromJson(currentBook, currentChapter);
                });
                bookList.appendChild(li);
            });
        }

        function updateChapterLinksFromJson(book) {
            const chapterLinksContainer = document.querySelector('.bible-text h2');
            if (!chapterLinksContainer) return;
            const maxChapters = chaptersByBook[book] || 1;
            chapterLinksContainer.innerHTML = `Fejezetek: `;
            for (let i = 1; i <= maxChapters; i++) {
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = i;
                if (String(i) === String(currentChapter)) link.classList.add('current-chapter');
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentChapter = String(i);
                    renderChapterFromJson(currentBook, currentChapter);
                });
                chapterLinksContainer.appendChild(link);
                if (i < maxChapters) chapterLinksContainer.appendChild(document.createTextNode(', '));
            }
        }

        // JSON betöltése és teljes struktúra felépítése
        fetch('../biblia/bible_hu_ro.json')
            .then(response => response.json())
            .then(data => {
                bibleVerses = data;
                // Könyvlista és fejezetek kigyűjtése
                const bookSet = new Set();
                Object.keys(bibleVerses).forEach(key => {
                    const [bookChap,] = key.split(':');
                    const lastSpace = bookChap.lastIndexOf(' ');
                    let book = bookChap.substring(0, lastSpace).trim();
                    const chapter = bookChap.substring(lastSpace + 1);
                    bookSet.add(book);
                    if (!chaptersByBook[book]) chaptersByBook[book] = 0;
                    chaptersByBook[book] = Math.max(chaptersByBook[book], parseInt(chapter));
                });
                allBooks = Array.from(bookSet);
                if (allBooks.length === 0) {
                    console.error('Nem található könyv a JSON-ban!');
                }
                allBooks.sort(); // ABC sorrend
                // Alapértelmezett könyv és fejezet
                currentBook = allBooks[0];
                currentChapter = '1';
                updateBookListFromJson();
                renderChapterFromJson(currentBook, currentChapter);

                // Debugging statements
                console.log('Extracted Books:', allBooks);
                console.log('Chapters by Book:', chaptersByBook);
            });

    } catch (error) {
        console.error('Error initializing Bible page:', error);
    }  
