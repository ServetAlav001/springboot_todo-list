package com.servetalav.ToDolist.dto;

import jakarta.validation.constraints.NotBlank;

public class TaskRequestDTO {

    @NotBlank(message = "Başlık boş olamaz!")
    private String baslik;

    @NotBlank(message = "Açıklama boş olamaz!")
    private String aciklama;

    private boolean tamamlandi_mi;

    public String getBaslik() { return baslik; }
    public void setBaslik(String baslik) { this.baslik = baslik; }
    public String getAciklama() { return aciklama; }
    public void setAciklama(String aciklama) { this.aciklama = aciklama; }
    public boolean isTamamlandi_mi() { return tamamlandi_mi; }
    public void setTamamlandi_mi(boolean tamamlandi_mi) { this.tamamlandi_mi = tamamlandi_mi; }
}