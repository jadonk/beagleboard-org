<?php

    include("header.inc.php");


    $date = $_GET['date'];
    if (isset($date) && preg_match("/^\d\d\d\d-\d\d-\d\d$/", $date)) {
      $log_date = new DateTime($date);
      $log_date->modify("-1 day");
      $previous_log = $log_date->format("Y-m-d");
      $log_date->modify("+2 days");
      $next_log = $log_date->format("Y-m-d");
?>

    <h1>IRC Log for <?php echo($date); ?></h1>

    <ul id="navigation">
     <li><a href="/irclogs/index.php">Index</a></li>
     <li><a rel="previous" href="/irclogs/index.php?date=<?php echo($previous_log); ?>"><?php echo($previous_log); ?></a></li>
     <li><a rel="next" href="/irclogs/index.php?date=<?php echo($next_log); ?>"><?php echo($next_log); ?></a></li>
    </ul>

    <p>
     Timestamps are in UTC.
    </p>
    <ol class="log">
    
<?php
        readfile($date . ".log");
?>
    </ol>
<?php
    }
    else {
        $dir = opendir(".");
        while (false !== ($file = readdir($dir))) {
            if (strpos($file, ".log") == 10) {
                $filearray[] = $file;
            }
        }
        closedir($dir);
        
        rsort($filearray);
?>
    <ol>
<?php
        
        
        foreach ($filearray as $file) {
            $file = substr($file, 0, 10);
?>
        <li><a href="<?php echo($_SERVER['PHP_SELF'] . "?date=" . $file); ?>"><?php echo($file); ?></a></li>
<?php
        }
?>
    </ol>
<?php
    }

    include("footer.inc.php");

?>
