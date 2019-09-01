package egovframework.home.service.impl;

import java.util.ArrayList;
import java.util.HashMap;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("homeMapper")
public interface HomeMapper {
	
	ArrayList<HashMap<String, Object>> testList(HashMap<String, Object> param) throws Exception;
	
}
