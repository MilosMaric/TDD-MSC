package favila.utils;

import static org.junit.Assert.*;

import org.junit.Test;

public class JWTUtilsTest {

	@Test
	public void Pack_IfIdIsZero_ReturnsEmptyString() {
		String result = JWTUtils.pack(0);
		assertTrue(result.equals(""));
	}
	
	@Test
	public void Pack_IfIdIsLessThenZero_ReturnsEmptyString() {
		String result = JWTUtils.pack(-2);
		assertTrue(result.equals(""));
	}
	
	@Test
	public void Pack_IfIdValid_ReturnsValidJWT() {
		String result = JWTUtils.pack(3);
		Boolean isValidJWT = result.matches(JWTUtils.jwtRegex);
		assertTrue(isValidJWT);
	}
	
	@Test
	public void Unpack_IfTokenIsNull_ReturnsZeroId() {
		int result = JWTUtils.unpack(null);
		assertEquals(0, result);
	}
	
	@Test
	public void Unpack_IfTokenIsEmptyString_ReturnsZeroId() {
		int result = JWTUtils.unpack("");
		assertEquals(0, result);
	}
	
	@Test
	public void Unpack_IfTokenIsInvalid_ReturnsZeroId() {
		int result = JWTUtils.unpack("aaa.bbb");
		assertEquals(0, result);
	}
	
	@Test
	public void Unpack_IfTokenIsValid_ReturnsIdMoreThenZero() {
		int result = JWTUtils.unpack("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.v0kQvhfUkPFhPE-iO6dvWxVD7t0iri9FBpeYpJUtjcA");
		assertTrue(result > 0);
	}
}

//