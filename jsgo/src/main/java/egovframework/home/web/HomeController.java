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

import egovframework.home.service.HomeService;


@Controller
public class HomeController {

	@Resource(name="homeService")
	private HomeService homeService;
	
	@RequestMapping("/main.do")
	public String homeMain(HttpServletRequest req, HttpServletResponse rep, @RequestParam HashMap<String, Object> param, Model model) {
		
		HashMap<String, Object> rtnMap = new HashMap<>();
		
		try {
			param.put("test", "3");
			ArrayList<HashMap<String,Object>> rtnList = homeService.testList(param);
			
			for (HashMap<String, Object> hashMap : rtnList) {
				System.out.println("seq : " + hashMap.get("SEQ") + ", COL : " + hashMap.get("TESTCOL"));
			}
			
			rtnMap.put("rtnList", rtnList);
			model.addAttribute(rtnMap);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "/main";
	}
	
	@RequestMapping("/test.do")
	public String test(HttpServletRequest req, HttpServletResponse rep, @RequestParam HashMap<String, Object> param, Model model) {
		return "/test";
	}
	
	@RequestMapping("/testAjax.do")
	@ResponseBody
	public void testAjax(HttpServletRequest req, HttpServletResponse rep, @RequestParam HashMap<String, Object> param, Model model) {
		System.out.println("in testajax");
		HashMap<String, Object> rtnMap = new HashMap<>();
		
		try {
			ArrayList<HashMap<String,Object>> rtnList = homeService.testList(param);
			System.out.println("result size : " + rtnList.size());
			rtnMap.put("errChk", "N");
			rtnMap.put("rtnList", rtnList);
			
			
		} catch (Exception e) {
			rtnMap.put("errChk", "Y");
			rtnMap.put("errTitle", "Error");
			rtnMap.put("errMsg", "시스템 오류가 발생했습니다.");
			
			
		}
		//StringUtil.printJsonSet(rtnMap, rep);
	}
	
}
