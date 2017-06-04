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

import favila.model.Group;
import favila.model.Training;
import favila.services.GroupServiceImpl;
import favila.services.IGroupService;
import favila.services.ITrainingService;

public class GroupControllerTest {

	@InjectMocks
	private GroupController ctrl;
	
	@Mock
	private IGroupService service;

	@Mock
	private ITrainingService trainingService;
	
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
		Mockito.when(service.add(Matchers.any(Group.class))).thenReturn(null);
		assertFalse(ctrl.add(new Group()).isOperationSuccedded());
	}
	
	@Test
	public void Add_IfAddingSucceded_ReturnsSuccess() {
		Mockito.when(service.add(Matchers.any(Group.class))).thenReturn(new Group());
		assertTrue(ctrl.add(new Group()).isOperationSuccedded());
	}
	
	@Test
	public void Update_IfArgumentIsNull_ReturnsFailure() {
		assertFalse(ctrl.update(null).isOperationSuccedded());
	}
	
	@Test
	public void Update_IfServiceUpdateFailed_ReturnsFailure() {
		Mockito.when(service.update(Matchers.any(Group.class))).thenReturn(null);
		assertFalse(ctrl.update(new Group()).isOperationSuccedded());
	}
	
	@Test
	public void Update_IfServiceUpdateSucceded_ReturnsSuccess() {
		Mockito.when(service.update(Matchers.any(Group.class))).thenReturn(new Group());
		assertTrue(ctrl.update(new Group()).isOperationSuccedded());
	}
	
	@Test
	public void GetAll_IfThereAreNoGroups_ReturnsFailure() {
		Mockito.when(service.getAll()).thenReturn(null);
		assertFalse(ctrl.getAll().isOperationSuccedded());
	}
	
	@Test
	public void GetAll_IfThereAreGroups_ReturnsSuccess() {
		ArrayList<Group> grps = new ArrayList<Group>();
		grps.add(new Group());
		grps.add(new Group());
		
		Mockito.when(service.getAll()).thenReturn(grps);
		assertTrue(ctrl.getAll().isOperationSuccedded());
	}
	
	@Test
	public void GetAllTrainingsForGroup_IfIdIsInvalid_ReturnsFailure() {
		assertFalse(ctrl.getAllTrainingsForGroup(0).isOperationSuccedded());
	}
	
	@Test
	public void GetAllTrainingsForGroup_IfIdIsValidButGivenGroupDoesNotExist_ReturnsFailure() {
		Mockito.when(service.getById(Matchers.anyInt())).thenReturn(null);
		assertFalse(ctrl.getAllTrainingsForGroup(5).isOperationSuccedded());
	}
	
	@Test
	public void GetAllTrainingsForGroup_IfThereAreNoTrainingsForGivenGroup_ReturnsFailure() {
		Mockito.when(service.getById(Matchers.anyInt())).thenReturn(validGrp);
		Mockito.when(trainingService.getTrainingsForGroup(Matchers.anyInt())).thenReturn(null);
		assertFalse(ctrl.getAllTrainingsForGroup(5).isOperationSuccedded());
	}
	
	@Test
	public void GetAllTrainingsForGroup_IfThereAreTrainingsForGivenGroup_ReturnsSuccess() {
		Mockito.when(service.getById(Matchers.anyInt())).thenReturn(validGrp);
		ArrayList<Training> trainings = new ArrayList<Training>();
		trainings.add(new Training());
		trainings.add(new Training());
		
		Mockito.when(trainingService.getTrainingsForGroup(Matchers.anyInt())).thenReturn(trainings);
		assertTrue(ctrl.getAllTrainingsForGroup(5).isOperationSuccedded());
	}
	
	private static final Group validGrp = new Group(5, "Izvodjaci", "Prvi sastav", GroupServiceImpl.dancingGroup);
}
