<?php
//声明header为json
header("Content-type:application/json");

//构建数据
// $data = '[
//   {"text":"记忆法入门","path":"/introduction"},
//   {"text":"记忆法千桩训练","path":"/introduction"},
//   {"text":"记忆法编码练习","path":"/introduction"},
//   {"text":"记忆法导图入门","path":"/introduction"},
//   {"text":"记忆法导图训练","path":"/introduction"}
// ]';
$data = array(
    array(
        'text'=>'记忆法入门',
        'path'=>'/introduction',
    ),
    array(
        'title'=>'记忆法千桩训练',
        'path'=>'introduction',
    ),
    array(
        'title'=>'记忆法编码练习',
        'path'=>'introduction',
    ),
    array(
        'title'=>'记忆法导图入门',
        'path'=>'introduction',
    ),
    array(
        'title'=>'记忆法导图训练',
        'path'=>'introduction',
    ),
);

//转为JSON
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>
