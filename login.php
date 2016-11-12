<?php
require "db_config.php";
 
$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json"); //php header function

//all request are GET
if($method == 'GET') {
  
  //get the job wanted by the user
  $job = $_GET['job'];
  
  //check session code entered
  if($job == 'judge')
  {
    //get code of the project
    $code = $_GET['code'];

    $sql = "select * from projects where Code='".$code."'";
    
    //fetch data
    $result = $dbh->query($sql);
  
    if($result->fetch())
    {
      echo json_encode('Judge In');
    }
  }
  else if($job == 'admin')
  {
    $code = $_GET['code'];
    $name = $_GET['name'];
    //default password to be admin
    if($name == 'admin' && $code == md5('admin'))
    {
      echo json_encode('Admin In');
    }
    else
    {
      echo json_encode('Incorrect Login info');
    }
  }
    
    $dbh=null;
}


?>
