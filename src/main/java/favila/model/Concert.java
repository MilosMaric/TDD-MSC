package favila.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="concerts")
public class Concert {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "concert_id")
	private int id;
	
	@Column(name = "concert_name", nullable=false)
	private String name;
	
	@Column(name = "concert_desc", nullable=false)
	private String description;
	
	@Column(name = "concert_time", nullable=false)
	private Date time;
	
	@ManyToOne
	@JoinColumn(name = "concert_group", referencedColumnName = "group_id", nullable = false)
	private Group group;
	
	public Concert() {}

	public Concert(int id, String name, String description, Date time, Group group) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.time = time;
		this.group = group;
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

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}
}
