<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- header -->
<jsp:include page="/WEB-INF/jsp/home/include/header.jsp" />

<!-- header_sub -->
<jsp:include page="/WEB-INF/jsp/home/include/header_sub.jsp" />

<div class="contents">
	<h1>login</h1>
	
	<a id="kakao-login-btn"></a>
	<a href="http://developers.kakao.com/logout"></a>

	
</div>
	
<!-- footer_sub -->
<jsp:include page="/WEB-INF/jsp/home/include/footer_sub.jsp" />


<script>
	$(document).ready(function(){

	});
	
	//<![CDATA[ 
	// 사용할 앱의 JavaScript 키를 설정해 주세요. 
	Kakao.init('fad62ee04ac4959f0ad37cfdc09eeaf3'); //여기서 아까 발급받은 키 중 javascript키를 사용해준다. 
	// 카카오 로그인 버튼을 생성합니다. 
	Kakao.Auth.createLoginButton(
		{ 
		container: '#kakao-login-btn', 
		success: function(authObj) { 
					alert(JSON.stringify(authObj)); 
					console.log(JSON.stringify(authObj));
				}, 
		fail: function(err) { 
					alert(JSON.stringify(err)); 
				} 
		}); 
	//]]>

	
	
</script>
<!-- footer -->
<jsp:include page="/WEB-INF/jsp/home/include/footer.jsp" />
