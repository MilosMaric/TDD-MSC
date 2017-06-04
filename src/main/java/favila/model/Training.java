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
@Table(name="trainings")
public class Training {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "training_id")
	private int id;
	
	@Column(name = "training_time", nullable=false)
	private Date time;
	
	@Column(name = "training_type", nullable=false)
	private String type;
	
	@Column(name = "training_canceled", nullable=false)
	private Boolean isCanceled;
	
	@Column(name = "training_desc", nullable=true)
	private String description;
	
	@Column(name = "training_notes", nullable=true)
	private String notes;
	
	@ManyToOne
	@JoinColumn(name = "training_group", referencedColumnName = "group_id", nullable = false)
	private Group group;
	
	public Training() {}

	public Training(int id, Date time, String description, Group group, String type) {
		super();
		this.id = id;
		this.time = time;
		this.description = description;
		this.group = group;
		this.type = type;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Boolean getIsCanceled() {
		return isCanceled;
	}

	public void setIsCanceled(Boolean isCanceled) {
		this.isCanceled = isCanceled;
	}
}
