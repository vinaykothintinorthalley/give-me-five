<?php

//include_once('db.php');
require_once('class.phpmailer.php');

$mail = new PHPMailer(); // defaults to using php "mail()"

$subscriberorganization = htmlspecialchars($_POST['subscriber_organization']);
$noofparticipants = htmlspecialchars($_POST['no_of_participants']);
$package = htmlspecialchars($_POST['implementation_package']);
$adminemail =  $_POST['admin_email'];
//Sent to User    
$body = file_get_contents('subsription_template.html');
//$body = eregi_replace("[\]",'',$body);

// Replace placeholders with actual data
$body = str_replace('{{subscriberorganization}}', $subscriberorganization, $body);
$body = str_replace('{{noofparticipants}}', $noofparticipants, $body);
$body = str_replace('{{package}}', $package, $body);
$body = str_replace('{{adminemail}}', $adminemail, $body);

//$mail->SMTPAuth   = true;                  // enable SMTP authentication

$mail->SMTPAuth   = false;
$mail->SMTPSecure = false;
$mail->Host       = 'relay-hosting.secureserver.net'; // sets the SMTP server
$mail->Port       = 25; //25;       //465             // set the SMTP port for the GMAIL server

// Set the content-type header for sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

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

$subscriberorganization = htmlspecialchars($_POST['subscriber_organization']);
$address = htmlspecialchars($_POST['address']);
$telephonenumber = htmlspecialchars($_POST['telephone_number']);
$administratordetails =  $_POST['administrator_details'];
$adminemail =  $_POST['admin_email'];
$adminphone =  $_POST['admin_phone'];
$noofparticipants =  $_POST['no_of_participants'];
$implementationpackage =  $_POST['implementation_package'];
//Sent to Admin    
$body1 = file_get_contents('subsription_admin_template.html');
//$body = eregi_replace("[\]",'',$body);

// Replace placeholders with actual data
$body1 = str_replace('{{subscriberorganization}}', $subscriberorganization, $body1);
$body1 = str_replace('{{address}}', $address, $body1);
$body1 = str_replace('{{telephonenumber}}', $telephonenumber, $body1);
$body1 = str_replace('{{administratordetails}}', $administratordetails, $body1);
$body1 = str_replace('{{adminemail}}', $adminemail, $body1);
$body1 = str_replace('{{adminphone}}', $adminphone, $body1);
$body1 = str_replace('{{noofparticipants}}', $noofparticipants, $body1);
$body1 = str_replace('{{implementationpackage}}', $implementationpackage, $body1);

$mail->SMTPAuth = false;
$mail->SMTPSecure = false;
$mail->Host       = 'relay-hosting.secureserver.net'; // sets the SMTP server
$mail->Port       = 25; //25;       //465             // set the SMTP port for the GMAIL server

// Set the content-type header for sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

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