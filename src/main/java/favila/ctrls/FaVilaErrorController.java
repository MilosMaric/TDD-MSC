package favila.ctrls;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FaVilaErrorController implements ErrorController{

	/*
	 *Ako se desi greska (a desice se prilikom reload-a na relativnoj putanji jer tad React-router jos uvek nije ucitan) prebaci na index jer je SPA. 
	*/	
	@RequestMapping(value="/error")
	public String appIndex(HttpServletRequest req) {
		return "forward:/";
	}

	@Override
	public String getErrorPath() {
		return "/error";
	}

}
