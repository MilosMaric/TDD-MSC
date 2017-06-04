package favila.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import favila.dtos.DailyScheduleDTO;
import favila.model.Group;
import favila.model.Training;
import favila.repos.IGroupRepository;
import favila.repos.ITrainingRepository;

public class TrainingServiceTest {

	@InjectMocks
	private TrainingServiceImpl service;
	
	@Mock
	private ITrainingRepository repo;
	
	@Mock
	private IGroupRepository grpRepo;
	
	@Before
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void IsValid_IfTrainingIsNull_ReturnsFalse() {
		assertFalse(service.isValid(null));
	}
	
	@Test
	public void IsValid_IfTrainingIsInvalid_ReturnsFalse() {
		assertFalse(service.isValid(new Training(2, new Date(), "desc", null, "someType")));
	}
	
	@Test
	public void IsValid_IfTrainingIsValid_ReturnsTrue() {
		assertTrue(service.isValid(new Training(2, new Date(), "desc", new Group(), TrainingServiceImpl.individualTraining)));
	}
	
	@Test
	public void GetTrainingsForGroup_IfIdIsInvalid_ReturnsNull() {
		assertNull(service.getTrainingsForGroup(-1));
	}
	
	@Test
	public void GetTrainingsForGroup_IfIdIsValidAndRepoReturnsNull_ReturnsNull() {
		Mockito.when(repo.getTrainingsForGroup(Matchers.anyInt())).thenReturn(null);
		assertNull(service.getTrainingsForGroup(3));
	}
	
	@Test
	public void GetTrainingsForGroup_IfIdIsValidAndRepoReturnsEmptyList_ReturnsNull() {
		Mockito.when(repo.getTrainingsForGroup(Matchers.anyInt())).thenReturn(new ArrayList<Training>());
		assertNull(service.getTrainingsForGroup(3));
	}
	
	@Test
	public void GetTrainingsForGroup_IfIdIsValidAndRepoReturnsFilledList_ReturnsWhatRepoReturned() {
		ArrayList<Training> trainings = new ArrayList<Training>();
		trainings.add(new Training());
		trainings.add(new Training());
		
		Mockito.when(repo.getTrainingsForGroup(Matchers.anyInt())).thenReturn(trainings);
		assertEquals(trainings.size(), service.getTrainingsForGroup(3).size());
	}
	
	@Test
	public void GetTrainingsForPeriod_IfAnyArgumentIsNull_ReturnsNull() {				
		assertNull(service.getTrainingsForPeriod(getPastDate(), null));
	}
	
	@Test
	public void GetTrainingsForPeriod_IfArgumentIsValidAndRepoReturnsNull_ReturnsNull() {
		Mockito.when(repo.getTrainingsForPeriod(Matchers.any(Date.class), Matchers.any(Date.class))).thenReturn(null);
		assertNull(service.getTrainingsForPeriod(getPastDate(), getFutureDate()));
	}
	
	@Test
	public void GetTrainingsForPeriod_IfArgumentIsValidAndRepoReturnsEmptyList_ReturnsNull() {
		Mockito.when(repo.getTrainingsForPeriod(Matchers.any(Date.class), Matchers.any(Date.class))).thenReturn(new ArrayList<Training>());
		assertNull(service.getTrainingsForPeriod(getPastDate(), getFutureDate()));
	}
	
	@Test
	public void GetTrainingsForPeriod_IfArgumentsAreNotValidInterval_ReturnsNull() {	
		assertNull(service.getTrainingsForPeriod(getFutureDate(), getPastDate()));
	}
	
	@Test
	public void GetTrainingsForPeriod_IfArgumentIsValidAndRepoReturnsNonEmptyList_ReturnsWhatRepoReturned() {
		ArrayList<Training> trainings = new ArrayList<Training>();
		trainings.add(new Training());
		trainings.add(new Training());
		trainings.add(new Training());
		
		Mockito.when(repo.getTrainingsForPeriod(Matchers.any(Date.class), Matchers.any(Date.class))).thenReturn(trainings);
		assertEquals(service.getTrainingsForPeriod(getPastDate(), getFutureDate()).size(), trainings.size());
	}
	
	@Test
	public void getTrainingsForPeriodAndGroup_IfIdIsInvalid_ReturnsNull() {
		assertNull(service.getTrainingsForPeriodAndGroup(getPastDate(), getFutureDate(), -1));
	}
	
	@Test
	public void getTrainingsForPeriodAndGroup_IfPeriodIsInvalid_ReturnsNull() {
		assertNull(service.getTrainingsForPeriodAndGroup(getFutureDate(), getPastDate(), 2));
	}
	
	@Test
	public void getTrainingsForPeriodAndGroup_IfArgumentIsValidAndRepoReturnsNull_ReturnsNull() {
		Mockito.when(repo.getGroupTrainingsForPeriod(Matchers.anyInt(), Matchers.any(Date.class), Matchers.any(Date.class))).thenReturn(null);
		assertNull(service.getTrainingsForPeriodAndGroup(getPastDate(), getFutureDate(), 2));
	}
	
	@Test
	public void GetTrainingsForPeriodAndGroup_IfArgumentIsValidAndRepoReturnsEmptyList_ReturnsNull() {
		Mockito.when(repo.getGroupTrainingsForPeriod(Matchers.anyInt(), Matchers.any(Date.class), Matchers.any(Date.class))).thenReturn(new ArrayList<Training>());
		assertNull(service.getTrainingsForPeriodAndGroup(getPastDate(), getFutureDate(), 2));
	}
	
	@Test
	public void GetTrainingsForPeriodAndGroup_IfArgumentsAreNotValidInterval_ReturnsNull() {	
		assertNull(service.getTrainingsForPeriodAndGroup(getFutureDate(), getPastDate(), 2));
	}
	
	@Test
	public void GetTrainingsForPeriodAndGroup_IfArgumentIsValidAndRepoReturnsNonEmptyList_ReturnsWhatRepoReturned() {
		ArrayList<Training> trainings = new ArrayList<Training>();
		trainings.add(new Training());
		trainings.add(new Training());
		trainings.add(new Training());
		
		Mockito.when(repo.getGroupTrainingsForPeriod(Matchers.anyInt(), Matchers.any(Date.class), Matchers.any(Date.class))).thenReturn(trainings);
		assertEquals(service.getTrainingsForPeriodAndGroup(getPastDate(), getFutureDate(), 2).size(), trainings.size());
	}

	@Test
	public void SetSchedule_IfArgumentIsNull_ReturnsFalse() {
		assertFalse(service.setSchedule(null));
	}
	
	@Test
	public void SetSchedule_IfArgumentIsEmptyList_ReturnsFalse() {
		assertFalse(service.setSchedule(new ArrayList<DailyScheduleDTO>()));
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void SetSchedule_IfArgumentsAreValidAndRepoSaveReturnsNull_ReturnsFalse() {
		Mockito.when(repo.save(Matchers.anyCollection())).thenReturn(null);
		Mockito.when(grpRepo.findOne(Matchers.anyInt())).thenReturn(new Group());
		ArrayList<DailyScheduleDTO> schedule = new ArrayList<DailyScheduleDTO>();
		schedule.add(new DailyScheduleDTO(DailyScheduleDTO.MONDAY, 14, 30, 2));
		
		assertFalse(service.setSchedule(schedule));
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void SetSchedule_IfArgumentsAreValidAndRepoSaveReturnsNotNull_ReturnsTrue() {
		ArrayList<Training> trs = new ArrayList<Training>();
		trs.add(new Training());
		
		Mockito.when(repo.save(Matchers.anyCollection())).thenReturn(trs);
		Mockito.when(grpRepo.findOne(Matchers.anyInt())).thenReturn(new Group());
		ArrayList<DailyScheduleDTO> schedule = new ArrayList<DailyScheduleDTO>();
		schedule.add(new DailyScheduleDTO(DailyScheduleDTO.MONDAY, 20, 30, 2));
		schedule.add(new DailyScheduleDTO(DailyScheduleDTO.FRIDAY, 20, 30, 2));
		
		assertTrue(service.setSchedule(schedule));
	}
	
	private Date getPastDate() {
		Calendar c = Calendar.getInstance();
		c.set(2012, 2, 2);
		return c.getTime();
	}
	
	private Date getFutureDate() {
		Calendar c = Calendar.getInstance();
		int y = c.get(Calendar.YEAR);
		c.set(Calendar.YEAR, y + 1);
		return c.getTime();
	}
}
