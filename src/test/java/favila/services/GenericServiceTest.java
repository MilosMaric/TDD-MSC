package favila.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import favila.model.User;
import favila.repos.IUserRepository;

public class GenericServiceTest {

	@InjectMocks
	private UserServiceImpl service;
	
	@Mock
	private IUserRepository mockedUserRepository;
	
	@Before
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void GetById_IfIdIsNegative_ReturnsNull() {
		assertNull(service.getById(-5));
	}
	
	@Test
	public void GetById_IfIdIsZero_ReturnsNull() {
		assertNull(service.getById(0));
	}
	
	@Test
	public void GetById_IfIdIsValidAndRepoReturnsNull_ReturnsNull() {
		Mockito.when(mockedUserRepository.findOne(Matchers.anyInt())).thenReturn(null);
		assertNull(service.getById(2));
	}
	
	@Test
	public void GetById_IfIdIsValidAndRepoReturnsUser_ReturnsNotNull() {
		Mockito.when(mockedUserRepository.findOne(Matchers.anyInt())).thenReturn(new User());
		assertNotNull(service.getById(2));
	}
	
	@Test
	public void GetAll_IfRepoReturnsNull_ReturnsNull() {
		Mockito.when(mockedUserRepository.findAll()).thenReturn(null);
		assertNull(service.getAll());
	}
	
	@Test
	public void GetAll_IfRepoReturnsNotNull_ReturnsListWithSameMembersAsWhichRepoReturned() {
		ArrayList<User> users = new ArrayList<>();
		users.add(new User());
		users.add(new User());
		users.add(new User());
		
		Mockito.when(mockedUserRepository.findAll()).thenReturn(users);
		assertEquals(service.getAll().size(), users.size());
	}
	
	@Test
	public void Add_IfArgumentIsNull_ReturnsNull() {
		assertNull(service.add(null));
	}
	
	@Test
	public void Add_IfArgumentUserIsNotValid_ReturnsNull() {
		assertNull(service.add(new User()));
	}
	
	@Test
	public void Add_IfArgumentUserIsValidAndRepoReturnsNull_ReturnsNull() {
		User user = new User(2, "asd@a.add", "asd", "asd", "asd", UserServiceImpl.adminRole);
		Mockito.when(mockedUserRepository.save(Matchers.any(User.class))).thenReturn(null);
		assertNull(service.add(user));
	}
	
	@Test
	public void Add_IfUsersIdIsValid_ReturnsNull() {
		User user = new User(5, "asd@a.add", "asd", "asd", "asd", UserServiceImpl.adminRole);
		Mockito.when(mockedUserRepository.save(Matchers.any(User.class))).thenReturn(user);
		assertNull(service.add(user));
	}
	
	@Test
	public void Add_IfArgumentUserIsValid_ReturnsWhatRepoReturned() {
		User user = new User(0, "asd@a.add", "asd", "asd", "asd", UserServiceImpl.adminRole);
		Mockito.when(mockedUserRepository.save(Matchers.any(User.class))).thenReturn(user);
		assertEquals(user, service.add(user));
	}
	
	@Test
	public void Update_IfArgumentIsNull_ReturnsNull() {
		assertNull(service.update(null));
	}
	
	@Test
	public void Update_IfArgumentUserIsNotValid_ReturnsNull() {
		assertNull(service.update(new User()));
	}
	
	@Test
	public void Update_IfArgumentUserIsValid_ReturnsWhatRepoReturned() {
		User user = new User(2, "asd@a.add", "asd", "asd", "asd", UserServiceImpl.adminRole);
		Mockito.when(mockedUserRepository.save(Matchers.any(User.class))).thenReturn(user);
		assertEquals(user, service.update(user));
	}
}
