package favila.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import favila.model.User;
import favila.repos.IUserRepository;
import favila.utils.CheckHelper;
import favila.utils.JWTUtils;

@Service
public class UserServiceImpl implements IUserService{
	
	public static final String adminRole = "admin";
	public static final String groupLeaderRole = "groupLeader";
	
	@Autowired
	private IUserRepository repo;

	@Override
	public User getById(int id) {
		if(CheckHelper.isIdValid(id)) {
			User user = repo.findOne(id);
			if(CheckHelper.isFilled(user)) {
				return user;
			}
		}
		return null;
	}

	@Override
	public ArrayList<User> getAll() {
		ArrayList<User> users = (ArrayList<User>) repo.findAll();
		if(CheckHelper.isFilled(users)) {
			return users;
		}
		
		return null;
	}

	@Override
	public User add(User entity) {		
		if(CheckHelper.isFilled(entity) && !CheckHelper.isIdValid(entity.getId())) {
			entity.setType(groupLeaderRole);
			if(isValid(entity)) {
				User addedUser = repo.save(entity);
				if(CheckHelper.isFilled(addedUser)) {
					return addedUser;
				}
			}
		}
		return null;
	}

	@Override
	public User update(User entity) {
		if(isValid(entity) && newEmailIsNotTaken(entity)) {
			User updatedUser = repo.save(entity);
			if(CheckHelper.isFilled(updatedUser)) {
				return updatedUser;
			}
		}
		return null;
	}

	private boolean newEmailIsNotTaken(User data) {
		return !CheckHelper.isFilled(repo.findByEmail(data.getEmail())) ||
				CheckHelper.isFilled(repo.findByEmailAndId(data.getEmail(), data.getId()));
	}

	@Override
	public boolean delete(User entity) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isValid(User entity) {
		return CheckHelper.isFilled(entity) &&
				CheckHelper.isValidEmail(entity.getEmail()) &&
				CheckHelper.isValidLettersString(entity.getFirstname()) &&
				CheckHelper.isValidLettersString(entity.getLastname()) &&
				CheckHelper.isValidNoSpecialChars(entity.getPassword()) &&
				CheckHelper.isFilled(entity.getType()) && (entity.getType().equals(adminRole) || entity.getType().equals(groupLeaderRole));
	}

	@Override
	public String login(String email, String password) {
		if(CheckHelper.isValidEmail(email) && CheckHelper.isValidNoSpecialChars(password)) {
			User user = repo.findByEmailAndPassword(email, password);
			if(CheckHelper.isFilled(user)) {
				String jwt = JWTUtils.pack(user.getId());
				return jwt;
			}
		}
		
		return null;
	}

	@Override
	public boolean isAdmin(User user) {
		return isValid(user) && user.getType().equals(adminRole);
	}

	@Override
	public ArrayList<User> getGroupLeaders() {
		ArrayList<User> users = repo.getGroupLeaders();
		if(CheckHelper.isFilled(users)) {
			return users;
		}
		
		return null;
	}

	@Override
	public boolean isEmailTaken(String email) {
		if(CheckHelper.isValidEmail(email)) {
			User user = repo.findByEmail(email);
			if(CheckHelper.isFilled(user)) {
				return true;
			}
		}
		
		return false;
	}
}
