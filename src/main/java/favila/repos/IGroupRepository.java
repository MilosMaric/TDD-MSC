package favila.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import favila.model.Group;

@Repository
public interface IGroupRepository extends CrudRepository<Group, Integer>{

}
