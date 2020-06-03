package com.backend.Json;

public class Dashboard {
    private int availableTopics;
    private int inProgressTopics;
    private int actionRequiredTopics;
    private int finishedTopics;
    private int newMessages;

    public Dashboard(int availableTopics,int inProgressTopics,int actionRequiredTopics,int finishedTopics,int newMessages){
        this.availableTopics=availableTopics;
        this.inProgressTopics=inProgressTopics;
        this.actionRequiredTopics=actionRequiredTopics;
        this.finishedTopics=finishedTopics;
        this.newMessages=newMessages;
    }

    public int getAvailableTopics() {
        return availableTopics;
    }

    public void setAvailableTopics(int availableTopics) {
        this.availableTopics = availableTopics;
    }

    public int getInProgressTopics() {
        return inProgressTopics;
    }

    public void setInProgressTopics(int inProgressTopics) {
        this.inProgressTopics = inProgressTopics;
    }

    public int getActionRequiredTopics() {
        return actionRequiredTopics;
    }

    public void setActionRequiredTopics(int actionRequiredTopics) {
        this.actionRequiredTopics = actionRequiredTopics;
    }

    public int getFinishedTopics() {
        return finishedTopics;
    }

    public void setFinishedTopics(int finishedTopics) {
        this.finishedTopics = finishedTopics;
    }

    public int getNewMessages() {
        return newMessages;
    }

    public void setNewMessages(int newMessages) {
        this.newMessages = newMessages;
    }
}
