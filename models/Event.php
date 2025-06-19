<?php
require_once __DIR__ . '/Model.php';

class Event extends Model {
    protected $table = 'Events';
    protected $primaryKey = 'EventID';

    public function getUpcomingEvents() {
        $query = "SELECT * FROM {$this->table} 
                 WHERE EventDate >= GETDATE() 
                 AND IsActive = 1 
                 ORDER BY EventDate ASC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEventsByCategory($category) {
        $query = "SELECT * FROM {$this->table} 
                 WHERE Category = :category 
                 AND IsActive = 1 
                 ORDER BY EventDate ASC";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':category', $category);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEventsByDateRange($startDate, $endDate) {
        $query = "SELECT * FROM {$this->table} 
                 WHERE EventDate BETWEEN :startDate AND :endDate 
                 AND IsActive = 1 
                 ORDER BY EventDate ASC";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':startDate', $startDate);
        $stmt->bindParam(':endDate', $endDate);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?> 