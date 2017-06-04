package favila.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import favila.model.Concert;

@Repository
public interface IConcertRepository extends CrudRepository<Concert, Integer>{

}
