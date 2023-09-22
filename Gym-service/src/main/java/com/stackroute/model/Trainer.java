package com.stackroute.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

//import lombok.AllArgsConstructor;
import lombok.Data;
//import lombok.NoArgsConstructor;

@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Document(collection = "TrainerCollection")
public class Trainer {

    @Id
    @Field("trainerId")
    private String trainerId;
    private String trainerName;
    private String trainerCategory;
    private String trainerBio;
    private String trainerImage;

    @Override
	public String toString() {
		return "Trainer [trainerId=" + trainerId + ", trainerName=" + trainerName + ", trainerCategory="
				+ trainerCategory + ", trainerBio=" + trainerBio + ", trainerImage=" + trainerImage + "]";
	}

	public String getTrainerId() {
		return trainerId;
	}

	public void setTrainerId(String trainerId) {
		this.trainerId = trainerId;
	}

	public String getTrainerName() {
		return trainerName;
	}

	public void setTrainerName(String trainerName) {
		this.trainerName = trainerName;
	}

	public String getTrainerCategory() {
		return trainerCategory;
	}

	public void setTrainerCategory(String trainerCategory) {
		this.trainerCategory = trainerCategory;
	}

	public String getTrainerBio() {
		return trainerBio;
	}

	public void setTrainerBio(String trainerBio) {
		this.trainerBio = trainerBio;
	}

	public String getTrainerImage() {
		return trainerImage;
	}

	public void setTrainerImage(String trainerImage) {
		this.trainerImage = trainerImage;
	}

	public void update(Trainer updatedTrainer) {
        if (updatedTrainer.getTrainerName() != null) {
            this.setTrainerName(updatedTrainer.getTrainerName());
        }
        if (updatedTrainer.getTrainerCategory() != null) {
            this.setTrainerCategory(updatedTrainer.getTrainerCategory());
        }
        if (updatedTrainer.getTrainerBio() != null) {
            this.setTrainerBio(updatedTrainer.getTrainerBio());
        }
        if (updatedTrainer.getTrainerImage() != null) {
        	this.setTrainerImage(updatedTrainer.getTrainerImage());
        }
    }

	public Trainer(String trainerId, String trainerName, String trainerCategory, String trainerBio,
			String trainerImage) {
		super();
		this.trainerId = trainerId;
		this.trainerName = trainerName;
		this.trainerCategory = trainerCategory;
		this.trainerBio = trainerBio;
		this.trainerImage = trainerImage;
	}

	public Trainer() {
		// TODO Auto-generated constructor stub
	}
	
}
