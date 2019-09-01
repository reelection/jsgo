var siiruPath = '/siiru/';
$(document).ready(function() {
	// 숫자만 입력
	$('.numeric').numeric('positiveInteger');
	$('.integer').numeric('integer');
	$('.float').numeric('float');
	// 영문 _ 만 입력
	$('.alpha').alphanum({
		allowNumeric: false,
		allowSpace: false,
		allow: '_'
	}).css('ime-mode', 'disabled');
	// 아이디 입력 체크
	$('.alphanumId').alphanum({
		allowSpace: false,
		allow: '!@#$%^?*+=_~-.'
	}).css('ime-mode', 'disabled');
	// 영문 숫자 _ . 만 입력
	$('.alphanum').alphanum({
		allowSpace: false,
		allow: '_.'
	}).css('ime-mode', 'disabled');
	// 영문 숫자 _ 만 입력
	$('.alphanum2').alphanum({
		allowSpace: false,
		allow: '_'
	}).css('ime-mode', 'disabled');
	// IP . 만 입력
	$('.alphanum3').alphanum({
		allowSpace: false,
		allowLatin: false,
		allow: '.'
	}).css('ime-mode', 'disabled');
	// 전화번호만 입력
	$('.alphanum4').alphanum({
		allowSpace: false,
		allowLatin: false,
		allow: '-'
	}).css('ime-mode', 'disabled');
	// 한글입력제거
	$('.nothangul').keyup(function() {
		var inputVal = $(this).val();
		$(this).val(inputVal.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/gi,''));
	});
	// 대문자로만
	$('.upper').keyup(function() {
		$(this).val($(this).val().toUpperCase());
	});
	// 파이 그래프
	$('.pie').peity('pie', {
		fill: ['#E53E37', '#F2DEDE', '#ffffff'],
		radius: 10
	});
	// 프로그래스 바
	$('.progress .progress-bar').progressbar();
	// 버튼 툴팁
	$('[data-toggle="tooltip"]').tooltip();
	// 오류 알림 설정
	toastr.options = {
		closeButton: true,
		progressBar: true,
		showMethod: 'slideDown',
		timeOut: 5000,
		extendedTimeOut: 1000
	};
	// 화면이 768px 일때 사이드 메뉴를 축소시킨다.
	if ($(this).width() < 769) {
		$('body').addClass('body-small');
	} else {
		$('body').removeClass('body-small');
	}
	// 사이드 메뉴 축소
	$('.navbar-minimalize').click(function () {
		$('body').toggleClass('mini-navbar');
		smoothlyMenu();
	});
	// 사이트 설정 버튼 클릭 시
	$('.site-view').click(function () {
		$('.site-config-box').toggleClass('show');
		$('.site-view > i').toggleClass('fa-chevron-left').toggleClass('fa-chevron-right');
		$('.site-view').toggleClass('').toggleClass('active');
	});
	// 페이징 버튼
	$('.pagination').on('click', 'li a', function(e) {
		e.preventDefault();
		if ($.trim($(this).data('tp')) != '') {
			$('#'+$.trim($(this).data('tp'))).val($(this).data('move'));
		} else {
			$('#movePage').val($(this).data('move'));
		}
		dataList();
	});
	// 검색버튼
	$('#searchBtn').click(function() {
		$('#movePage').val('1');
		dataList();
	});
	$('input[name="searchQuery"]').keypress(function(e) {
		if (e.which == 13) {
			e.preventDefault();
			$('#movePage').val('1');
			dataList();
		}
	});
	// 검색 전송
	$('#searchForm').submit(function(e) {
		$(this).append($('<input type="hidden" name="pageId" value="'+$('#pageId').val()+'">'));
		return true;
	});
	// 탭메뉴 클릭시
	$('#tabMenu').on('click', 'li a', function(e) {
		e.preventDefault();
		$('#pageForm').attr('action', $(this).attr('href'));
		$('#pageForm').submit();
	});
	// 사이트 클릭시
	$('#site-item .nav').on('click', 'li a', function(e) {
		e.preventDefault();
		$('#action').val('siteMove');
		$('#cmsId').val($(this).data('siteid'));
		$('#cmsNm').val($(this).data('sitenm'));
		$('#pageId').val('0');
		var formData = $('#pageForm').serialize();
		// form method, json url, form data, swal or toastr, validate
		ajaxForm('post', siiruPath+'siteMove.do', formData, '', '');
	});
	// 메뉴 구성
	$('#side-menu').metisMenu();
	// 메뉴 클릭시
	$('#side-menu').on('click', 'li:not(:first-child) a', function(e) {
		e.preventDefault();
		if ($(this).attr('href') != '#') {
			$('#pageId').val($(this).data('menuid'));
			$('#action').val('');
			$('#pageForm').append($('<input type="hidden" name="boardId" value="' + $(this).data('boardid') + '" />'));
			$('#pageForm').append($('<input type="hidden" name="customId" value="' + $(this).data('customid') + '" />'));
			$('#pageForm').attr('action', $(this).attr('href'));
			$('#pageForm').submit();
		}
	});
	// 로그아웃 버튼 클릭 시
	$('.logout a').click(function(e) {
		e.preventDefault();
		// form method, json url, form data, swal or toastr, validate
		ajaxForm('post', $(this).attr('href'), '', '', '');
	});
	// 개인정보 수정 클릭 시
	$('.profile a').click(function(e) {
		e.preventDefault();
		$('#pageId').val($(this).data('menuid'));
		$('#action').val($(this).data('action'));
		$('#pageForm').append($('<input type="hidden" name="userId" value="' + $(this).data('userid') + '" />'));
		$('#pageForm').attr('action', $(this).attr('href'));
		$('#pageForm').submit();
	});
	// 검색 클릭 시
	$('input[name="topQuery"]').keypress(function(e) {
		if (e.which == 13) {
			$('#pageId').val('');
			$('#pageForm').attr('action', siiruPath+'sy/sySearch.do');
			$('#pageForm').submit();
		}
	});
	// 휴지통 개수
	if ($('#wstbskCount').length > 0) {
		ajaxForm('post', siiruPath+'sy/getWstbskCount.do', '', '', '', function(data) {
			$('#wstbskCount').text(data.dataArr.wstbskCount);
		});
	}
	// Lock 버튼 감추기
	if ($('.lockView').length > 0) $('.lockView').html('');
	// Lock 버튼 클릭시
	$('.lockView').on('click', '.btn', function() {
		var lockBtn = $(this);
		var btnData = $(this).data();
		if ($.trim(btnData.lockat) == 'Y') {
			$('input[name="lockSiteId"]').val($.trim(btnData.siteid));
			$('input[name="lockPanelNm"]').val($.trim(btnData.panelnm));
			if ($.trim(btnData.unlock) == 'N') {
				$('.lockFormView').hide();
				$('#pageUnLock').hide();
			}
			findLock($.trim(btnData.siteid), $.trim(btnData.panelnm));
			$('#lockModal').modal('show');
		} else {
			lockBtn.prop('disabled', true);
			ajaxForm('post', siiruPath+'setLockMerge.do',{'action':'lock','siteId':$.trim(btnData.siteid),'pageId':$('#pageId').val(),'pageNm':$('#pageUrl').val(),'panelNm':$.trim(btnData.panelnm),'lockAt':'Y'}, 'toastr', '', function(data) {
				if (data.errChk == 'N') lock($.trim(btnData.siteid), $.trim(btnData.panelnm));
				lockBtn.prop('disabled', false);
			});
		}
	});
	// Lock 해제
	$('#pageUnLock').click(function(e) {
		if ($.trim($('input[name="lockPasswd"]').val()) == '') {
			toastr.error('비밀번호를 입력해 주세요.', 'UnLock');
			$('input[name="lockPasswd"]').focus();
		} else {
			ajaxForm('post', siiruPath+'setLockMerge.do',{'action':'unLock','siteId':$.trim($('input[name="lockSiteId"]').val()),'pageId':$('#pageId').val(),'pageNm':$('#pageUrl').val(),'panelNm':$.trim($('input[name="lockPanelNm"]').val()),'lockAt':'N','lockPasswd':$.trim($('input[name="lockPasswd"]').val())}, 'toastr', '', function(data) {
				if (data.errChk == 'N') {
					lock($.trim($('input[name="lockSiteId"]').val()), $.trim($('input[name="lockPanelNm"]').val()));
					$('input[name="lockSiteId"]').val('');
					$('input[name="lockPanelNm"]').val('');
					$('input[name="lockPasswd"]').val('');
					$('#lockModal').modal('hide');
				}
			});
		}
	});
	// 기간 검색 달력 폼
	$('.input-daterange').datepicker({
		language: 'kr',
		format: 'yyyy-mm-dd',
		todayBtn: 'linked',
		clearBtn: true,
		todayHighlight: true,
		forceParse: false,
		autoclose: true
	});
	// 단일 달력 폼
	$('.input-group.date').datepicker({
		language: 'kr',
		format: 'yyyy-mm-dd',
		todayBtn: 'linked',
		clearBtn: true,
		todayHighlight: true,
		forceParse: false,
		autoclose: true
	});
	// 박스 숨기기
	$('.collapse-link').click(function () {
		var ibox = $(this).closest('div.ibox');
		var button = $(this).find('i');
		var content = ibox.find('div.ibox-content');
			content.slideToggle(200);
			button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
			ibox.toggleClass('').toggleClass('border-bottom');
			setTimeout(function () {
				ibox.resize();
				ibox.find('[id^=map-]').resize();
			}, 50);
	});
	// 드롭다운 버튼 선택 시
	$('.dropdown-menu a').click(function() {
		$('#'+$(this).data('form')).val($(this).data('val')).trigger('change');
		$('#'+$(this).data('form')+'Nm').val($(this).text()).trigger('change');
		$('#'+$(this).data('form')+'Text').text($(this).text());
		$(this).parent().dropdown('toggle');
		return false;
	});
	// 해상도 변화에 따른 액션
	fix_height();
	// 상단으로 이동하는 버튼
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#scroll-top').addClass('in');
			$('#scroll-top').fadeIn();
		} else {
			$('#scroll-top').removeClass('in');
			$('#scroll-top').fadeOut();
		}
	});
	$('#scroll-top').click(function () {
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		return false;
	});
	// 모달은 레아아웃 밖으로 뺀다.
	$('.modal').appendTo('body');
	// 스크롤 관련
	$('.scroll-container').slimScroll({
		height: '100%'
	});
	// 화면 리사이즈
	$(window).bind('load resize scroll', function () {
		if (!$('body').hasClass('body-small')) {
			fix_height();
		}
	});
	// validator 기본셋팅
	$.validator.setDefaults({
		errorElement: 'span',
		errorClass: 'help-block',
		invalidHandler: function(form, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				validator.errorList[0].element.focus();
			}
		},
		highlight: function (element, errorClass, validClass) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function (element, errorClass, validClass) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorPlacement: function (error, element) {
			if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});
	$.validator.addMethod('time24', function(value, element) {
		if (value !== '') {
			return /^([01]?[0-9]|2[0-3])(:[0-5][0-9]){1}$/.test(value);
		} else {
			return true;
		}
	}, '올바른 시간을 입력하세요.');
	$.validator.addMethod('fulltime24', function(value, element) {
		if (value !== '') {
			return /^([01]?[0-9]|2[0-3])(:[0-5][0-9]){2}$/.test(value);
		} else {
			return true;
		}
	}, '올바른 시간을 입력하세요.');
	$.validator.addMethod('firstalpha', function(value, element) {
		if (value !== '') {
			return /(^[a-zA-Z])/.test(value);
		} else {
			return true;
		}
	}, '첫글자는 영문만 입력하실수 있습니다.');
	$.validator.addMethod('IP4Checker', function(value, element) {
		if (value !== '') {
			return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value);
		} else {
			return true;
		}
	}, '올바른 IP를 입력하세요.');
});
// 화면이 768px 일때 사이드 메뉴를 축소시킨다.
$(window).bind('resize', function () {
	if ($(this).width() < 769) {
		$('body').addClass('body-small');
	} else {
		$('body').removeClass('body-small');
	}
});
// 사이드 메뉴의 전체 높이
function fix_height() {
	var navbarHeigh = $('nav.navbar-default').height();
	var wrapperHeigh = $('#page-wrapper').height();
	if (navbarHeigh > wrapperHeigh) {
		if (!$('body').hasClass('body-small')) {
			$('#page-wrapper').css('min-height', navbarHeigh + 'px');
		} else {
			$('#page-wrapper').css('min-height', $(window).height() + 'px');
		}
	}
	if (navbarHeigh < wrapperHeigh) {
		$('#page-wrapper').css('min-height', $(window).height() + 'px');
	}
}
// 사이드 메뉴 효과
function smoothlyMenu() {
	if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
		$('#side-menu').hide();
		setTimeout(function () {
			$('#side-menu').fadeIn(500);
		}, 100);
	} else {
		$('#side-menu').removeAttr('style');
	}
}
// Code Mirror
function codeMirror(as_type, as_id, as_readOnly, as_multi) {
	if (as_multi != 'Y') $('.CodeMirror').remove();
	CodeMirror.commands.autocomplete = function(cm) {
		var doc = cm.getDoc();
		var POS = doc.getCursor();
		var mode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(POS).state).mode.name;
		if (mode == 'xml') {
			CodeMirror.showHint(cm, CodeMirror.hint.html);
		} else if (mode == 'javascript') {
			CodeMirror.showHint(cm, CodeMirror.hint.javascript);
		} else if (mode == 'css') {
			CodeMirror.showHint(cm, CodeMirror.hint.css);
		} else if (mode == 'sql') {
			CodeMirror.showHint(cm, CodeMirror.hint.sql);
		}
	};
	var languageMode = '';
	if (as_type == 'htmlmixed') {
		languageMode = {
			name: 'htmlmixed',
			scriptTypes: [
				{matches: /\/x-handlebars-template|\/x-mustache/i, mode: null},
				{matches: /(text|application)\/(x-)?vb(a|script)/i, mode: 'vbscript'}
			]
		};
	} else {
		languageMode = as_type;
	}
	var codeEditor = CodeMirror.fromTextArea(document.getElementById(as_id), {
		lineNumbers: true,
		lineWrapping: true,
		styleActiveLine: true,
		selectionPointer: true,
		highlightSelectionMatches: {showToken: /\w/},
		mode: languageMode,
		indentUnit: 4,
		matchBrackets: true,
		matchTags: {bothTags: true},
		autoCloseTags: true,
		autoCloseBrackets: true,
		value: document.documentElement.innerHTML,
		scrollbarStyle: 'simple',
		readOnly: as_readOnly,
		extraKeys: {
			'F11': function(cm) {cm.setOption('fullScreen', !cm.getOption('fullScreen'));},
			'Esc': function(cm) {if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false);},
			'Ctrl-Space': 'autocomplete',
			'Alt-Space': 'autocomplete',
			'Ctrl-J': 'toMatchingTag',
			'Alt-F': 'findPersistent'
		}
	});
	return codeEditor;
}
function codeMergeView(as_type, as_id, value, orig) {
	$('#'+as_id).html('');
	var languageMode = '';
	if (as_type == 'htmlmixed') {
		languageMode = {
			name: 'htmlmixed',
			scriptTypes: [
				{matches: /\/x-handlebars-template|\/x-mustache/i, mode: null},
				{matches: /(text|application)\/(x-)?vb(a|script)/i, mode: 'vbscript'}
			]
		};
	} else {
		languageMode = as_type;
	}
	var mergeView = CodeMirror.MergeView(document.getElementById(as_id), {
		value: value,
		orig: orig,
		lineNumbers: true,
		mode: languageMode,
		highlightDifferences: true,
		connect: '',
		collapseIdentical: true
	});
	return mergeView;
}
// 폼 전송 [form method, json url, form data, swal or toastr, validate, output]
function ajaxForm(as_type, as_url, as_formData, as_alert, validate, out_data) {
	var ls_processData = true;
	var ls_contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
	if ($.type(as_formData) === 'object') {
		if (as_formData instanceof FormData) {
			ls_processData = false;
			ls_contentType = false;
		}
	}
	$.ajax({
		type : as_type,
		url : as_url,
		cache : false,
		data : as_formData,
		processData : ls_processData,
		contentType: ls_contentType,
		dataType : 'json',
		success : function(data) {
			if (data.errChk == 'N') {
				if (($.type(data.successTitle) !== 'undefined') && (data.successTitle !== '')) {
					if (as_alert == 'swal') {
						swal({
							title: data.successTitle,
							text: data.successMsg,
							type: 'success',
							timer: 1000,
							showConfirmButton: false,
							html: true
						});
					} else {
						// success, info, warning, error
						toastr.success(data.successMsg, data.successTitle);
					}
					if (($.type(data.redirect) !== 'undefined') && (data.redirect !== '')) {
						// 메세지를 뿌리기 위해 딜레이
						setTimeout(function() {
							if (data.redirect == 'reload') {
								document.location.reload(true);
							} else {
								formRedirect(data.form, data.redirect);
							}
						}, 1000);
					}
				} else {
					if (($.type(data.redirect) === 'undefined') || (data.redirect === '')) {
					} else if (data.redirect == 'reload') {
						document.location.reload(true);
					} else {
						formRedirect(data.form, data.redirect);
					}
				}
			} else {
				var form_err = [];
				var errCount = 0;
				if ($.type(data.inputArr) != 'undefined') {
					$.each(data.inputArr, function(input_name, input_msg) {
						if (input_msg.focus) $('#'+input_name).focus();
						form_err[input_name] = input_msg.msg;
						errCount++;
					});
				}
				if (errCount > 0) validate.showErrors(form_err);
				if (($.type(data.errTitle) !== 'undefined') && (data.errTitle !== '')) {
					if (as_alert == 'swal') {
						swal({
							title: data.errTitle,
							text: data.errMsg,
							type: 'error',
							showConfirmButton: true,
							confirmButtonClass: 'btn-danger',
							html: true
						}, function(){
							if (($.type(data.redirect) === 'undefined') || (data.redirect === '')) {
							} else if (data.redirect == 'reload') {
								document.location.reload(true);
							} else {
								document.location.href = data.redirect;
							}
						});
					} else {
						// success, info, warning, error
						toastr.error(data.errMsg, data.errTitle);
					}
				}
			}
			if ($.type(out_data) === 'function') out_data(data);
		},
		error : function(xhr,status,error) {
			var errorTitle = 'ajaxForm Error';
			var errorMsg = '['+xhr.status+'] '+error;
			if (($.type(xhr.responseJSON) !== 'undefined') && ($.trim(xhr.responseJSON) !== '')) {
				if ($.trim(xhr.responseJSON.errCode) == 413) {
					errorTitle = xhr.responseJSON.errTitle;
					errorMsg = xhr.responseJSON.errMsg;
				}
			}
			if (as_alert == 'swal') {
				swal({
					title: errorTitle,
					text: errorMsg,
					type: 'error',
					showConfirmButton: true,
					confirmButtonClass: 'btn-danger'
				});
			} else {
				// success, info, warning, error
				toastr.error(errorMsg, errorTitle);
			}
		}
	});
}
// 폼이동
function formRedirect(form, redirect) {
	var formId = form;
	if ($.trim(formId) === '') formId = 'pageForm';
	$('#'+formId).attr('action', redirect);
	$('#'+formId).attr('method', 'post');
	$('#'+formId).submit();
}
// 트리메뉴
function showTreeMenu(as_treeID, as_callurl, out_data) {
	$('#'+as_treeID).jstree({
		'core' : {
			'multiple' : false,
			'check_callback' : true,
			'force_text' : true,
			'data' : {
				'type' : 'post',
				'url' : as_callurl,
				'data' : function (node) {
					return {'id' : node.id};
				}
			},
		},
		'plugins' : ['state', 'types', 'search'],
		'types' : {
			'default' : {
				'icon' : 'fa fa-folder'
			},
			'children' : {
				'icon' : 'fa fa-file-o'
			},
			'organization' : {
				'icon' : 'fa fa-sitemap'
			}
		}
	})
	.on('select_node.jstree', function (e, data) {
		if (data && data.selected && data.selected.length) {
			if ($.type(out_data) === 'function') out_data(data.node);
		}
	});
}
// 만족도 별 표시
function starView(ai_avg) {
	var j;
	var ret = ''; var allstar = 0; var halfstar = 0; var nonestar = 0;
	allstar = parseInt(ai_avg/20);
	halfstar = parseInt(((ai_avg/20) - parseInt(ai_avg/20))*10);
	if (halfstar >= 5) {
		halfstar = 1;
		nonestar = 4 - allstar;
	} else {
		halfstar = 0;
		nonestar = 5 - allstar;
	}
	for (j=0; j<allstar; j++) ret+= '<i class="fa fa-star text-info"></i>';
	for (j=0; j<halfstar; j++) ret+= '<i class="fa fa-star-half-o text-info"></i>';
	for (j=0; j<nonestar; j++) ret+= '<i class="fa fa-star-o text-info"></i>';
	return ret;
}
// 파일 확장자별 아이콘 정리
function fileExtIcon(as_file) {
	var file_icon = 'fa-file-o';
	if ((as_file === '') || ($.type(as_file) === 'undefined')) return file_icon;
	var file_ext = as_file.slice(as_file.lastIndexOf('.')+1).toLowerCase();
	if ((file_ext == 'xls') || (file_ext == 'xlsx')) {
		file_icon = 'fa-file-excel-o';
	} else if ((file_ext == 'ppt') || (file_ext == 'pptx')) {
		file_icon = 'fa-file-powerpoint-o';
	} else if ((file_ext == 'doc') || (file_ext == 'docx')) {
		file_icon = 'fa-file-word-o';
	} else if (file_ext == 'pdf') {
		file_icon = 'fa-file-pdf-o';
	} else if ((file_ext == 'txt') || (file_ext == 'css') || (file_ext == 'js')) {
		file_icon = 'fa-file-text-o';
	} else if ((file_ext == 'gif') || (file_ext == 'jpg') || (file_ext == 'jpeg') || (file_ext == 'png')) {
		file_icon = 'fa-file-image-o';
	} else if ((file_ext == 'mp3') || (file_ext == 'ogg') || (file_ext == 'wav') || (file_ext == 'mid')) {
		file_icon = 'fa-file-audio-o';
	} else if ((file_ext == 'mp4') || (file_ext == 'ogv') || (file_ext == 'avi') || (file_ext == 'mpg') || (file_ext == 'wmv') || (file_ext == 'mpeg') || (file_ext == 'asf') || (file_ext == 'asx')) {
		file_icon = 'fa-file-video-o';
	} else if ((file_ext == 'zip') || (file_ext == 'rar') || (file_ext == 'alz')) {
		file_icon = 'fa-file-archive-o';
	} else if ((file_ext == 'jsp') || (file_ext == 'php') || (file_ext == 'htm') || (file_ext == 'html')) {
		file_icon = 'fa-file-code-o';
	} else {
		file_icon = 'fa-file-o';
	}
	return file_icon;
}
// 숫자 3자리 단위마다 콤마(comma)
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// HTML escape
function escapeHtml(text) {
	return text.toString().replace(/["]/g, '&quot;');
}
function convertHtml(text) {
	return text.toString().replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/\'/g,'&#39;');
}
function removeTag(html) {
	return html.replace(/(<([^>]+)>)/gi,'');
}
// 대문자 및 숫자에 언더바를 붙인다.
function camelToUnder(text) {
	return text.toString().replace(/\W+/g, '_').replace(/([a-z])([A-Z\d])/g, '$1_$2').toUpperCase();
}
// 휴대전화 체크
function ValidMobile(str) {
	var regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	if (!regex.test(str)) {
		return false;
	} else {
		return true;
	}
}
// 전화번호 체크
function ValidTel(str) {
	var regex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;
	if (!regex.test(str)) {
		return false;
	} else {
		return true;
	}
}
//Chart.js - line
function chartLine(chartId, labels, totalData, visitData) {
	var data = null;
	if (visitData == 'menu') {
		data = {
			labels: labels,
			datasets: [
				{
					label: '접속수',
					backgroundColor: 'rgba(255,153,153,0.1)',
					borderColor: 'rgba(255,153,153,1)',
					pointBorderColor: 'rgba(255,255,255,1)',
					pointBackgroundColor: 'rgba(255,153,153,1)',
					data: totalData
				}
			]
		};
	} else {
		data = {
			labels: labels,
			datasets: [
				{
					label: '접속수',
					backgroundColor: 'rgba(255,153,153,0.1)',
					borderColor: 'rgba(255,153,153,1)',
					pointBorderColor: 'rgba(255,255,255,1)',
					pointBackgroundColor: 'rgba(255,153,153,1)',
					data: totalData
				},
				{
					label: '방문수',
					backgroundColor: 'rgba(153,204,255,0.1)',
					borderColor: 'rgba(153,204,255,1)',
					pointBorderColor: 'rgba(255,255,255,1)',
					pointBackgroundColor: 'rgba(153,204,255,1)',
					data: visitData
				}
			]
		};
	}
	var options = {
		responsive: true,
		tooltips: {
			mode: 'label',
			callbacks: {
				label: function(tooltipItem, data) {
					return data.datasets[tooltipItem.datasetIndex].label +' : ' + numberWithCommas(tooltipItem.yLabel);
				}
			}
		},
		elements: {
			point: {
				radius: 4,
				hoverRadius: 6
			}
		}
	};
	$('.chartjs-hidden-iframe').remove();
	$('#'+chartId).remove();
	$('#chart').append('<canvas id="'+chartId+'" height="120"></canvas>');
	var canvas = document.querySelector('#'+chartId);
	var ctx = canvas.getContext('2d');
	new Chart(ctx, {
		type: 'line',
		data: data,
		options: options
	});
}
// Chart.js - pie
function chartPie(chartId, labels, statsData) {
	var color = ['58,133,191','103,192,103','102,199,226','242,182,88','222,94,89','192,192,192'];
	var backgroundColor = [], hoverBackgroundColor = [];
	var c = 0;
	for (var i=0;i<statsData.length;i++) {
		backgroundColor.push('rgba('+color[c]+',0.8)');
		hoverBackgroundColor.push('rgba('+color[c]+',1)');
		// 프로그래스바 추출
		c = (c == 5) ? 0 : c + 1;
	}
	var data = {
		labels: labels,
		datasets: [{
			data: statsData,
			backgroundColor: backgroundColor,
			hoverBackgroundColor: hoverBackgroundColor
		}]
	};
	var options = {
		responsive: true,
		tooltips: {
			callbacks: {
				label: function(tooltipItem, data) {
					return data.labels[tooltipItem.index] +' : ' + numberWithCommas(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
				}
			}
		}
	};
	$('.chartjs-hidden-iframe').remove();
	$('#'+chartId).remove();
	$('#chart').append('<canvas id="'+chartId+'" height="250"></canvas>');
	var canvas = document.querySelector('#'+chartId);
	var ctx = canvas.getContext('2d');
	new Chart(ctx, {
		type: 'pie',
		data: data,
		options: options
	});
}
// 샘플 코드
function funcSample(tp, maxStep, ctgryCdS, ctgryCdZList, ctgryCdQList, ctgryCdBList, ctgryCdFList, ctgryCdSList, latestBoardList, siteList) {
	var ret = '';
	// 전체 메뉴
	if (tp == 'allMenu') {
		ret = '<div>\n';
		ret+= '\t&lt;c:if test="&#36;{not empty menuAllInfo and fn:length(menuAllInfo) > 0}">\n';
		if (maxStep > 0) {
			ret+= menuCode('menuAllInfo', 1, maxStep);
		}
		ret+= '\t&lt;/c:if>\n';
		ret+= '</div>\n';
	// 상단 메뉴 [1차, 2차]
	} else if (tp == 'topMenu') {
		ret = '<div>\n';
		ret+= '\t&lt;c:if test="&#36;{not empty menuAllInfo and fn:length(menuAllInfo) > 0}">\n';
		ret+= menuCode('menuAllInfo', 1, 2);
		ret+= '\t&lt;/c:if>\n';
		ret+= '</div>\n';
	// 서브 메뉴 [2차, 3차]
	} else if (tp == 'subMenu') {
		ret = '<div>\n';
		ret+= '\t<h2>&#36;{menuSubInfo.menuUpperNm1}</h2>\n';
		ret+= '\t&lt;c:if test="&#36;{not empty menuSubInfo.subMenu and fn:length(menuSubInfo.subMenu) > 0}">\n';
		ret+= menuCode('menuSubInfo.subMenu', 1, 2);
		ret+= '\t&lt;/c:if>\n';
		ret+= '</div>\n';
	// 탭 메뉴 [4차 부터]
	} else if (tp == 'tabMenu') {
		ret = '<div>\n';
		ret+= '\t<h2>&#36;{menuTabInfo.menuUpperNm1}</h2>\n';
		ret+= '\t<h3>&#36;{menuTabInfo.menuUpperNm2}</h3>\n';
		ret+= '\t<h4>&#36;{menuTabInfo.menuUpperNm3}</h4>\n';
		if (maxStep > 3) {
			ret+= '\t&lt;c:if test="&#36;{not empty menuTabInfo.subMenu and fn:length(menuTabInfo.subMenu) > 0}">\n';
			ret+= menuCode('menuTabInfo.subMenu', 1, (maxStep-3));
			ret+= '\t&lt;/c:if>\n';
		}
		ret+= '</div>\n';
	// 서브 정보
	} else if (tp == 'subInfo') {
		ret = '<div class="siiru-pagewrap">\n';
		ret+= '\t<h3>&#36;{menuInfo.menuNm}</h3>\n';
		ret+= '\t<ul class="page-navi">\n';
		ret+= '\t\t<li>Home</li>\n';
		ret+= '\t\t&lt;c:set var="pagenavi" value="&#36;{fn:split(fn:replace(menuInfo.menuAllPath,\' &gt; \',\'|\'),\'|\')}" />\n';
		ret+= '\t\t&lt;c:forEach var="navi" items="&#36;{pagenavi}" varStatus="status">\n';
		ret+= '\t\t<li>&#36;{navi}</li>\n';
		ret+= '\t\t&lt;/c:forEach>\n';
		ret+= '\t</ul>\n';
		ret+= '\t<ul class="page-addon">\n';
		ret+= '\t\t<li class="addon-share"><a href="#" class="share-btn">공유</a>\n';
		ret+= '\t\t\t<ul>\n';
		ret+= '\t\t\t\t<li><a href="#" data-sns="facebook" class="share-sns">페이스북</a></li>\n';
		ret+= '\t\t\t\t<li><a href="#" data-sns="twitter" class="share-sns">트위터</a></li>\n';
		ret+= '\t\t\t\t<li><a href="#" data-sns="kakao" class="share-sns">카카오스토리</a></li>\n';
		ret+= '\t\t\t\t<li><a href="#" data-sns="band" class="share-sns">밴드</a></li>\n';
		ret+= '\t\t\t\t<li><a href="#" data-sns="naver" class="share-sns">네이버</a></li>\n';
		ret+= '\t\t\t\t<li><a href="#" data-sns="google" class="share-sns">구글</a></li>\n';
		ret+= '\t\t\t</ul>\n';
		ret+= '\t\t</li>\n';
		ret+= '\t\t<li class="addon-copy"><a href="#" class="copy-btn">주소복사</a></li>\n';
		ret+= '\t\t<li class="addon-print"><a href="#" class="print-btn">인쇄</a></li>\n';
		ret+= '\t\t<li class="addon-plus"><a href="#" data-tp="plus" class="scale-btn">확대</a></li>\n';
		ret+= '\t\t<li class="addon-base"><a href="#" data-tp="base" class="scale-btn">기본</a></li>\n';
		ret+= '\t\t<li class="addon-minus"><a href="#" data-tp="minus" class="scale-btn">축소</a></li>\n';
		ret+= '\t</ul>\n';
		ret+= '</div>\n';
	// 로그인 정보
	} else if (tp == 'loginInfo') {
		ret = '&lt;c:choose>\n';
		ret+= '\t&lt;c:when test="&#36;{not empty login}">\n';
		ret+= '<ul>\n';
		ret+= '\t<li>&#36;{login.userNm} (&#36;{login.userId})</li>\n';
		ret+= '\t<li><a href="&#36;{pathInfo.sContext}" id="logout">로그아웃</a></li>\n';
		ret+= '</ul>\n';
		ret+= '\t&lt;/c:when>\n';
		ret+= '\t&lt;c:otherwise>\n';
		ret+= '<p><a href="&#36;{pathInfo.sContext}login.do">로그인</a></p>\n';
		ret+= '\t&lt;/c:otherwise>\n';
		ret+= '&lt;/c:choose>\n';
	// 날씨정보
	} else if (tp == 'weather') {
		ret = '<div class="siiru-weather">\n';
		ret+= '\t<p id="weather" class="weatherTitle">날씨</p>\n';
		ret+= '\t<dl>\n';
		ret+= '\t\t<dt>오늘</dt>\n';
		ret+= '\t\t<dd>\n';
		ret+= '\t\t\t<div><img id="icon_w0" src="&#36;{pathInfo.context}home/siiru/images/w01.png" width="30" height="30" alt="맑음"></div>\n';
		ret+= '\t\t\t<div>\n';
		ret+= '\t\t\t\t<span id="text_w0" class="weatherText">맑음</span>\n';
		ret+= '\t\t\t\t<span id="temp_w0" class="weatherTemp">0℃</span>\n';
		ret+= '\t\t\t</div>\n';
		ret+= '\t\t</dd>\n';
		ret+= '\t</dl>\n';
		ret+= '\t<dl>\n';
		ret+= '\t\t<dt>내일</dt>\n';
		ret+= '\t\t<dd>\n';
		ret+= '\t\t\t<div><img id="icon_w1" src="&#36;{pathInfo.context}home/siiru/images/w01.png" width="30" height="30" alt="맑음"></div>\n';
		ret+= '\t\t\t<div>\n';
		ret+= '\t\t\t\t<span id="text_w1" class="weatherText">맑음</span>\n';
		ret+= '\t\t\t\t<span id="temp_w1" class="weatherTemp">-/-</span>\n';
		ret+= '\t\t\t</div>\n';
		ret+= '\t\t</dd>\n';
		ret+= '\t</dl>\n';
		ret+= '\t<dl>\n';
		ret+= '\t\t<dt>모레</dt>\n';
		ret+= '\t\t<dd>\n';
		ret+= '\t\t\t<div><img id="icon_w2" src="&#36;{pathInfo.context}home/siiru/images/w01.png" width="30" height="30" alt="맑음"></div>\n';
		ret+= '\t\t\t<div>\n';
		ret+= '\t\t\t\t<span id="text_w2" class="weatherText">맑음</span>\n';
		ret+= '\t\t\t\t<span id="temp_w2" class="weatherTemp">-/-</span>\n';
		ret+= '\t\t\t</div>\n';
		ret+= '\t\t</dd>\n';
		ret+= '\t</dl>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruWeather, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruWeather);\n';
		ret+= 'else window.onload = siiruWeather;\n';
		ret+= 'function siiruWeather() {\n';
		ret+= '\t// 날씨\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getWeather.do\', {\'zone\':\'2911056000\'}).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\t// 정보\n';
		ret+= '\t\t\t$(\'#weather\').html($.trim(data.category)+\' 날씨정보 : \'+$.trim(data.forecastDt)+\' 발표, <a href="\'+$.trim(data.link)+\'" target="_blank">기상청 동네예보</a>\');\n';
		ret+= '\t\t\t// 오늘\n';
		ret+= '\t\t\t$(\'#icon_w0\').attr(\'src\', \'&#36;{pathInfo.context}home/siiru/images/\'+$.trim(data.wfIcon0)+\'.png\');\n';
		ret+= '\t\t\t$(\'#icon_w0\').attr(\'alt\', $.trim(data.wfKor0));\n';
		ret+= '\t\t\t$(\'#text_w0\').text($.trim(data.wfKor0));\n';
		ret+= '\t\t\t$(\'#temp_w0\').text($.trim(data.temp0)+\'℃\');\n';
		ret+= '\t\t\t// 내일\n';
		ret+= '\t\t\t$(\'#icon_w1\').attr(\'src\', \'&#36;{pathInfo.context}home/siiru/images/\'+$.trim(data.wfIcon1)+\'.png\');\n';
		ret+= '\t\t\t$(\'#icon_w1\').attr(\'alt\', $.trim(data.wfKor1));\n';
		ret+= '\t\t\t$(\'#text_w1\').text($.trim(data.wfKor1));\n';
		ret+= '\t\t\t$(\'#temp_w1\').text($.trim(data.tmn1)+\'/\'+$.trim(data.tmx1));\n';
		ret+= '\t\t\t// 모레\n';
		ret+= '\t\t\t$(\'#icon_w2\').attr(\'src\', \'&#36;{pathInfo.context}home/siiru/images/\'+$.trim(data.wfIcon2)+\'.png\');\n';
		ret+= '\t\t\t$(\'#icon_w2\').attr(\'alt\', $.trim(data.wfKor2));\n';
		ret+= '\t\t\t$(\'#text_w2\').text($.trim(data.wfKor2));\n';
		ret+= '\t\t\t$(\'#temp_w2\').text($.trim(data.tmn2)+\'/\'+$.trim(data.tmx2));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// PC 버전 보기
	} else if (tp == 'pcBtn') {
		ret = '<a href="&#36;{pathInfo.sContext}" id="pageMove" data-pagemove="pc">PC 버전 보기</a>\n';
	// 조직도
	} else if (tp == 'dept') {
		ret = '<div class="siiru-deptwrap">\n';
		ret+= '\t<form id="deptForm" name="deptForm" method="post">\n';
		ret+= '\t<input type="hidden" name="deptId" value="#">\n';
		ret+= '\t</form>\n';
		ret+= '\t<dev class="dept-list"></dev>\n';
		ret+= '\t<dev class="dept-desc" style="display:none;">\n';
		ret+= '\t\t<div class="deptView"></div>\n';
		ret+= '\t\t<div class="empList"></div>\n';
		ret+= '\t\t<div class="siiru-btnSet siiru-tc">\n';
		ret+= '\t\t\t<button type="button" class="deptListBtn siiru-btn siiru-btn-primary">목록</button>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t</dev>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruDept, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruDept);\n';
		ret+= 'else window.onload = siiruDept;\n';
		ret+= 'function siiruDept() {\n';
		ret+= '\t// 조직도 불러오기\n';
		ret+= '\tvar innerData = \'\';\n';
		ret+= '\t$(\'.dept-list\').html(\'<p class="loading"></p>\');\n';
		ret+= '\tvar formData = $(\'#deptForm\').serialize()+\'&siteId=&#36;{siteInfo.siteId}\';\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getDept.do\', formData).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\t$.each(data.dataArr.deptList, function(key, values) {\n';
		ret+= '\t\t\t\tinnerData+= \'<dl>\';\n';
		ret+= '\t\t\t\tinnerData+= \'<dt>\';\n';
		ret+= '\t\t\t\tinnerData+= \'<span class="title">\'+$.trim(values.deptNm)+\'</span>\';\n';
		ret+= '\t\t\t\tinnerData+= \'<span>\'+$.trim(values.deptTelno)+\'</span>\';\n';
		ret+= '\t\t\t\tinnerData+= \'</dt>\';\n';
		ret+= '\t\t\t\tinnerData+= \'<dd>\';\n';
		ret+= '\t\t\t\tif (values.subCount > 0) {\n';
		ret+= '\t\t\t\t\tinnerData+= \'<ul>\';\n';
		ret+= '\t\t\t\t\t$.each(values.subDept, function(sKey, sValues) {\n';
		ret+= '\t\t\t\t\t\tinnerData+= \'<li><a href="#" data-deptid="\'+$.trim(sValues.deptId)+\'">\'+$.trim(sValues.deptNm)+\'</a></li>\';\n';
		ret+= '\t\t\t\t\t});\n';
		ret+= '\t\t\t\t\tinnerData+= \'</ul>\';\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t\tinnerData+= \'</dd>\';\n';
		ret+= '\t\t\t\tinnerData+= \'</dl>\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\t$(\'.dept-list\').html(innerData);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '\t// 조직도 부서 클릭시\n';
		ret+= '\t$(\'.dept-list\').on(\'click\', \'a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t// 부서상세 불러오기\n';
		ret+= '\t\tdeptDetail($(this).data(\'deptid\'));\n';
		ret+= '\t});\n';
		ret+= '\t// 조직도 목록\n';
		ret+= '\t$(\'.deptListBtn\').click(function () {\n';
		ret+= '\t\t// 조직도 보이기\n';
		ret+= '\t\t$(\'.dept-list\').show();\n';
		ret+= '\t\t// 부서상세 감추기\n';
		ret+= '\t\t$(\'.deptView\').html(\'\');\n';
		ret+= '\t\t$(\'.empList\').html(\'\');\n';
		ret+= '\t\t$(\'.dept-desc\').hide();\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 부서상세 및 직원리스트 불러오기\n';
		ret+= 'function deptDetail(deptId) {\n';
		ret+= '\tif ($.trim(deptId) != \'\') {\n';
		ret+= '\t\t// 조직도 감추기\n';
		ret+= '\t\t$(\'.dept-list\').hide();\n';
		ret+= '\t\t// 부서상세 보이기\n';
		ret+= '\t\t$(\'.dept-desc\').show();\n';
		ret+= '\t\t// 부서 데이터\n';
		ret+= '\t\tvar deptData = \'\';\n';
		ret+= '\t\t$.post(\'&#36;{pathInfo.context}getDeptView.do\', {\'siteId\':\'&#36;{siteInfo.siteId}\', \'deptId\':deptId}).done(function(data) {\n';
		ret+= '\t\t\t// 에러가 아니면\n';
		ret+= '\t\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\t\t// 부서정보\n';
		ret+= '\t\t\t\tdeptData+= \'<p>\'+$.trim(data.dataArr.deptUpperNm2)+\' [\'+$.trim(data.dataArr.deptNm)+\' : \'+$.trim(data.dataArr.deptChrg)+\']</p>\';\n';
		ret+= '\t\t\t\tdeptData+= \'<div class="dept-well">\'+$.trim(data.dataArr.deptJob)+\'</div>\';\n';
		ret+= '\t\t\t\t$(\'.deptView\').html(deptData);\n';
		ret+= '\t\t\t} else {\n';
		ret+= '\t\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t});\n';
		ret+= '\t\t// 직원 리스트\n';
		ret+= '\t\tvar empList = \'\';\n';
		ret+= '\t\t$(\'.empList\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t\t$.post(\'&#36;{pathInfo.context}getEmp.do\', {\'siteId\':\'&#36;{siteInfo.siteId}\', \'deptId\':deptId, \'empTp\':\'all\'}).done(function(data) {\n';
		ret+= '\t\t\t// 에러가 아니면\n';
		ret+= '\t\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\t\t// 직원정보\n';
		ret+= '\t\t\t\tempList+= \'<table class="empTable siiru-mb20">\';\n';
		ret+= '\t\t\t\tempList+= \'<caption>직원목록</caption>\';\n';
		ret+= '\t\t\t\tempList+= \'<thead>\';\n';
		ret+= '\t\t\t\tempList+= \'<tr>\';\n';
		ret+= '\t\t\t\tempList+= \'<th scope="col">이름</th>\';\n';
		ret+= '\t\t\t\tempList+= \'<th scope="col">직급</th>\';\n';
		ret+= '\t\t\t\tempList+= \'<th scope="col">직책</th>\';\n';
		ret+= '\t\t\t\tempList+= \'<th scope="col">전화번호</th>\';\n';
		ret+= '\t\t\t\tempList+= \'<th scope="col">담당업무</th>\';\n';
		ret+= '\t\t\t\tempList+= \'</tr>\';\n';
		ret+= '\t\t\t\tempList+= \'</thead>\';\n';
		ret+= '\t\t\t\tempList+= \'<tbody>\';\n';
		ret+= '\t\t\t\t$.each(data.dataArr.list, function(key, values) {\n';
		ret+= '\t\t\t\t\tempList+= \'<tr>\';\n';
		ret+= '\t\t\t\t\tempList+= \'<th scope="row">\'+$.trim(values.userNm)+\'</th>\';\n';
		ret+= '\t\t\t\t\tempList+= \'<td>\'+$.trim(values.clsfNm)+\'</td>\';\n';
		ret+= '\t\t\t\t\tempList+= \'<td>\'+$.trim(values.rspofc)+\'</td>\';\n';
		ret+= '\t\t\t\t\tempList+= \'<td>\'+$.trim(values.telno)+\'</td>\';\n';
		ret+= '\t\t\t\t\tempList+= \'<td class="siiru-tl">\'+$.trim(values.chrgJob)+\'</td>\';\n';
		ret+= '\t\t\t\t\tempList+= \'</tr>\';\n';
		ret+= '\t\t\t\t});\n';
		ret+= '\t\t\t\tif (data.dataArr.list.length == 0) {\n';
		ret+= '\t\t\t\t\tempList+= \'<tr><td colspan="5" class="nodata">직원정보가 없습니다.</td></tr>\';\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t\tempList+= \'</tbody>\';\n';
		ret+= '\t\t\t\tempList+= \'</table>\';\n';
		ret+= '\t\t\t\t$(\'.empList\').html(empList);\n';
		ret+= '\t\t\t} else {\n';
		ret+= '\t\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t});\n';
		ret+= '\t}\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 직원
	} else if (tp == 'emp') {
		ret = '<div class="siiru-empwrap">\n';
		ret+= '\t<form id="empForm" name="empForm" method="post">\n';
		ret+= '\t<input type="hidden" name="siteId" value="&#36;{siteInfo.siteId}">\n';
		ret+= '\t<input type="hidden" name="deptId" value="">\n';
		ret+= '\t<input type="hidden" name="empTp" value="">\n';
		ret+= '\t<input type="hidden" name="recordCnt" value="10">\n';
		ret+= '\t<input type="hidden" name="movePage" value="1">\n';
		ret+= '\t<div class="empSearch">\n';
		ret+= '\t\t<div class="empSearch-box">\n';
		ret+= '\t\t\t<div class="empSearch-selectbox">\n';
		ret+= '\t\t\t\t<label for="empSearch">검색구분</label>\n';
		ret+= '\t\t\t\t<select id="empSearch" name="empSearch">\n';
		ret+= '\t\t\t\t\t<option value="">전체</option>\n';
		ret+= '\t\t\t\t\t<option value="N">이름</option>\n';
		ret+= '\t\t\t\t\t<option value="D">부서</option>\n';
		ret+= '\t\t\t\t\t<option value="C">직급</option>\n';
		ret+= '\t\t\t\t\t<option value="R">직책</option>\n';
		ret+= '\t\t\t\t\t<option value="J">담당업무</option>\n';
		ret+= '\t\t\t\t</select>\n';
		ret+= '\t\t\t</div>\n';
		ret+= '\t\t\t<input type="text" name="empQuery" value="&#36;{param.empQuery}" title="검색어" placeholder="검색어를 입력하세요">\n';
		ret+= '\t\t</div>\n';
		ret+= '\t\t<button type="submit" id="empSearchBtn" title="검색"></button>\n';
		ret+= '\t</div>\n';
		ret+= '\t</form>\n';
		ret+= '\t<section id="empWrap">\n';
		ret+= '\t\t<div class="empList"></div>\n';
		ret+= '\t\t<div class="pagination"></div>\n';
		ret+= '\t</section>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruEmp, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruEmp);\n';
		ret+= 'else window.onload = siiruEmp;\n';
		ret+= 'function siiruEmp() {\n';
		ret+= '\tempData();\n';
		ret+= '\t// 페이징 버튼\n';
		ret+= '\t$(\'.pagination\').on(\'click\', \'li a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#empForm\').find(\'input[name="movePage"]\').val($(this).data(\'move\'));\n';
		ret+= '\t\tempData();\n';
		ret+= '\t});\n';
		ret+= '\t// 검색버튼\n';
		ret+= '\t$(\'#empSearchBtn\').click(function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\tempData();\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 직원 데이터\n';
		ret+= 'function empData() {\n';
		ret+= '\tvar empList = \'\';\n';
		ret+= '\t$(\'.empList\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getEmp.do\', $(\'#empForm\').serialize()).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar data = data.dataArr;\n';
		ret+= '\t\t\t// 직원정보\n';
		ret+= '\t\t\tempList+= \'<table class="empTable siiru-mb20">\';\n';
		ret+= '\t\t\tempList+= \'<caption>직원목록</caption>\';\n';
		ret+= '\t\t\tempList+= \'<thead>\';\n';
		ret+= '\t\t\tempList+= \'<tr>\';\n';
		ret+= '\t\t\tempList+= \'<th scope="col">이름</th>\';\n';
		ret+= '\t\t\tempList+= \'<th scope="col">부서</th>\';\n';
		ret+= '\t\t\tempList+= \'<th scope="col">직급</th>\';\n';
		ret+= '\t\t\tempList+= \'<th scope="col">직책</th>\';\n';
		ret+= '\t\t\tempList+= \'<th scope="col">전화번호</th>\';\n';
		ret+= '\t\t\tempList+= \'<th scope="col">담당업무</th>\';\n';
		ret+= '\t\t\tempList+= \'</tr>\';\n';
		ret+= '\t\t\tempList+= \'</thead>\';\n';
		ret+= '\t\t\tempList+= \'<tbody>\';\n';
		ret+= '\t\t\t$.each(data.list, function(key, values) {\n';
		ret+= '\t\t\t\tempList+= \'<tr>\';\n';
		ret+= '\t\t\t\tempList+= \'<th scope="row">\'+$.trim(values.userNm)+\'</th>\';\n';
		ret+= '\t\t\t\tempList+= \'<td>\'+$.trim(values.deptNm)+\'</td>\';\n';
		ret+= '\t\t\t\tempList+= \'<td>\'+$.trim(values.clsfNm)+\'</td>\';\n';
		ret+= '\t\t\t\tempList+= \'<td>\'+$.trim(values.rspofc)+\'</td>\';\n';
		ret+= '\t\t\t\tempList+= \'<td>\'+$.trim(values.telno)+\'</td>\';\n';
		ret+= '\t\t\t\tempList+= \'<td class="siiru-tl">\'+$.trim(values.chrgJob)+\'</td>\';\n';
		ret+= '\t\t\t\tempList+= \'</tr>\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\tif (data.list.length == 0) {\n';
		ret+= '\t\t\t\tempList+= \'<tr><td colspan="6" class="nodata">직원정보가 없습니다.</td></tr>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\tempList+= \'</tbody>\';\n';
		ret+= '\t\t\tempList+= \'</table>\';\n';
		ret+= '\t\t\t$(\'.empList\').html(empList);\n';
		ret+= '\t\t\tpagination(\'empWrap\', data.page, data.pageCnt, data.totalCnt);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 통합 검색 [상단]
	} else if (tp == 'topSearch') {
		ret = '<div class="siiru-topsearch">\n';
		ret+= '\t<form id="topsearchForm" name="topsearchForm" method="post" action="&#36;{pathInfo.sContext}contentsView.do?pageId=통합검색 콘텐츠의 pageId 값">\n';
		ret+= '\t\t<div class="topsearch-box">\n';
		ret+= '\t\t\t<div class="topsearch-selectbox">\n';
		ret+= '\t\t\t\t<label for="searchTopTp">&#36;{allSearchCtgry[0].ctgryNm}</label>\n';
		ret+= '\t\t\t\t<select id="searchTopTp" name="searchTopTp">\n';
		ret+= '\t\t\t\t&lt;c:forEach var="searchCtgry" items="&#36;{allSearchCtgry}" varStatus="status">\n';
		ret+= '\t\t\t\t\t<option value="&#36;{searchCtgry.ctgryId}"&lt;c:if test="&#36;{status.index == 0}"> selected&lt;/c:if>>&#36;{searchCtgry.ctgryNm}</option>\n';
		ret+= '\t\t\t\t&lt;/c:forEach>\n';
		ret+= '\t\t\t\t</select>\n';
		ret+= '\t\t\t</div>\n';
		ret+= '\t\t\t<input type="text" name="searchTopQuery" value="" title="검색어" placeholder="검색어를 입력하세요">\n';
		ret+= '\t\t</div>\n';
		ret+= '\t\t<button type="submit" id="topsearchBtn" title="통합검색"></button>\n';
		ret+= '\t</form>\n';
		ret+= '\t<script>\n';
		ret+= '\t\t// 페이지 로드가 완료되면\n';
		ret+= '\t\tif (window.addEventListener) window.addEventListener(\'load\', siiruTopsearch, false);\n';
		ret+= '\t\telse if (window.attachEvent) window.attachEvent(\'onload\', siiruTopsearch);\n';
		ret+= '\t\telse window.onload = siiruTopsearch;\n';
		ret+= '\t\tfunction siiruTopsearch() {\n';
		ret+= '\t\t\t// 구분선택\n';
		ret+= '\t\t\t$(\'.topsearch-selectbox select\').change(function() {\n';
		ret+= '\t\t\t\t$(this).siblings(\'label\').text($(this).children(\'option:selected\').text());\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\t// 자동검색어\n';
		ret+= '\t\t\t$(\'#topsearchForm\').find(\'input[name="searchTopQuery"]\').devbridgeAutocomplete({\n';
		ret+= '\t\t\t\ttype: \'post\',\n';
		ret+= '\t\t\t\tserviceUrl: \'&#36;{pathInfo.context}getSrchwrdAutoComplete.do\'\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t}\n';
		ret+= '\t<'+'/script>\n';
		ret+= '</div>\n';
	// 통합 검색
	} else if (tp == 'allSearch') {
		ret = '<div class="siiru-allsearch">\n';
		ret+= '\t<form id="allsearchForm" name="allsearchForm" method="post">\n';
		ret+= '\t<input type="hidden" name="searchSite" value="">\n';
		ret+= '\t<input type="hidden" name="movePage" value="1">\n';
		ret+= '\t&lt;c:forEach var="searchCtgry" items="&#36;{allSearchCtgry}">\n';
		ret+= '\t<input type="hidden" name="movePage_&#36;{searchCtgry.ctgryId}" value="1">\n';
		ret+= '\t&lt;/c:forEach>\n';
		ret+= '\t<input type="hidden" name="pageTp" value="">\n';
		ret+= '\t<div class="allsearch-wrap">\n';
		ret+= '\t\t<div class="allsearch-box">\n';
		ret+= '\t\t\t<input type="text" name="searchQuery" value="&#36;{param.searchTopQuery}" title="검색어" placeholder="검색어를 입력하세요">\n';
		ret+= '\t\t</div>\n';
		ret+= '\t\t<button type="submit" id="allsearchBtn" title="통합검색"></button>\n';
		ret+= '\t</div>\n';
		ret+= '\t<div class="allsearch-site">\n';
		ret+= '\t\t<div>\n';
		ret+= '\t\t\t<input type="checkbox" id="searchSiteAll" name="searchSiteAll" value="all" checked>\n';
		ret+= '\t\t\t<label for="searchSiteAll">전체</label>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t\t<ul>\n';
		$.each(siteList, function(key, values) {
			ret+= '\t\t\t<li>\n';
			ret+= '\t\t\t\t<input type="checkbox" id="searchChkSite_'+$.trim(values.SITE_ID)+'" name="searchChkSite" value="'+$.trim(values.SITE_ID)+'" disabled>\n';
			ret+= '\t\t\t\t<label for="searchChkSite_'+$.trim(values.SITE_ID)+'">'+$.trim(values.SITE_NM)+'</label>\n';
			ret+= '\t\t\t</li>\n';
		});
		ret+= '\t\t</ul>\n';
		ret+= '\t</div>\n';
		ret+= '\t</form>\n';
		ret+= '\t<div class="allsearch-tab">\n';
		ret+= '\t\t<ul>\n';
		ret+= '\t\t&lt;c:forEach var="searchCtgry" items="&#36;{allSearchCtgry}">\n';
		ret+= '\t\t\t<li data-tp="&#36;{searchCtgry.ctgryId}"><a href="#" data-pagetp="&#36;{searchCtgry.ctgryId}">&#36;{searchCtgry.ctgryNm}</a></li>\n';
		ret+= '\t\t&lt;/c:forEach>\n';
		ret+= '\t\t</ul>\n';
		ret+= '\t</div>\n';
		ret+= '&lt;c:forEach var="searchCtgry" items="&#36;{allSearchCtgry}">\n';
		ret+= '\t<section id="&#36;{searchCtgry.ctgryId}">\n';
		ret+= '\t\t<div class="allsearch-result"></div>\n';
		ret+= '\t\t<div class="pagination"></div>\n';
		ret+= '\t</section>\n';
		ret+= '&lt;/c:forEach>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruAllsearch, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruAllsearch);\n';
		ret+= 'else window.onload = siiruAllsearch;\n';
		ret+= 'function siiruAllsearch() {\n';
		ret+= '\tvar liTab = \'A\';\n';
		ret+= '\t&lt;c:if test="&#36;{param.searchTopTp ne null}">\n';
		ret+= '\t\tliTab = \'&#36;{param.searchTopTp}\';\n';
		ret+= '\t&lt;/c:if>\n';
		ret+= '\t// 전체 체크박스\n';
		ret+= '\t$(\'.allsearch-site :checkbox[name="searchSiteAll"]\').change(function(e) {\n';
		ret+= '\t\tvar chkDisabled = true;\n';
		ret+= '\t\tif ($(this).is(\':checked\')) {\n';
		ret+= '\t\t\tchkDisabled = true;\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\tchkDisabled = false;\n';
		ret+= '\t\t}\n';
		ret+= '\t\t$(\'.allsearch-site li\').find(\':checkbox\').each(function() {\n';
		ret+= '\t\t\t$(this).prop(\'disabled\', chkDisabled);\n';
		ret+= '\t\t});\n';
		ret+= '\t});\n';
		ret+= '\t// 탭\n';
		ret+= '\t$(\'.allsearch-tab li a\').click(function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(this).parent().addClass(\'active\');\n';
		ret+= '\t\t$(this).parent().siblings(\'li\').removeClass(\'active\');\n';
		ret+= '\t\t$(\'#\'+$(this).data(\'pagetp\')).css(\'display\',\'block\');\n';
		ret+= '\t\t$(\'#\'+$(this).data(\'pagetp\')).siblings(\'section\').css(\'display\',\'none\');\n';
		ret+= '\t\t$(\'#allsearchForm\').find(\'input[name="pageTp"]\').val($(this).data(\'pagetp\'));\n';
		ret+= '\t\tsearchData();\n';
		ret+= '\t});\n';
		ret+= '\t$(\'.allsearch-tab li[data-tp="\'+liTab+\'"] a\').trigger(\'click\');\n';
		ret+= '\t// 검색결과\n';
		ret+= '\t$(\'.allsearch-result\').on(\'click\', \'.result-more a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'.allsearch-tab li[data-tp="\'+$(this).data(\'tp\')+\'"] a\').trigger(\'click\');\n';
		ret+= '\t\t$(\'html, body\').animate({scrollTop:0},400);\n';
		ret+= '\t});\n';
		ret+= '\t// 페이징 버튼\n';
		ret+= '\t$(\'.pagination\').on(\'click\', \'li a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#allsearchForm\').find(\'input[name="movePage_\'+$(this).data(\'tp\')+\'"]\').val($(this).data(\'move\'));\n';
		ret+= '\t\tsearchData();\n';
		ret+= '\t});\n';
		ret+= '\t// 검색버튼\n';
		ret+= '\t$(\'#allsearchBtn\').click(function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\tif ($(\'#allsearchForm\').find(\'input[name="pageTp"]\').val() != \'A\') {\n';
		ret+= '\t\t\t$(\'#allsearchForm\').find(\'input[name="movePage_\'+$(\'#allsearchForm\').find(\'input[name="pageTp"]\').val()+\'"]\').val(\'1\');\n';
		ret+= '\t\t}\n';
		ret+= '\t\tsearchData();\n';
		ret+= '\t});\n';
		ret+= '\t// 자동검색어\n';
		ret+= '\t$(\'#allsearchForm\').find(\'input[name="searchQuery"]\').devbridgeAutocomplete({\n';
		ret+= '\t\ttype: \'post\',\n';
		ret+= '\t\tserviceUrl: \'&#36;{pathInfo.context}getSrchwrdAutoComplete.do\'\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 검색데이터\n';
		ret+= 'function searchData() {\n';
		ret+= '\tvar pageTp = $.trim($(\'#allsearchForm\').find(\'input[name="pageTp"]\').val());\n';
		ret+= '\t$(\'#\'+pageTp+\' .allsearch-result\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$(\'#allsearchForm\').find(\'input[name="movePage"]\').val($(\'#allsearchForm\').find(\'input[name="movePage_\'+pageTp+\'"]\').val());\n';
		ret+= '\tvar siteNm = \'\';\n';
		ret+= '\tvar innerData = \'\';\n';
		ret+= '\tvar noData = \'<p class="nodata">\';\n';
		ret+= '\t\tnoData+= \'검색어 <span class="query-text">&quot;\'+$.trim($(\'#allsearchForm\').find(\'input[name="searchQuery"]\').val())+\'&quot;</span>에 대한 결과가 없습니다.<br>\';\n';
		ret+= '\t\tnoData+= \'- 단어의 철자가 정확한지 확인해 보세요.<br>\';\n';
		ret+= '\t\tnoData+= \'- 검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.<br>\';\n';
		ret+= '\t\tnoData+= \'- 두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.<br>\';\n';
		ret+= '\t\tnoData+= \'</p>\';\n';
		ret+= '\tif ($.trim($(\'#allsearchForm\').find(\'input[name="searchQuery"]\').val()) == \'\') {\n';
		ret+= '\t\t$(\'#\'+pageTp+\' .allsearch-result\').html(noData);\n';
		ret+= '\t} else {\n';
		ret+= '\t\t// 사이트 정리\n';
		ret+= '\t\tvar searchSiteVal = \'\';\n';
		ret+= '\t\tif (!$(\'.allsearch-site :checkbox[name="searchSiteAll"]\').is(\':checked\')) {\n';
		ret+= '\t\t\t$(\'.allsearch-site li\').find(\':checkbox\').each(function() {\n';
		ret+= '\t\t\t\tif ($(this).is(\':checked\')) {\n';
		ret+= '\t\t\t\t\tsearchSiteVal+= $(this).val()+\'|\';\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t}\n';
		ret+= '\t\tif ($.trim(searchSiteVal) != \'\') searchSiteVal = searchSiteVal.slice(0,-1);\n';
		ret+= '\t\t$(\'#allsearchForm\').find(\'input[name="searchSite"]\').val(searchSiteVal);\n';
		ret+= '\t\t// 검색\n';
		ret+= '\t\t$.post(\'&#36;{pathInfo.context}getSearch.do\', $(\'#allsearchForm\').serialize()).done(function(data) {\n';
		ret+= '\t\t\t// 데이터 초기화\n';
		ret+= '\t\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\t\tvar allData = data.dataArr;\n';
		ret+= '\t\t\t\tvar dataLength = 0;\n';
		ret+= '\t\t\t\t// 전체\n';
		ret+= '\t\t\t\tif (pageTp.substring(0,1) == \'A\') {\n';
		ret+= '\t\t\t\t\tif (allData.totalCnt == 0) {\n';
		ret+= '\t\t\t\t\t\t$(\'#\'+pageTp+\' .allsearch-result\').html(noData);\n';
		ret+= '\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t&lt;c:forEach var="searchCtgry" items="&#36;{allSearchCtgry}">\n';
		ret+= '\t\t\t\t\t\t&lt;c:if test="&#36;{searchCtgry.ctgryId ne \'A\'}">\n';
		ret+= '\t\t\t\t\t\tdataLength = allData[\'&#36;{searchCtgry.ctgryId}list\'].length;\n';
		ret+= '\t\t\t\t\t\tif (dataLength > 0) {\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<dl>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<dt>&#36;{searchCtgry.ctgryNm}</dt>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<dd class="result-group">\';\n';
		ret+= '\t\t\t\t\t\t\t&lt;c:choose>\n';
		ret+= '\t\t\t\t\t\t\t\t&lt;c:when test="&#36;{searchCtgry.ctgryId eq \'U\'}">\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<table>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<thead>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<tr>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">부서</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">이름</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">직급</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">직책</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">전화번호</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">담당업무</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</tr>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</thead>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<tbody>\';\n';
		ret+= '\t\t\t\t\t\t\t$.each(allData[\'&#36;{searchCtgry.ctgryId}list\'], function(key, values) {\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<tr>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<th scope="row">\'+$.trim(values.deptNm)+\'</th>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<th scope="row">\'+$.trim(values.userNm)+\'</th>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<td>\'+$.trim(values.clsfNm)+\'</td>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<td>\'+$.trim(values.rspofc)+\'</td>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<td>\'+$.trim(values.telno)+\'</td>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<td>\'+$.trim(values.chrgJob)+\'</td>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'</tr>\';\n';
		ret+= '\t\t\t\t\t\t\t});\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</tbody>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</table>\';\n';
		ret+= '\t\t\t\t\t\t\t\t&lt;/c:when>\n';
		ret+= '\t\t\t\t\t\t\t\t&lt;c:otherwise>\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<ul>\';\n';
		ret+= '\t\t\t\t\t\t\t$.each(allData[\'&#36;{searchCtgry.ctgryId}list\'], function(key, values) {\n';
		ret+= '\t\t\t\t\t\t\t\tsiteNm = \'\';\n';
		ret+= '\t\t\t\t\t\t\t\t// 전체 사이트 검색 일때\n';
		ret+= '\t\t\t\t\t\t\t\tif ($.trim($(\'#allsearchForm\').find(\'input[name="searchSite"]\').val()) == \'\') {\n';
		ret+= '\t\t\t\t\t\t\t\t\tsiteNm = \'[\'+$.trim(values.siteNm)+\'] \';\n';
		ret+= '\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<li>\';\n';
		ret+= '\t\t\t\t\t\t\t\t// 게시판 파일 일때\n';
		ret+= '\t\t\t\t\t\t\t\tif ($.trim(values.tp) == \'F\') {\n';
		ret+= '\t\t\t\t\t\t\t\t\tif ($.trim(values.thumbCn) == \'\') {\n';
		ret+= '\t\t\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-title"><a href="\'+$.trim(values.fileLink)+\'" class="result-file">\'+$.trim(values.fileNm)+\'</a> <small>[size: \'+$.trim(values.fileSize)+\', Download: \'+$.trim(values.fileRdcnt)+\']</small></span>\';\n';
		ret+= '\t\t\t\t\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-title"><img src="\'+$.trim(values.thumbCn)+\'" width="\'+$.trim(values.thumbWidth)+\'" height="\'+$.trim(values.thumbHeight)+\'" alt="\'+$.trim(values.thumbAlt)+\'"></span>\';\n';
		ret+= '\t\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\t// 메뉴, 콘텐츠, 게시판 일때\n';
		ret+= '\t\t\t\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-title"><a href="\'+$.trim(values.link)+\'"\'+$.trim(values.onClick)+\'\'+$.trim(values.target)+\'>\'+$.trim(values.sj)+\'</a></span>\';\n';
		ret+= '\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\t// 게시판, 게시판 파일 일때\n';
		ret+= '\t\t\t\t\t\t\t\tif (($.trim(values.tp) == \'B\') || ($.trim(values.tp) == \'F\')) {\n';
		ret+= '\t\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-date">\'+$.trim(values.regDt)+\'</span>\';\n';
		ret+= '\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\t// 콘텐츠, 게시판 일때\n';
		ret+= '\t\t\t\t\t\t\t\tif (($.trim(values.tp) == \'C\') || ($.trim(values.tp) == \'B\')) {\n';
		ret+= '\t\t\t\t\t\t\t\t\tinnerData+= \'<p class="result-info">\'+$.trim(values.cn)+\'</p>\';\n';
		ret+= '\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-url">\';\n';
		ret+= '\t\t\t\t\t\t\t\t// 게시판 파일 일때\n';
		ret+= '\t\t\t\t\t\t\t\tif ($.trim(values.tp) == \'F\') {\n';
		ret+= '\t\t\t\t\t\t\t\t\tinnerData+= \'<a href="\'+$.trim(values.link)+\'"\'+$.trim(values.onClick)+\'\'+$.trim(values.target)+\'>\'+$.trim(values.sj)+\' [게시물 바로가기]</a>\';\n';
		ret+= '\t\t\t\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\t\t\t\tinnerData+= \'<a href="\'+$.trim(values.link)+\'"\'+$.trim(values.onClick)+\'\'+$.trim(values.target)+\'>\'+$.trim(values.linkNm)+\'</a>\';\n';
		ret+= '\t\t\t\t\t\t\t\t\tif ($.trim(values.target) == \'\') {\n';
		ret+= '\t\t\t\t\t\t\t\t\t\tinnerData+= \'<a href="\'+$.trim(values.link)+\'" target="_blank"> [새창]</a>\';\n';
		ret+= '\t\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'</span>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-path">\'+siteNm+$.trim(values.menuAllPath)+\'</span>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'</li>\';\n';
		ret+= '\t\t\t\t\t\t\t});\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</ul>\';\n';
		ret+= '\t\t\t\t\t\t\t\t&lt;/c:otherwise>\n';
		ret+= '\t\t\t\t\t\t\t&lt;/c:choose>\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</dd>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<dd class="result-more">\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<a href="#" data-tp="&#36;{searchCtgry.ctgryId}">&quot;&#36;{searchCtgry.ctgryNm}&quot; 검색결과 더보기 &gt;</a>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</dd>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</dl>\';\n';
		ret+= '\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t&lt;/c:if>\n';
		ret+= '\t\t\t\t\t&lt;/c:forEach>\n';
		ret+= '\t\t\t\t\t\t$(\'#\'+pageTp+\' .allsearch-result\').html(innerData);\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\tvar data = data.dataArr[pageTp];\n';
		ret+= '\t\t\t\t\t$(\'#\'+pageTp+\' .allsearch-result\').html(\'\');\n';
		ret+= '\t\t\t\t\tif (data.totalCnt == 0) {\n';
		ret+= '\t\t\t\t\t\t$(\'#\'+pageTp+\' .allsearch-result\').html(noData);\n';
		ret+= '\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\tinnerData+= \'<p class="result-head">\'+$(\'.allsearch-tab li.active a\').text()+\' <small>\'+numberWithCommas(data.totalCnt)+\' 건</small></p>\';\n';
		ret+= '\t\t\t\t\t\t// 직원/업무\n';
		ret+= '\t\t\t\t\t\tif (pageTp.substring(0,1) == \'U\') {\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<table>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<thead>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<tr>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">부서</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">이름</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">직급</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">직책</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">전화번호</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<th scope="col">담당업무</th>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</tr>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</thead>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<tbody>\';\n';
		ret+= '\t\t\t\t\t\t\t$.each(data.list, function(key, values) {\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<tr>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<th scope="row">\'+$.trim(values.deptNm)+\'</th>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<th scope="row">\'+$.trim(values.userNm)+\'</th>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<td>\'+$.trim(values.clsfNm)+\'</td>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<td>\'+$.trim(values.rspofc)+\'</td>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<td>\'+$.trim(values.telno)+\'</td>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<td>\'+$.trim(values.chrgJob)+\'</td>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'</tr>\';\n';
		ret+= '\t\t\t\t\t\t\t});\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</tbody>\';\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</table>\';\n';
		ret+= '\t\t\t\t\t\t// 메뉴, 콘텐츠, 게시판, 게시판 파일\n';
		ret+= '\t\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'<ul>\';\n';
		ret+= '\t\t\t\t\t\t\t$.each(data.list, function(key, values) {\n';
		ret+= '\t\t\t\t\t\t\t\tsiteNm = \'\';\n';
		ret+= '\t\t\t\t\t\t\t\t// 전체 사이트 검색 일때\n';
		ret+= '\t\t\t\t\t\t\t\tif ($.trim($(\'#allsearchForm\').find(\'input[name="searchSite"]\').val()) == \'\') {\n';
		ret+= '\t\t\t\t\t\t\t\t\tsiteNm = \'[\'+$.trim(values.siteNm)+\'] \';\n';
		ret+= '\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<li>\';\n';
		ret+= '\t\t\t\t\t\t\t\t// 게시판 파일 일때\n';
		ret+= '\t\t\t\t\t\t\t\tif (pageTp.substring(0,1) == \'F\') {\n';
		ret+= '\t\t\t\t\t\t\t\t\tif ($.trim(values.thumbCn) == \'\') {\n';
		ret+= '\t\t\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-title"><a href="\'+$.trim(values.fileLink)+\'" class="result-file">\'+$.trim(values.fileNm)+\'</a> <small>[size: \'+$.trim(values.fileSize)+\', Download: \'+$.trim(values.fileRdcnt)+\']</small></span>\';\n';
		ret+= '\t\t\t\t\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-title"><img src="\'+$.trim(values.thumbCn)+\'" width="\'+$.trim(values.thumbWidth)+\'" height="\'+$.trim(values.thumbHeight)+\'" alt="\'+$.trim(values.thumbAlt)+\'"></span>\';\n';
		ret+= '\t\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\t// 메뉴, 콘텐츠, 게시판 일때\n';
		ret+= '\t\t\t\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-title"><a href="\'+$.trim(values.link)+\'"\'+$.trim(values.onClick)+\'\'+$.trim(values.target)+\'>\'+$.trim(values.sj)+\'</a></span>\';\n';
		ret+= '\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\t// 게시판, 게시판 파일 일때\n';
		ret+= '\t\t\t\t\t\t\t\tif ((pageTp.substring(0,1) == \'B\') || (pageTp.substring(0,1) == \'F\')) {\n';
		ret+= '\t\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-date">\'+$.trim(values.regDt)+\'</span>\';\n';
		ret+= '\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\t// 콘텐츠, 게시판 일때\n';
		ret+= '\t\t\t\t\t\t\t\tif ((pageTp.substring(0,1) == \'C\') || (pageTp.substring(0,1) == \'B\')) {\n';
		ret+= '\t\t\t\t\t\t\t\t\tinnerData+= \'<p class="result-info">\'+$.trim(values.cn)+\'</p>\';\n';
		ret+= '\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-url">\';\n';
		ret+= '\t\t\t\t\t\t\t\t// 게시판 파일 일때\n';
		ret+= '\t\t\t\t\t\t\t\tif (pageTp.substring(0,1) == \'F\') {\n';
		ret+= '\t\t\t\t\t\t\t\t\tinnerData+= \'<a href="\'+$.trim(values.link)+\'"\'+$.trim(values.onClick)+\'\'+$.trim(values.target)+\'>\'+$.trim(values.sj)+\' [게시물 바로가기]</a>\';\n';
		ret+= '\t\t\t\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\t\t\t\tinnerData+= \'<a href="\'+$.trim(values.link)+\'"\'+$.trim(values.onClick)+\'\'+$.trim(values.target)+\'>\'+$.trim(values.linkNm)+\'</a>\';\n';
		ret+= '\t\t\t\t\t\t\t\t\tif ($.trim(values.target) == \'\') {\n';
		ret+= '\t\t\t\t\t\t\t\t\t\tinnerData+= \'<a href="\'+$.trim(values.link)+\'" target="_blank"> [새창]</a>\';\n';
		ret+= '\t\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'</span>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'<span class="result-path">\'+siteNm+$.trim(values.menuAllPath)+\'</span>\';\n';
		ret+= '\t\t\t\t\t\t\t\tinnerData+= \'</li>\';\n';
		ret+= '\t\t\t\t\t\t\t});\n';
		ret+= '\t\t\t\t\t\t\tinnerData+= \'</ul>\';\n';
		ret+= '\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t$(\'#\'+pageTp+\' .allsearch-result\').html(innerData);\n';
		ret+= '\t\t\t\t\t\tpagination(pageTp, data.page, data.pageCnt, data.totalCnt);\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t} else {\n';
		ret+= '\t\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t});\n';
		ret+= '\t}\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 팝업창
	} else if (tp == 'popupP') {
		ret = '&lt;c:if test="&#36;{siteInfo.mainAt eq \'Y\'}">\n';
		ret+= '\t&lt;c:if test="&#36;{not empty popupInfoPZ and fn:length(popupInfoPZ) > 0}">\n';
		ret+= '<div class="siiru-popupzone">\n';
		ret+= '\t<div class="popupzone-wrap" style="display:block;">\n';
		ret+= '\t\t<div class="popupzone-box">\n';
		ret+= '\t\t\t<ul id="popupzone-slide">\n';
		ret+= '\t\t\t\t&lt;c:forEach var="pz" items="&#36;{popupInfoPZ}">\n';
		ret+= '\t\t\t\t<li>\n';
		ret+= '\t\t\t\t\t&lt;c:choose>\n';
		ret+= '\t\t\t\t\t\t&lt;c:when test="&#36;{pz.imgmapAt eq \'Y\'}">&#36;{pz.img}&lt;/c:when>\n';
		ret+= '\t\t\t\t\t\t&lt;c:otherwise><a&#36;{pz.link}>&#36;{pz.img}</a>&lt;/c:otherwise>\n';
		ret+= '\t\t\t\t\t&lt;/c:choose>\n';
		ret+= '\t\t\t\t</li>\n';
		ret+= '\t\t\t\t&lt;/c:forEach>\n';
		ret+= '\t\t\t</ul>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t\t<a href="#" class="popupzone-prevbtn">이전</a>\n';
		ret+= '\t\t<a href="#" class="popupzone-nextbtn">다음</a>\n';
		ret+= '\t</div>\n';
		ret+= '\t<div class="popupzone-btn">\n';
		ret+= '\t\t<a href="#" class="popupzone-closebtn" style="display:block;">팝업닫기</a>\n';
		ret+= '\t\t<a href="#" class="popupzone-openbtn" style="display:none;">팝업열기</a>\n';
		ret+= '\t</div>\n';
		ret+= '</div>\n';
		ret+= '\t&lt;/c:if>\n';
		ret+= '\t&lt;c:if test="&#36;{not empty popupInfoPL and fn:length(popupInfoPL) > 0}">\n';
		ret+= '\t\t&lt;c:forEach var="pl" items="&#36;{popupInfoPL}">\n';
		ret+= '<div id="&#36;{fn:replace(pl.id,\'|\',\'\')}" style="display:none;position:absolute;top:&#36;{pl.popTop};left:&#36;{pl.popLeft};width:&#36;{pl.popWidth};height:&#36;{pl.popHeight};background-color:#fff;border:4px solid #bbb;z-index:9999;">\n';
		ret+= '\t&#36;{pl.cn}\n';
		ret+= '</div>\n';
		ret+= '\t\t&lt;/c:forEach>\n';
		ret+= '\t&lt;/c:if>\n';
		ret+= '\t&lt;c:if test="&#36;{(not empty popupInfoPW and fn:length(popupInfoPW) > 0) || (not empty popupInfoPL and fn:length(popupInfoPL) > 0) || (not empty popupInfoPZ and fn:length(popupInfoPZ) > 0)}">\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruPopupzone, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruPopupzone);\n';
		ret+= 'else window.onload = siiruPopupzone;\n';
		ret+= 'function siiruPopupzone() {\n';
		ret+= '\t\t&lt;c:if test="&#36;{not empty popupInfoPW and fn:length(popupInfoPW) > 0}">\n';
		ret+= '\t\t\t&lt;c:forEach var="pw" items="&#36;{popupInfoPW}">\n';
		ret+= '\tif ($.trim(getCookie(\'&#36;{pw.id}\')) == \'\') {\n';
		ret+= '\t\tsetTimeout("popupView(\'&#36;{pw.id}\',\'&#36;{pw.popTop}\',\'&#36;{pw.popLeft}\',\'&#36;{pw.popWidth}\',\'&#36;{pw.popHeight}\',\'&#36;{pw.popScrl}\')",500);\n';
		ret+= '\t}\n';
		ret+= '\t\t\t&lt;/c:forEach>\n';
		ret+= '\t\t&lt;/c:if>\n';
		ret+= '\t\t&lt;c:if test="&#36;{not empty popupInfoPL and fn:length(popupInfoPL) > 0}">\n';
		ret+= '\t\t\t&lt;c:forEach var="pl" items="&#36;{popupInfoPL}">\n';
		ret+= '\tif ($.trim(getCookie(\'&#36;{pl.id}\')) == \'\') {\n';
		ret+= '\t\tsetTimeout("&#36;(\'#&#36;{fn:replace(pl.id,\'|\',\'\')}\').fadeIn()",500);\n';
		ret+= '\t}\n';
		ret+= '\t\t\t&lt;/c:forEach>\n';
		ret+= '\t\t&lt;/c:if>\n';
		ret+= '\t\t&lt;c:if test="&#36;{not empty popupInfoPZ and fn:length(popupInfoPZ) > 0}">\n';
		ret+= '\tpopupZone();\n';
		ret+= '\t\t&lt;/c:if>\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
		ret+= '\t&lt;/c:if>\n';
		ret+= '&lt;/c:if>\n';
	// 알림존
	} else if (tp == 'popupZ') {
		ret = '<div>\n';
		$.each(ctgryCdZList, function(key, values) {
			ret+= '\t<p>&#36;{popupInfoZ.'+$.trim(values)+'.ctgryNm}</p>\n';
			ret+= '&lt;c:if test="&#36;{not empty popupInfoZ.'+$.trim(values)+'.list and fn:length(popupInfoZ.'+$.trim(values)+'.list) > 0}">\n';
			ret+= '\t<ul>\n';
			ret+= '\t&lt;c:forEach var="z" items="&#36;{popupInfoZ.'+$.trim(values)+'.list}">\n';
			ret+= '\t\t<li>\n';
			ret+= '\t\t\t&lt;c:choose>\n';
			ret+= '\t\t\t\t&lt;c:when test="&#36;{z.imgmapAt eq \'Y\'}">&#36;{z.img}&lt;/c:when>\n';
			ret+= '\t\t\t\t&lt;c:otherwise><a&#36;{z.link}>&#36;{z.img}</a>&lt;/c:otherwise>\n';
			ret+= '\t\t\t&lt;/c:choose>\n';
			ret+= '\t\t</li>\n';
			ret+= '\t&lt;/c:forEach>\n';
			ret+= '\t</ul>\n';
			ret+= '&lt;/c:if>\n';
		});
		ret+= '</div>\n';
	// 퀵메뉴
	} else if (tp == 'popupQ') {
		ret = '<div>\n';
		$.each(ctgryCdQList, function(key, values) {
			ret+= '\t<p>&#36;{popupInfoQ.'+$.trim(values)+'.ctgryNm}</p>\n';
			ret+= '&lt;c:if test="&#36;{not empty popupInfoQ.'+$.trim(values)+'.list and fn:length(popupInfoQ.'+$.trim(values)+'.list) > 0}">\n';
			ret+= '\t<ul>\n';
			ret+= '\t&lt;c:forEach var="q" items="&#36;{popupInfoQ.'+$.trim(values)+'.list}">\n';
			ret+= '\t\t<li>\n';
			ret+= '\t\t\t&lt;c:choose>\n';
			ret+= '\t\t\t\t&lt;c:when test="&#36;{q.imgmapAt eq \'Y\'}">&#36;{q.img}&lt;/c:when>\n';
			ret+= '\t\t\t\t&lt;c:otherwise><a&#36;{q.link}>&#36;{q.img}</a>&lt;/c:otherwise>\n';
			ret+= '\t\t\t&lt;/c:choose>\n';
			ret+= '\t\t</li>\n';
			ret+= '\t&lt;/c:forEach>\n';
			ret+= '\t</ul>\n';
			ret+= '&lt;/c:if>\n';
		});
		ret+= '</div>\n';
	// 배너
	} else if (tp == 'popupB') {
		ret = '<div>\n';
		$.each(ctgryCdBList, function(key, values) {
			ret+= '\t<p>&#36;{popupInfoB.'+$.trim(values)+'.ctgryNm}</p>\n';
			ret+= '&lt;c:if test="&#36;{not empty popupInfoB.'+$.trim(values)+'.list and fn:length(popupInfoB.'+$.trim(values)+'.list) > 0}">\n';
			ret+= '\t<ul>\n';
			ret+= '\t&lt;c:forEach var="b" items="&#36;{popupInfoB.'+$.trim(values)+'.list}">\n';
			ret+= '\t\t<li>\n';
			ret+= '\t\t\t&lt;c:choose>\n';
			ret+= '\t\t\t\t&lt;c:when test="&#36;{b.imgmapAt eq \'Y\'}">&#36;{b.img}&lt;/c:when>\n';
			ret+= '\t\t\t\t&lt;c:otherwise><a&#36;{b.link}>&#36;{b.img}</a>&lt;/c:otherwise>\n';
			ret+= '\t\t\t&lt;/c:choose>\n';
			ret+= '\t\t</li>\n';
			ret+= '\t&lt;/c:forEach>\n';
			ret+= '\t</ul>\n';
			ret+= '&lt;/c:if>\n';
		});
		ret+= '</div>\n';
	// 관련사이트
	} else if (tp == 'popupF') {
		ret = '<div>\n';
		$.each(ctgryCdFList, function(key, values) {
			ret+= '\t<p>&#36;{popupInfoF.'+$.trim(values)+'.ctgryNm}</p>\n';
			ret+= '&lt;c:if test="&#36;{not empty popupInfoF.'+$.trim(values)+'.list and fn:length(popupInfoF.'+$.trim(values)+'.list) > 0}">\n';
			ret+= '\t<ul>\n';
			ret+= '\t&lt;c:forEach var="f" items="&#36;{popupInfoF.'+$.trim(values)+'.list}">\n';
			ret+= '\t\t<li><a&#36;{f.link}>&#36;{f.sj}</a></li>\n';
			ret+= '\t&lt;/c:forEach>\n';
			ret+= '\t</ul>\n';
			ret+= '&lt;/c:if>\n';
		});
		ret+= '</div>\n';
	// 만족도 평가 등록 폼
	} else if (tp == 'stsfdg') {
		ret = '&lt;c:if test="&#36;{siteInfo.mainAt ne \'Y\'}">\n';
		ret+= '<div class="siiru-stsfdgwrap">\n';
		ret+= '\t&lt;c:if test="&#36;{menuInfo.cntntsChrg ne \'\' || menuInfo.cntntsDt ne \'\' || menuInfo.koglSeImg ne \'\'}">\n';
		ret+= '\t<div class="stsfdg-info">\n';
		ret+= '\t\t<ul>\n';
		ret+= '\t\t\t<li>&lt;c:if test="&#36;{menuInfo.cntntsChrg ne \'\'}">콘텐츠 담당 : &#36;{menuInfo.cntntsChrg} &lt;c:if test="&#36;{menuInfo.cntntsChrgTelno ne \'\'}"> [&#36;{menuInfo.cntntsChrgTelno}] &lt;/c:if>&lt;c:if test="&#36;{menuInfo.cntntsChrgEmail ne \'\'}"> [&#36;{menuInfo.cntntsChrgEmail}] &lt;/c:if>&lt;/c:if></li>\n';
		ret+= '\t\t\t<li>&lt;c:if test="&#36;{menuInfo.cntntsDt ne \'\'}">최종수정일 : &#36;{menuInfo.cntntsDt}&lt;/c:if></li>\n';
		ret+= '\t\t\t<li class="siiru-tr">&lt;c:if test="&#36;{menuInfo.koglSeImg ne \'\'}">&#36;{menuInfo.koglSeImg}</c:if></li>\n';
		ret+= '\t\t</ul>\n';
		ret+= '\t</div>\n';
		ret+= '\t&lt;/c:if>\n';
		ret+= '\t<div class="stsfdg-form">\n';
		ret+= '\t\t<ul>\n';
		ret+= '\t\t\t<li><input type="radio" id="evlScore5" name="evlScore" value="5" checked="checked"> <label for="evlScore5">매우 만족</label></li>\n';
		ret+= '\t\t\t<li><input type="radio" id="evlScore4" name="evlScore" value="4"> <label for="evlScore4">만족</label></li>\n';
		ret+= '\t\t\t<li><input type="radio" id="evlScore3" name="evlScore" value="3"> <label for="evlScore3">보통</label></li>\n';
		ret+= '\t\t\t<li><input type="radio" id="evlScore2" name="evlScore" value="2"> <label for="evlScore2">불만족</label></li>\n';
		ret+= '\t\t\t<li><input type="radio" id="evlScore1" name="evlScore" value="1"> <label for="evlScore1">매우 불만족</label></li>\n';
		ret+= '\t\t</ul>\n';
		ret+= '\t\t<div>\n';
		ret+= '\t\t\t<input type="hidden" name="stsfdgPageId" value="&#36;{siteInfo.pageId}">\n';
		ret+= '\t\t\t<textarea id="stsfdgCn" name="stsfdgCn" maxlength="2000" placeholder="만족도 내용을 입력해 주세요." title="만족도 내용을 입력해 주세요."></textarea>\n';
		ret+= '\t\t\t<button type="submit" id="stsfdgSubmit" name="stsfdgSubmit" class="siiru-ml10">만족도 등록</button>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t</div>\n';
		ret+= '</div>\n';
		ret+= '&lt;/c:if>\n';
	// 최근게시글 [메인]
	} else if (tp == 'boardLatestMain') {
		ret = '<div class="boardLatest">\n';
		ret+= '\t<ul>\n';
		$.each(latestBoardList, function(key, values) {
			ret+= '\t\t<li>\n';
			ret+= '\t\t\t<a href="#"';
			if (key == 0) ret+= ' class="active"';
			ret+= '>&#36;{boardLatestInfo.'+$.trim(values)+'.menuNm}</a>\n';
			ret+= '\t\t\t&lt;c:if test="&#36;{not empty boardLatestInfo.'+$.trim(values)+'.list and fn:length(boardLatestInfo.'+$.trim(values)+'.list) > 0}">\n';
			ret+= '\t\t\t<p>최근게시글</p>\n';
			ret+= '\t\t\t<ul class="latestList">\n';
			ret+= '\t\t\t\t&lt;c:forEach var="b" items="&#36;{boardLatestInfo.'+$.trim(values)+'.list}">\n';
			ret+= '\t\t\t\t<li>\n';
			ret+= '\t\t\t\t\t<a href="&#36;{b.link}">&#36;{cf:strLen(b.boardSj,50)}</a> &lt;c:if test="&#36;{b.newAt eq \'Y\'}">[new]&lt;/c:if>\n';
			ret+= '\t\t\t\t\t&lt;c:if test="&#36;{boardLatestInfo.'+$.trim(values)+'.boardTp eq \'M\'}">\n';
			ret+= '\t\t\t\t\t<p>&#36;{b.img}<br>&#36;{cf:strLen(b.boardCn,300)}</p>\n';
			ret+= '\t\t\t\t\t&lt;/c:if>\n';
			ret+= '\t\t\t\t\t<span class="date">&#36;{b.regDt}</span>\n';
			ret+= '\t\t\t\t</li>\n';
			ret+= '\t\t\t\t&lt;/c:forEach>\n';
			ret+= '\t\t\t</ul>\n';
			ret+= '\t\t\t&lt;/c:if>\n';
			ret+= '\t\t\t&lt;c:if test="&#36;{not empty boardLatestInfo.'+$.trim(values)+'.listExpsr and fn:length(boardLatestInfo.'+$.trim(values)+'.listExpsr) > 0}">\n';
			ret+= '\t\t\t<p>메뉴노출</p>\n';
			ret+= '\t\t\t<ul class="latestList">\n';
			ret+= '\t\t\t\t&lt;c:forEach var="e" items="&#36;{boardLatestInfo.'+$.trim(values)+'.listExpsr}">\n';
			ret+= '\t\t\t\t<li>\n';
			ret+= '\t\t\t\t\t<a href="&#36;{e.link}">&#36;{cf:strLen(e.boardSj,50)}</a> &lt;c:if test="&#36;{e.newAt eq \'Y\'}">[new]&lt;/c:if>\n';
			ret+= '\t\t\t\t\t&lt;c:if test="&#36;{boardLatestInfo.'+$.trim(values)+'.boardTp eq \'M\'}">\n';
			ret+= '\t\t\t\t\t<p>&#36;{e.img}<br>&#36;{cf:strLen(e.boardCn,300)}</p>\n';
			ret+= '\t\t\t\t\t&lt;/c:if>\n';
			ret+= '\t\t\t\t\t<span class="date">&#36;{e.regDt}</span>\n';
			ret+= '\t\t\t\t</li>\n';
			ret+= '\t\t\t\t&lt;/c:forEach>\n';
			ret+= '\t\t\t</ul>\n';
			ret+= '\t\t\t&lt;/c:if>\n';
			ret+= '\t\t\t<a class="more" href="&#36;{boardLatestInfo.'+$.trim(values)+'.more}">더보기</a>\n';
			ret+= '\t\t</li>\n';
		});
		ret+= '\t</ul>\n';
		ret+= '</div>\n';
	// 최근게시글 [서브]
	} else if (tp == 'boardLatest') {
		ret = '<div class="boardLatest"></div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruBoard, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruBoard);\n';
		ret+= 'else window.onload = siiruBoard;\n';
		ret+= 'function siiruBoard() {\n';
		ret+= '\tvar latestList = \'\';\n';
		ret+= '\tvar newAt = \'\';\n';
		ret+= '\t$(\'.boardLatest\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getBoardLatest.do\', {\'siteId\':\'&#36;{siteInfo.siteId}\',\'boardId\':\'게시판ID 여러건은 파이프(|)로 구분\',\'ctgry\':\'카테고리ID 여러건은 파이프(|)로 구분\'}).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tlatestList+= \'<p>최근게시글</p>\';\n';
		ret+= '\t\t\tlatestList+= \'<ul class="latestList">\';\n';
		ret+= '\t\t\tif (data.dataArr.list.length > 0) {\n';
		ret+= '\t\t\t\t$.each(data.dataArr.list, function(key, values) {\n';
		ret+= '\t\t\t\t\tnewAt = \'\';\n';
		ret+= '\t\t\t\t\tif ($.trim(values.newAt) == \'Y\') newAt = \' [new]\';\n';
		ret+= '\t\t\t\t\tlatestList+= \'<li>\';\n';
		ret+= '\t\t\t\t\tlatestList+= \'<a href="\'+$.trim(values.link)+\'">\'+$.trim(values.boardSj)+\'</a>\'+newAt;\n';
		ret+= '\t\t\t\t\tlatestList+= \'<span class="date">\'+$.trim(values.regDt)+\'</span>\';\n';
		ret+= '\t\t\t\t\tlatestList+= \'</li>\';\n';
		ret+= '\t\t\t\t});\n';
		ret+= '\t\t\t} else {\n';
		ret+= '\t\t\t\tlatestList+= \'<li>최근 게시글이 존재하지 않습니다.</li>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\tlatestList+= \'</ul>\';\n';
		ret+= '\t\t\tlatestList+= \'<p>메뉴노출</p>\';\n';
		ret+= '\t\t\tlatestList+= \'<ul class="latestList">\';\n';
		ret+= '\t\t\tif (data.dataArr.listExpsr.length > 0) {\n';
		ret+= '\t\t\t\t$.each(data.dataArr.listExpsr, function(key, values) {\n';
		ret+= '\t\t\t\t\tnewAt = \'\';\n';
		ret+= '\t\t\t\t\tif ($.trim(values.newAt) == \'Y\') newAt = \' [new]\';\n';
		ret+= '\t\t\t\t\tlatestList+= \'<li>\';\n';
		ret+= '\t\t\t\t\tlatestList+= \'<a href="\'+$.trim(values.link)+\'">\'+$.trim(values.boardSj)+\'</a>\'+newAt;\n';
		ret+= '\t\t\t\t\tlatestList+= \'<span class="date">\'+$.trim(values.regDt)+\'</span>\';\n';
		ret+= '\t\t\t\t\tlatestList+= \'</li>\';\n';
		ret+= '\t\t\t\t});\n';
		ret+= '\t\t\t} else {\n';
		ret+= '\t\t\t\tlatestList+= \'<li>최근 게시글이 존재하지 않습니다.</li>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\tlatestList+= \'</ul>\';\n';
		ret+= '\t\t\t$(\'.boardLatest\').html(latestList);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// RSS 게시판
	} else if (tp == 'boardRss') {
		ret = '<div>\n';
		ret+= '&lt;c:if test="&#36;{not empty boardRssInfo and fn:length(boardRssInfo) > 0}">\n';
		ret+= '\t<ul>\n';
		ret+= '\t&lt;c:forEach var="rss" items="&#36;{boardRssInfo}">\n';
		ret+= '\t\t<li>&#36;{rss.menuNm} : <a href="&#36;{rss.link}" target="_blank">&#36;{rss.link}</a></li>\n';
		ret+= '\t&lt;/c:forEach>\n';
		ret+= '\t</ul>\n';
		ret+= '&lt;/c:if>\n';
		ret+= '</div>\n';
	// 고시/입법
	} else if (tp == 'eminwon') {
		ret = '<div class="siiru-eminwonwrap">\n';
		ret+= '\t<form id="eminwonForm" name="eminwonForm" method="post">\n';
		ret+= '\t<input type="hidden" name="action" value="L">\n';
		ret+= '\t<input type="hidden" name="seq" value="">\n';
		ret+= '\t<input type="hidden" name="notAncmtSeCode" value="01,02,03,04">\n';
		ret+= '\t<input type="hidden" name="listGubun" value="A">\n';
		ret+= '\t<input type="hidden" name="recordCnt" value="10">\n';
		ret+= '\t<input type="hidden" name="movePage" value="1">\n';
		ret+= '\t<div class="eminwonSearch">\n';
		ret+= '\t\t<div class="eminwonSearch-info"></div>\n';
		ret+= '\t\t<div class="eminwonSearch-box">\n';
		ret+= '\t\t\t<select name="eminwonSearch" title="검색어 구분">\n';
		ret+= '\t\t\t\t<option value="">전체</option>\n';
		ret+= '\t\t\t\t<option value="S">제목</option>\n';
		ret+= '\t\t\t\t<option value="C">내용</option>\n';
		ret+= '\t\t\t\t<option value="D">담당부서</option>\n';
		ret+= '\t\t\t\t<option value="R">고시공고번호</option>\n';
		ret+= '\t\t\t</select>\n';
		ret+= '\t\t\t<input type="text" name="eminwonQuery" value="${param.eminwonQuery}" title="검색어" placeholder="검색어를 입력하세요">\n';
		ret+= '\t\t\t<button type="submit" id="eminwonSearchBtn">검색</button>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t</div>\n';
		ret+= '\t</form>\n';
		ret+= '\t<section id="eminwonWrap">\n';
		ret+= '\t\t<div class="eminwonList"></div>\n';
		ret+= '\t\t<div class="pagination"></div>\n';
		ret+= '\t\t<div class="eminwonView">\n';
		ret+= '\t\t\t<div class="eminwonDs"></div>\n';
		ret+= '\t\t\t<div class="eminwonDetail"></div>\n';
		ret+= '\t\t\t<div class="siiru-btnSet siiru-tc"><button type="button" class="eminwonListBtn siiru-btn">목록</button></div>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t</section>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruEminwon, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruEminwon);\n';
		ret+= 'else window.onload = siiruEminwon;\n';
		ret+= 'function siiruEminwon() {\n';
		ret+= '\teminwonList();\n';
		ret+= '\t// 뷰페이지 링크\n';
		ret+= '\t$(\'.eminwonList\').on(\'click\', \'tbody a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#eminwonForm\').find(\'input[name="action"]\').val(\'V\');\n';
		ret+= '\t\t$(\'#eminwonForm\').find(\'input[name="seq"]\').val($(this).data(\'seq\'));\n';
		ret+= '\t\teminwonView();\n';
		ret+= '\t});\n';
		ret+= '\t// 페이징 버튼\n';
		ret+= '\t$(\'.pagination\').on(\'click\', \'li a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#eminwonForm\').find(\'input[name="movePage"]\').val($(this).data(\'move\'));\n';
		ret+= '\t\teminwonList();\n';
		ret+= '\t});\n';
		ret+= '\t// 검색버튼\n';
		ret+= '\t$(\'#eminwonSearchBtn\').click(function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\tif ($(\'#eminwonForm\').find(\'select[name="eminwonSearch"]\').val() == \'R\') {\n';
		ret+= '\t\t\t$(\'#eminwonForm\').find(\'input[name="eminwonQuery"]\').val(strToNumber($(\'#eminwonForm\').find(\'input[name="eminwonQuery"]\').val()));\n';
		ret+= '\t\t}\n';
		ret+= '\t\t// 액션/페이지 번호 초기화\n';
		ret+= '\t\t$(\'#eminwonForm\').find(\'input[name="action"]\').val(\'L\');\n';
		ret+= '\t\t$(\'#eminwonForm\').find(\'input[name="movePage"]\').val(\'1\');\n';
		ret+= '\t\teminwonList();\n';
		ret+= '\t});\n';
		ret+= '\t// 목록 버튼\n';
		ret+= '\t$(\'.eminwonView\').on(\'click\', \'.eminwonListBtn\', function(e) {\n';
		ret+= '\t\t$(\'#eminwonForm\').find(\'input[name="action"]\').val(\'L\');\n';
		ret+= '\t\t// 뷰\n';
		ret+= '\t\t$(\'.eminwonDs\').html(\'\');\n';
		ret+= '\t\t$(\'.eminwonDetail\').html(\'\');\n';
		ret+= '\t\t$(\'.eminwonView\').hide();\n';
		ret+= '\t\t// 리스트\n';
		ret+= '\t\t$(\'.eminwonSearch\').show();\n';
		ret+= '\t\t$(\'.eminwonList\').show();\n';
		ret+= '\t\t$(\'.pagination\').show();\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 고시공고/입법예고 리스트\n';
		ret+= 'function eminwonList() {\n';
		ret+= '\t// 리스트\n';
		ret+= '\t$(\'.eminwonSearch\').show();\n';
		ret+= '\t$(\'.eminwonList\').show();\n';
		ret+= '\t$(\'.pagination\').show();\n';
		ret+= '\t// 뷰\n';
		ret+= '\t$(\'.eminwonDs\').html(\'\');\n';
		ret+= '\t$(\'.eminwonDetail\').html(\'\');\n';
		ret+= '\t$(\'.eminwonView\').hide();\n';
		ret+= '\tvar eminwonDataList = \'\';\n';
		ret+= '\t$(\'.eminwonSearch-info\').html(\'\');\n';
		ret+= '\t$(\'.eminwonList\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getEminwon.do\', $(\'#eminwonForm\').serialize()).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar data = data.dataArr;\n';
		ret+= '\t\t\teminwonDataList+= \'<table class="siiru-mb20">\';\n';
		ret+= '\t\t\teminwonDataList+= \'<caption>고시공고/입법예고 목록</caption>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<colgroup>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<col style="width:8%" />\';\n';
		ret+= '\t\t\teminwonDataList+= \'<col style="width:15%" />\';\n';
		ret+= '\t\t\teminwonDataList+= \'<col />\';\n';
		ret+= '\t\t\teminwonDataList+= \'<col style="width:15%" />\';\n';
		ret+= '\t\t\teminwonDataList+= \'<col style="width:10%" />\';\n';
		ret+= '\t\t\teminwonDataList+= \'<col style="width:20%" />\';\n';
		ret+= '\t\t\teminwonDataList+= \'<col style="width:8%" />\';\n';
		ret+= '\t\t\teminwonDataList+= \'</colgroup>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<thead>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<tr>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<th scope="col">번호</th>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<th scope="col">고시공고번호</th>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<th scope="col">제목</th>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<th scope="col">담당부서</th>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<th scope="col">등록일</th>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<th scope="col">게재기간</th>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<th scope="col">조회수</th>\';\n';
		ret+= '\t\t\teminwonDataList+= \'</tr>\';\n';
		ret+= '\t\t\teminwonDataList+= \'</thead>\';\n';
		ret+= '\t\t\teminwonDataList+= \'<tbody>\';\n';
		ret+= '\t\t\t$.each(data.list, function(key, values) {\n';
		ret+= '\t\t\t\teminwonDataList+= \'<tr>\';\n';
		ret+= '\t\t\t\teminwonDataList+= \'<td>\'+$.trim(values.idx)+\'</td>\';\n';
		ret+= '\t\t\t\teminwonDataList+= \'<td>\'+$.trim(values.gosiNo)+\'</td>\';\n';
		ret+= '\t\t\t\teminwonDataList+= \'<th scope="row" class="siiru-tl"><a href="#" data-seq="\'+$.trim(values.seq)+\'">\'+$.trim(values.sj)+\'</a></th>\';\n';
		ret+= '\t\t\t\teminwonDataList+= \'<td>\'+$.trim(values.deptNm)+\'</td>\';\n';
		ret+= '\t\t\t\teminwonDataList+= \'<td>\'+$.trim(values.regDe)+\'</td>\';\n';
		ret+= '\t\t\t\teminwonDataList+= \'<td>\'+$.trim(values.termDe)+\'</td>\';\n';
		ret+= '\t\t\t\teminwonDataList+= \'<td>\'+$.trim(values.rdcnt)+\'</td>\';\n';
		ret+= '\t\t\t\teminwonDataList+= \'</tr>\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\tif (data.list.length == 0) {\n';
		ret+= '\t\t\t\teminwonDataList+= \'<tr><td colspan="7" class="nodata">게시글이 없습니다.</td></tr>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\teminwonDataList+= \'</tbody>\';\n';
		ret+= '\t\t\teminwonDataList+= \'</table>\';\n';
		ret+= '\t\t\t$(\'.eminwonList\').html(eminwonDataList);\n';
		ret+= '\t\t\t$(\'.eminwonSearch-info\').html(\'전체게시물 : \'+numberWithCommas(data.totalCnt)+\'개, 페이지 : \'+numberWithCommas(data.page)+\'/\'+numberWithCommas(data.pageCnt)+\'\');\n';
		ret+= '\t\t\tpagination(\'eminwonWrap\', data.page, data.pageCnt, data.totalCnt);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 고시공고/입법예고 뷰\n';
		ret+= 'function eminwonView() {\n';
		ret+= '\tvar eminwonDs = \'\';\n';
		ret+= '\tvar eminwonDetail = \'\';\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getEminwon.do\', $(\'#eminwonForm\').serialize()).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar data = data.dataArr;\n';
		ret+= '\t\t\t// 리스트, 검색, 페이징 숨기기\n';
		ret+= '\t\t\t$(\'.eminwonSearch\').hide();\n';
		ret+= '\t\t\t$(\'.eminwonList\').hide();\n';
		ret+= '\t\t\t$(\'.pagination\').hide();\n';
		ret+= '\t\t\t// 뷰 표출\n';
		ret+= '\t\t\t$(\'.eminwonView\').show();\n';
		ret+= '\t\t\teminwonDs+= \'<table class="eminwonTable siiru-mb20">\';\n';
		ret+= '\t\t\teminwonDs+= \'<caption>고시공고/입법예고 상세내용</caption>\';\n';
		ret+= '\t\t\teminwonDs+= \'<colgroup>\';\n';
		ret+= '\t\t\teminwonDs+= \'<col style="width:10%" />\';\n';
		ret+= '\t\t\teminwonDs+= \'<col style="width:40%" />\';\n';
		ret+= '\t\t\teminwonDs+= \'<col style="width:10%" />\';\n';
		ret+= '\t\t\teminwonDs+= \'<col />\';\n';
		ret+= '\t\t\teminwonDs+= \'</colgroup>\';\n';
		ret+= '\t\t\teminwonDs+= \'<tbody>\';\n';
		ret+= '\t\t\teminwonDs+= \'<tr>\';\n';
		ret+= '\t\t\teminwonDs+= \'<th scope="row">고시공고구분</th>\';\n';
		ret+= '\t\t\teminwonDs+= \'<td class="siiru-tl">\'+$.trim(data.gosiSe)+\'</td>\';\n';
		ret+= '\t\t\teminwonDs+= \'<th scope="row">게재제호</th>\';\n';
		ret+= '\t\t\teminwonDs+= \'<td class="siiru-tl">\'+$.trim(data.pblictNo)+\'</td>\';\n';
		ret+= '\t\t\teminwonDs+= \'</tr>\';\n';
		ret+= '\t\t\teminwonDs+= \'<tr>\';\n';
		ret+= '\t\t\teminwonDs+= \'<th scope="row">고시공고번호</th>\';\n';
		ret+= '\t\t\teminwonDs+= \'<td class="siiru-tl">\'+$.trim(data.gosiNo)+\'</td>\';\n';
		ret+= '\t\t\teminwonDs+= \'<th scope="row">등록일</th>\';\n';
		ret+= '\t\t\teminwonDs+= \'<td class="siiru-tl">\'+$.trim(data.regDe)+\'</td>\';\n';
		ret+= '\t\t\teminwonDs+= \'</tr>\';\n';
		ret+= '\t\t\teminwonDs+= \'<tr>\';\n';
		ret+= '\t\t\teminwonDs+= \'<th scope="row">담당자/연락처</th>\';\n';
		ret+= '\t\t\teminwonDs+= \'<td class="siiru-tl">\'+$.trim(data.chrg)+\' / \'+$.trim(data.chrgTelno)+\'</td>\';\n';
		ret+= '\t\t\teminwonDs+= \'<th scope="row">담당부서</th>\';\n';
		ret+= '\t\t\teminwonDs+= \'<td class="siiru-tl">\'+$.trim(data.deptNm)+\'</td>\';\n';
		ret+= '\t\t\teminwonDs+= \'</tr>\';\n';
		ret+= '\t\t\teminwonDs+= \'<tr>\';\n';
		ret+= '\t\t\teminwonDs+= \'<th scope="row">제목</th>\';\n';
		ret+= '\t\t\teminwonDs+= \'<td colspan="3" class="siiru-tl">\'+$.trim(data.sj)+\'</td>\';\n';
		ret+= '\t\t\teminwonDs+= \'</tr>\';\n';
		ret+= '\t\t\teminwonDs+= \'<tr>\';\n';
		ret+= '\t\t\teminwonDs+= \'<th scope="row">첨부파일</th>\';\n';
		ret+= '\t\t\teminwonDs+= \'<td colspan="3" class="siiru-tl">\';\n';
		ret+= '\t\t\tif (data.fileList.length > 0) {\n';
		ret+= '\t\t\t\teminwonDs+= \'<ul>\';\n';
		ret+= '\t\t\t\t$.each(data.fileList, function(fKey, fValues) {\n';
		ret+= '\t\t\t\t\teminwonDs+= \'<li><a href="\'+$.trim(fValues.fileHref)+\'" class="down">\'+$.trim(fValues.fileNm)+\'</a>\';\n';
		ret+= '\t\t\t\t\t// 첨부파일 미리보기\n';
		ret+= '\t\t\t\t\tif ($.trim(fValues.filePreview) == \'Y\') {\n';
		ret+= '\t\t\t\t\t\teminwonDs+= \' <a href="\'+$.trim(fValues.filePreviewHref)+\'" class="siiru-btn siiru-btn-small siiru-btn-primary">첨부파일 미리보기</a>\';\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\teminwonDs+= \'</li>\';\n';
		ret+= '\t\t\t\t});\n';
		ret+= '\t\t\t\teminwonDs+= \'</ul>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\teminwonDs+= \'</td>\';\n';
		ret+= '\t\t\teminwonDs+= \'</tr>\';\n';
		ret+= '\t\t\teminwonDs+= \'</tbody>\';\n';
		ret+= '\t\t\teminwonDs+= \'</table>\';\n';
		ret+= '\t\t\t$(\'.eminwonDs\').html(eminwonDs);\n';
		ret+= '\t\t\t// 상세내용\n';
		ret+= '\t\t\t$(\'.eminwonDetail\').html(\'<p>\'+$.trim(data.cn)+\'</p>\');\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 제안 카운터
	} else if (tp == 'mlrdCount') {
		ret = '<div class="mlrdInfo"></div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruMlrd, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruMlrd);\n';
		ret+= 'else window.onload = siiruMlrd;\n';
		ret+= 'function siiruMlrd() {\n';
		ret+= '\t$(\'.mlrdInfo\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getMlrdCount.do\', {\'siteId\':\'&#36;{siteInfo.siteId}\',\'action\':\'A:전체 or M:사용자\'}).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar mlrdInfo = \'\';\n';
		ret+= '\t\t\tmlrdInfo+= \'<ul>\';\n';
		ret+= '\t\t\tmlrdInfo+= \'<li>제안 : \'+numberWithCommas($.trim(data.dataArr.propseCnt))+\'</li>\';\n';
		ret+= '\t\t\tmlrdInfo+= \'<li>토론 : \'+numberWithCommas($.trim(data.dataArr.dscsnCnt))+\'</li>\';\n';
		ret+= '\t\t\tmlrdInfo+= \'<li>투표 : \'+numberWithCommas($.trim(data.dataArr.voteCnt))+\'</li>\';\n';
		ret+= '\t\t\tmlrdInfo+= \'<li>실행 : \'+numberWithCommas($.trim(data.dataArr.reflctCnt))+\'</li>\';\n';
		ret+= '\t\t\tmlrdInfo+= \'<li>미채택 : \'+numberWithCommas($.trim(data.dataArr.unchoiceCnt))+\'</li>\';\n';
		ret+= '\t\t\tmlrdInfo+= \'<li>공감 : \'+numberWithCommas($.trim(data.dataArr.empthPrtcpntCnt))+\'</li>\';\n';
		ret+= '\t\t\tmlrdInfo+= \'<li>투표 : \'+numberWithCommas($.trim(data.dataArr.votePrtcpntCnt))+\'</li>\';\n';
		ret+= '\t\t\tmlrdInfo+= \'<li>토론댓글 : \'+numberWithCommas($.trim(data.dataArr.comtDscsnCnt))+\'</li>\';\n';
		ret+= '\t\t\tmlrdInfo+= \'</ul>\';\n';
		ret+= '\t\t\t$(\'.mlrdInfo\').html(mlrdInfo);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 제안 공감베스트
	} else if (tp == 'mlrdLatest') {
		ret = '<div class="mlrdLatest"></div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruMlrd, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruMlrd);\n';
		ret+= 'else window.onload = siiruMlrd;\n';
		ret+= 'function siiruMlrd() {\n';
		ret+= '\t$(\'.mlrdLatest\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getMlrdLatest.do\', {\'siteId\':\'&#36;{siteInfo.siteId}\',\'mlrdTp\':\'여러건은 파이프(|)로 구분. [P:제안, D:토론, V:투표, R:반영, N:미채택 제안]\',\'empthCnt\':5,\'recordCnt\':5,\'searchCtgry\':\'분야검색\'}).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar latestList = \'\';\n';
		ret+= '\t\t\tvar crtfcNm = \'\';\n';
		ret+= '\t\t\tvar mlrdInfo = \'\';\n';
		ret+= '\t\t\tlatestList+= \'<ul class="latestList">\';\n';
		ret+= '\t\t\tif (data.dataArr.length > 0) {\n';
		ret+= '\t\t\t\t$.each(data.dataArr, function(key, values) {\n';
		ret+= '\t\t\t\t\tcrtfcNm = \'[\';\n';
		ret+= '\t\t\t\t\tif ($.trim(values.crtfcIcon) == \'N\') crtfcNm = \'[Naver, \';\n';
		ret+= '\t\t\t\t\tif ($.trim(values.crtfcIcon) == \'K\') crtfcNm = \'[Kakao, \';\n';
		ret+= '\t\t\t\t\tif ($.trim(values.crtfcIcon) == \'F\') crtfcNm = \'[Facebook, \';\n';
		ret+= '\t\t\t\t\tif ($.trim(values.crtfcIcon) == \'T\') crtfcNm = \'[Twitter, \';\n';
		ret+= '\t\t\t\t\tif ($.trim(values.crtfcIcon) == \'G\') crtfcNm = \'[Google, \';\n';
		ret+= '\t\t\t\t\tcrtfcNm+= $.trim(values.userNm)+\'] \';\n';
		ret+= '\t\t\t\t\tmlrdInfo+= \'[공감수 : \'+numberWithCommas($.trim(values.empthCnt))+\', 조회수 : \'+numberWithCommas($.trim(values.rdcnt))+\'] \';\n';
		ret+= '\t\t\t\t\tlatestList+= \'<li>\';\n';
		ret+= '\t\t\t\t\tlatestList+= \'<a href="\'+$.trim(values.href)+\'">[\'+$.trim(values.ctgryNm)+\'] \'+$.trim(values.mlrdSj)+\'</a> \'+crtfcNm+mlrdInfo;\n';
		ret+= '\t\t\t\t\tlatestList+= \'<span class="date">\'+$.trim(values.regDt)+\'</span>\';\n';
		ret+= '\t\t\t\t\tlatestList+= \'</li>\';\n';
		ret+= '\t\t\t\t});\n';
		ret+= '\t\t\t} else {\n';
		ret+= '\t\t\t\tlatestList+= \'<li>제안글이 존재하지 않습니다.</li>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\tlatestList+= \'</ul>\';\n';
		ret+= '\t\t\t$(\'.mlrdLatest\').html(latestList);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 제안 자신이 작성한글
	} else if (tp == 'mlrdMyList') {
		ret = '<div class="siiruMlrd-listLayer">\n';
		ret+= '\t<div class="siiruMlrd-list">\n';
		ret+= '\t\t<form id="mlrdForm" name="mlrdForm" method="post">\n';
		ret+= '\t\t<input type="hidden" name="siteId" value="&#36;{siteInfo.siteId}">\n';
		ret+= '\t\t<input type="hidden" name="action" value="MD:토론댓글, ME:공감, MV:투표, P:제안/토론/투표/실행/미채택">\n';
		ret+= '\t\t<input type="hidden" name="mlrdTp" value="여러건은 파이프(|)로 구분. [P:제안, D:토론, V:투표, R:반영, N:미채택 제안]">\n';
		ret+= '\t\t<input type="hidden" name="recordCnt" value="10">\n';
		ret+= '\t\t<input type="hidden" name="movePage" value="1">\n';
		ret+= '\t\t</form>\n';
		ret+= '\t\t<div class="siiruMlrdList-head">\n';
		ret+= '\t\t\t<p class="num">번호</p>\n';
		ret+= '\t\t\t<p class="category">분야</p>\n';
		ret+= '\t\t\t<p class="subject">제목</p>\n';
		ret+= '\t\t\t<p class="writer">작성자</p>\n';
		ret+= '\t\t\t<p class="date">등록일</p>\n';
		ret+= '\t\t\t<p class="hit">조회</p>\n';
		ret+= '\t\t\t<p class="empth">공감</p>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t\t<div class="siiruMlrdList-body"></div>\n';
		ret+= '\t</div>\n';
		ret+= '\t<div id="siiruMlrd-page"><div class="pagination"></div></div>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruMlrd, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruMlrd);\n';
		ret+= 'else window.onload = siiruMlrd;\n';
		ret+= 'function siiruMlrd() {\n';
		ret+= '\tmlrdList();\n';
		ret+= '\t// 페이징 버튼\n';
		ret+= '\t$(\'.pagination\').on(\'click\', \'li a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#mlrdForm\').find(\'input[name="movePage"]\').val($(this).data(\'move\'));\n';
		ret+= '\t\tmlrdList();\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 자신이 작성한 글 리스트\n';
		ret+= 'function mlrdList() {\n';
		ret+= '\t$(\'.siiruMlrdList-body\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getMlrdMyList.do\', $(\'#mlrdForm\').serialize()).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar listData = \'\';\n';
		ret+= '\t\t\tvar crtfcNm = \'\';\n';
		ret+= '\t\t\tvar propseNm = \'\';\n';
		ret+= '\t\t\tvar mlrdTp = \'\';\n';
		ret+= '\t\t\tvar comt = \'\';\n';
		ret+= '\t\t\t$.each(data.dataArr.mlrdList, function(key, values) {\n';
		ret+= '\t\t\t\tmlrdTp = \'\';\n';
		ret+= '\t\t\t\tif ($.trim(values.mlrdTp) == \'P\') {\n';
		ret+= '\t\t\t\t\tmlrdTp = \'제안\';\n';
		ret+= '\t\t\t\t} else if ($.trim(values.mlrdTp) == \'D\') {\n';
		ret+= '\t\t\t\t\tmlrdTp = \'토론\';\n';
		ret+= '\t\t\t\t} else if ($.trim(values.mlrdTp) == \'V\') {\n';
		ret+= '\t\t\t\t\tmlrdTp = \'투표\';\n';
		ret+= '\t\t\t\t} else if ($.trim(values.mlrdTp) == \'R\') {\n';
		ret+= '\t\t\t\t\tmlrdTp = \'반영\';\n';
		ret+= '\t\t\t\t} else if ($.trim(values.mlrdTp) == \'N\') {\n';
		ret+= '\t\t\t\t\tmlrdTp = \'미 채택제안\';\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t\tcrtfcNm = \'\';\n';
		ret+= '\t\t\t\tif ($.trim(values.crtfcIcon) == \'N\') crtfcNm = \'Naver\';\n';
		ret+= '\t\t\t\tif ($.trim(values.crtfcIcon) == \'K\') crtfcNm = \'Kakao\';\n';
		ret+= '\t\t\t\tif ($.trim(values.crtfcIcon) == \'F\') crtfcNm = \'Facebook\';\n';
		ret+= '\t\t\t\tif ($.trim(values.crtfcIcon) == \'T\') crtfcNm = \'Twitter\';\n';
		ret+= '\t\t\t\tif ($.trim(values.crtfcIcon) == \'G\') crtfcNm = \'Google\';\n';
		ret+= '\t\t\t\tpropseNm = \'\';\n';
		ret+= '\t\t\t\tif ($.trim(values.propseAt) == \'N\') propseNm = \'<span class="text-danger">[게시 대기]</span> \';\n';
		ret+= '\t\t\t\t// 댓글\n';
		ret+= '\t\t\t\tif ($.trim($(\'#mlrdForm\').find(\'input[name="action"]\').val()) == \'MD\') {\n';
		ret+= '\t\t\t\t\tcomt = \'<br>[\'+$.trim(values.comtFragnNm)+\'] \'+$.trim(values.comtCn)+\' [\'+$.trim(values.comtRegDt)+\']\';\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t\tlistData+= \'<div class="listBody-row">\';\n';
		ret+= '\t\t\t\tlistData+= \'<p class="num">\'+$.trim(values.sn)+\'</p>\';\n';
		ret+= '\t\t\t\tlistData+= \'<p class="category">\'+$.trim(values.ctgryNm)+\'</p>\';\n';
		ret+= '\t\t\t\tlistData+= \'<p class="subject"><a href="\'+$.trim(values.href)+\'">\'+propseNm+\'[\'+mlrdTp+\'] \'+$.trim(values.mlrdSj)+\'</a>\'+comt+\'</p>\';\n';
		ret+= '\t\t\t\tlistData+= \'<p class="writer"><span class="userProfile userProfileG">\'+$.trim(values.userNm)+\'</span></p>\';\n';
		ret+= '\t\t\t\tlistData+= \'<p class="date">\'+$.trim(values.regDt)+\'</p>\';\n';
		ret+= '\t\t\t\tlistData+= \'<p class="hit">\'+numberWithCommas($.trim(values.rdcnt))+\'</p>\';\n';
		ret+= '\t\t\t\tlistData+= \'<p class="empth">\'+numberWithCommas($.trim(values.empthCnt))+\'</p>\';\n';
		ret+= '\t\t\t\tlistData+= \'</div>\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\tif (data.dataArr.totalCnt == 0) {\n';
		ret+= '\t\t\t\tlistData+= \'<p class="nodata">작성하신 제안 데이터가 없습니다.</p>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\t$(\'.siiruMlrdList-body\').children(\'p.loading\').remove(\'\');\n';
		ret+= '\t\t\t$(\'.siiruMlrdList-body\').html(listData);\n';
		ret+= '\t\t\t// 페이징 표출 [페이징표출 레이어ID, 페이지 번호, 전체 페이지수, 전체 개수]\n';
		ret+= '\t\t\tpagination(\'siiruMlrd-page\', data.dataArr.page, data.dataArr.pageCnt, data.dataArr.totalCnt);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 일정 [메인]
	} else if (tp == 'schdulMain') {
		ret = '<div>\n';
		$.each(ctgryCdSList, function(key, values) {
			ret+= '\t<p>[현재 월 기준] &#36;{fn:substring(schdulInfo.month,0,4)}년 &#36;{fn:substring(schdulInfo.month,5,7)}월 (&#36;{schdulInfo.'+$.trim(values)+'.ctgryNm})</p>\n';
			ret+= '&lt;c:if test="&#36;{not empty schdulInfo.'+$.trim(values)+'.list and fn:length(schdulInfo.'+$.trim(values)+'.list) > 0}">\n';
			ret+= '\t<ul>\n';
			ret+= '\t&lt;c:forEach var="s" items="&#36;{schdulInfo.'+$.trim(values)+'.list}">\n';
			ret+= '\t\t<li><span>&lt;c:choose>&lt;c:when test="&#36;{s.inmon eq \'Y\'}">월중&lt;/c:when>&lt;c:otherwise>&#36;{s.term}&lt;/c:otherwise>&lt;/c:choose></span> [&#36;{s.place}] &#36;{s.sj}<br>&#36;{s.schdulCn}</li>\n';
			ret+= '\t&lt;/c:forEach>\n';
			ret+= '\t</ul>\n';
			ret+= '&lt;/c:if>\n';
			ret+= '\t<p>[이번주 기준] &#36;{schdulInfo.weekSun} ~ &#36;{schdulInfo.weekSat} (&#36;{schdulInfo.'+$.trim(values)+'.ctgryNm})</p>\n';
			ret+= '&lt;c:if test="&#36;{not empty schdulInfo.'+$.trim(values)+'.weekList and fn:length(schdulInfo.'+$.trim(values)+'.weekList) > 0}">\n';
			ret+= '\t<ul>\n';
			ret+= '\t&lt;c:forEach var="s" items="&#36;{schdulInfo.'+$.trim(values)+'.weekList}">\n';
			ret+= '\t\t<li><span>&lt;c:choose>&lt;c:when test="&#36;{s.inmon eq \'Y\'}">월중&lt;/c:when>&lt;c:otherwise>&#36;{s.term}&lt;/c:otherwise>&lt;/c:choose></span> [&#36;{s.place}] &#36;{s.sj}<br>&#36;{s.schdulCn}</li>\n';
			ret+= '\t&lt;/c:forEach>\n';
			ret+= '\t</ul>\n';
			ret+= '&lt;/c:if>\n';
			ret+= '\t<p>[오늘 기준] &#36;{schdulInfo.toDay} &#36;{schdulInfo.toDayWeek} (&#36;{schdulInfo.'+$.trim(values)+'.ctgryNm})</p>\n';
			ret+= '&lt;c:if test="&#36;{not empty schdulInfo.'+$.trim(values)+'.dayList and fn:length(schdulInfo.'+$.trim(values)+'.dayList) > 0}">\n';
			ret+= '\t<ul>\n';
			ret+= '\t&lt;c:forEach var="s" items="&#36;{schdulInfo.'+$.trim(values)+'.dayList}">\n';
			ret+= '\t\t<li><span>&lt;c:choose>&lt;c:when test="&#36;{s.inmon eq \'Y\'}">월중&lt;/c:when>&lt;c:otherwise>&#36;{s.term}&lt;/c:otherwise>&lt;/c:choose></span> [&#36;{s.place}] &#36;{s.sj}<br>&#36;{s.schdulCn}</li>\n';
			ret+= '\t&lt;/c:forEach>\n';
			ret+= '\t</ul>\n';
			ret+= '&lt;/c:if>\n';
		});
		ret+= '</div>\n';
	// 일정 [서브]
	} else if (tp == 'schdul') {
		ret = '<div class="siiru-schdulwrap">\n';
		ret+= '\t<div class="schdul-select">\n';
		ret+= '\t\t<a href="#" class="schdul-prev"></a>\n';
		ret+= '\t\t<p class="schdul-year"></p>\n';
		ret+= '\t\t<a href="#" class="schdul-next"></a>\n';
		ret+= '\t</div>\n';
		ret+= '\t<div class="schdul-calendar"></div>\n';
		ret+= '\t<div class="schdul-result"></div>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruSchdul, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruSchdul);\n';
		ret+= 'else window.onload = siiruSchdul;\n';
		ret+= 'function siiruSchdul() {\n';
		ret+= '\t// 현재년도\n';
		ret+= '\tmoment.locale(\'ko\');\n';
		ret+= '\tvar year = moment();\n';
		ret+= '\tvar startDate = moment().set({\'year\':year.get(\'year\'), \'month\':0, \'date\':1});\n';
		ret+= '\tvar endDate = moment().set({\'year\':year.get(\'year\'), \'month\':11, \'date\':31});\n';
		ret+= '\t$(\'.schdul-year\').text(year.format(\'YYYY\'));\n';
		ret+= '\t// rangeCalendar 셋팅\n';
		ret+= '\tvar rangeCalendar = $(\'.schdul-calendar\').rangeCalendar({\n';
		ret+= '\t\tstartDate: startDate,\n';
		ret+= '\t\tendDate: endDate,\n';
		ret+= '\t\tchangeRangeCallback: rangeChanged\n';
		ret+= '\t});\n';
		ret+= '\trangeCalendar.setStartDate(year);\n';
		ret+= '\t// 이전년도\n';
		ret+= '\t$(\'.schdul-prev\').click(function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\tyear.add(-1, \'years\');\n';
		ret+= '\t\tstartDate.add(-1, \'years\');\n';
		ret+= '\t\tendDate.add(-1, \'years\');\n';
		ret+= '\t\t$(\'.schdul-year\').html(year.format(\'YYYY\'));\n';
		ret+= '\t\trangeCalendar.update(startDate, endDate);\n';
		ret+= '\t});\n';
		ret+= '\t// 다음년도\n';
		ret+= '\t$(\'.schdul-next\').click(function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\tyear.add(1, \'years\');\n';
		ret+= '\t\tstartDate.add(1, \'years\');\n';
		ret+= '\t\tendDate.add(1, \'years\');\n';
		ret+= '\t\t$(\'.schdul-year\').html(year.format(\'YYYY\'));\n';
		ret+= '\t\trangeCalendar.update(startDate, endDate);\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= 'function rangeChanged(target, range) {\n';
		ret+= '\t$(\'.schdul-result\').html(\'\');\n';
		ret+= '\tvar schdulSDt = moment(range.start).format(\'YYYY-MM-DD\');\n';
		ret+= '\tvar schdulEDt = moment(range.end).format(\'YYYY-MM-DD\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getSchdul.do\', {\'siteId\':\'&#36;{siteInfo.siteId}\',\'schdulCtgry\':\''+$.trim(ctgryCdS)+'\',\'schdulSDt\':schdulSDt,\'schdulEDt\':schdulEDt}).done(function(data) {\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar schdulData = \'\';\n';
		ret+= '\t\t\tvar term = \'\';\n';
		ret+= '\t\t\tvar liClass = \'\';\n';
		ret+= '\t\t\tschdulData+= \'<li class="result-date">\'+schdulSDt+\' ~ \'+schdulEDt+\'</li>\';\n';
		ret+= '\t\t\t$.each(data.dataArr, function(key, value) {\n';
		ret+= '\t\t\t\tliClass = \'\';\n';
		ret+= '\t\t\t\t// 공휴일 유무\n';
		ret+= '\t\t\t\tif ($.trim(value.hldy) == \'Y\') liClass = \' class="result-red"\';\n';
		ret+= '\t\t\t\t// 이벤트 유무\n';
		ret+= '\t\t\t\tif ($.trim(value.event) == \'Y\') liClass = \' class="result-blue"\';\n';
		ret+= '\t\t\t\t// 월중 유무\n';
		ret+= '\t\t\t\tif ($.trim(value.inmon) == \'Y\') {\n';
		ret+= '\t\t\t\t\tterm = \'월중\';\n';
		ret+= '\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\tterm = $.trim(value.term);\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t\tschdulData+= \'<li\'+liClass+\'>\';\n';
		ret+= '\t\t\t\tschdulData+= \'<dl>\';\n';
		ret+= '\t\t\t\tschdulData+= \'<dt>\'+term+\'</dt>\';\n';
		ret+= '\t\t\t\tschdulData+= \'<dd>\';\n';
		ret+= '\t\t\t\tif ($.trim(value.place) != \'\') schdulData+= \'[\'+$.trim(value.place)+\'] \';\n';
		ret+= '\t\t\t\tschdulData+= $.trim(value.sj);\n';
		ret+= '\t\t\t\tschdulData+= \'<p class="result-well">\';\n';
		ret+= '\t\t\t\tif ($.trim(value.chrgDept) != \'\') schdulData+= \'담당부서 : \'+$.trim(value.chrgDept)+\'<br>\';\n';
		ret+= '\t\t\t\tif ($.trim(value.chrgTelno) != \'\') schdulData+= \'전화번호 : \'+$.trim(value.chrgTelno)+\'<br>\';\n';
		ret+= '\t\t\t\tif ($.trim(value.rm1) != \'\') schdulData+= \'비고1 : \'+$.trim(value.rm1)+\'<br>\';\n';
		ret+= '\t\t\t\tif ($.trim(value.rm2) != \'\') schdulData+= \'비고2 : \'+$.trim(value.rm2)+\'<br>\';\n';
		ret+= '\t\t\t\tif ($.trim(value.rm3) != \'\') schdulData+= \'비고3 : \'+$.trim(value.rm3)+\'<br>\';\n';
		ret+= '\t\t\t\tif ($.trim(value.rm4) != \'\') schdulData+= \'비고4 : \'+$.trim(value.rm4)+\'<br>\';\n';
		ret+= '\t\t\t\tif ($.trim(value.rm5) != \'\') schdulData+= \'비고5 : \'+$.trim(value.rm5)+\'<br>\';\n';
		ret+= '\t\t\t\tif ($.trim(value.schdulCn) != \'\') schdulData+= $.trim(value.schdulCn);\n';
		ret+= '\t\t\t\tschdulData+= \'</p>\';\n';
		ret+= '\t\t\t\tschdulData+= \'</dd>\';\n';
		ret+= '\t\t\t\tschdulData+= \'</dl>\';\n';
		ret+= '\t\t\t\tschdulData+= \'</li>\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\tif (data.dataArr.length == 0) {\n';
		ret+= '\t\t\t\tschdulData+= \'<li class="nodata">일정이 없습니다.</li>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\t$(\'.schdul-result\').html(\'<ul>\'+schdulData+\'</ul>\');\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 설문조사
	} else if (tp == 'qustnr') {
		ret = '<div class="siiru-qustnrwrap">\n';
		ret+= '\t<form id="qustnrForm" name="qustnrForm" method="post">\n';
		ret+= '\t<input type="hidden" name="siteId" value="&#36;{siteInfo.siteId}">\n';
		ret+= '\t<input type="hidden" name="sn" value="">\n';
		ret+= '\t<input type="hidden" name="qustnrCtgry" value="">\n';
		ret+= '\t<input type="hidden" name="recordCnt" value="10">\n';
		ret+= '\t<input type="hidden" name="movePage" value="1">\n';
		ret+= '\t<input type="hidden" name="redirect" value="&#36;{pathInfo.sContext}contentsView.do?pageId=&#36;{siteInfo.pageId}" />\n';
		ret+= '\t<div class="qustnrSearch">\n';
		ret+= '\t\t<div class="qustnrSearch-box">\n';
		ret+= '\t\t\t<input type="text" name="qustnrQuery" value="&#36;{param.qustnrQuery}" title="검색어" placeholder="검색어를 입력하세요">\n';
		ret+= '\t\t</div>\n';
		ret+= '\t\t<button type="submit" id="qustnrSearchBtn" title="검색"></button>\n';
		ret+= '\t</div>\n';
		ret+= '\t</form>\n';
		ret+= '\t<section id="qustnrWrap">\n';
		ret+= '\t\t<div class="qustnrList"></div>\n';
		ret+= '\t\t<div class="pagination"></div>\n';
		ret+= '\t\t<div class="qustnrView">\n';
		ret+= '\t\t\t<div class="qustnrDs"></div>\n';
		ret+= '\t\t\t<form id="qustnrAnswerForm" name="qustnrAnswerForm" method="post">\n';
		ret+= '\t\t\t<div class="qustnrLayer"></div>\n';
		ret+= '\t\t\t<div class="siiru-btnSet siiru-tc"></div>\n';
		ret+= '\t\t\t</form>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t</section>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruQustnr, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruQustnr);\n';
		ret+= 'else window.onload = siiruQustnr;\n';
		ret+= 'function siiruQustnr() {\n';
		ret+= '\tqustnrList();\n';
		ret+= '\t// 설문 링크\n';
		ret+= '\t$(\'.qustnrList\').on(\'click\', \'tbody a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#qustnrForm\').find(\'input[name="sn"]\').val($(this).data(\'sn\'));\n';
		ret+= '\t\tqustnrView();\n';
		ret+= '\t});\n';
		ret+= '\t// 페이징 버튼\n';
		ret+= '\t$(\'.pagination\').on(\'click\', \'li a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#qustnrForm\').find(\'input[name="movePage"]\').val($(this).data(\'move\'));\n';
		ret+= '\t\tqustnrList();\n';
		ret+= '\t});\n';
		ret+= '\t// 검색버튼\n';
		ret+= '\t$(\'#qustnrSearchBtn\').click(function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t// 페이지 번호 초기화\n';
		ret+= '\t\t$(\'#qustnrForm\').find(\'input[name="movePage"]\').val(\'1\');\n';
		ret+= '\t\tqustnrList();\n';
		ret+= '\t});\n';
		ret+= '\t// 설문 취소\n';
		ret+= '\t$(\'.qustnrView\').on(\'click\', \'.qustnrListBtn\', function(e) {\n';
		ret+= '\t\tqustnrList();\n';
		ret+= '\t});\n';
		ret+= '\t// 설문 확인\n';
		ret+= '\t$(\'.qustnrView\').on(\'click\', \'.qustnrBtn\', function(e) {\n';
		ret+= '\t\tvar formErr = false;\n';
		ret+= '\t\tvar alertMsg = \'\';\n';
		ret+= '\t\tvar moveFocus = \'\';\n';
		ret+= '\t\tvar focusDL = \'\';\n';
		ret+= '\t\tvar qustnrNUM = \'\';\n';
		ret+= '\t\tvar $answerDS;\n';
		ret+= '\t\t$(\'#qustnrAnswerForm\').find(\'dl\').each(function(key, value) {\n';
		ret+= '\t\t\tfocusDL = $(this).attr(\'id\');\n';
		ret+= '\t\t\tqustnrNUM = $(this).find(\'span.num\').text();\n';
		ret+= '\t\t\t// 필수체크\n';
		ret+= '\t\t\tif ($(this).find(\'input[name="reqrdAt[]"]\').val() == \'Y\') {\n';
		ret+= '\t\t\t\tif ($(this).find(\'input[name="qustnrTp[]"]\').val() == \'S\') {\n';
		ret+= '\t\t\t\t\tif ($(this).find(\'input[name="answerCn[]"]\').val() == \'\') {\n';
		ret+= '\t\t\t\t\t\talertMsg+= qustnrNUM+\'번 설문항목을 입력해 주세요.\\n\';\n';
		ret+= '\t\t\t\t\t\tformErr = true;\n';
		ret+= '\t\t\t\t\t\tif (moveFocus == \'\') moveFocus = focusDL;\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t} else if ($(this).find(\'input[name="qustnrTp[]"]\').val() == \'M\') {\n';
		ret+= '\t\t\t\t\tif ($(this).find(\'textarea[name="answerCn[]"]\').val() == \'\') {\n';
		ret+= '\t\t\t\t\t\talertMsg+= qustnrNUM+\'번 설문항목을 입력해 주세요.\\n\';\n';
		ret+= '\t\t\t\t\t\tformErr = true;\n';
		ret+= '\t\t\t\t\t\tif (moveFocus == \'\') moveFocus = focusDL;\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\tif ($(this).find(\'input[name="iemSn[]"]\').val() == \'\') {\n';
		ret+= '\t\t\t\t\t\talertMsg+= qustnrNUM+\'번 설문항목을 선택해 주세요.\\n\';\n';
		ret+= '\t\t\t\t\t\tformErr = true;\n';
		ret+= '\t\t\t\t\t\tif (moveFocus == \'\') moveFocus = focusDL;\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\t// 복수응답 체크\n';
		ret+= '\t\t\tif ($(this).find(\'input[name="qustnrSe[]"]\').val() == \'C\') {\n';
		ret+= '\t\t\t\tif (($(this).find(\'input[name="qustnrTp[]"]\').val() == \'L\') || ($(this).find(\'input[name="qustnrTp[]"]\').val() == \'T\')) {\n';
		ret+= '\t\t\t\t\tif ($(this).find(\'input[name="answerCnt[]"]\').val() < $(this).find(\'input:checkbox:checked\').length) {\n';
		ret+= '\t\t\t\t\t\talertMsg+= qustnrNUM+\'번 설문항목의 복수응답 개수를 초과했습니다.\\n\';\n';
		ret+= '\t\t\t\t\t\tformErr = true;\n';
		ret+= '\t\t\t\t\t\tif (moveFocus == \'\') moveFocus = focusDL;\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\t// 체크안되어 있을 경우 마지막 라인 응답 내용 제거\n';
		ret+= '\t\t\tif ($(this).find(\'input[name="qustnrTp[]"]\').val() == \'T\') {\n';
		ret+= '\t\t\t\t$answerDS = $(this).find(\'input[name="answerCn[]"]\');\n';
		ret+= '\t\t\t\tif ($answerDS.val() != \'\') {\n';
		ret+= '\t\t\t\t\tif ($answerDS.closest(\'li\').find(\'input:checked\').length == 0) {\n';
		ret+= '\t\t\t\t\t\t$answerDS.val(\'\');\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t});\n';
		ret+= '\t\t// 오류위치로 포커스 이동\n';
		ret+= '\t\tif ((formErr) && (moveFocus != \'\')) {\n';
		ret+= '\t\t\t$(\'html,body\').animate({scrollTop:$(\'#\'+moveFocus).offset().top},0);\n';
		ret+= '\t\t}\n';
		ret+= '\t\tif (!formErr) {\n';
		ret+= '\t\t\tif (confirm(\'설문에 참여하시겠습니까?\')) {\n';
		ret+= '\t\t\t\tvar formData = $(\'#qustnrAnswerForm\').serialize()+\'&action=I\';\n';
		ret+= '\t\t\t\tformData+= \'&siteId=\'+$(\'#qustnrForm\').find(\'input[name="siteId"]\').val()+\'&sn=\'+$(\'#qustnrForm\').find(\'input[name="sn"]\').val();\n';
		ret+= '\t\t\t\t$.post(\'&#36;{pathInfo.context}setQustnrAnswer.do\', formData).done(function(data) {\n';
		ret+= '\t\t\t\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\t\t\t\talert(\'성공적으로 설문에 참여하셨습니다.\');\n';
		ret+= '\t\t\t\t\t\tqustnrList();\n';
		ret+= '\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t});\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(alertMsg);\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '\t// 설문 선택\n';
		ret+= '\t$(\'.qustnrLayer\').on(\'click\', \'.qustnrSelect\', function(e) {\n';
		ret+= '\t\t// 라디오\n';
		ret+= '\t\tif ($(this).data(\'qustnrse\') == \'R\') {\n';
		ret+= '\t\t\t$(this).closest(\'dl\').find(\'input[name="iemSn[]"]\').val($(this).val());\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\tvar checked = \'\';\n';
		ret+= '\t\t\t$(this).closest(\'ul\').find(\'input:checkbox:checked\').each(function() {\n';
		ret+= '\t\t\t\tchecked+= $(this).val()+\',\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\tchecked = checked.substr(0, checked.length-1);\n';
		ret+= '\t\t\t$(this).closest(\'dl\').find(\'input[name="iemSn[]"]\').val(checked);\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 설문조사 리스트\n';
		ret+= 'function qustnrList() {\n';
		ret+= '\t$(\'.qustnrSearch\').show();\n';
		ret+= '\t$(\'.qustnrList\').show();\n';
		ret+= '\t$(\'.pagination\').show();\n';
		ret+= '\t$(\'.qustnrDs\').html(\'\');\n';
		ret+= '\t$(\'.qustnrLayer\').html(\'\');\n';
		ret+= '\t$(\'.siiru-btnSet\').html(\'\');\n';
		ret+= '\t$(\'.qustnrView\').hide();\n';
		ret+= '\tvar qustnrList = \'\';\n';
		ret+= '\t$(\'.qustnrList\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getQustnrList.do\', $(\'#qustnrForm\').serialize()).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar data = data.dataArr;\n';
		ret+= '\t\t\tvar sj = \'\';\n';
		ret+= '\t\t\tqustnrList+= \'<table class="qustnrTable siiru-mb20">\';\n';
		ret+= '\t\t\tqustnrList+= \'<caption>설문조사 목록</caption>\';\n';
		ret+= '\t\t\tqustnrList+= \'<colgroup>\';\n';
		ret+= '\t\t\tqustnrList+= \'<col />\';\n';
		ret+= '\t\t\tqustnrList+= \'<col style="width:30%" />\';\n';
		ret+= '\t\t\tqustnrList+= \'<col style="width:10%" />\';\n';
		ret+= '\t\t\tqustnrList+= \'</colgroup>\';\n';
		ret+= '\t\t\tqustnrList+= \'<thead>\';\n';
		ret+= '\t\t\tqustnrList+= \'<tr>\';\n';
		ret+= '\t\t\tqustnrList+= \'<th scope="col">제목</th>\';\n';
		ret+= '\t\t\tqustnrList+= \'<th scope="col">기간</th>\';\n';
		ret+= '\t\t\tqustnrList+= \'<th scope="col">상태</th>\';\n';
		ret+= '\t\t\tqustnrList+= \'</tr>\';\n';
		ret+= '\t\t\tqustnrList+= \'</thead>\';\n';
		ret+= '\t\t\tqustnrList+= \'<tbody>\';\n';
		ret+= '\t\t\t$.each(data.list, function(key, values) {\n';
		ret+= '\t\t\t\tsj = \'\';\n';
		ret+= '\t\t\t\tif ($.trim($(\'#qustnrForm\').find(\'input[name="qustnrCtgry"]\').val()) == \'\') sj+= \'[\'+$.trim(values.ctgryNm)+\'] \';\n';
		ret+= '\t\t\t\tsj+= $.trim(values.sj);\n';
		ret+= '\t\t\t\tqustnrList+= \'<tr>\';\n';
		ret+= '\t\t\t\tqustnrList+= \'<th scope="row" class="siiru-tl"><a href="#" data-sn="\'+$.trim(values.sn)+\'">\'+sj+\'</a></th>\';\n';
		ret+= '\t\t\t\tqustnrList+= \'<td>\'+$.trim(values.termDt)+\'</td>\';\n';
		ret+= '\t\t\t\tqustnrList+= \'<td>\'+$.trim(values.statusNm)+\'</td>\';\n';
		ret+= '\t\t\t\tqustnrList+= \'</tr>\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\tif (data.list.length == 0) {\n';
		ret+= '\t\t\t\tqustnrList+= \'<tr><td colspan="3" class="nodata">설문이 없습니다.</td></tr>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\tqustnrList+= \'</tbody>\';\n';
		ret+= '\t\t\tqustnrList+= \'</table>\';\n';
		ret+= '\t\t\t$(\'.qustnrList\').html(qustnrList);\n';
		ret+= '\t\t\tpagination(\'qustnrWrap\', data.page, data.pageCnt, data.totalCnt);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 설문조사 뷰\n';
		ret+= 'function qustnrView() {\n';
		ret+= '\tvar qustnrDs = \'\';\n';
		ret+= '\tvar qustnrLayer = \'\';\n';
		ret+= '\tvar qustnrBtn = \'\';\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getQustnrData.do\', $(\'#qustnrForm\').serialize()).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar data = data.dataArr;\n';
		ret+= '\t\t\t// 리스트, 페이징 숨기기\n';
		ret+= '\t\t\t$(\'.qustnrSearch\').hide();\n';
		ret+= '\t\t\t$(\'.qustnrList\').hide();\n';
		ret+= '\t\t\t$(\'.pagination\').hide();\n';
		ret+= '\t\t\t$(\'.qustnrView\').show();\n';
		ret+= '\t\t\t// 설문정보 표출\n';
		ret+= '\t\t\tif ($.trim(data.ds) == \'\') {\n';
		ret+= '\t\t\t\tif ($.trim($(\'#qustnrForm\').find(\'input[name="qustnrCtgry"]\').val()) == \'\') qustnrDs+= \'[\'+$.trim(data.ctgryNm)+\'] \';\n';
		ret+= '\t\t\t\tqustnrDs+= $.trim(data.sj);\n';
		ret+= '\t\t\t} else {\n';
		ret+= '\t\t\t\tqustnrDs+= $.trim(data.ds);\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\t$(\'.qustnrDs\').html(qustnrDs);\n';
		ret+= '\t\t\t// 설문항목\n';
		ret+= '\t\t\t$.each(data.qustnrList, function(key, values) {\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<dl id="itemList\'+$.trim(values.qustnrSn)+\'">\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<dt>\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<input type="hidden" name="qustnrSn[]" value="\'+$.trim(values.qustnrSn)+\'">\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<input type="hidden" name="iemSn[]" value="">\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<input type="hidden" name="reqrdAt[]" value="\'+$.trim(values.reqrdAt)+\'">\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<input type="hidden" name="qustnrTp[]" value="\'+$.trim(values.qustnrTp)+\'">\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<input type="hidden" name="qustnrSe[]" value="\'+$.trim(values.qustnrSe)+\'">\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<input type="hidden" name="answerCnt[]" value="\'+$.trim(values.answerCnt)+\'">\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<p><span class="num">\'+$.trim(values.no)+\'</span> \'+$.trim(values.qustnrSj);\n';
		ret+= '\t\t\t\tif (($.trim(values.qustnrSe) == \'C\') && ($.trim(values.qustnrTp) == \'L\' || $.trim(values.qustnrTp) == \'T\')) {\n';
		ret+= '\t\t\t\t\tqustnrLayer+= \' (복수응답 : \'+numberWithCommas($.trim(values.answerCnt))+\'개)\';\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t\tqustnrLayer+= \'</p>\';\n';
		ret+= '\t\t\t\tif ($.trim(values.hderDs) != \'\') {\n';
		ret+= '\t\t\t\t\tqustnrLayer+= \'<div class="qustnr-well">\'+$.trim(values.hderDs)+\'</div>\';\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t\tqustnrLayer+= \'</dt>\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<dd>\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<ul>\';\n';
		ret+= '\t\t\t\t// Single Line 박스\n';
		ret+= '\t\t\t\tif ($.trim(values.qustnrTp) == \'S\') {\n';
		ret+= '\t\t\t\t\tqustnrLayer+= \'<li><input type="text" name="answerCn[]" class="single" value=""></li>\';\n';
		ret+= '\t\t\t\t// Multi Line 박스\n';
		ret+= '\t\t\t\t} else if ($.trim(values.qustnrTp) == \'M\') {\n';
		ret+= '\t\t\t\t\tqustnrLayer+= \'<li><textarea name="answerCn[]" rows="3"></textarea></li>\';\n';
		ret+= '\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t$.each(values.itemList, function(iKey, iValues) {\n';
		ret+= '\t\t\t\t\t\tqustnrLayer+= \'<li>\';\n';
		ret+= '\t\t\t\t\t\tif ($.trim(values.qustnrSe) == \'R\') {\n';
		ret+= '\t\t\t\t\t\t\tqustnrLayer+= \'<input type="radio" id="item\'+$.trim(values.qustnrSn)+\'_\'+$.trim(iValues.iemSn)+\'" class="qustnrSelect" data-qustnrse="R" name="item\'+$.trim(values.qustnrSn)+\'" value="\'+$.trim(iValues.iemSn)+\'">\';\n';
		ret+= '\t\t\t\t\t\t\tqustnrLayer+= \'<label for="item\'+$.trim(values.qustnrSn)+\'_\'+$.trim(iValues.iemSn)+\'"> \'+$.trim(iValues.iemCn)+\' </label>\';\n';
		ret+= '\t\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\t\tqustnrLayer+= \'<input type="checkbox" id="item\'+$.trim(values.qustnrSn)+\'_\'+$.trim(iValues.iemSn)+\'" class="qustnrSelect" data-qustnrse="C" name="item\'+$.trim(values.qustnrSn)+\'[]" value="\'+$.trim(iValues.iemSn)+\'">\';\n';
		ret+= '\t\t\t\t\t\t\tqustnrLayer+= \'<label for="item\'+$.trim(values.qustnrSn)+\'_\'+$.trim(iValues.iemSn)+\'"> \'+$.trim(iValues.iemCn)+\' </label>\';\n';
		ret+= '\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\tif (iKey == ($.trim(values.iemCnt) - 1)) {\n';
		ret+= '\t\t\t\t\t\t\tif ($.trim(values.qustnrTp) == \'T\') {\n';
		ret+= '\t\t\t\t\t\t\t\tqustnrLayer+= \'<input type="text" name="answerCn[]" value="">\';\n';
		ret+= '\t\t\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\t\t\tqustnrLayer+= \'<input type="hidden" name="answerCn[]" value="">\';\n';
		ret+= '\t\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\t\tqustnrLayer+= \'</li>\';\n';
		ret+= '\t\t\t\t\t});\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t\tqustnrLayer+= \'</ul>\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'</dd>\';\n';
		ret+= '\t\t\t\tqustnrLayer+= \'</dl>\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\tif (data.qustnrList.length == 0) {\n';
		ret+= '\t\t\t\tqustnrLayer+= \'<p class="nodata siiru-tc">설문항목이 존재하지 않습니다.</p>\';\n';
		ret+= '\t\t\t\tqustnrBtn+= \'<button type="button" class="qustnrListBtn siiru-btn">목록</button>\';\n';
		ret+= '\t\t\t} else {\n';
		ret+= '\t\t\t\tqustnrBtn+= \'<button type="button" class="qustnrBtn siiru-btn siiru-btn-primary">확인</button> \';\n';
		ret+= '\t\t\t\tqustnrBtn+= \'<button type="button" class="qustnrListBtn siiru-btn">취소</button>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\t$(\'.qustnrLayer\').html(qustnrLayer);\n';
		ret+= '\t\t\t// 버튼\n';
		ret+= '\t\t\t$(\'.siiru-btnSet\').html(qustnrBtn);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t\tif ($.trim(data.errTp) == \'L\') {\n';
		ret+= '\t\t\t\twindow.document.location.href = "&#36;{pathInfo.sContext}login.do?pageId=&redirect="+encodeURIComponent($.trim($(\'#qustnrForm\').find(\'input[name="redirect"]\').val()));\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 연혁
	} else if (tp == 'hist') {
		ret = '<div class="siiru-histwrap">\n';
		ret+= '\t<form id="histForm" name="histForm" method="post">\n';
		ret+= '\t<input type="hidden" name="histSYy" value="">\n';
		ret+= '\t<input type="hidden" name="histEYy" value="">\n';
		ret+= '\t</form>\n';
		ret+= '\t<section class="hist-result">\n';
		ret+= '\t</section>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruHist, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruHist);\n';
		ret+= 'else window.onload = siiruHist;\n';
		ret+= 'function siiruHist() {\n';
		ret+= '\t$(\'.hist-result\').html(\'<p class="loading"></p>\');\n';
		ret+= '\tvar innerData = \'\';\n';
		ret+= '\tvar formData = $(\'#histForm\').serialize()+\'&siteId=&#36;{siteInfo.siteId}\';\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getHist.do\', formData).done(function(data) {\n';
		ret+= '\t\t// 데이터 초기화\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar data = data.dataArr;\n';
		ret+= '\t\t\t$(\'.hist-result\').html(\'\');\n';
		ret+= '\t\t\tif (data.length == 0) {\n';
		ret+= '\t\t\t\t$(\'.hist-result\').html(\'<p class="nodata">연혁이 없습니다.</p>\');\n';
		ret+= '\t\t\t} else {\n';
		ret+= '\t\t\t\tvar histDe = \'\';\n';
		ret+= '\t\t\t\t$.each(data, function(key, values) {\n';
		ret+= '\t\t\t\t\tinnerData+= \'<dl>\';\n';
		ret+= '\t\t\t\t\tinnerData+= \'<dt>\'+$.trim(values.year)+\'</dt>\';\n';
		ret+= '\t\t\t\t\tinnerData+= \'<dd>\';\n';
		ret+= '\t\t\t\t\tinnerData+= \'<ul>\';\n';
		ret+= '\t\t\t\t\t$.each(values.list, function(lKey, lValues) {\n';
		ret+= '\t\t\t\t\t\thistDe = $.trim(lValues.histMm);\n';
		ret+= '\t\t\t\t\t\tif ($.trim(lValues.histDd) != \'\') histDe+= \'.\'+$.trim(lValues.histDd);\n';
		ret+= '\t\t\t\t\t\tinnerData+= \'<li>\';\n';
		ret+= '\t\t\t\t\t\tinnerData+= \'<span class="result-date">\'+histDe+\'</span>\';\n';
		ret+= '\t\t\t\t\t\tinnerData+= \'<span class="result-title">\'+$.trim(lValues.histDs)+\'</span>\';\n';
		ret+= '\t\t\t\t\t\tinnerData+= \'</li>\';\n';
		ret+= '\t\t\t\t\t});\n';
		ret+= '\t\t\t\t\tinnerData+= \'</ul>\';\n';
		ret+= '\t\t\t\t\tinnerData+= \'</dd>\';\n';
		ret+= '\t\t\t\t\tinnerData+= \'</dl>\';\n';
		ret+= '\t\t\t\t});\n';
		ret+= '\t\t\t\t$(\'.hist-result\').html(innerData);\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 포트폴리오
	} else if (tp == 'prtfolio') {
		ret = '<div class="siiru-prtfoliowrap">\n';
		ret+= '\t<form id="prtfolioForm" name="prtfolioForm" method="post">\n';
		ret+= '\t<input type="hidden" name="sn" value="">\n';
		ret+= '\t<input type="hidden" name="prtfolioCtgry" value="">\n';
		ret+= '\t<div class="prtfolioSearch">\n';
		ret+= '\t\t<div class="prtfolioSearch-ctgry">\n';
		ret+= '\t\t<c:if test="&#36;{not empty prtfolioCtgry and fn:length(prtfolioCtgry) > 0}">\n';
		ret+= '\t\t\t<ul class="prtfolioCtgryBtn">\n';
		ret+= '\t\t\t\t<li><a href="#" data-ctgry="">전체</a></li>\n';
		ret+= '\t\t\t<c:forEach var="ctgry" items="&#36;{prtfolioCtgry}">\n';
		ret+= '\t\t\t\t<li><a href="#" data-ctgry="&#36;{ctgry.ctgryId}">&#36;{ctgry.ctgryNm}</a></li>\n';
		ret+= '\t\t\t</c:forEach>\n';
		ret+= '\t\t\t</ul>\n';
		ret+= '\t\t</c:if>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t\t<div class="prtfolioSearch-box">\n';
		ret+= '\t\t\t<input type="text" name="prtfolioQuery" value="&#36;{param.prtfolioQuery}" title="검색어" placeholder="검색어를 입력하세요">\n';
		ret+= '\t\t\t<button type="submit" id="prtfolioSearchBtn">검색</button>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t</div>\n';
		ret+= '\t</form>\n';
		ret+= '\t<section id="prtfolioWrap">\n';
		ret+= '\t\t<div class="prtfolioList"></div>\n';
		ret+= '\t\t<div class="prtfolioView">\n';
		ret+= '\t\t\t<div class="prtfolioDs"></div>\n';
		ret+= '\t\t\t<div class="prtfolioDetail"></div>\n';
		ret+= '\t\t\t<div class="siiru-btnSet siiru-tc"><button type="button" class="prtfolioListBtn siiru-btn">목록</button></div>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t</section>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruPrtfolio, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruPrtfolio);\n';
		ret+= 'else window.onload = siiruPrtfolio;\n';
		ret+= 'function siiruPrtfolio() {\n';
		ret+= '\t// 카테고리 그룹별 개수\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getPrtfolioCtgryCnt.do\',{\'siteId\':\'&#36;{siteInfo.siteId}\'}).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar totalCtgry = 0;\n';
		ret+= '\t\t\t// 카테고리별 개수\n';
		ret+= '\t\t\t$.each(data.dataArr, function(key, values) {\n';
		ret+= '\t\t\t\ttotalCtgry = totalCtgry + parseInt(values.cnt);\n';
		ret+= '\t\t\t\t$(\'.prtfolioCtgryBtn li a[data-ctgry="\'+values.ctgryCd+\'"]\').append(\' (\'+numberWithCommas(values.cnt)+\')\');\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\t// 전체 개수\n';
		ret+= '\t\t\t$(\'.prtfolioCtgryBtn li a[data-ctgry=""]\').append(\' (\'+numberWithCommas(totalCtgry)+\')\');\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '\tprtfolioList();\n';
		ret+= '\t// 카테고리 링크\n';
		ret+= '\t$(\'.prtfolioCtgryBtn\').on(\'click\', \'li a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#prtfolioForm\').find(\'input[name="prtfolioCtgry"]\').val($(this).data(\'ctgry\'));\n';
		ret+= '\t\tprtfolioList();\n';
		ret+= '\t});\n';
		ret+= '\t// 검색버튼\n';
		ret+= '\t$(\'#prtfolioSearchBtn\').click(function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\tprtfolioList();\n';
		ret+= '\t});\n';
		ret+= '\t// 뷰페이지 링크\n';
		ret+= '\t$(\'.prtfolioList\').on(\'click\', \'a\', function(e) {\n';
		ret+= '\t\tvar linkData = $(this).data();\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#prtfolioForm\').find(\'input[name="sn"]\').val(linkData.sn);\n';
		ret+= '\t\t// 이미지 조회수 업데이트\n';
		ret+= '\t\tpgFileHit(linkData.filese, linkData.filekey, linkData.filesn);\n';
		ret+= '\t\t// 포트폴리오 상세화면\n';
		ret+= '\t\tprtfolioView();\n';
		ret+= '\t});\n';
		ret+= '\t// 관련사진 클릭 시\n';
		ret+= '\t$(\'.prtfolioDetail\').on(\'click\', \'.thumbImg\', function(e) {\n';
		ret+= '\t\tvar thumbImg = $(this).data();\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t// 조회수 업데이트\n';
		ret+= '\t\tpgFileHit(thumbImg.filese, thumbImg.filekey, thumbImg.filesn);\n';
		ret+= '\t\t// 이미지 정리\n';
		ret+= '\t\t$(\'.prtfolioImg img\').attr(\'src\', thumbImg.src);\n';
		ret+= '\t\t$(\'.prtfolioImg img\').attr(\'width\', thumbImg.width);\n';
		ret+= '\t\t$(\'.prtfolioImg img\').attr(\'height\', thumbImg.height);\n';
		ret+= '\t\t$(\'.prtfolioImg img\').attr(\'alt\', thumbImg.alt);\n';
		ret+= '\t\t$(\'.prtfolioInfo .fileWin\').attr(\'href\', thumbImg.src);\n';
		ret+= '\t\t$(\'.prtfolioInfo .fileDown\').attr(\'href\', thumbImg.href);\n';
		ret+= '\t\t$(\'.prtfolioInfo .fileSize\').html(numberWithCommas($.trim(thumbImg.width))+\' X \'+numberWithCommas($.trim(thumbImg.height))+\' / \'+$.trim(thumbImg.size));\n';
		ret+= '\t\t$(\'.prtfolioTitle .fileHitCnt\').html(numberWithCommas(thumbImg.rdcnt));\n';
		ret+= '\t\t$(\'.prtfolioTitle .fileDownCnt\').html(numberWithCommas(thumbImg.dwldcnt));\n';
		ret+= '\t\t$(\'html,body\').animate({scrollTop:$(\'.siiru-prtfoliowrap\').offset().top},0);\n';
		ret+= '\t});\n';
		ret+= '\t// 목록 버튼\n';
		ret+= '\t$(\'.prtfolioView\').on(\'click\', \'.prtfolioListBtn\', function(e) {\n';
		ret+= '\t\t$(\'#prtfolioForm\').find(\'input[name="sn"]\').val(\'\');\n';
		ret+= '\t\tprtfolioList();\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 포트폴리오 리스트\n';
		ret+= 'function prtfolioList() {\n';
		ret+= '\t// 리스트\n';
		ret+= '\t$(\'.prtfolioSearch\').show();\n';
		ret+= '\t$(\'.prtfolioList\').show();\n';
		ret+= '\t// 뷰\n';
		ret+= '\t$(\'.prtfolioDs\').html(\'\');\n';
		ret+= '\t$(\'.prtfolioDetail\').html(\'\');\n';
		ret+= '\t$(\'.prtfolioView\').hide();\n';
		ret+= '\tvar prtfolioDataList = \'\';\n';
		ret+= '\t$(\'.prtfolioList\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getPrtfolio.do\', $(\'#prtfolioForm\').serialize()+\'&siteId=&#36;{siteInfo.siteId}\').done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\t$.each(data.dataArr, function(key, values) {\n';
		ret+= '\t\t\t\tprtfolioDataList+= \'<a class="item withImage" href="#" data-sn="\'+$.trim(values.sn)+\'" data-filese="\'+$.trim(values.fileSe)+\'" data-filekey="\'+$.trim(values.fileKey)+\'" data-filesn="\'+$.trim(values.imgSn)+\'" width="\'+$.trim(values.width)+\'" height="\'+$.trim(values.height)+\'" style="background-image:url(\\\'\'+$.trim(values.imgSrc)+\'\\\');">\';\n';
		ret+= '\t\t\t\tprtfolioDataList+= \'<span class="imgInfo">\'+$.trim(values.imgCnt)+\'</span>\';\n';
		ret+= '\t\t\t\tprtfolioDataList+= \'<div class="overlay"><span class="texts">\'+$.trim(values.sj)+\'</span></div>\';\n';
		ret+= '\t\t\t\tprtfolioDataList+= \'</a>\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\tif (data.dataArr.length == 0) {\n';
		ret+= '\t\t\t\tprtfolioDataList+= \'<p class="nodata">포트폴리오 자료가 없습니다.</p>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\t$(\'.prtfolioList\').html(prtfolioDataList);\n';
		ret+= '\t\t\t$(\'.prtfolioList\').Mosaic({\n';
		ret+= '\t\t\t\tmaxRowHeightPolicy:\'tail\',\n';
		ret+= '\t\t\t\tinnerGap:10\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\t$(\'.prtfolioList\').html(\'\');\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 포트폴리오 뷰\n';
		ret+= 'function prtfolioView() {\n';
		ret+= '\tvar prtfolioDs = \'\';\n';
		ret+= '\tvar prtfolioDetail = \'\';\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getPrtfolioData.do\', $(\'#prtfolioForm\').serialize()+\'&siteId=&#36;{siteInfo.siteId}\').done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar data = data.dataArr;\n';
		ret+= '\t\t\t// 리스트, 검색 숨기기\n';
		ret+= '\t\t\t$(\'.prtfolioSearch\').hide();\n';
		ret+= '\t\t\t$(\'.prtfolioList\').hide();\n';
		ret+= '\t\t\t// 뷰 표출\n';
		ret+= '\t\t\t$(\'.prtfolioView\').show();\n';
		ret+= '\t\t\t// 포트폴리오 데이터\n';
		ret+= '\t\t\tprtfolioDs+= \'<div class="prtfolioTitle">\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<h5>\';\n';
		ret+= '\t\t\tif ($.trim(data.ctgryNm) != \'\') prtfolioDs+= \'[\'+$.trim(data.ctgryNm)+\'] \';\n';
		ret+= '\t\t\tprtfolioDs+= $.trim(data.sj);\n';
		ret+= '\t\t\tprtfolioDs+= \'</h5>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<ul>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<li>\'+$.trim(data.wrter)+\'</li>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<li>\'+$.trim(data.regDt)+\'</li>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<li>조회수 : <span class="fileHitCnt">\'+numberWithCommas($.trim(data.rdCnt))+\'</span></li>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<li>다운로드 : <span class="fileDownCnt">\'+numberWithCommas($.trim(data.dwldCnt))+\'</span></li>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'</ul>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'</div>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<div class="prtfolioCont">\';\n';
		ret+= '\t\t\tif ($.trim(data.entrps) != \'\') prtfolioDs+= $.trim(data.entrps)+\'<br>\';\n';
		ret+= '\t\t\tif ($.trim(data.termDe) != \'\') prtfolioDs+= $.trim(data.termDe)+\'<br>\';\n';
		ret+= '\t\t\tif ($.trim(data.linkUrl) != \'\') prtfolioDs+= \'<a href="\'+$.trim(data.linkUrl)+\'" target="_blank">\'+$.trim(data.linkUrl)+\'</a><br>\';\n';
		ret+= '\t\t\tif ($.trim(data.cn) != \'\') prtfolioDs+= $.trim(data.cn)+\'\';\n';
		ret+= '\t\t\tprtfolioDs+= \'</div>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<div class="prtfolioImg"><img src="\'+$.trim(data.imgSrc)+\'" width="\'+$.trim(data.width)+\'" height="\'+$.trim(data.height)+\'" alt="\'+$.trim(data.imgAlt)+\'"></div>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<div class="prtfolioInfo">\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<span class="fileSize">\'+numberWithCommas($.trim(data.width))+\' X \'+numberWithCommas($.trim(data.height))+\' / \'+$.trim(data.imgSize)+\'</span>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<a class="fileWin" href="\'+$.trim(data.imgSrc)+\'" target="_blank">새창에서 보기</a>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'<a class="fileDown" href="\'+$.trim(data.imgHref)+\'">파일 다운로드</a>\';\n';
		ret+= '\t\t\tprtfolioDs+= \'</div>\';\n';
		ret+= '\t\t\t$(\'.prtfolioDs\').html(prtfolioDs);\n';
		ret+= '\t\t\t// 관련 이미지\n';
		ret+= '\t\t\tprtfolioDetail+= \'<h6>관련사진 <span>(\'+numberWithCommas($.trim(data.imgCnt))+\')</span></h6>\';\n';
		ret+= '\t\t\tif (parseInt(data.imgCnt) > 0) {\n';
		ret+= '\t\t\t\tprtfolioDetail+= \'<ul>\';\n';
		ret+= '\t\t\t\t$.each(data.imageList, function(key, values) {\n';
		ret+= '\t\t\t\t\tprtfolioDetail+= \'<li><a href="#" class="thumbImg" data-filese="\'+$.trim(data.fileSe)+\'" data-filekey="\'+$.trim(data.fileKey)+\'" data-filesn="\'+$.trim(values.imgSn)+\'" data-href="\'+escapeHtml($.trim(values.imgHref))+\'" data-src="\'+escapeHtml($.trim(values.imgSrc))+\'" data-alt="\'+escapeHtml($.trim(values.imgAlt))+\'" data-rdcnt="\'+$.trim(values.rdCnt)+\'" data-dwldcnt="\'+$.trim(values.dwldCnt)+\'" data-size="\'+$.trim(values.imgSize)+\'" data-width="\'+$.trim(values.width)+\'" data-height="\'+$.trim(values.height)+\'"><img src="\'+$.trim(values.imgThumbSrc)+\'" width="\'+$.trim(values.widthThumb)+\'" height="\'+$.trim(values.heightThumb)+\'" alt="\'+$.trim(values.imgAlt)+\'"></a></li>\';\n';
		ret+= '\t\t\t\t});\n';
		ret+= '\t\t\t\tprtfolioDetail+= \'</ul>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\t$(\'.prtfolioDetail\').html(prtfolioDetail);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 사전정보공표
	} else if (tp == 'infoOpen') {
		ret = '<div class="siiru-infoOpenwrap">\n';
		ret+= '\t<form id="infoOpenForm" name="infoOpenForm" method="post">\n';
		ret+= '\t<input type="hidden" name="sn" value="">\n';
		ret+= '\t<input type="hidden" name="infoOpenCtgry" value="">\n';
		ret+= '\t<input type="hidden" name="recordCnt" value="10">\n';
		ret+= '\t<input type="hidden" name="movePage" value="1">\n';
		ret+= '\t<div class="infoOpenSearch">\n';
		ret+= '\t\t<div class="infoOpenSearch-ctgry">\n';
		ret+= '\t\t<c:if test="&#36;{not empty infoOpenCtgry and fn:length(infoOpenCtgry) > 0}">\n';
		ret+= '\t\t\t<ul class="infoOpenCtgryBtn">\n';
		ret+= '\t\t\t\t<li><a href="#" data-ctgry="">전체</a></li>\n';
		ret+= '\t\t\t<c:forEach var="ctgry" items="&#36;{infoOpenCtgry}">\n';
		ret+= '\t\t\t\t<li><a href="#" data-ctgry="&#36;{ctgry.ctgryId}">&#36;{ctgry.ctgryNm}</a></li>\n';
		ret+= '\t\t\t</c:forEach>\n';
		ret+= '\t\t\t</ul>\n';
		ret+= '\t\t</c:if>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t\t<div class="infoOpenSearch-box">\n';
		ret+= '\t\t\t<select name="infoOpenTp" title="검색어 구분">\n';
		ret+= '\t\t\t\t<option value="">전체</option>\n';
		ret+= '\t\t\t\t<option value="N">공개목록</option>\n';
		ret+= '\t\t\t\t<option value="C">세부내용</option>\n';
		ret+= '\t\t\t\t<option value="D">담당부서</option>\n';
		ret+= '\t\t\t</select>\n';
		ret+= '\t\t\t<input type="text" name="infoOpenQuery" value="&#36;{param.infoOpenQuery}" title="검색어" placeholder="검색어를 입력하세요">\n';
		ret+= '\t\t\t<button type="submit" id="infoOpenSearchBtn">검색</button>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t</div>\n';
		ret+= '\t</form>\n';
		ret+= '\t<section id="infoOpenWrap">\n';
		ret+= '\t\t<div class="infoOpenList"></div>\n';
		ret+= '\t\t<div class="pagination"></div>\n';
		ret+= '\t\t<div class="infoOpenView">\n';
		ret+= '\t\t\t<div class="infoOpenDs"></div>\n';
		ret+= '\t\t\t<div class="siiru-btnSet siiru-tc"><button type="button" class="infoOpenListBtn siiru-btn">목록</button></div>\n';
		ret+= '\t\t\t<div class="infoOpenDetail"></div>\n';
		ret+= '\t\t</div>\n';
		ret+= '\t</section>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruInfoOpen, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruInfoOpen);\n';
		ret+= 'else window.onload = siiruInfoOpen;\n';
		ret+= 'function siiruInfoOpen() {\n';
		ret+= '\tinfoOpenList();\n';
		ret+= '\t// 뷰페이지 링크\n';
		ret+= '\t$(\'.infoOpenList\').on(\'click\', \'tbody a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#infoOpenForm\').find(\'input[name="sn"]\').val($(this).data(\'sn\'));\n';
		ret+= '\t\tinfoOpenView();\n';
		ret+= '\t});\n';
		ret+= '\t// 페이징 버튼\n';
		ret+= '\t$(\'.pagination\').on(\'click\', \'li a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#infoOpenForm\').find(\'input[name="movePage"]\').val($(this).data(\'move\'));\n';
		ret+= '\t\tinfoOpenList();\n';
		ret+= '\t});\n';
		ret+= '\t// 카테고리 링크\n';
		ret+= '\t$(\'.infoOpenCtgryBtn\').on(\'click\', \'li a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#infoOpenForm\').find(\'input[name="infoOpenCtgry"]\').val($(this).data(\'ctgry\'));\n';
		ret+= '\t\tinfoOpenList();\n';
		ret+= '\t});\n';
		ret+= '\t// 검색버튼\n';
		ret+= '\t$(\'#infoOpenSearchBtn\').click(function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t// 페이지 번호 초기화\n';
		ret+= '\t\t$(\'#infoOpenForm\').find(\'input[name="movePage"]\').val(\'1\');\n';
		ret+= '\t\tinfoOpenList();\n';
		ret+= '\t});\n';
		ret+= '\t// 목록 버튼\n';
		ret+= '\t$(\'.infoOpenView\').on(\'click\', \'.infoOpenListBtn\', function(e) {\n';
		ret+= '\t\tinfoOpenList();\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 사전정보공표 리스트\n';
		ret+= 'function infoOpenList() {\n';
		ret+= '\t// 리스트\n';
		ret+= '\t$(\'.infoOpenSearch\').show();\n';
		ret+= '\t$(\'.infoOpenList\').show();\n';
		ret+= '\t$(\'.pagination\').show();\n';
		ret+= '\t// 뷰\n';
		ret+= '\t$(\'.infoOpenDs\').html(\'\');\n';
		ret+= '\t$(\'.infoOpenDetail\').html(\'\');\n';
		ret+= '\t$(\'.infoOpenView\').hide();\n';
		ret+= '\tvar infoOpenDataList = \'\';\n';
		ret+= '\t$(\'.infoOpenList\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getInfoOpenList.do\', $(\'#infoOpenForm\').serialize()).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar data = data.dataArr;\n';
		ret+= '\t\t\tvar openNm = \'\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<table class="siiru-mb20">\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<caption>사전정보공표 목록</caption>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<colgroup>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<col />\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<col />\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<col style="width:10%" />\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<col style="width:10%" />\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<col style="width:15%" />\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'</colgroup>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<thead>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<tr>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<th scope="col">공개목록</th>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<th scope="col">세부내용</th>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<th scope="col">공표시기</th>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<th scope="col">공표주기</th>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<th scope="col">담당부서</th>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'</tr>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'</thead>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'<tbody>\';\n';
		ret+= '\t\t\t$.each(data.list, function(key, values) {\n';
		ret+= '\t\t\t\topenNm = \'\';\n';
		ret+= '\t\t\t\tif ($.trim($(\'#infoOpenForm\').find(\'input[name="infoOpenCtgry"]\').val()) == \'\') openNm+= \'[\'+$.trim(values.ctgryNm)+\'] \';\n';
		ret+= '\t\t\t\topenNm+= $.trim(values.openNm);\n';
		ret+= '\t\t\t\tinfoOpenDataList+= \'<tr>\';\n';
		ret+= '\t\t\t\tinfoOpenDataList+= \'<th scope="row" class="siiru-tl"><a href="#" data-sn="\'+$.trim(values.sn)+\'">\'+openNm+\'</a></th>\';\n';
		ret+= '\t\t\t\tinfoOpenDataList+= \'<td class="siiru-tl">\'+$.trim(values.openCn)+\'</td>\';\n';
		ret+= '\t\t\t\tinfoOpenDataList+= \'<td>\'+$.trim(values.publictEra)+\'</td>\';\n';
		ret+= '\t\t\t\tinfoOpenDataList+= \'<td>\'+$.trim(values.publictCycle)+\'</td>\';\n';
		ret+= '\t\t\t\tinfoOpenDataList+= \'<td>\'+$.trim(values.publictDept)+\'</td>\';\n';
		ret+= '\t\t\t\tinfoOpenDataList+= \'</tr>\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\tif (data.list.length == 0) {\n';
		ret+= '\t\t\t\tinfoOpenDataList+= \'<tr><td colspan="5" class="nodata">사전정보공표 자료가 없습니다.</td></tr>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\tinfoOpenDataList+= \'</tbody>\';\n';
		ret+= '\t\t\tinfoOpenDataList+= \'</table>\';\n';
		ret+= '\t\t\t$(\'.infoOpenList\').html(infoOpenDataList);\n';
		ret+= '\t\t\tpagination(\'infoOpenWrap\', data.page, data.pageCnt, data.totalCnt);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 사전정보공표 뷰\n';
		ret+= 'function infoOpenView() {\n';
		ret+= '\tvar infoOpenDs = \'\';\n';
		ret+= '\tvar infoOpenDetail = \'\';\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getInfoOpenData.do\', $(\'#infoOpenForm\').serialize()).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar data = data.dataArr;\n';
		ret+= '\t\t\t// 리스트, 검색, 페이징 숨기기\n';
		ret+= '\t\t\t$(\'.infoOpenSearch\').hide();\n';
		ret+= '\t\t\t$(\'.infoOpenList\').hide();\n';
		ret+= '\t\t\t$(\'.pagination\').hide();\n';
		ret+= '\t\t\t// 뷰 표출\n';
		ret+= '\t\t\t$(\'.infoOpenView\').show();\n';
		ret+= '\t\t\t// 사전정보공표 표출\n';
		ret+= '\t\t\tinfoOpenDs+= \'<h6>[\'+$.trim(data.ctgryNm)+\'] \'+$.trim(data.openNm)+\'</h6>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<table class="infoOpenTable siiru-mb20">\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<caption>사전정보공표 상세내용</caption>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<colgroup>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<col style="width:10%" />\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<col style="width:40%" />\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<col style="width:10%" />\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<col />\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'</colgroup>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<tbody>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<tr>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<th scope="row">세부항목</th>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<td colspan="3" class="siiru-tl">\'+$.trim(data.openCn)+\'</td>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'</tr>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<tr>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<th scope="row">공표주기</th>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<td>\'+$.trim(data.publictCycle)+\'</td>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<th scope="row">공표시기</th>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<td>\'+$.trim(data.publictEra)+\'</td>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'</tr>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<tr>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<th scope="row">담당부서</th>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<td>\'+$.trim(data.publictDept)+\'</td>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<th scope="row">공표방법</th>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'<td>\'+$.trim(data.publictSeNm)+\'</td>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'</tr>\';\n';
		ret+= '\t\t\tif ((data.detailCnt == 0) && ((($.trim(data.publictSe) == \'L\') && ($.trim(data.linkUrl) != \'\')) || (($.trim(data.publictSe) == \'F\') && ($.trim(data.fileList.length) > 0)))) {\n';
		ret+= '\t\t\t\tinfoOpenDs+= \'<tr>\';\n';
		ret+= '\t\t\t\tinfoOpenDs+= \'<th scope="row">\'+$.trim(data.publictSeNm)+\'</th>\';\n';
		ret+= '\t\t\t\tinfoOpenDs+= \'<td colspan="3" class="siiru-tl">\';\n';
		ret+= '\t\t\t\tif ($.trim(data.publictSe) == \'L\') {\n';
		ret+= '\t\t\t\t\tif ($.trim(data.linkUrl) != \'\') infoOpenDs+= \'<a href="\'+$.trim(data.linkUrl)+\'" target="_blank">링크 바로가기</a>\';\n';
		ret+= '\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\tif (data.fileList.length > 0) {\n';
		ret+= '\t\t\t\t\t\tinfoOpenDs+= \'<ul>\';\n';
		ret+= '\t\t\t\t\t\t$.each(data.fileList, function(fKey, fValues) {\n';
		ret+= '\t\t\t\t\t\t\tinfoOpenDs+= \'<li><a href="\'+$.trim(fValues.fileHref)+\'">\'+$.trim(fValues.fileNm)+\'</a></li>\';\n';
		ret+= '\t\t\t\t\t\t});\n';
		ret+= '\t\t\t\t\t\tinfoOpenDs+= \'</ul>\';\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t}\n';
		ret+= '\t\t\t\tinfoOpenDs+= \'</td>\';\n';
		ret+= '\t\t\t\tinfoOpenDs+= \'</tr>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\tinfoOpenDs+= \'</tbody>\';\n';
		ret+= '\t\t\tinfoOpenDs+= \'</table>\';\n';
		ret+= '\t\t\t$(\'.infoOpenDs\').html(infoOpenDs);\n';
		ret+= '\t\t\t// 관련정보\n';
		ret+= '\t\t\tif (data.detailCnt > 0) {\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<h6>관련정보</h6>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<table class="siiru-mb20">\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<caption>사전정보공표 관련정보 목록</caption>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<colgroup>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<col style="width:5%" />\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<col />\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<col style="width:10%" />\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<col style="width:15%" />\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<col style="width:10%" />\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'</colgroup>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<thead>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<tr>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<th scope="col">번호</th>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<th scope="col">정보명</th>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<th scope="col">관련자료</th>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<th scope="col">공표부서</th>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<th scope="col">등록일자</th>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'</tr>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'</thead>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'<tbody>\';\n';
		ret+= '\t\t\t\tvar link = \'\';\n';
		ret+= '\t\t\t\t$.each(data.detailList, function(key, values) {\n';
		ret+= '\t\t\t\t\tlink = \'\';\n';
		ret+= '\t\t\t\t\tif ($.trim(values.publictSe) == \'F\') {\n';
		ret+= '\t\t\t\t\t\tif ($.trim(values.fileNm) != \'\') link = \'<a href="\'+$.trim(values.fileHref)+\'">관련자료 파일</a>\';\n';
		ret+= '\t\t\t\t\t} else {\n';
		ret+= '\t\t\t\t\t\tif ($.trim(values.linkUrl) != \'\') link = \'<a href="\'+$.trim(values.linkUrl)+\'" target="_blank">관련자료 링크</a>\';\n';
		ret+= '\t\t\t\t\t}\n';
		ret+= '\t\t\t\t\tinfoOpenDetail+= \'<tr>\';\n';
		ret+= '\t\t\t\t\tinfoOpenDetail+= \'<td>\'+$.trim(values.no)+\'</td>\';\n';
		ret+= '\t\t\t\t\tinfoOpenDetail+= \'<th scope="row" class="siiru-tl">\'+$.trim(values.detailNm)+\'</th>\';\n';
		ret+= '\t\t\t\t\tinfoOpenDetail+= \'<td>\'+link+\'</td>\';\n';
		ret+= '\t\t\t\t\tinfoOpenDetail+= \'<td>\'+$.trim(values.publictDept)+\'</td>\';\n';
		ret+= '\t\t\t\t\tinfoOpenDetail+= \'<td>\'+$.trim(values.regDt)+\'</td>\';\n';
		ret+= '\t\t\t\t\tinfoOpenDetail+= \'</tr>\';\n';
		ret+= '\t\t\t\t});\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'</tbody>\';\n';
		ret+= '\t\t\t\tinfoOpenDetail+= \'</table>\';\n';
		ret+= '\t\t\t\t$(\'.infoOpenDetail\').html(infoOpenDetail);\n';
		ret+= '\t\t\t} else {\n';
		ret+= '\t\t\t\t$(\'.infoOpenDetail\').html(\'\');\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	// 디바이스
	} else if (tp == 'device') {
		ret = '<div class="siiru-devicewrap">\n';
		ret+= '\t<form id="deviceForm" name="deviceForm" method="post">\n';
		ret+= '\t<input type="hidden" name="deviceSe" value="">\n';
		ret+= '\t<div class="deviceSearch">\n';
		ret+= '\t\t<ul class="deviceCtgry">\n';
		ret+= '\t\t\t<li><a href="#" data-device="">전체</a></li>\n';
		ret+= '\t\t\t<li><a href="#" data-device="B">Beacon</a></li>\n';
		ret+= '\t\t\t<li><a href="#" data-device="N">NFC</a></li>\n';
		ret+= '\t\t</ul>\n';
		ret+= '\t</div>\n';
		ret+= '\t</form>\n';
		ret+= '\t<section id="deviceWrap">\n';
		ret+= '\t\t<div class="deviceList"></div>\n';
		ret+= '\t</section>\n';
		ret+= '</div>\n';
		ret+= '<script>\n';
		ret+= '// 페이지 로드가 완료되면\n';
		ret+= 'if (window.addEventListener) window.addEventListener(\'load\', siiruDevice, false);\n';
		ret+= 'else if (window.attachEvent) window.attachEvent(\'onload\', siiruDevice);\n';
		ret+= 'else window.onload = siiruDevice;\n';
		ret+= 'function siiruDevice() {\n';
		ret+= '\tdeviceData();\n';
		ret+= '\t// 구분 검색\n';
		ret+= '\t$(\'.deviceCtgry\').on(\'click\', \'li a\', function(e) {\n';
		ret+= '\t\te.preventDefault();\n';
		ret+= '\t\t$(\'#deviceForm\').find(\'input[name="deviceSe"]\').val($(this).data(\'device\'));\n';
		ret+= '\t\tdeviceData();\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '// 디바이스 데이터\n';
		ret+= 'function deviceData() {\n';
		ret+= '\tvar deviceList = \'\';\n';
		ret+= '\t$(\'.deviceList\').html(\'<p class="loading"></p>\');\n';
		ret+= '\t$.post(\'&#36;{pathInfo.context}getDeviceList.do\', $(\'#deviceForm\').serialize()).done(function(data) {\n';
		ret+= '\t\t// 에러가 아니면\n';
		ret+= '\t\tif (data.errChk == \'N\') {\n';
		ret+= '\t\t\tvar uuid = \'\';\n';
		ret+= '\t\t\tvar linkUrl = \'\';\n';
		ret+= '\t\t\t// 디바이스 정보\n';
		ret+= '\t\t\tdeviceList+= \'<table class="siiru-mb20">\';\n';
		ret+= '\t\t\tdeviceList+= \'<caption>디바이스 목록</caption>\';\n';
		ret+= '\t\t\tdeviceList+= \'<thead>\';\n';
		ret+= '\t\t\tdeviceList+= \'<tr>\';\n';
		ret+= '\t\t\tdeviceList+= \'<th scope="col">구분</th>\';\n';
		ret+= '\t\t\tdeviceList+= \'<th scope="col">UUID</th>\';\n';
		ret+= '\t\t\tdeviceList+= \'<th scope="col">설치장소</th>\';\n';
		ret+= '\t\t\tdeviceList+= \'<th scope="col">링크주소</th>\';\n';
		ret+= '\t\t\tdeviceList+= \'</tr>\';\n';
		ret+= '\t\t\tdeviceList+= \'</thead>\';\n';
		ret+= '\t\t\tdeviceList+= \'<tbody>\';\n';
		ret+= '\t\t\t$.each(data.dataArr, function(key, values) {\n';
		ret+= '\t\t\t\tuuid = $.trim(values.deviceId);\n';
		ret+= '\t\t\t\tif ($.trim(values.deviceSe) == \'B\') uuid+= \' [\'+$.trim(values.major)+\', \'+$.trim(values.minor)+\']\';\n';
		ret+= '\t\t\t\tlinkUrl = \'\';\n';
		ret+= '\t\t\t\tif ($.trim(values.linkUrl) != \'\') linkUrl = \'<a href="\'+$.trim(values.linkUrl)+\'" target="_blank">\'+$.trim(values.linkUrl)+\'</a>\';\n';
		ret+= '\t\t\t\tdeviceList+= \'<tr>\';\n';
		ret+= '\t\t\t\tdeviceList+= \'<td>\'+$.trim(values.deviceSeNm)+\'</td>\';\n';
		ret+= '\t\t\t\tdeviceList+= \'<th scope="row">\'+uuid+\'</th>\';\n';
		ret+= '\t\t\t\tdeviceList+= \'<td>\'+$.trim(values.instlPlace)+\'</td>\';\n';
		ret+= '\t\t\t\tdeviceList+= \'<td>\'+linkUrl+\'</td>\';\n';
		ret+= '\t\t\t\tdeviceList+= \'</tr>\';\n';
		ret+= '\t\t\t});\n';
		ret+= '\t\t\tif (data.dataArr.length == 0) {\n';
		ret+= '\t\t\t\tdeviceList+= \'<tr><td colspan="4" class="nodata">디바이스가 없습니다.</td></tr>\';\n';
		ret+= '\t\t\t}\n';
		ret+= '\t\t\tdeviceList+= \'</tbody>\';\n';
		ret+= '\t\t\tdeviceList+= \'</table>\';\n';
		ret+= '\t\t\t$(\'.deviceList\').html(deviceList);\n';
		ret+= '\t\t} else {\n';
		ret+= '\t\t\talert(\'[\'+$.trim(data.errTitle)+\'] \'+$.trim(data.errMsg));\n';
		ret+= '\t\t}\n';
		ret+= '\t});\n';
		ret+= '}\n';
		ret+= '<'+'/script>\n';
	}
	ret = ret.replace(/&#36;/gi, '$');
	ret = ret.replace(/&lt;/gi, '<');
	return ret;
}
// 샘플코드 재귀함수
function menuCode(func, step, maxStep) {
	var ret = '';
	var liClass = '';
	var tabKey = step + (step-1);
	var tab = '';
	for (var i=0;i<tabKey;i++) tab+= '\t';
	ret+= tab+'<ul>\n';
	if (step == 1) {
		ret+= tab+'\t&lt;c:forEach var="menu'+step+'" items="&#36;{'+func+'}">\n';
	} else {
		ret+= tab+'\t&lt;c:forEach var="menu'+step+'" items="&#36;{menu'+(step-1)+'.subMenu}">\n';
	}
	if (func != 'menuAllInfo') {
		liClass = '&lt;c:if test="&#36;{menu'+step+'.upperAt eq \'Y\'}"> class="active"&lt;/c:if>';
	}
	ret+= tab+'\t<li'+liClass+'>\n';
	ret+= tab+'\t\t<a href="&#36;{menu'+step+'.menuUrl}" &#36;{menu'+step+'.onClick} &#36;{menu'+step+'.target}>&#36;{menu'+step+'.menuNm}</a>\n';
	if (step != maxStep) {
		ret+= tab+'\t\t&lt;c:if test="&#36;{menu'+step+'.subCount > 0}">\n';
		ret+= menuCode(func, (step+1), maxStep);
		ret+= tab+'\t\t&lt;/c:if>\n';
	}
	ret+= tab+'\t</li>\n';
	ret+= tab+'\t&lt;/c:forEach>\n';
	ret+= tab+'</ul>\n';
	return ret;
}
// Lock
function lock(siteId, panelNm) {
	$('.lockView').html('');
	var lockHtml = '';
	var lockClass = 'warning';
	var lockFa = 'unlock';
	ajaxForm('post', siiruPath+'getLockAt.do',{'siteId':siteId,'pageId':$('#pageId').val(),'pageNm':$('#pageUrl').val(),'panelNm':panelNm}, '', '', function(data) {
		if (data.errChk == 'N') {
			if ($.trim(data.dataArr.lockAt) == 'Y') {
				lockClass = 'danger';
				lockFa = 'lock';
			}
			lockHtml= '<button class="lockBtn btn btn-'+lockClass+'" data-siteid="'+$.trim(siteId)+'" data-panelnm="'+$.trim(panelNm)+'" data-lockat="'+$.trim(data.dataArr.lockAt)+'" data-lockid="'+$.trim(data.dataArr.lockId)+'" data-locknm="'+$.trim(data.dataArr.lockNm)+'" data-auth="'+$.trim(data.dataArr.auth)+'" data-authnm="'+$.trim(data.dataArr.authNm)+'" data-lockdt="'+$.trim(data.dataArr.lockDt)+'" data-lockip="'+$.trim(data.dataArr.lockIp)+'" data-unlock="'+$.trim(data.dataArr.unLock)+'" type="button"><i class="fa fa-'+lockFa+'"></i></button>';
			$('.lockView').html(lockHtml);
		}
	});
}
// Lock 히스토리 불러오기
function findLock(siteId, panelNm) {
	ajaxForm('post', siiruPath+'getLockHistory.do',{'siteId':siteId,'pageId':$('#pageId').val(),'pageNm':$('#pageUrl').val(),'panelNm':panelNm}, '', '', function(data) {
		// 데이터 초기화
		$('#lockTable tbody').children('tr').remove('');
		// 로딩 바
		$('#lockLayer .table').before('<p class="loading m-t-md text-center"><i class="fa fa-spinner fa-pulse fa-5x"></i></p>');
		if (data.errChk == 'N') {
			var tableData = '';
			var lockAt = '';
			var histSe = '';
			$.each(data.dataArr, function(key, values) {
				if ($.trim(values.HIST_SE) == 'H') {
					histSe = '';
				} else {
					histSe = ' class="text-danger"';
				}
				if ($.trim(values.LOCK_AT) == 'Y') {
					lockAt = '잠금';
				} else {
					lockAt = '잠금해제';
				}
				tableData+= '<tr'+histSe+'>';
				tableData+= '<td scope="row">'+lockAt+'</td>';
				tableData+= '<td><small>'+$.trim(values.USER_NM)+'('+$.trim(values.REG_ID)+') ['+$.trim(values.AUTH_NM)+'] : '+$.trim(values.REG_DT)+', '+$.trim(values.REG_IP)+'</small></td>';
				tableData+= '</tr>';
			});
			$('#lockLayer .loading').remove();
			$('#lockTable tbody').append(tableData);
			// 테이블 필터
			setTimeout(function () {
				$('#lockTable').filterTable({
					inputSelector: '#lockTable-filter',
					minRows: 7
				})
			}, 50);
		} else {
			$('#lockLayer .loading').remove();
		}
	});
}
// 페이징
function pagination(movePage, pageCnt, totalCnt) {
	// 보여질 페이지 개수
	var li_pageScale = 5;
	// 시작 페이지 구하기
	var li_startPage = ((Math.ceil(movePage / li_pageScale) - 1) * li_pageScale) + 1;
	// 마지막 페이지 구하기
	var li_endPage = li_startPage + li_pageScale - 1;
	if (li_endPage >= pageCnt) li_endPage = pageCnt;
	// 페이징을 만들자
	$('.pagination').children('li').remove('');
	var retval = '';
	if (movePage > li_pageScale) {
		retval+= '<li><a href="#" data-move="'+(li_startPage-li_pageScale)+'"><i class="fa fa-angle-double-left"></i></a></li>';
	}
	if (movePage > 1) {
		retval+= '<li><a href="#" data-move="'+(movePage-1)+'"><i class="fa fa-angle-left"></i></a></li>';
	}
	for (var i=li_startPage;i<=li_endPage;i++) {
		if (movePage != i) {
			retval+= '<li><a href="#" data-move="'+i+'">'+i+'</a></li>';
		} else {
			retval+= '<li class="active"><a href="#" data-move="'+i+'">'+i+' <span class="sr-only">(current)</span></a></li>';
		}
	}
	if (movePage < pageCnt) {
		retval+= '<li><a href="#" data-move="'+(movePage+1)+'"><i class="fa fa-angle-right"></i></a></li>';
	}
	if (Math.ceil(movePage/li_pageScale) < Math.ceil(pageCnt/li_pageScale)) {
		retval+= '<li><a href="#" data-move="'+(li_startPage+li_pageScale)+'"><i class="fa fa-angle-double-right"></i></a></li>';
	}
	if ($.trim(retval) != '') $('.pagination').append(retval);
}
// 윈도우 오픈
function openWindow(theURL,theName,theTop,theLeft,theWidth,theHeight,theScroll,theResizable) {
	window.open(theURL, theName,'top='+theTop+',left='+theLeft+',width='+theWidth+',height='+theHeight+',marginwidth=0,marginheight=0,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars='+theScroll+',resizable='+theResizable);
	return false;
}
// 윈도우 오픈 (Form)
function openWindowForm(theForm,theURL,theName,theTop,theLeft,theWidth,theHeight,theScroll,theResizable) {
	var $openForm = $('#'+theForm);
	window.open('', theName,'top='+theTop+',left='+theLeft+',width='+theWidth+',height='+theHeight+',marginwidth=0,marginheight=0,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars='+theScroll+',resizable='+theResizable);
	$openForm.attr('target', theName);
	$openForm.attr('action', theURL);
	$openForm.submit();
	return false;
}
// 쿠키
function setCookie(cname, cvalue, exdays) {
	var expire = new Date();
	expire.setDate(expire.getDate() + exdays);
	var cookies = cname + '=' + escape(cvalue) + '; path=/ ';
	if (typeof exdays != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	document.cookie = cookies;
}
function getCookie(cname) {
	cname = cname + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cname);
	var cValue = '';
	if (start != -1) {
		start += cname.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1) end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}
function privacyPrint() {
	var printChk = true;
	var beforePrint = function() {
		printChk = false;
		alert('개인정보 노출 위험 최소화를 위하여\n민원인·신고자 개인정보는 인쇄되지 않습니다.\n민원내용 등에 개인정보가 포함되어 있을 수 있으니,\n개인정보 보호에 각별히 유의하여 주시기 바랍니다.');
	};
	if (window.matchMedia) {
		var mediaQueryList = window.matchMedia('print');
			mediaQueryList.addListener(function(mql) {
				if (mql.matches) {
					if (printChk) beforePrint();
				}
			});
	}
	window.onbeforeprint = beforePrint;
}