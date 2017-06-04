package favila.services;

import java.util.ArrayList;

public interface IGenericService<T> {

	T getById(int id);
	ArrayList<T> getAll();
	T add(T entity);
	T update(T entity);
	boolean delete(T entity);
	boolean isValid(T entity);
}
