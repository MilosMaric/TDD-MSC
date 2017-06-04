package favila.dtos;

public class DailyScheduleDTO {

	public static final int SUNDAY = 1;
	public static final int MONDAY = 2;
	public static final int TUESDAY = 3;
	public static final int WEDNESDAY = 4;
	public static final int THURSDAY = 5;
	public static final int FRIDAY = 6;
	public static final int SATURDAY = 7;
	
	private int day;
	private int hour;
	private int minute;
	private int grpId;
	
	public DailyScheduleDTO() {}

	public DailyScheduleDTO(int day, int h, int m, int grpId) {
		super();
		this.day = day;
		this.hour = h;
		this.minute = m;
		this.grpId = grpId;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public int getGrpId() {
		return grpId;
	}

	public void setGrpId(int grpId) {
		this.grpId = grpId;
	}

	public int getMinute() {
		return minute;
	}

	public void setMinute(int minute) {
		this.minute = minute;
	}

	public int getHour() {
		return hour;
	}

	public void setHour(int hour) {
		this.hour = hour;
	}
}
