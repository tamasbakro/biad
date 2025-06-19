<?php
class Database {
    private $serverName = "DESKTOP-ELE88K9\\SQLEXPRESS";
    private $database = "AdventistaEgyhaz";
    private $uid = "biad_app_user";
    private $pwd = "advent123";
    private $conn;

    public function connect() {
        try {
            $this->conn = new PDO(
                "sqlsrv:Server=$this->serverName;Database=$this->database",
                $this->uid,
                $this->pwd
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conn;
        } catch(PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public function close() {
        $this->conn = null;
    }
}
?> 