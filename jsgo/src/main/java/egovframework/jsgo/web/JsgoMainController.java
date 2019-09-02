package egovframework.jsgo.web;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.jsgo.service.JsgoMainService;

@Controller
@RequestMapping("/jsgo")
public class JsgoMainController {
	
	@Resource(name="jsgoMainService")
	private JsgoMainService jsgoMainService;
	
	/*
	 * 2019-09-01 고재선
	 * 관리자 메인 페이지
	 * */
	@RequestMapping("/main.do")
	public String jsgoMain(HttpServletRequest req, HttpServletResponse res, @RequestParam HashMap<String, Object> param) {
		
		
		
		
		return "";
	}

}
