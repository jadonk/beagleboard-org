<?php

    include("header.inc.php");


    $date = $_GET['date'];
    if (isset($date) && preg_match("/^\d\d\d\d-\d\d-\d\d$/", $date)) {
?>

    <div>
     <a href="./">Index</a>
    </div>

    <h2>IRC Log for <?php echo($date); ?></h2>
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
