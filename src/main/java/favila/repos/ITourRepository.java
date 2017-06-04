package favila.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import favila.model.Tour;

@Repository
public interface ITourRepository extends CrudRepository<Tour, Integer>{

}
