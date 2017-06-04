package favila.services;

import java.util.ArrayList;

import favila.model.User;

public interface IUserService extends IGenericService<User>{
	String login(String email, String password);
	boolean isAdmin(User user);
	ArrayList<User> getGroupLeaders();
	boolean isEmailTaken(String email);
}
