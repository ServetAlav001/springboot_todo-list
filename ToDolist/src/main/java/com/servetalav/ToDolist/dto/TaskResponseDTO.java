package com.servetalav.ToDolist.dto;

public class TaskResponseDTO {

    private Long id;
    private String baslik;
    private String aciklama;
    private boolean tamamlandi_mi;

    public TaskResponseDTO(Long id, String baslik, String aciklama, boolean tamamlandi_mi) {
        this.id = id;
        this.baslik = baslik;
        this.aciklama = aciklama;
        this.tamamlandi_mi = tamamlandi_mi;
    }

    public Long getId() { return id; }
    public String getBaslik() { return baslik; }
    public String getAciklama() { return aciklama; }
    public boolean isTamamlandi_mi() { return tamamlandi_mi; }
}