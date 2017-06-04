package favila.utils;

import static org.junit.Assert.*;

import org.junit.Test;

public class GenericResponseTest {

	@Test
	public void GenericResponse_ReturnsPayloadNullAndErrorMessageEmpty() {
		GenericResponse<Object> response = new GenericResponse<Object>();
		String msg = response.getErrorMessage();
		Object payload = response.getPayload();
		assertTrue(msg.equals("") && payload == null);
	}
	
	@Test
	public void Error_IfHasNoParameter_ReturnsPayloadNullAndErrorMessageEmptyAndOpSucFalse() {
		GenericResponse<Object> response = new GenericResponse<Object>().error();
		String msg = response.getErrorMessage();
		Object payload = response.getPayload();
		
		assertTrue(msg.equals("") && payload == null && !response.isOperationSuccedded());
	}
	
	@Test
	public void Error_IfHasParameter_ReturnsPayloadNullAndErrorMessageNonEmptyAndOpSucFalse() {
		GenericResponse<Object> response = new GenericResponse<Object>().error("Message");
		String msg = response.getErrorMessage();
		Object payload = response.getPayload();
		
		assertTrue(!msg.equals("") && payload == null && !response.isOperationSuccedded());
	}
	
	@Test
	public void Success_IfHasParameter_ReturnsErrorMessageEmptyAndOpSucTrue() {
		Object o = new Object();
		GenericResponse<Object> response = new GenericResponse<Object>().success(o);
		String msg = response.getErrorMessage();
		Object payload = response.getPayload();
		
		assertTrue(msg.equals("") && payload == o && response.isOperationSuccedded());
	}
}
