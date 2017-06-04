package favila.ctrls;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import favila.dtos.LoginInfoDTO;
import favila.model.User;
import favila.services.IUserService;

public class UserControllerTest {

	@InjectMocks
	private UserController ctrl;
	
	@Mock
	private IUserService service;
	
	@Before
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void Add_IfArgumentIsNull_ReturnsError() {
		assertFalse(ctrl.add(null).isOperationSuccedded());
	}
	
	@Test
	public void Add_IfEmailIsTaken_ReturnsError() {
		Mockito.when(service.isEmailTaken(Matchers.anyString())).thenReturn(true);
		assertFalse(ctrl.add(new User()).isOperationSuccedded());
	}
	
	@Test
	public void Add_IfEmailIsNotTakenAndAddingFailed_ReturnsError() {
		Mockito.when(service.isEmailTaken(Matchers.anyString())).thenReturn(false);
		Mockito.when(service.add(Matchers.any(User.class))).thenReturn(null);
		assertFalse(ctrl.add(new User()).isOperationSuccedded());
	}
	
	@Test
	public void Add_IfEmailIsNotTakenAndAddingSucceded_ReturnsSuccess() {
		Mockito.when(service.isEmailTaken(Matchers.anyString())).thenReturn(false);
		Mockito.when(service.add(Matchers.any(User.class))).thenReturn(new User());
		assertTrue(ctrl.add(new User()).isOperationSuccedded());
	}
	
	@Test
	public void Update_IfArgumentIsNull_ReturnsFailure() {
		assertFalse(ctrl.update(null).isOperationSuccedded());
	}
	
	@Test
	public void Update_IfServiceUpdateFailed_ReturnsFailure() {
		Mockito.when(service.update(Matchers.any(User.class))).thenReturn(null);
		assertFalse(ctrl.update(new User()).isOperationSuccedded());
	}
	
	@Test
	public void Update_IfServiceUpdateSucceded_ReturnsSuccess() {
		Mockito.when(service.update(Matchers.any(User.class))).thenReturn(new User());
		assertTrue(ctrl.update(new User()).isOperationSuccedded());
	}
	
	@Test
	public void GetGroupLeaders_IfJWTIsNull_ReturnsFailure() {
		assertFalse(ctrl.getGroupLeaders(null).isOperationSuccedded());
	}
	
	@Test
	public void GetGroupLeaders_IfJWTIsInvalid_ReturnsFailure() {
		assertFalse(ctrl.getGroupLeaders("lajlsdkjasldkjalsk").isOperationSuccedded());
	}
	
	@Test
	public void GetGroupLeaders_IfJWTIsValidWithAnInvalidId_ReturnsFailure() {
		Mockito.when(service.getById(Matchers.anyInt())).thenReturn(null);
		assertFalse(ctrl.getGroupLeaders(validJWT).isOperationSuccedded());
	}
	
	@Test
	public void GetGroupLeaders_IfJWTIsValidNonAdminUser_ReturnsFailure() {
		Mockito.when(service.isAdmin(Matchers.any(User.class))).thenReturn(false);
		assertFalse(ctrl.getGroupLeaders(validJWT).isOperationSuccedded());
	}
	
	@Test
	public void GetGroupLeaders_IfJWTIsValidAdminUserAndThereAreNoGroupLeaders_ReturnsFailure() {
		Mockito.when(service.isAdmin(Matchers.any(User.class))).thenReturn(true);
		Mockito.when(service.getGroupLeaders()).thenReturn(null);
		assertFalse(ctrl.getGroupLeaders(validJWT).isOperationSuccedded());
	}
	
	@Test
	public void GetGroupLeaders_IfJWTIsValidAdminUserAndThereAreGroupLeaders_ReturnsSuccess() {
		ArrayList<User> gLeads = new ArrayList<User>();
		gLeads.add(new User());
		gLeads.add(new User());
		
		Mockito.when(service.isAdmin(Matchers.any(User.class))).thenReturn(true);
		Mockito.when(service.getGroupLeaders()).thenReturn(gLeads);
		assertTrue(ctrl.getGroupLeaders(validJWT).isOperationSuccedded());
	}
	
	@Test
	public void Login_IfArgumentIsNull_ReturnsFailure() {
		assertFalse(ctrl.login(null).isOperationSuccedded());
	}
	
	@Test
	public void Login_IfCredentialsAreInvalid_ReturnsFailure() {
		Mockito.when(service.login(Matchers.anyString(), Matchers.anyString())).thenReturn(null);
		assertFalse(ctrl.login(new LoginInfoDTO()).isOperationSuccedded());
	}
	
	@Test
	public void Login_IfCredentialsAreValid_ReturnsFailure() {
		Mockito.when(service.login(Matchers.anyString(), Matchers.anyString())).thenReturn(validJWT);
		assertTrue(ctrl.login(new LoginInfoDTO()).isOperationSuccedded());
	}
	
	@Test
	public void GetLoggedUser_IfJWTIsNull_ReturnsFailure() {
		assertFalse(ctrl.getLoggedUser(null).isOperationSuccedded());
	}
	
	@Test
	public void GetLoggedUser_IfJWTIsInvalid_ReturnsFailure() {
		assertFalse(ctrl.getLoggedUser("lajlsdkjasldkjalsk").isOperationSuccedded());
	}
	
	@Test
	public void GetLoggedUser_IfJWTIsValidWithAnNonExistingId_ReturnsFailure() {
		Mockito.when(service.getById(Matchers.anyInt())).thenReturn(null);
		assertFalse(ctrl.getLoggedUser(validJWT).isOperationSuccedded());
	}
	
	@Test
	public void GetLoggedUser_IfJWTIsValidWithAnNonExistingId_ReturnsSuccess() {
		Mockito.when(service.getById(Matchers.anyInt())).thenReturn(new User());
		assertTrue(ctrl.getLoggedUser(validJWT).isOperationSuccedded());
	}
	
	private static final String validJWT = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIn0.mndZSeqieKl5yHgT7zJLl4QmCHOmCvgf_yj8bTxm6s0";
}
