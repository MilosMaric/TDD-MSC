package favila.repos;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import favila.model.User;
import favila.services.UserServiceImpl;

@Repository
public interface IUserRepository extends CrudRepository<User, Integer>{

	User findByEmailAndPassword(String email, String password);
	
	User findByEmailAndId(String email, int id);
	
	User findByEmail(String email);

	@Query("select e from User e where e.type='" + UserServiceImpl.groupLeaderRole + "'")
	ArrayList<User> getGroupLeaders();
}