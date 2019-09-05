<!-- header -->
<jsp:include page="/WEB-INF/jsp/home/include/header.jsp" />

<!-- header_sub -->
<jsp:include page="/WEB-INF/jsp/home/include/header_sub.jsp" />

<div class="contents">
	<h1>test</h1>
	<a href="javascript:testAjax()">test</a>
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
				alert("success");
				console.log(data);
			},
			error:function() {
				alert("error");
			}
		});
	}
</script>
<!-- footer -->
<jsp:include page="/WEB-INF/jsp/home/include/footer.jsp" />
