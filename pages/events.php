<?php
require_once __DIR__ . '/../models/Event.php';

// Create an instance of the Event model
$eventModel = new Event();

// Get upcoming events
$upcomingEvents = $eventModel->getUpcomingEvents();

// Handle form submission for new events (admin only)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'create') {
        $eventData = [
            'Title' => $_POST['title'],
            'Description' => $_POST['description'],
            'EventDate' => $_POST['event_date'],
            'Location' => $_POST['location'],
            'Category' => $_POST['category'],
            'CreatedBy' => 1, // Replace with actual user ID
            'IsActive' => 1
        ];
        
        if ($eventModel->create($eventData)) {
            $message = "Event created successfully!";
        } else {
            $error = "Error creating event.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Események - Adventista Egyház</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <!-- Include your header/navigation here -->
    </header>

    <main>
        <section class="events-section">
            <h1>Közelgő Események</h1>
            
            <?php if (isset($message)): ?>
                <div class="alert alert-success"><?php echo $message; ?></div>
            <?php endif; ?>
            
            <?php if (isset($error)): ?>
                <div class="alert alert-error"><?php echo $error; ?></div>
            <?php endif; ?>

            <div class="events-grid">
                <?php foreach ($upcomingEvents as $event): ?>
                    <div class="event-card">
                        <h3><?php echo htmlspecialchars($event['Title']); ?></h3>
                        <p class="event-date">
                            <?php echo date('Y. F j.', strtotime($event['EventDate'])); ?>
                        </p>
                        <p class="event-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <?php echo htmlspecialchars($event['Location']); ?>
                        </p>
                        <p class="event-description">
                            <?php echo htmlspecialchars($event['Description']); ?>
                        </p>
                        <span class="event-category">
                            <?php echo htmlspecialchars($event['Category']); ?>
                        </span>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- Admin form for creating new events -->
            <?php if (isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin'): ?>
                <div class="admin-section">
                    <h2>Új Esemény Létrehozása</h2>
                    <form method="POST" action="">
                        <input type="hidden" name="action" value="create">
                        
                        <div class="form-group">
                            <label for="title">Cím:</label>
                            <input type="text" id="title" name="title" required>
                        </div>

                        <div class="form-group">
                            <label for="description">Leírás:</label>
                            <textarea id="description" name="description" required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="event_date">Dátum és Idő:</label>
                            <input type="datetime-local" id="event_date" name="event_date" required>
                        </div>

                        <div class="form-group">
                            <label for="location">Helyszín:</label>
                            <input type="text" id="location" name="location" required>
                        </div>

                        <div class="form-group">
                            <label for="category">Kategória:</label>
                            <select id="category" name="category" required>
                                <option value="Istentisztelet">Istentisztelet</option>
                                <option value="Imacsoport">Imacsoport</option>
                                <option value="Bibliaóra">Bibliaóra</option>
                                <option value="Egyéb">Egyéb</option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-primary">Esemény Létrehozása</button>
                    </form>
                </div>
            <?php endif; ?>
        </section>
    </main>

    <footer>
        <!-- Include your footer here -->
    </footer>

    <script src="../js/main.js"></script>
</body>
</html> 