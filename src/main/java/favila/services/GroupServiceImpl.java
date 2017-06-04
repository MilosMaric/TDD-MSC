package favila.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import favila.model.Group;
import favila.repos.IGroupRepository;
import favila.utils.CheckHelper;

@Service
public class GroupServiceImpl implements IGroupService{

	public static final String dancingGroup = "dancing";
	public static final String orchestraGroup = "orchestra";
	
	@Autowired
	private IGroupRepository repo;
	
	@Override
	public Group getById(int id) {
		if(CheckHelper.isIdValid(id)) {
			Group group = repo.findOne(id);
			if(CheckHelper.isFilled(group)) {
				return group;
			}
		}
		return null;
	}

	@Override
	public ArrayList<Group> getAll() {
		ArrayList<Group> groups = (ArrayList<Group>) repo.findAll();
		if(CheckHelper.isFilled(groups)) {
			return groups;
		}
		
		return null;
	}

	@Override
	public Group add(Group entity) {
		if(isValid(entity) && !CheckHelper.isIdValid(entity.getId())) {
			Group addedGroup = repo.save(entity);
			if(CheckHelper.isFilled(addedGroup)) {
				return addedGroup;
			}
		}
		return null;
	}

	@Override
	public Group update(Group entity) {
		if(isValid(entity)) {
			Group updatedGroup = repo.save(entity);
			if(CheckHelper.isFilled(updatedGroup)) {
				return updatedGroup;
			}
		}
		return null;
	}

	@Override
	public boolean delete(Group entity) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isValid(Group entity) {
		return CheckHelper.isFilled(entity) && 
				CheckHelper.isValidLettersString(entity.getName()) &&
				CheckHelper.isFilled(entity.getDescription()) &&
				(entity.getType().equals(dancingGroup) || entity.getType().equals(orchestraGroup));
	}

}
