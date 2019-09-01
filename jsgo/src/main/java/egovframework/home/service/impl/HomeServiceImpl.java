package egovframework.home.service.impl;

import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.home.service.HomeService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("homeService")
public class HomeServiceImpl extends EgovAbstractServiceImpl implements HomeService {
	
	@Resource(name="homeMapper")
	private HomeMapper homeMapper;

	@Override
	public ArrayList<HashMap<String, Object>> testList(HashMap<String, Object> param) throws Exception {
		return homeMapper.testList(param);
	}

}
