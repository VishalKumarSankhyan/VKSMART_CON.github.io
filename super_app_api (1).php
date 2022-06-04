<?php
include 'connection.php';
$selectquery = "select * from super_app_table";
$query = mysqli_query($con,$selectquery);
$data = mysqli_fetch_array($query);
echo $data[0],$data[1],$data[2],$data[3],$data[4],$data[5],$data[6],$data[7];
?>