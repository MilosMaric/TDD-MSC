package favila.utils;

import java.util.ArrayList;
import java.util.Date;

public class CheckHelper {

	public static String emailRegex = "\\w+\\@[A-Za-z]+\\.[A-Za-z]{2,4}";
	public static String lettersRegex = "[A-Za-zčćžđšŽĐŠĆČ ]+";	
	public static String lettersAndNumbersRegex = "[A-Za-z0-9ŽĐŠĆČćčžđš ]+";
	
	@SuppressWarnings("rawtypes")
	public static Boolean isFilled(Object object) {
		if(object instanceof ArrayList) {
			return ((ArrayList)object).size() > 0;
		}
		if(object instanceof String) {
				return object.toString().trim().length() > 0;
		} 
		if(object instanceof Object) {
			return true;
		}
		
		return false;
	}

	public static boolean isIdValid(int i) {
		return i > 0;
	}
	
	public static boolean isValidEmail(String email) {
		return isFilled(email) && email.matches(emailRegex);
	}
	
	public static boolean isValidLettersString(String word) {
		return isFilled(word) && word.matches(lettersRegex);
	}
	
	public static boolean isValidNoSpecialChars(String word) {
		return isFilled(word) && word.matches(lettersAndNumbersRegex);
	}

	public static boolean isValidInterval(Date from, Date to) {		
		return isFilled(from) && isFilled(to) && from.before(to);
	}
}
