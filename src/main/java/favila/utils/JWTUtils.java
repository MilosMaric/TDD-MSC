package favila.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTUtils {
	private static String key = "LAKSDJLAKSJalasdksjdlaskjdla";
	public static String jwtRegex = ".+\\..+\\..+";

	public static String pack(int id) {
		if(CheckHelper.isIdValid(id)) {
			String jwt = Jwts.builder().setSubject(id + "").signWith(SignatureAlgorithm.HS256, key).compact();
			return jwt;
		}

		return "";
	}

	public static int unpack(String token) {
		if(CheckHelper.isFilled(token) && token.matches(jwtRegex)) {
			String tokenContent = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();		
			int id = Integer.parseInt(tokenContent);
			return id;
		}
		
		return 0;
	}

}
