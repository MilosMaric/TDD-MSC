package favila.services;

import java.util.ArrayList;
import java.util.Date;

import favila.dtos.DailyScheduleDTO;
import favila.model.Training;

public interface ITrainingService extends IGenericService<Training>{
	ArrayList<Training> getTrainingsForGroup(int grpId);	
	ArrayList<Training> getTrainingsForPeriod(Date from, Date to);
	ArrayList<Training> getTrainingsForPeriodAndGroup(Date from, Date to, int grpId);
	boolean setSchedule(ArrayList<DailyScheduleDTO> schedule);
}
