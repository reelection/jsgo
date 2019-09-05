package egovframework.common.utils.string;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class StringUtil {
	
	 public static void printJsonSet(Object data, HttpServletResponse rep)
	  {
	    rep.setCharacterEncoding("UTF-8");
	    rep.setContentType("application/json; charset=utf-8");
	    Gson gs = new Gson();
	    PrintWriter pw = null;
	    try {
	      pw = rep.getWriter();
	      pw.print(gs.toJson(data));
	    } catch (IOException e) {
	      e.printStackTrace();
	    } finally {
	      pw.flush();
	      pw.close();
	    }
	  }
	 
	 public static String paramValidator() {
		 
		 return "";
	 }

}
