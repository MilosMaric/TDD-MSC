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

import favila.dtos.DailyScheduleDTO;
import favila.model.Training;
import favila.model.User;
import favila.services.ITrainingService;
import favila.services.IUserService;

public class TrainingControllerTest {
	
	@InjectMocks
	private TrainingController ctrl;
	
	@Mock
	private ITrainingService service;
	
	@Mock
	private IUserService uService;
	
	@Before
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void Add_IfArgumentIsNull_ReturnsError() {
		assertFalse(ctrl.add(null).isOperationSuccedded());
	}
		
	@Test
	public void Add_IfAddingFailed_ReturnsError() {
		Mockito.when(service.add(Matchers.any(Training.class))).thenReturn(null);
		assertFalse(ctrl.add(new Training()).isOperationSuccedded());
	}
	
	@Test
	public void Add_IfAddingSucceded_ReturnsSuccess() {
		Mockito.when(service.add(Matchers.any(Training.class))).thenReturn(new Training());
		assertTrue(ctrl.add(new Training()).isOperationSuccedded());
	}
	
	@Test
	public void Update_IfArgumentIsNull_ReturnsFailure() {
		assertFalse(ctrl.update(null).isOperationSuccedded());
	}
	
	@Test
	public void Update_IfServiceUpdateFailed_ReturnsFailure() {
		Mockito.when(service.update(Matchers.any(Training.class))).thenReturn(null);
		assertFalse(ctrl.update(new Training()).isOperationSuccedded());
	}
	
	@Test
	public void Update_IfServiceUpdateSucceded_ReturnsSuccess() {
		Mockito.when(service.update(Matchers.any(Training.class))).thenReturn(new Training());
		assertTrue(ctrl.update(new Training()).isOperationSuccedded());
	}
	
	@Test
	public void GetAll_IfThereAreNoTrainings_ReturnsFailure() {
		Mockito.when(service.getAll()).thenReturn(null);
		assertFalse(ctrl.getAll().isOperationSuccedded());
	}
	
	@Test
	public void GetAll_IfThereAreTrainings_ReturnsSuccess() {
		ArrayList<Training> grps = new ArrayList<Training>();
		grps.add(new Training());
		grps.add(new Training());
		
		Mockito.when(service.getAll()).thenReturn(grps);
		assertTrue(ctrl.getAll().isOperationSuccedded());
	}
	
	@Test
	public void SetSchedule_IfJWTIsNull_ReturnsFailure() {
		assertFalse(ctrl.setSchedule(null, null).isOperationSuccedded());
	}
	
	@Test
	public void SetSchedule_IfJWTIsNotAdmin_ReturnsFailure() {
		Mockito.when(uService.isAdmin(Matchers.any(User.class))).thenReturn(false);
		assertFalse(ctrl.setSchedule(validJWT, null).isOperationSuccedded());
	}
	
	@Test
	public void SetSchedule_IfScheduleArgumentIsNull_ReturnsFailure() {
		Mockito.when(uService.isAdmin(Matchers.any(User.class))).thenReturn(true);
		assertFalse(ctrl.setSchedule(validJWT, null).isOperationSuccedded());
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void SetSchedule_IfSettingScheduleFailed_ReturnsFailure() {
		ArrayList<DailyScheduleDTO> schedule = new ArrayList<DailyScheduleDTO>();
		schedule.add(new DailyScheduleDTO());
		
		Mockito.when(uService.isAdmin(Matchers.any(User.class))).thenReturn(true);
		Mockito.when(service.setSchedule(Matchers.any(ArrayList.class))).thenReturn(false);
		assertFalse(ctrl.setSchedule(validJWT, schedule).isOperationSuccedded());
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void SetSchedule_IfSettingScheduleSucceded_ReturnsSuccess() {
		ArrayList<DailyScheduleDTO> schedule = new ArrayList<DailyScheduleDTO>();
		schedule.add(new DailyScheduleDTO());
		
		Mockito.when(uService.isAdmin(Matchers.any(User.class))).thenReturn(true);
		Mockito.when(service.setSchedule(Matchers.any(ArrayList.class))).thenReturn(true);
		assertTrue(ctrl.setSchedule(validJWT, schedule).isOperationSuccedded());
	}
	
	@Test
	public void CancelTraining_IfIdIsInvalid_ReturnsFailure() {
		assertFalse(ctrl.cancelTraining(0).isOperationSuccedded());
	}
	
	@Test
	public void CancelTraining_IfTrainingWithGivenIdDoesNotExist_ReturnsFailure() {
		Mockito.when(service.getById(Matchers.anyInt())).thenReturn(null);
		assertFalse(ctrl.cancelTraining(2).isOperationSuccedded());
	}
	
	@Test
	public void CancelTraining_IfServiceUpdateFailed_ReturnsFailure() {
		Training t = new Training();
		t.setIsCanceled(false);
		Mockito.when(service.getById(Matchers.anyInt())).thenReturn(t);
		Mockito.when(service.update(Matchers.any(Training.class))).thenReturn(null);
		assertFalse(ctrl.cancelTraining(2).isOperationSuccedded());
	}
	
	@Test
	public void CancelTraining_IfServiceUpdateSucceded_ReturnsSuccess() {
		Training t = new Training();
		t.setIsCanceled(false);
		Mockito.when(service.getById(Matchers.anyInt())).thenReturn(t);
		Mockito.when(service.update(Matchers.any(Training.class))).thenReturn(new Training());
		assertTrue(ctrl.cancelTraining(2).isOperationSuccedded());
	}
	
	private static final String validJWT = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIn0.mndZSeqieKl5yHgT7zJLl4QmCHOmCvgf_yj8bTxm6s0";
}
