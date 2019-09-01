<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=yes">
	<meta name="format-detection" content="telephone=no, address=no, email=no">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<title>테스트 페이지</title>
	
</head>
<body>
	<h1>test</h1>
	<a href="javascript:testAjax()">test</a>
	
	<script src="/home/js/jquery.min.js"></script>
<script>
	$(document).ready(function(){
		
	});
	
	function testAjax() {
		$.ajax({
			type : 'POST', // Http Request Method로 POST로 지정
			url : '/testAjax.do', // 서버 요청 주소
			contentType : 'application/json;charset=UTF-8', // 서버 요청시 전송할 데이터가 UTF-8 형식의 JSON 객체임을 명시
			data : "", // JavaScript 객체를 JSON 객체로 변환하여 서버 요청시 전송
			dataType : 'json', // 서버로부터 응답받을 데이터가 JSON 객체임을 명시하여 수작업 없이 응답 데이터를 JavaScript 객체로 획득
			success : function(data) {
				console.log(data);
			},
			error:function() {
				alert("error");
			}
		});
	}
</script>
</body>
</html>