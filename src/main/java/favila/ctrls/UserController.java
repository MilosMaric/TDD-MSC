package favila.ctrls;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import favila.dtos.LoginInfoDTO;
import favila.model.User;
import favila.services.IUserService;
import favila.utils.CheckHelper;
import favila.utils.GenericResponse;
import favila.utils.JWTUtils;

@RestController
@RequestMapping("api/user")
public class UserController {

	@Autowired
	private IUserService userService;
	
	@RequestMapping(value = "", method=RequestMethod.POST)
	public GenericResponse<User> add(@RequestBody User newUserInfo) {
		GenericResponse<User> retVal = new GenericResponse<User>();
		User addedUser;
		
		if(CheckHelper.isFilled(newUserInfo)) {
			if(!userService.isEmailTaken(newUserInfo.getEmail())) {
				addedUser = userService.add(newUserInfo);
				if(CheckHelper.isFilled(addedUser)) {
					retVal.success(addedUser);
				} else {
					retVal.error("Neuspešna registracija.");
				}		
			} else {
				retVal.error("Odabrana email adresa je zauzeta.");
			}
		} else {
			retVal.error("Poslati podaci o korisniku nisu validni.");
		}
		
		return retVal;
	}
	
	@RequestMapping(value = "", method=RequestMethod.PUT)
	public GenericResponse<Object> update(@RequestBody User updatedUserInfo) {
		GenericResponse<Object> retVal = new GenericResponse<Object>();
		
		if(CheckHelper.isFilled(updatedUserInfo)) {
			User updated = userService.update(updatedUserInfo);
			if(CheckHelper.isFilled(updated)) {
				retVal.success(null);
			} else {
				retVal.error("Promena informacija o korisniku nije uspela.");
			}
		} else {
			retVal.error("Poslati podaci o korisniku nisu validni.");
		}
		
		return retVal;
	}
	
	@RequestMapping(value="leaders", method=RequestMethod.GET)
	public GenericResponse<ArrayList<User>> getGroupLeaders(@RequestHeader(value="Authorization") String jwt) {
		GenericResponse<ArrayList<User>> retVal = new GenericResponse<ArrayList<User>>();
		ArrayList<User> leaders;
		
		if(userService.isAdmin(userService.getById(JWTUtils.unpack(jwt)))) {
			leaders = userService.getGroupLeaders();
			if(CheckHelper.isFilled(leaders)) {
				retVal.success(leaders);
			} else {
				retVal.error("Još uvek nema rukovodilaca u sistemu.");
			}
		} else {
			retVal.error("Podatke naloga rukovodilaca može videti samo administrator sistema.");
		}
		
		return retVal;
	}
	
	@RequestMapping(value = "login", method=RequestMethod.POST)
	public GenericResponse<String> login(@RequestBody LoginInfoDTO info) {
		GenericResponse<String> retVal = new GenericResponse<String>();
		String jwt;
			
		if(CheckHelper.isFilled(info)) {
			jwt = userService.login(info.getEmail(), info.getPassword());
			if(CheckHelper.isFilled(jwt)) {
				retVal.success(jwt);
			} else {
				retVal.error("Neuspešan pokušaj prijave.");
			}
		} else {
			retVal.error("Poslati podaci su nevalidni.");
		}
		
		return retVal;
	}
	
	@RequestMapping(value="getLoggedUser", method=RequestMethod.GET)
	public GenericResponse<User> getLoggedUser(@RequestHeader(value="Authorization") String jwt) {
		GenericResponse<User> retVal = new GenericResponse<User>();
		User user;
		int id;
		
		id = JWTUtils.unpack(jwt);
		if(CheckHelper.isIdValid(id)) {
			user = userService.getById(id);
			if(CheckHelper.isFilled(user)) {
				retVal.success(user);
			} else {
				retVal.error("Ne postoji korisnik sa ID " + id);
			}
		} else {
			retVal.error("Nema prijavljenog korisnika");
		}
		
		
		return retVal;
	}
}
