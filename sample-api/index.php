<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$method = $_SERVER['REQUEST_METHOD'];

function getCurrentTime() {
    date_default_timezone_set('America/New_York');
    return date('H:i:s');
}

switch ($method) {
    case 'GET':
        // Handle GET requests
        $data = ['message' => 'The time is now '.getCurrentTime(), 'time' => getCurrentTime(), 'params' => $_GET];
        echo json_encode($data);
        break;
    case 'POST':
        // Handle POST requests
        $input = json_decode(file_get_contents('php://input'), true);
        $data = ['message' => 'This is a POST request', 'received_data' => $input];
        echo json_encode($data);
        break;
    // Add cases for PUT, DELETE, etc. as needed
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>