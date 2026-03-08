package com.servetalav.ToDolist.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import javax.annotation.processing.Generated;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "baslık bos olamaz!")

    private String baslik;
    @NotBlank(message = "aciklama bos olamaz!")

    private String aciklama;
    private boolean tamamlandi_mi;


    public Task(Long id, String baslik, String aciklama, boolean tamamlandi_mi) {
        this.id = id;
        this.baslik = baslik;
        this.aciklama = aciklama;
        this.tamamlandi_mi = tamamlandi_mi;
    }

    public Task() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAciklama() {
        return aciklama;
    }

    public void setAciklama(String aciklama) {
        this.aciklama = aciklama;
    }

    public String getBaslik() {
        return baslik;
    }

    public void setBaslik(String baslik) {
        this.baslik = baslik;
    }

    public boolean isTamamlandi_mi() {
        return tamamlandi_mi;
    }

    public void setTamamlandi_mi(boolean tamamlandi_mi) {
        this.tamamlandi_mi = tamamlandi_mi;
    }

}
