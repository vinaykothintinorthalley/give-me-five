<?php

//include_once('db.php');
require_once('class.phpmailer.php');

$mail = new PHPMailer(); // defaults to using php "mail()"
//Sent to User    
$body = file_get_contents('subsription_template.html');
//$body = eregi_replace("[\]",'',$body);

//$mail->SMTPAuth   = true;                  // enable SMTP authentication

$mail->SMTPAuth   = false;
$mail->SMTPSecure = false;
$mail->Host       = 'relay-hosting.secureserver.net'; // sets the SMTP server
$mail->Port       = 25; //25;       //465             // set the SMTP port for the GMAIL server


$mail->AddReplyTo("info@givemefive.cloud","Givemefive");
$mail->SetFrom("info@givemefive.cloud","Givemefive");

$subscriber_organization =  $_POST['subscriber_organization'];
$address =  $_POST['address'];
$telephone_number =  $_POST['telephone_number'];
$administrator_details =  $_POST['administrator_details'];
$admin_email =  $_POST['admin_email'];
$admin_phone =  $_POST['admin_phone'];
$no_of_participants =  $_POST['no_of_participants'];
$implementation_package =  $_POST['implementation_package'];


$mail->AddAddress($admin_email, $administrator_details);

$mail->Subject    = "A message from Givemefive subscription form";
$mail->MsgHTML($body);


$mail1 = new PHPMailer(); // defaults to using php "mail()"
//Sent to Support
$body1  = "<p>Subscriber Organization  : ".$subscriber_organization."</p>";
$body1  = "<p>Address : ".$address."</p>";
$body1  = "<p>Telephone Number : ".$telephone_number."</p>";
$body1  = "<p>Administrator Details : ".$administrator_details."</p>";
$body1  = "<p>Admin Email : ".$admin_email."</p>";
$body1  = "<p>Admin Phone Number : ".$admin_phone."</p>";
$body1  = "<p>No of Participants : ".$no_of_participants."</p>";
$body1  = "<p>Implementation Package : ".$implementation_package."</p>";
//$body1  = eregi_replace("[\]",'',$body1);

$mail->SMTPAuth = false;
$mail->SMTPSecure = false;
$mail->Host       = 'relay-hosting.secureserver.net'; // sets the SMTP server
$mail->Port       = 25; //25;       //465             // set the SMTP port for the GMAIL server

$mail1->AddReplyTo("info@givemefive.cloud","Givemefive");
$mail1->SetFrom($_POST['admin_email'], $_POST['name']);

$address1 =  'info@givemefive.cloud';
$name1 =  $_POST['administrator_details'];
$mail1->AddAddress($address1, $name1);

$mail1->Subject    = "A Message From Givemefive subscription Form";
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