package egovframework.home.web;

import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import egovframework.common.utils.string.StringUtil;
import egovframework.home.service.HomeService;


@Controller
public class HomeController {

	@Resource(name="homeService")
	private HomeService homeService;
	
	@RequestMapping("/main.do")
	public String homeMain(HttpServletRequest req, HttpServletResponse rep, @RequestParam HashMap<String, Object> param, Model model) {
		
		HashMap<String, Object> rtnMap = new HashMap<>();
		
		try {
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "/main";
	}
	
	
	@RequestMapping("/login.do")
	public String login(HttpServletRequest req, HttpServletResponse rep, @RequestParam HashMap<String, Object> param, Model model) {
		return "/home/include/login";
	}
	
	
	
	
	
	/*----------------------------------------------------------------------------------------------------------------------------------------------------------
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------
	 * test
	 * */
	
	
	@RequestMapping("/test.do")
	public String test(HttpServletRequest req, HttpServletResponse rep, @RequestParam HashMap<String, Object> param, Model model) {
		return "/test";
	}
	
	
	/*----------------------------------------------------------------------------------------------------------------------------------------------------------
	 * test ajax
	 * */
	@RequestMapping("/testAjax.do")
	@ResponseBody
	public void testAjax(HttpServletRequest req, HttpServletResponse rep, @RequestParam HashMap<String, Object> param, Model model) {
		HashMap<String, Object> rtnMap = new HashMap<>();
		
		try {
			ArrayList<HashMap<String,Object>> rtnList = homeService.testList(param);
			rtnMap.put("errChk", "N");
			rtnMap.put("rtnList", rtnList);
			rtnMap.put("length", rtnList.size());
			
		} catch (Exception e) {
			rtnMap.put("errChk", "Y");
			rtnMap.put("errTitle", "Error");
			rtnMap.put("errMsg", "시스템 오류가 발생했습니다.");
			
		}
		StringUtil.printJsonSet(rtnMap, rep);
	}
	
}
