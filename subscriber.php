 <?php
$servername = "localhost";
$username = "dbsubscri";
$password = "hO8AFe;XOW##";
try {
  $conn = new PDO("mysql:host=$servername;dbname=subscribers", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
 
 $email = $_POST['email'];
  $stmt = $conn->prepare("SELECT * FROM subscribers WHERE email=?");
  $stmt->execute([$email]); 
  $user = $stmt->fetch();
  if(isset($user['email'])){
  	$response = array();
  	$response['success'] = false;
  	$response['message'] = "You are already subscribed";
  	echo json_encode($response);
  } else {
  	$data = [
    'email' => $_POST['email'],
    'created_at' => date("Y-m-d H:i:s")
	];
	$sql = "INSERT INTO subscribers (email, created_at) VALUES (:email, :created_at)";
	$stmt= $conn->prepare($sql);
	$stmt->execute($data);
	$response['success'] = true;
  	$response['message'] = "You have been subscribed successfully";
  	echo json_encode($response);
  }
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
exit;
?> 