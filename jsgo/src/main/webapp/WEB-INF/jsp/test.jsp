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
			type : 'POST', 
			url : '/testAjax.do', 
			contentType : 'application/json;charset=UTF-8', 
			data : "", 
			dataType : 'json', 
			success : function(data) {
				alert("success");
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