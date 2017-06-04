package favila.services;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import favila.model.Group;

public class GroupServiceTest {

	private GroupServiceImpl service;
	
	@Before
	public void initMocks() {
		service = new GroupServiceImpl();
	}
	
	@Test
	public void IsValid_IfArgumentIsNull_ReturnsFalse() {
		assertFalse(service.isValid(null));
	}
	
	@Test
	public void IsValid_IfArgumentHasInvalidName_ReturnsFalse() {
		Group grp = new Group(2, "Izvodjacki2", "desc", GroupServiceImpl.dancingGroup); 
		assertFalse(service.isValid(grp));
	}
	
	@Test
	public void IsValid_IfArgumentHasInvalidDescription_ReturnsFalse() {
		Group grp = new Group(2, "Izvodjacki", "", GroupServiceImpl.dancingGroup); 
		assertFalse(service.isValid(grp));
	}
	
	@Test
	public void IsValid_IfArgumentHasInvalidType_ReturnsFalse() {
		Group grp = new Group(2, "Izvodjacki", "desc", "random"); 
		assertFalse(service.isValid(grp));
	}
	
	@Test
	public void IsValid_IfArgumentIsValid_ReturnsTrue() {
		Group grp = new Group(2, "Izvodjacki", "desc", GroupServiceImpl.dancingGroup); 
		assertTrue(service.isValid(grp));
	}
}
