package favila.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="groups")
public class Group {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "group_id")
	private int id;
	
	@Column(name = "group_name", nullable=false)
	private String name;
	
	@Column(name = "group_desc", nullable=false)
	private String description;
	
	@Column(name = "group_type", nullable=false)
	private String type;
	
	public Group() {}

	public Group(int id, String name, String description, String type) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.type = type;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
