<?php
require "db_config.php";
 
$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json"); //php header function

//all request are GET
if($method == 'GET') {
  
  //get the job wanted by the user
  $job = $_GET['job'];
  
  //get project info
  if($job == 'get')
  {
    //get code of the project
    $code = $_GET['code'];

    $sql = "select * from projects where Code=".$code;
    
    //fetch data
    $result = $dbh->query($sql);
  
    echo json_encode($result->fetch());
  }
  //post a new evaluation
  else if($job == 'post')
  {
    //check if the judge already submitted a record
    $code = $_GET['code'];
    $judge = $_GET['judge'];
    $search = "select * from evaluations where code=".$code." and judge='".$judge."'";
    $search_result = $dbh->query($search);
    if($row = $search_result->fetch()){
      echo json_encode('Evaluation Submitted Failed: Record already exist');
    }
    else
    {
      //insert the new event
      $sql = "INSERT INTO evaluations (code,session,judge,da,db,dc,dd,de,df,dg,dh,pa,pb,pc,pd,total,economic,environmental,sustainability,manufacturability,ethical,healthandsafety,social,political,comments) VALUES (:code,:session,:judge,:da,:db,:dc,:dd,:de,:df,:dg,:dh,:pa,:pb,:pc,:pd,:total,:economic,:environmental,:sustainability,:manufacturability,:ethical,:healthandsafety,:social,:political,:comments)";
      
      //prepare the statement, auto sanitize
      $stmt = $dbh->prepare($sql);
      
      //bind the parameters
      $stmt->bindParam(':code', $_GET['code']);
      $stmt->bindParam(':session', $_GET['session']);
      $stmt->bindParam(':judge', $_GET['judge']);
      $stmt->bindParam(':da', $_GET['da']);
      $stmt->bindParam(':db', $_GET['db']);
      $stmt->bindParam(':dc', $_GET['dc']);
      $stmt->bindParam(':dd', $_GET['dd']);
      $stmt->bindParam(':de', $_GET['de']);
      $stmt->bindParam(':df', $_GET['df']);
      $stmt->bindParam(':dg', $_GET['dg']);
      $stmt->bindParam(':dh', $_GET['dh']);
      $stmt->bindParam(':pa', $_GET['pa']);
      $stmt->bindParam(':pb', $_GET['pb']);
      $stmt->bindParam(':pc', $_GET['pc']);
      $stmt->bindParam(':pd', $_GET['pd']);
      $stmt->bindParam(':total', $_GET['total']);
      $stmt->bindParam(':economic', $_GET['economic']);
      $stmt->bindParam(':environmental', $_GET['environmental']);
      $stmt->bindParam(':sustainability', $_GET['sustainability']);
      $stmt->bindParam(':manufacturability', $_GET['manufacturability']);
      $stmt->bindParam(':ethical', $_GET['ethical']);
      $stmt->bindParam(':healthandsafety', $_GET['healthandsafety']);
      $stmt->bindParam(':social', $_GET['social']);
      $stmt->bindParam(':political', $_GET['political']);
      $stmt->bindParam(':comments', $_GET['comments']);

      if($stmt->execute()){
        echo json_encode('Evaluation Submitted Successful');
      }
      else
      {
        echo json_encode('Evaluation Submitted Failed');
      }
    }
  }

  else if($job == 'getJudges')
  {
    //get code of the project
    $code = $_GET['code'];

    $sql = "select * from evaluations where code=".$code;
    
    //fetch data
    $result = $dbh->query($sql);
  
    echo json_encode($result->fetchAll());
  }

    else if($job == 'getJudge')
  {
    //get code of the project
    $code = $_GET['code'];
    $judge = $_GET['judge'];

    $sql = "select * from evaluations where code=".$code." and judge='".$judge."'";
    
    //fetch data
    $result = $dbh->query($sql);
    
    echo json_encode($result->fetch());
    
  }

  else if($job == 'download')
  {
    //get code of the project
    $session = $_GET['session'];

    $sql = "select * from evaluations where session='".$session."'";
    
    //fetch data
    //code from http://code.stephenmorley.org/php/creating-downloadable-csv-files/
    // output headers so that the file is downloaded rather than displayed
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=data.csv');

    // create a file pointer connected to the output stream
    $output = fopen('php://output', 'w');

    // output the column headings
    fputcsv($output, array('Code','Session','Judge','Technical Accuracy','Creativity and Innovation','Supporting Analytical Work','Methodical Design Process Demonstrated','Addresses Project Complexity Appropriately','Expectation of Completion (by term’s end)','Design & Analysis of tests','Quality of Response during Q&A','Organization','Use of Allotted Time','Visual Aids','Confidence and Poise','Grand Total','Economic','Environmental','Sustainability','Manufacturability','Ethical','Health and Safety','Social','Political','Comments'));


    
    //fetch data
    $result = $dbh->query($sql);

    if($row = $result->fetch())
    {
           do{
           //loop over the rows, outputting them
            for($i=0; $i<25; $i++) {
              unset($row[$i]);
            }
            fputcsv($output, $row);
           }while($row = $result->fetch());

    }
    else
    {
      fputcsv($output, array('No submission for this session in databse yet'));
    }
  }
    
    $dbh=null;
}


?>
