<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- header -->
<jsp:include page="/WEB-INF/jsp/home/include/header.jsp" />

<!-- header_sub -->
<jsp:include page="/WEB-INF/jsp/home/include/header_sub.jsp" />

<div class="contents">
	<h1>test</h1>
	<p>한글이 깨집니까?</p>
	<a href="javascript:testAjax()">test</a>
	<div class="testList"></div>
</div>
	
<!-- footer_sub -->
<jsp:include page="/WEB-INF/jsp/home/include/footer_sub.jsp" />

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
				var testList = '';
				if(data.errChk == 'N') {
					if(data.length > 0) {
						testList += "<ul>";
						$.each(data.rtnList, function(key, values) {
							testList += "<li>" + key + ", "  + values.SEQ + ", " + values.TESTCOL + "</li>";
						});
						testList += "</ul>";
						$(".testList").html(testList);
					} else {
						console.log("size 0")
					}
				} else {
					alert("시스템 오류가 발생했습니다.");
				}
			},
			error:function() {
				alert("시스템 오류가 발생했습니다.");
			}
		});
	}
</script>
<!-- footer -->
<jsp:include page="/WEB-INF/jsp/home/include/footer.jsp" />
