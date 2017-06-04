package favila.utils;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import org.junit.Test;

public class CheckHelperTest {

	@Test
	public void IsFilled_IfNull_ReturnsFalse() {
		assertFalse(CheckHelper.isFilled(null));
	}
	
	@Test
	public void IsFilled_IfAnObjectInstance_ReturnsTrue() {
		assertTrue(CheckHelper.isFilled(new Object()));
	}
	
	@Test
	public void IsFilled_IfEmptyString_ReturnsFalse() {
		assertFalse(CheckHelper.isFilled(""));
	}
	
	@Test
	public void IsFilled_IfNotAnEmptyString_ReturnsTrue() {
		assertTrue(CheckHelper.isFilled("asd"));
	}
	
	@Test
	public void IsFilled_IfAnEmptyList_ReturnsFalse() {
		assertFalse(CheckHelper.isFilled(new ArrayList<>()));
	}
	
	@SuppressWarnings("serial")
	@Test
	public void IsFilled_IfNotAnEmptyList_ReturnsTrue() {
		assertTrue(CheckHelper.isFilled(new ArrayList<String>() {{
			add("one");
			add("two");
		}}));
	}
	
	@Test
	public void IsIdValid_IfIdIsZero_ReturnsFalse() {
		assertFalse(CheckHelper.isIdValid(0));
	}
	
	@Test
	public void IsIdValid_IfIdIsLessThenZero_ReturnsFalse() {
		assertFalse(CheckHelper.isIdValid(-2));
	}
	
	@Test
	public void IsIdValid_IfIdIsGreaterThenZero_ReturnsTrue() {
		assertTrue(CheckHelper.isIdValid(3));
	}
	
	@Test
	public void IsValidEmail_IfNull_ReturnsFalse() {
		assertFalse(CheckHelper.isValidEmail(null));
	}
	
	@Test
	public void IsValidEmail_IfSpaces_ReturnsFalse() {
		assertFalse(CheckHelper.isValidEmail("  "));
	}
	
	@Test
	public void IsValidEmail_IfInInvalidFormat_ReturnsFalse() {
		assertFalse(CheckHelper.isValidEmail("asd@ttw"));
	}
	
	@Test
	public void IsValidEmail_IfInValidFormat_ReturnsFalse() {
		assertTrue(CheckHelper.isValidEmail("a2sd@ttw.edu"));
	}
	
	@Test
	public void IsValidLetterString_IfNull_ReturnsFalse() {
		assertFalse(CheckHelper.isValidLettersString(null));
	}
	
	@Test
	public void IsValidLetterString_IfSpaces_ReturnsFalse() {
		assertFalse(CheckHelper.isValidLettersString("  "));
	}
	
	@Test
	public void IsValidLetterString_IfInInvalidFormat_ReturnsFalse() {
		assertFalse(CheckHelper.isValidLettersString("as23d@tt.w"));
	}
	
	@Test
	public void IsValidLetterString_IfInValidFormat_ReturnsFalse() {
		assertTrue(CheckHelper.isValidLettersString("asdttwedu"));
	}
	
	@Test
	public void isValidNoSpecialChars_IfNull_ReturnsFalse() {
		assertFalse(CheckHelper.isValidNoSpecialChars(null));
	}
	
	@Test
	public void isValidNoSpecialChars_IfSpaces_ReturnsFalse() {
		assertFalse(CheckHelper.isValidNoSpecialChars("  "));
	}
	
	@Test
	public void isValidNoSpecialChars_IfInInvalidFormat_ReturnsFalse() {
		assertFalse(CheckHelper.isValidNoSpecialChars("as23d@tt.w"));
	}
	
	@Test
	public void isValidNoSpecialChars_IfInValidFormat_ReturnsFalse() {
		assertTrue(CheckHelper.isValidNoSpecialChars("asdtt4124wedu"));
	}
	
	@Test
	public void IsValidInterval_IfParamsAreNotInterval_ReturnsFalse() {
		assertFalse(CheckHelper.isValidInterval(getFutureDate(), getPastDate()));
	}
	
	@Test
	public void IsValidInterval_IfParamsAreValidInterval_ReturnsTrue() {
		assertTrue(CheckHelper.isValidInterval(getPastDate(), getFutureDate()));
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
