<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    $con = new mysqli('localhost','root','','ionic');

    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $sql = $con->query("select * from user where id = '$id'");
            $data = $sql->fetch_assoc();
        }else{
            $data = array();
            
            $sql = $con->query("select * from user");
            while($d = $sql->fetch_assoc()){
                $data[] = $d;
            }
        }
        exit(json_encode($data));//json_encode( $arr, JSON_NUMERIC_CHECK );
    }
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $data  = json_decode(file_get_contents("php://input"));
        $sql = $con->query("insert into user (name, email, password) values ('".$data->name."','".$data->email."','".$data->password."')");   
        if($sql){
            $data->id = $con->insert_id;
            exit(json_encode($data));

        }else{
            exit(json_decode(array('status' => 'error')));
        }
    }
    if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        if(isset($_GET['id'])){
            $id = $con->real_escape_string($_GET['id']);
            $data = json_decode(file_get_contents("php://input"));
            $sql = $con->query("update user set name = '".$data->name."', email = '".$data->email."', password = '".$data->password."' where id = '$id'");
            if($sql){
                exit(json_encode(array('status'=> 'success')));
            }else{
                exit(json_encode(array('status'=> 'error')));
            }
        }
    }
    if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        if(isset($_GET['id'])){
            $id = $con->real_escape_string($_GET['id']);
            $sql = $con->query("delete from user where id = '$id'");
        
            if($sql){
                exit(json_encode(array('status' => 'success')));
            }else{
                exit(json_encode(array('status' => 'error')));
            }
        }
    }
?>
