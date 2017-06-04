package favila.ctrls;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import favila.model.Group;
import favila.model.Training;
import favila.services.IGroupService;
import favila.services.ITrainingService;
import favila.utils.CheckHelper;
import favila.utils.GenericResponse;

@RestController
@RequestMapping("api/group")
public class GroupController {

	@Autowired
	private IGroupService service;
	
	@Autowired
	private ITrainingService trainingService;
	
	@RequestMapping(value = "", method=RequestMethod.POST)
	public GenericResponse<Group> add(@RequestBody Group newGroupInfo) {
		GenericResponse<Group> retVal = new GenericResponse<Group>();
		Group addedGroup;
		
		if(CheckHelper.isFilled(newGroupInfo)) {
			addedGroup = service.add(newGroupInfo);
			if(CheckHelper.isFilled(addedGroup)) {
				retVal.success(addedGroup);
			} else {
				retVal.error("Neuspešna registracija grupe.");
			}		
		} else {
			retVal.error("Poslati podaci o grupi nisu validni.");
		}
		
		return retVal;
	}
	
	@RequestMapping(value = "", method=RequestMethod.PUT)
	public GenericResponse<Object> update(@RequestBody Group updatedGroupInfo) {
		GenericResponse<Object> retVal = new GenericResponse<Object>();
		
		if(CheckHelper.isFilled(updatedGroupInfo)) {
			Group updated = service.update(updatedGroupInfo);
			if(CheckHelper.isFilled(updated)) {
				retVal.success(null);
			} else {
				retVal.error("Promena informacija o grupi nije uspela.");
			}
		} else {
			retVal.error("Poslati podaci o grupi nisu validni.");
		}
		
		return retVal;
	}
	
	@RequestMapping(value = "", method=RequestMethod.GET)
	public GenericResponse<ArrayList<Group>> getAll() {
		GenericResponse<ArrayList<Group>> retVal = new GenericResponse<ArrayList<Group>>();
		ArrayList<Group> groups = service.getAll();
		
		if(CheckHelper.isFilled(groups)) {
			retVal.success(groups);
		} else {
			retVal.error("Nema grupa u sistemu.");
		}
		
		return retVal;
	}
	
	@RequestMapping(value = "{id}/trainings", method=RequestMethod.GET)
	public GenericResponse<ArrayList<Training>> getAllTrainingsForGroup(@PathVariable int id) {
		GenericResponse<ArrayList<Training>> retVal = new GenericResponse<ArrayList<Training>>();
		ArrayList<Training> trainings;
		
		if(CheckHelper.isIdValid(id) && CheckHelper.isFilled(service.getById(id)) ) {
			trainings = trainingService.getTrainingsForGroup(id);
			if(CheckHelper.isFilled(trainings)) {
				retVal.success(trainings);
			} else {
				retVal.error("U sistemu nema treninga za grupu sa '"+ service.getById(id).getName() +"'");
			}
		} else {
			retVal.error("Ne postoji grupa sa ID-jem " + id);
		}
		
		return retVal;
	}
}
