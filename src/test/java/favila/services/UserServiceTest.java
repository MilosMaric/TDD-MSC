package favila.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

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
import favila.utils.JWTUtils;

public class UserServiceTest {
	
	@InjectMocks
	private UserServiceImpl service;
	
	@Mock
	private IUserRepository mockedUserRepository;
	
	@Before
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void IsValid_IfArgumentIsNull_ReturnsFalse() {
		assertFalse(service.isValid(null));
	}
	
	@Test
	public void IsValid_IfAnyFieldIsNull_ReturnsFalse() {
		User user = new User(1, null, "pass", "fname", "lname", UserServiceImpl.adminRole);
		Boolean result = false;
		
		result |= service.isValid(user);
		
		user.setEmail("a@b.com");
		user.setPassword(null);
		result |= service.isValid(user);
		
		user.setPassword("pass");
		user.setFirstname(null);		
		result |= service.isValid(user);
		
		user.setFirstname("fname");
		user.setLastname(null);
		result |= service.isValid(user);
		
		user.setLastname("lname");
		user.setType(null);
		result |= service.isValid(user);
		
		assertFalse(result);
	}
	
	@Test
	public void IsValid_IfAnyFieldIsEmpty_ReturnsFalse() {
		User user = new User(1, "", "pass", "fname", "lname", UserServiceImpl.adminRole);
		Boolean result = false;
		
		result |= service.isValid(user);
		
		user.setEmail("a@b.com");
		user.setPassword("");
		result |= service.isValid(user);
		
		user.setPassword("pass");
		user.setFirstname("");		
		result |= service.isValid(user);
		
		user.setFirstname("fname");
		user.setLastname("");
		result |= service.isValid(user);
		
		user.setLastname("lname");
		user.setType("");
		result |= service.isValid(user);
		
		assertFalse(result);
	}
	
	@Test
	public void IsValid_IfEmailIsNotInValidFormat_ReturnsFalse() {
		User user = new User(1, "asd.ee2", "pass", "fname", "lname", UserServiceImpl.adminRole);
		assertFalse(service.isValid(user));
	}
	
	@Test
	public void IsValid_IfFirstOrLastNameHaveNonLetterCharacters_ReturnsFalse() {
		User user = new User(1, "as@d.com", "pass", "fn2ame", "3lname", UserServiceImpl.adminRole);
		assertFalse(service.isValid(user));
	}
	
	@Test
	public void IsValid_IfPasswordHasSpecialCharacters_ReturnsFalse() {
		User user = new User(1, "as@d.com", "pa@s2s", "fname", "lname", UserServiceImpl.adminRole);
		assertFalse(service.isValid(user));
	}
	
	@Test
	public void IsValid_IfTypeIsInvalid_ReturnsFalse() {
		User user = new User(1, "as@d.com", "pas2s", "fname", "lname", "somethingRandom");
		assertFalse(service.isValid(user));
	}
	
	@Test
	public void IsValid_IfUserIsValid_ReturnsTrue() {
		User user = new User(1, "as@d.com", "pas2s", "fname", "lname", UserServiceImpl.adminRole);
		assertTrue(service.isValid(user));
	}
	
	@Test
	public void IsAdmin_IfUserIsNull_ReturnsFalse() {
		assertFalse(service.isAdmin(null));
	}
	
	@Test
	public void Isadmin_IfUserIsInvalid_ReturnsFalse() {
		User user = new User(1, "asd.com", "pas2s", "fname", "lname", UserServiceImpl.adminRole);
		assertFalse(service.isAdmin(user));
	}
	
	@Test
	public void Isadmin_IfUserTypeIsNotAdmin_ReturnsFalse() {
		User user = new User(1, "as@d.com", "pas2s", "fname", "lname", UserServiceImpl.groupLeaderRole);
		assertFalse(service.isAdmin(user));
	}
	
	@Test
	public void Isadmin_IfUserTypeIsAdmin_ReturnsTrue() {
		User user = new User(1, "as@d.com", "pas2s", "fname", "lname", UserServiceImpl.adminRole);
		assertTrue(service.isAdmin(user));
	}

	@Test
	public void Login_IfEmailIsNull_ReturnsNull() {
		assertNull(service.login(null, "pass"));
	}
	
	@Test
	public void Login_IfPasswordIsNull_ReturnsNull() {
		assertNull(service.login("a@b.com", null));
	}
	
	@Test
	public void Login_IfEmailIsInvalid_ReturnsNull() {
		assertNull(service.login("asd2@dd", "pass"));
	}
	
	@Test
	public void Login_IfPasswordIsInvalid_ReturnsNull() {
		assertNull(service.login("a@b.com", "aaa2@.ffa"));
	}
	
	@Test
	public void Login_IfRepoReturnsNull_ReturnsNull() {
		Mockito.when(mockedUserRepository.findByEmailAndPassword(
				Matchers.any(String.class), 
				Matchers.any(String.class))).thenReturn(null);
		
		assertNull(service.login("email@gmail.com", "validPass123"));
	}
	
	@Test
	public void Login_IfRepoReturnsNotNull_ReturnsNotNull() {
		Mockito.when(mockedUserRepository.findByEmailAndPassword(
				Matchers.any(String.class), 
				Matchers.any(String.class)))
		.thenReturn(new User(2, "a@b.com", "pass2", "fn", "ln", UserServiceImpl.adminRole));
		
		assertTrue(service.login("email@gmail.com", "validPass123").matches(JWTUtils.jwtRegex));
	}

	@Test
	public void GetGroupLeaders_IfRepoReturnsNull_ReturnsNull() {
		Mockito.when(mockedUserRepository.getGroupLeaders()).thenReturn(null);
		assertNull(service.getGroupLeaders());
	}
	
	@Test
	public void GetGroupLeaders_IfRepoReturnsNotNull_ReturnsNotNull() {
		ArrayList<User> leaders = new ArrayList<User>();
		leaders.add(new User());		
		Mockito.when(mockedUserRepository.getGroupLeaders()).thenReturn(leaders);				
		assertEquals(service.getGroupLeaders().size(), leaders.size());
	}
	
	@Test
	public void IsEmailTaken_IfArgumentIsNull_ReturnsFalse() {
		assertFalse(service.isEmailTaken(null));
	}
	
	@Test
	public void IsEmailTaken_IfArgumentIsInvalidEmail_ReturnsFalse() {
		assertFalse(service.isEmailTaken("aa@b"));
	}
	
	@Test
	public void IsEmailTaken_IfArgumentIsValidAndRepoReturnsNull_ReturnsFalse() {
		Mockito.when(mockedUserRepository.findByEmail(Matchers.anyString())).thenReturn(null);
		assertFalse(service.isEmailTaken("a@b.com"));
	}
	
	@Test
	public void IsEmailTaken_IfArgumentIsValidAndRepoReturnsNonNull_ReturnsTrue() {
		Mockito.when(mockedUserRepository.findByEmail(Matchers.anyString())).thenReturn(new User());
		assertTrue(service.isEmailTaken("a@b.com"));
	}
}
