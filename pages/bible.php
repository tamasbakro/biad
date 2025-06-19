<?php
require_once __DIR__ . '/../config/database.php';

// Function to get Bible content from file
function getBibleContent($bookId, $chapter) {
    $bibleFile = __DIR__ . '/../biblia/egyben.txt';
    $content = file_get_contents($bibleFile);
    
    // Get book name from database
    $db = new Database();
    $conn = $db->connect();
    $stmt = $conn->prepare("SELECT BookName FROM BibleBooks WHERE BookID = ?");
    $stmt->execute([$bookId]);
    $bookName = $stmt->fetchColumn();
    $db->close();
    
    // Pattern to match the chapter
    $pattern = "/" . preg_quote($bookName) . "\s+" . $chapter . "\.[\s\S]*?(?=" . preg_quote($bookName) . "\s+" . ($chapter + 1) . "\.|$)/";
    
    if (preg_match($pattern, $content, $matches)) {
        $chapterText = $matches[0];
        
        // Split into verses
        $verses = [];
        $versePattern = "/(\d+)\.\s+(.*?)(?=\d+\.|$)/s";
        preg_match_all($versePattern, $chapterText, $verseMatches, PREG_SET_ORDER);
        
        foreach ($verseMatches as $verse) {
            $verses[] = [
                'Verse' => $verse[1],
                'VerseText' => trim($verse[2])
            ];
        }
        
        return $verses;
    }
    
    return [];
}

// Get current book and chapter from URL parameters
$bookId = isset($_GET['book']) ? (int)$_GET['book'] : 1;
$chapter = isset($_GET['chapter']) ? (int)$_GET['chapter'] : 1;

// Get books from database
$db = new Database();
$conn = $db->connect();
$stmt = $conn->query("SELECT * FROM BibleBooks ORDER BY BookOrder");
$books = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Get current book info
$stmt = $conn->prepare("SELECT * FROM BibleBooks WHERE BookID = ?");
$stmt->execute([$bookId]);
$currentBook = $stmt->fetch(PDO::FETCH_ASSOC);

// Get verses for current chapter
$verses = getBibleContent($bookId, $chapter);

// Handle search
$searchResults = [];
if (isset($_GET['search']) && !empty($_GET['search'])) {
    $searchTerm = $_GET['search'];
    $bibleFile = __DIR__ . '/../biblia/egyben.txt';
    $content = file_get_contents($bibleFile);
    
    // Search in content
    $pattern = "/[^.]*" . preg_quote($searchTerm) . "[^.]*\./i";
    preg_match_all($pattern, $content, $matches);
    
    foreach ($matches[0] as $match) {
        // Try to extract book, chapter, and verse information
        if (preg_match("/([A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű\s\.]+)\s+(\d+)\.\s+(\d+)\./", $match, $verseInfo)) {
            $searchResults[] = [
                'BookName' => trim($verseInfo[1]),
                'Chapter' => $verseInfo[2],
                'Verse' => $verseInfo[3],
                'VerseText' => trim($match)
            ];
        }
    }
}

// Get navigation info
$nextChapter = $chapter < $currentBook['ChapterCount'] ? $chapter + 1 : null;
$prevChapter = $chapter > 1 ? $chapter - 1 : null;

$db->close();
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblia - Adventista Egyház</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .bible-container {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 2rem;
            margin-top: 2rem;
            padding: 0 2rem;
        }

        .bible-sidebar {
            background-color: var(--light-bg);
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            height: fit-content;
            position: sticky;
            top: 100px;
        }

        .bible-content {
            background-color: var(--light-bg);
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .search-box {
            margin-bottom: 1rem;
        }

        .search-box input {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }

        .book-list {
            list-style: none;
            padding: 0;
            max-height: 70vh;
            overflow-y: auto;
        }

        .book-list li {
            padding: 0.5rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
            border-radius: 5px;
        }

        .book-list li:hover {
            background-color: #e0e0e0;
        }

        .book-list li.active {
            background-color: var(--accent-color);
            color: white;
        }

        .testament-header {
            font-weight: bold;
            padding: 0.5rem;
            background-color: var(--primary-color);
            color: white;
            margin-top: 1rem;
            border-radius: 5px;
        }

        .chapter-navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding: 1rem;
            background-color: white;
            border-radius: 5px;
        }

        .chapter-nav-btn {
            background-color: var(--accent-color);
            color: white;
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .chapter-nav-btn:hover {
            background-color: #d35400;
        }

        .chapter-nav-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        .bible-text {
            line-height: 1.8;
            font-size: 1.1rem;
        }

        .verse {
            margin-bottom: 1rem;
            padding: 0.5rem;
            border-radius: 5px;
        }

        .verse:hover {
            background-color: rgba(0,0,0,0.05);
        }

        .verse-number {
            color: var(--accent-color);
            font-weight: bold;
            margin-right: 0.5rem;
        }

        .search-results {
            margin-top: 1rem;
            padding: 1rem;
            background-color: white;
            border-radius: 5px;
        }

        .search-result-item {
            margin-bottom: 1rem;
            padding: 0.5rem;
            border-bottom: 1px solid #eee;
        }

        .search-result-reference {
            color: var(--accent-color);
            font-weight: bold;
        }

        @media (max-width: 768px) {
            .bible-container {
                grid-template-columns: 1fr;
            }
            
            .bible-sidebar {
                position: static;
            }
        }
    </style>
</head>
<body>
    <div class="hero bible-hero">
        <div class="hero-content">
            <h1>Biblia</h1>
            <p>Olvassa online a Bibliát, keressen fejezeteket, és fedezze fel Isten igéjét!</p>
        </div>
    </div>

    <main>
        <section class="bible-section">
            <div class="bible-container">
                <div class="bible-sidebar">
                    <div class="search-box">
                        <form method="GET" action="">
                            <input type="text" name="search" placeholder="Keresés a Bibliában..." 
                                   value="<?php echo isset($_GET['search']) ? htmlspecialchars($_GET['search']) : ''; ?>">
                        </form>
                    </div>
                    <ul class="book-list">
                        <?php 
                        $currentTestament = '';
                        foreach ($books as $book): 
                            if ($book['Testament'] !== $currentTestament):
                                $currentTestament = $book['Testament'];
                        ?>
                            <li class="testament-header">
                                <?php echo $currentTestament === 'Old' ? 'Ószövetség' : 'Újszövetség'; ?>
                            </li>
                        <?php endif; ?>
                            <li class="<?php echo $book['BookID'] === $bookId ? 'active' : ''; ?>"
                                onclick="window.location.href='?book=<?php echo $book['BookID']; ?>&chapter=1'">
                                <?php echo htmlspecialchars($book['BookName']); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div class="bible-content">
                    <?php if (!empty($searchResults)): ?>
                        <div class="search-results">
                            <h2>Keresési eredmények</h2>
                            <?php foreach ($searchResults as $result): ?>
                                <div class="search-result-item">
                                    <div class="search-result-reference">
                                        <?php echo htmlspecialchars($result['BookName'] . ' ' . $result['Chapter'] . ':' . $result['Verse']); ?>
                                    </div>
                                    <div class="search-result-text">
                                        <?php echo htmlspecialchars($result['VerseText']); ?>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php else: ?>
                        <div class="chapter-navigation">
                            <button class="chapter-nav-btn" 
                                    onclick="window.location.href='?book=<?php echo $bookId; ?>&chapter=<?php echo $prevChapter; ?>'"
                                    <?php echo $prevChapter === null ? 'disabled' : ''; ?>>
                                Előző fejezet
                            </button>
                            <h3><?php echo htmlspecialchars($currentBook['BookName'] . ' - ' . $chapter . '. fejezet'); ?></h3>
                            <button class="chapter-nav-btn"
                                    onclick="window.location.href='?book=<?php echo $bookId; ?>&chapter=<?php echo $nextChapter; ?>'"
                                    <?php echo $nextChapter === null ? 'disabled' : ''; ?>>
                                Következő fejezet
                            </button>
                        </div>
                        <div class="bible-text">
                            <?php foreach ($verses as $verse): ?>
                                <div class="verse">
                                    <span class="verse-number"><?php echo $verse['Verse']; ?></span>
                                    <?php echo htmlspecialchars($verse['VerseText']); ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </section>
    </main>

    <script src="../js/main.js"></script>
</body>
</html> 