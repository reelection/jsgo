package egovframework.home.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("HomeService")
public class HomeServiceImpl {

	@Resource(name="homeMapper")
	private HomeMapper homeMapper;
	
}
