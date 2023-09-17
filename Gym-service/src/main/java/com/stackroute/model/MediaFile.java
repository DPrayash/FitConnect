package com.stackroute.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "MediaCollection")
public class MediaFile {

	@Id
	@Field("mediaId")
	private String mediaId;
	private String mediaName;
	private String mediaCategory;
	private String mediaUrl;
	
	
    public String getMediaId() {
		return mediaId;
	}


	public void setMediaId(String mediaId) {
		this.mediaId = mediaId;
	}


	public String getMediaName() {
		return mediaName;
	}


	@Override
	public String toString() {
		return "MediaFile [mediaId=" + mediaId + ", mediaName=" + mediaName + ", mediaCategory=" + mediaCategory
				+ ", mediaUrl=" + mediaUrl + "]";
	}


	public void setMediaName(String mediaName) {
		this.mediaName = mediaName;
	}


	public String getMediaCategory() {
		return mediaCategory;
	}


	public void setMediaCategory(String mediaCategory) {
		this.mediaCategory = mediaCategory;
	}


	public String getMediaUrl() {
		return mediaUrl;
	}


	public void setMediaUrl(String mediaUrl) {
		this.mediaUrl = mediaUrl;
	}


	public void update(MediaFile updatedMediaFile) {
        if (updatedMediaFile.getMediaName() != null) {
            this.setMediaName(updatedMediaFile.getMediaName());
        }
        if (updatedMediaFile.getMediaCategory() != null) {
            this.setMediaCategory(updatedMediaFile.getMediaCategory());
        }
        if (updatedMediaFile.getMediaUrl() != null) {
            this.setMediaUrl(updatedMediaFile.getMediaUrl());
        }
    }


	public MediaFile(String mediaId, String mediaName, String mediaCategory, String mediaUrl) {
		super();
		this.mediaId = mediaId;
		this.mediaName = mediaName;
		this.mediaCategory = mediaCategory;
		this.mediaUrl = mediaUrl;
	}


	public MediaFile() {
		// TODO Auto-generated constructor stub
	}
	
    
}
