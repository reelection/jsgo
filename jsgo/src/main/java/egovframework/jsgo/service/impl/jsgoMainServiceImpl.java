package egovframework.jsgo.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("jsgoMainService")
public class jsgoMainServiceImpl {

	@Resource(name="jsgoMainMapper")
	private JsgoMainMapper jsgoMainMapper;
	
}
