package favila.repos;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import favila.model.Training;
import favila.services.TrainingServiceImpl;

@Repository
public interface ITrainingRepository extends CrudRepository<Training, Integer>{

	@Query("select e from Training e where e.group.id=:grpId order by e.time")
	ArrayList<Training> getTrainingsForGroup(@Param("grpId")int grpId);
	
	@Query("select e from Training e where e.type=" + TrainingServiceImpl.periodicTraining + " order by e.time")
	ArrayList<Training> getPeriodicTrainings();
	
	@Query("select e from Training e where e.time between :from and :to order by e.time asc")
	ArrayList<Training> getTrainingsForPeriod(@Param("from")Date from, @Param("to")Date to);
	
	@Query("select e from Training e where e.group.id=:grpId and e.time between :from and :to order by e.time asc")
	ArrayList<Training> getGroupTrainingsForPeriod(@Param("grpId")int grpId, @Param("from")Date from, @Param("to")Date to);
}
