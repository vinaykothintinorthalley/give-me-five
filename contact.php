<?php

//include_once('db.php');
require_once('class.phpmailer.php');

$mail = new PHPMailer(); // defaults to using php "mail()"
//Sent to User    
$body = file_get_contents('contact_template.html');
//$body = eregi_replace("[\]",'',$body);

//$mail->SMTPAuth   = true;                  // enable SMTP authentication

$mail->SMTPAuth   = false;
$mail->SMTPSecure = false;
$mail->Host       = 'relay-hosting.secureserver.net'; // sets the SMTP server
$mail->Port       = 25; //25;       //465             // set the SMTP port for the GMAIL server


$mail->AddReplyTo("info@givemefive.cloud","Givemefive");
$mail->SetFrom("info@givemefive.cloud","Givemefive");

$address =  $_POST['email'];
$name =  $_POST['first_name'];
$lastname =  $_POST['last_name'];


$mail->AddAddress($address, $name);

$mail->Subject    = "A message from Givemefive contact form";
$mail->MsgHTML($body);


$mail1 = new PHPMailer(); // defaults to using php "mail()"
//Sent to Support
$body1  = "<p>First Name : ".$name."</p>";
$body1  = "<p>Last Name : ".$lastname."</p>";
$body1  = "<p>Business Name : ".$_POST['business_name']."</p>";
$body1 .= "<p>Email : ".$_POST['email']."</p>";
$body1 .= "<p>Phone : ".$_POST['phone']."</p>";
//$body1  = eregi_replace("[\]",'',$body1);

$mail->SMTPAuth = false;
$mail->SMTPSecure = false;
$mail->Host       = 'relay-hosting.secureserver.net'; // sets the SMTP server
$mail->Port       = 25; //25;       //465             // set the SMTP port for the GMAIL server

$mail1->AddReplyTo("info@givemefive.cloud","Givemefive");
$mail1->SetFrom($_POST['email'], $_POST['name']);

$address1 =  'info@givemefive.cloud';
$name1 =  $_POST['name'];
$mail1->AddAddress($address1, $name1);

$mail1->Subject    = "A Message From Givemefive Contact Form";
$mail1->MsgHTML($body1);





	if($mail->Send() && $mail1->Send()) {
		 $response["status"] = "success";
			$response["msg"] = "Data Inserted Succesfully";
	} else {
			$response["status"] = "error";
			$response["msg"] = "Email sent fail";
	}


echo json_encode($response);
exit;    

?> 