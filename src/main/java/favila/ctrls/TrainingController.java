package favila.ctrls;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import favila.dtos.DailyScheduleDTO;
import favila.model.Training;
import favila.services.ITrainingService;
import favila.services.IUserService;
import favila.utils.CheckHelper;
import favila.utils.GenericResponse;
import favila.utils.JWTUtils;

@RestController
@RequestMapping("api/training")
public class TrainingController {

	@Autowired
	private ITrainingService service;
	
	@Autowired 
	private IUserService userService;
	
	@RequestMapping(value = "", method=RequestMethod.POST)
	public GenericResponse<Training> add(@RequestBody Training newTrainingInfo) {
		GenericResponse<Training> retVal = new GenericResponse<Training>();
		Training addedTraining;
		
		if(CheckHelper.isFilled(newTrainingInfo)) {
			addedTraining = service.add(newTrainingInfo);
			if(CheckHelper.isFilled(addedTraining)) {
				retVal.success(addedTraining);
			} else {
				retVal.error("Neuspešna registracija treninga.");
			}		
		} else {
			retVal.error("Poslati podaci o treningu nisu validni.");
		}
		
		return retVal;
	}
	
	@RequestMapping(value = "", method=RequestMethod.PUT)
	public GenericResponse<Object> update(@RequestBody Training updatedTrainingInfo) {
		GenericResponse<Object> retVal = new GenericResponse<Object>();
		
		if(CheckHelper.isFilled(updatedTrainingInfo)) {
			Training updated = service.update(updatedTrainingInfo);
			if(CheckHelper.isFilled(updated)) {
				retVal.success(null);
			} else {
				retVal.error("Promena informacija o treningu nije uspela.");
			}
		} else {
			retVal.error("Poslati podaci o treningu nisu validni.");
		}
		
		return retVal;
	}
	
	@RequestMapping(value = "", method=RequestMethod.GET)
	public GenericResponse<ArrayList<Training>> getAll() {
		GenericResponse<ArrayList<Training>> retVal = new GenericResponse<ArrayList<Training>>();
		ArrayList<Training> groups = service.getAll();
		
		if(CheckHelper.isFilled(groups)) {
			retVal.success(groups);
		} else {
			retVal.error("Nema treninga u sistemu.");
		}
		
		return retVal;
	}

	@RequestMapping(value = "/setSchedule", method=RequestMethod.POST)
	public GenericResponse<Object> setSchedule(@RequestHeader(value="Authorization") String jwt, @RequestBody ArrayList<DailyScheduleDTO> schedule) {
		GenericResponse<Object> retVal = new GenericResponse<Object>();
		int id = JWTUtils.unpack(jwt);
		
		if(CheckHelper.isIdValid(id) && userService.isAdmin(userService.getById(id))) {
			if(CheckHelper.isFilled(schedule)) {
				boolean success = service.setSchedule(schedule);
				if(success) {
					retVal.success(null);
				} else {
					retVal.error("Postavljanje rasporeda nije uspelo.");
				}
			} else {
				retVal.error("Poslat je prazan raspored.");
			}
		} else {
			retVal.error("Samo se sa administratorskog naloga mogu postavljati periodični treninzi.");
		}
		
		return retVal;
	}
	
	@RequestMapping(value = "{id}/toggleStatus", method=RequestMethod.PUT)
	public GenericResponse<Object> cancelTraining(@PathVariable int id) {
		GenericResponse<Object> retVal = new GenericResponse<Object>();

		if(CheckHelper.isIdValid(id)) {
			Training t = service.getById(id);
			if(CheckHelper.isFilled(t)) {
				t.setIsCanceled(!t.getIsCanceled());
				Training updated = service.update(t);
				if(CheckHelper.isFilled(updated)) {
					retVal.success(null);
				} else {
					retVal.error("Otkazivanje treninga nije uspelo.");
				}
			} else {
				retVal.error("Ne postoji trening sa ID " + id);
			}
		} else {
			retVal.error("Nevalidan id " + id);
		}
		
		return retVal;
	}
	
}
