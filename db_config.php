<?php
//require "login.php";
  $dsn = 'mysql:host=dbserver.engr.scu.edu;dbname=sdb_yli';
  $username = 'yli';   // username is your phpmyadmin username
  $password = '00001023457';   // password is your phpmyadmin password
  $options = array(
                   PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
                   );

  try {
    $dbh = new PDO($dsn, $username, $password);
    //echo "Connected";
  } catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    
  }
  
?>
