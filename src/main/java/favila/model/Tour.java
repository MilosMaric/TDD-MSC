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
@Table(name="tours")
public class Tour {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "tour_id")
	private int id;
	
	@Column(name = "tour_name", nullable=false)
	private String name;
	
	@Column(name = "tour_desc", nullable=false)
	private String description;
	
	@Column(name = "tour_from", nullable=false)
	private Date from;
	
	@Column(name = "tour_to", nullable=false)
	private Date to;
	
	@ManyToOne
	@JoinColumn(name = "tour_group", referencedColumnName = "group_id", nullable = false)
	private Group group;
	
	public Tour() {}

	public Tour(int id, String name, String description, Date from, Date to, Group group) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.from = from;
		this.to = to;
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

	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}
}
