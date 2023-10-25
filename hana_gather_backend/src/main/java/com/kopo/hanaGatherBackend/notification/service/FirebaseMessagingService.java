package com.kopo.hanaGatherBackend.notification.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class FirebaseMessagingService {

    private final FirebaseMessaging firebaseMessaging;

    public FirebaseMessagingService(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }


    public void sendMessage(String target, String title, String body) {
        try {
            Message message = makeMessage(target, title, body);
            firebaseMessaging.send(message);
        } catch (Exception ex) {
            ex.printStackTrace();
            log.info("notification 발송 실패");
        }
    }

    private Message makeMessage(String target, String title, String body) {
        Notification notification = Notification.builder().setTitle(title).setBody(body).build();
        Message message = Message.builder().setToken(target).setNotification(notification).build();
        return message;
    }
}
