<?php
require_once __DIR__ . '/Model.php';

class Bible extends Model {
    protected $table = 'BibleBooks';

    public function getAllBooks() {
        $query = "SELECT * FROM {$this->table} ORDER BY BookOrder";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBookById($bookId) {
        $query = "SELECT * FROM {$this->table} WHERE BookID = :bookId";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':bookId', $bookId);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getChapter($bookId, $chapter) {
        $query = "SELECT v.*, b.BookName 
                 FROM BibleVerses v 
                 JOIN BibleBooks b ON v.BookID = b.BookID 
                 WHERE v.BookID = :bookId AND v.Chapter = :chapter 
                 ORDER BY v.Verse";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':bookId', $bookId);
        $stmt->bindParam(':chapter', $chapter);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function searchVerses($searchTerm) {
        $searchTerm = "%{$searchTerm}%";
        $query = "SELECT v.*, b.BookName 
                 FROM BibleVerses v 
                 JOIN BibleBooks b ON v.BookID = b.BookID 
                 WHERE v.VerseText LIKE :searchTerm 
                 ORDER BY b.BookOrder, v.Chapter, v.Verse 
                 LIMIT 50";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':searchTerm', $searchTerm);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getNextChapter($bookId, $currentChapter) {
        $book = $this->getBookById($bookId);
        if ($currentChapter < $book['ChapterCount']) {
            return $currentChapter + 1;
        }
        
        // If it's the last chapter, get the first chapter of the next book
        $query = "SELECT BookID, BookName FROM {$this->table} 
                 WHERE BookOrder > (SELECT BookOrder FROM {$this->table} WHERE BookID = :bookId) 
                 ORDER BY BookOrder LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':bookId', $bookId);
        $stmt->execute();
        $nextBook = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return $nextBook ? ['bookId' => $nextBook['BookID'], 'chapter' => 1] : null;
    }

    public function getPreviousChapter($bookId, $currentChapter) {
        if ($currentChapter > 1) {
            return $currentChapter - 1;
        }
        
        // If it's the first chapter, get the last chapter of the previous book
        $query = "SELECT BookID, BookName FROM {$this->table} 
                 WHERE BookOrder < (SELECT BookOrder FROM {$this->table} WHERE BookID = :bookId) 
                 ORDER BY BookOrder DESC LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':bookId', $bookId);
        $stmt->execute();
        $prevBook = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($prevBook) {
            $prevBookInfo = $this->getBookById($prevBook['BookID']);
            return ['bookId' => $prevBook['BookID'], 'chapter' => $prevBookInfo['ChapterCount']];
        }
        
        return null;
    }
}
?> 