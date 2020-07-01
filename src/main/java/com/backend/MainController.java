package com.backend;

import com.backend.Json.*;
import com.backend.db.UserType;
import com.backend.db.AcceptanceRequest.AcceptanceRequest;
import com.backend.db.AcceptanceRequest.AcceptanceRequestRepo;
import com.backend.db.Conversation.Conversation;
import com.backend.db.Conversation.ConversationRepo;
import com.backend.db.Lecturer.Lecturer;
import com.backend.db.Lecturer.LecturerRepo;
import com.backend.db.Message.Message;
import com.backend.db.Message.MessageRepo;
import com.backend.db.Student.Student;
import com.backend.db.Student.StudentRepo;
import com.backend.db.Topic.Topic;
import com.backend.db.Topic.TopicRepo;
import com.backend.db.User.User;
import com.backend.db.User.UserRepo;
import com.backend.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.*;

import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.ArrayList;
import java.util.List;

/**
 * Controller for all non-authorization endpoints
 */
@Controller
@SpringBootApplication
@RequestMapping("/rest-services")
public class MainController extends SpringBootServletInitializer {

    @Autowired
    StudentRepo studentRepo;
    @Autowired
    TopicRepo topicRepo;
    @Autowired
    LecturerRepo lecturerRepo;
    @Autowired
    AcceptanceRequestRepo acceptanceRequestRepo;
    @Autowired
    ConversationRepo conversationRepo;
    @Autowired
    MessageRepo messageRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/topiclist")
    @ResponseBody
    List<TopicDataSimple> getTopics() {
        List<Topic> topicList = topicRepo.findAllByStatus("Wolny");
        List<TopicDataSimple> returnList = new ArrayList<>();
        for (Topic topic : topicList) {
            Lecturer lecturer = lecturerRepo.findById(topic.getLecturerId());
            returnList.add(new TopicDataSimple(topic.getId(), topic.getFaculty(), lecturer.getName(), topic.getType(), topic.getTopic(),
                    topic.getDescription(), topic.getTags()));
        }
        return returnList;
    }

    @GetMapping("/personaltopiclist")
    @ResponseBody
    List<TopicDataPersonal> getUserTopics() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserPrincipal userPrincipal;
        if (principal instanceof UserPrincipal)
            userPrincipal = (((UserPrincipal) principal));
        else
            throw new RuntimeException("Wrong user type");
        if(userPrincipal.getUserType().equalsIgnoreCase("admin")){
            List<Topic> topicList;
            List<TopicDataPersonal> returnList = new ArrayList<>();
            topicList = topicRepo.findAll();
            for (Topic topic : topicList) {
                int newMessages = 0;
                getPersonalTopicList(returnList, topic, newMessages);
            }
            return returnList;
        }
        boolean isStudent = isStudent(userPrincipal);
        int userId = getId(userPrincipal, isStudent);

        List<Topic> topicList;
        if (isStudent)
            topicList = topicRepo.findAllByStudentId(userId);
        else
            topicList = topicRepo.findAllByLecturerId(userId);
        if (userPrincipal.getUserType().equalsIgnoreCase("admin"))
            topicList = topicRepo.findAll();

        List<TopicDataPersonal> returnList = new ArrayList<>();
        for (Topic topic : topicList) {
            int newMessages = getNewMessages(isStudent, topic);
            getPersonalTopicList(returnList, topic, newMessages);
        }
        return returnList;
    }

    private void getPersonalTopicList(List<TopicDataPersonal> returnList, Topic topic, int newMessages) {
        Lecturer lecturer = lecturerRepo.findById(topic.getLecturerId());
        String name;
        if (topic.getStudentId() != null) {
            Student student = studentRepo.findById((int) topic.getStudentId());
            name = student.getName() + " " + student.getSurname();
        } else
            name = "";
        String date;
        if (topic.getDate() == null)
            date = "";
        else{
            date = new SimpleDateFormat("yyyy-MM-dd").format(topic.getDate());
        }
        returnList.add(new TopicDataPersonal(topic.getId(), topic.getFaculty(), lecturer.getName(), topic.getType(), topic.getTopic(),
                topic.getDescription(), topic.getTags(), topic.getStatus(), name, newMessages, date));
    }

    @GetMapping("/topic")
    @ResponseBody
    @PreAuthorize("hasAuthority('LECTURER') or hasAuthority('ADMIN')")
    TopicDataFull getTopic(int id) {
        UserPrincipal userPrincipal = getPrincipal();
        boolean isStudent = isStudent(userPrincipal);
        Topic topic = topicRepo.findById(id);
        if (!userPrincipal.getUserType().equals("admin")) {
            int userId = getId(userPrincipal, isStudent);

            if (topic == null || (topic.getLecturerId() != userId && topic.getStudentId() != userId))
                throw new RuntimeException("Brak dostępu do tematu");
        }
        String student;
        if (topic.getStudentId() == null) {
            student = "";
        } else
            student = studentRepo.findById((int) topic.getStudentId()).getName() + " " + studentRepo.findById((int) topic.getStudentId())
                    .getSurname();
        List<Conversation> conversationList = conversationRepo.findAllByLecturerIdAndTopicId(topic.getLecturerId(), topic.getId());
        ConversationFull[] conversations = new ConversationFull[conversationList.size()];
        for (int i = 0; i < conversations.length; i++) {
            conversations[i] = getConversation(conversationList.get(i));
        }
        RequestSender[] acceptanceRequests;
        if (isStudent)
            acceptanceRequests = new RequestSender[1];
        else {
            List<RequestSender> requests = getRequests(topic.getId());
            acceptanceRequests = new RequestSender[requests.size()];
            requests.toArray(acceptanceRequests);
        }
        String date;
        if (topic.getDate() == null)
            date = "";
        else {
            date = new SimpleDateFormat("yyyy-MM-dd").format(topic.getDate());
        }
        return new TopicDataFull(topic.getId(), userPrincipal.getFaculty(), lecturerRepo.findById(topic.getLecturerId()).getName(),
                topic.getType(), topic.getTopic(), topic.getDescription(), topic.getTags(), topic.getStatus(), student,
                getNewMessages(isStudent, topic), date, conversations, topic.getArrangements(), topic.getFiles(), acceptanceRequests);

    }

    @PutMapping("/topic")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('LECTURER') or hasAuthority('ADMIN')")
    void editTopic(@RequestBody PutTopic putTopic) {
        Topic topic = topicRepo.findById(putTopic.getId());
        UserPrincipal userPrincipal = getPrincipal();
        boolean isStudent = false;
        if (!userPrincipal.getUserType().equals("admin")) {
            int userId = getId(userPrincipal, isStudent);

            if (topic == null || topic.getLecturerId() != userId)
                throw new RuntimeException("Brak dostępu do tematu");
        }

        if(putTopic.getType()!=null)topic.setType(putTopic.getType());
        if(putTopic.getTopicName()!=null)topic.setTopic(putTopic.getTopicName());
        if (putTopic.getDescription() != null)
            topic.setDescription(putTopic.getDescription());
        if (putTopic.getTags() != null)
            topic.setTags(String.join(",", putTopic.getTags()));
        if(putTopic.getStatus()!=null)topic.setStatus(putTopic.getStatus());
        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
        if (putTopic.getExamDate() != null) {
            try {
                topic.setDate(formatter2.parse(putTopic.getExamDate()));
            } catch (ParseException e) {
                topic.setDate(null);
            }
        }

        topicRepo.save(topic);
    }

    @PostMapping("/topic")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('LECTURER')")
    void createTopic(@RequestBody PostTopic topic) {
        UserPrincipal userPrincipal = getPrincipal();
        Lecturer lecturer = lecturerRepo.findByUserId(userPrincipal.getId());
        String tag = String.join(",", topic.getTags());
        Topic t = new Topic(userPrincipal.getFaculty(), lecturer.getId(), topic.getType(), topic.getTopic(), topic.getDescription(), tag);
        topicRepo.save(t);
    }


    @DeleteMapping("/topic")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('LECTURER') or hasAuthority('ADMIN')")
    void deleteTopic(int id) {
        Topic topicToDelete = topicRepo.findById(id);
        if (topicToDelete != null) {
            List<Conversation> conversations = conversationRepo.findAllByTopicId(topicToDelete.getId());
            for(Conversation conversation:conversations){
                messageRepo.deleteAllByConversationId(conversation.getId());
                conversationRepo.delete(conversation);
            }
            acceptanceRequestRepo.deleteAllByTopicId(topicToDelete.getId());
            topicRepo.delete(topicToDelete);
        }
    }

    @GetMapping("/users")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN')")
    List<User> getUsers() {
        return userRepo.findAll();
    }

    @DeleteMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    void deleteUser(int id) {
        userRepo.deleteById(id);
    }

    @GetMapping("/acceptancerequest")
    @ResponseBody
    @PreAuthorize("hasAuthority('LECTURER') or hasAuthority('ADMIN')")
    List<RequestSender> requests(int id) {
        UserPrincipal principal = getPrincipal();
        if (!principal.getUserType().equals("admin") && lecturerRepo.findByUserId(principal.getId()).getId() != topicRepo.findById(id).getLecturerId()
                || topicRepo.findById(id) == null)
            throw new RuntimeException("Brak dostepu do wybranego tematu");
        return getRequests(id);
    }

    @PostMapping("/acceptancerequest")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('STUDENT')")
    ResponseEntity<String> postRequest(int id, HttpServletResponse httpRes) {
        UserPrincipal principal = getPrincipal();
        AcceptanceRequest acceptanceRequest = acceptanceRequestRepo.findByTopicIdAndStudentId(id, studentRepo.findByUserId(principal.getId()).getId());
        if(acceptanceRequest==null) {
            acceptanceRequest = new AcceptanceRequest(id, studentRepo.findByUserId(principal.getId()).getId());
            acceptanceRequestRepo.save(acceptanceRequest);
            changeStatus(id, "Wymaga potwierdzenia");
        }
        else
            return new ResponseEntity<String>(HttpStatus.FORBIDDEN);

        return null;
    }

    private void changeStatus(int topicId, String status) {
        Topic topic = topicRepo.findById(topicId);
        topic.setStatus(status);
        topicRepo.save(topic);
    }

    @PutMapping("/acceptancerequest")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('LECTURER')")
    void decideOnRequest(@RequestBody Decision decision) {
        Topic topic = topicRepo.findById(acceptanceRequestRepo.findById(decision.getId()).getTopicId());
        if (!decision.isDecision() && acceptanceRequestRepo.findAllByTopicId(topic.getId()).size() == 1) {
            changeStatus(topic.getId(), "Wolny");
            acceptanceRequestRepo.deleteById(decision.getId());
        } else {
            changeStatus(topic.getId(), "W trakcie realizacji");
            topic.setStudentId(acceptanceRequestRepo.findById(decision.getId()).getStudentId());
            topicRepo.save(topic);
            conversationRepo.save(new Conversation(topic.getId(), topic.getStudentId(), topic.getLecturerId()));
            for (AcceptanceRequest request : acceptanceRequestRepo.findAllByTopicId(acceptanceRequestRepo.findById(decision.getId()).getTopicId())) {
                acceptanceRequestRepo.deleteById(request.getId());
            }
        }
    }

    @GetMapping("/conversations")
    @PreAuthorize("hasAuthority('LECTURER') or hasAuthority('STUDENT')")
    @ResponseBody
    List<ConversationFull> showConversations() {
        UserPrincipal principal = getPrincipal();
        boolean isStudent = isStudent(principal);
        int userId = getId(principal, isStudent);

        List<Conversation> convoList;
        convoList = findAllConversations(userId, isStudent);

        List<ConversationFull> returnList = new ArrayList<>();
        for (Conversation conversation : convoList) {
            returnList.add(getConversation(conversation));
        }
        return returnList;
    }

    @GetMapping(value = "/conversations", params = "id")
    @ResponseBody
    ConversationFull showConversation(int id) {
        UserPrincipal principal = getPrincipal();
        Conversation conversation = conversationRepo.findById(id);
        if (!principal.getUserType().equals("admin")) {
            boolean isStudent = isStudent(principal);
            int userId = getId(principal, isStudent);

            if (conversation == null || (isStudent && userId != conversation.getStudentId()) || (!isStudent
                    && userId != conversation.getLecturerId()))
                throw new RuntimeException("Nie znaleziono konwersacji!");

            if ((isStudent && !conversation.isLastMessageByStudent()) || !isStudent && conversation.isLastMessageByStudent()) {
                conversation.setUnread_messages(0);
                conversationRepo.save(conversation);
            }
        }
        return getConversation(conversation);

    }

    @PreAuthorize("hasAuthority('LECTURER') or hasAuthority('STUDENT')or hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(value = "/message")
    void sendMessage(@RequestBody PostMessage msg) {
        UserPrincipal principal = getPrincipal();
        boolean isStudent = isStudent(principal);
        int userId = getId(principal, isStudent);
        String author;

        Conversation conversation = conversationRepo.findById(msg.getConversationId());
        if ((isStudent && userId != conversation.getStudentId()) || (!isStudent && userId != conversation.getLecturerId()))
            throw new RuntimeException("brak dostepu do konwersacji");
        if (isStudent)
            author = studentRepo.findById(userId).getName() + " " + studentRepo.findById(userId).getSurname();
        else
            author = lecturerRepo.findById(userId).getName();

        if ((isStudent && conversation.isLastMessageByStudent()) || !isStudent && !conversation.isLastMessageByStudent())
            conversation.setUnread_messages(conversation.getUnread_messages() + 1);
        else
            conversation.setUnread_messages(0);

        if (isStudent)
            conversation.setLastMessageByStudent(true);
        else
            conversation.setLastMessageByStudent(false);
        conversationRepo.save(conversation);
        messageRepo.save(new Message(author, msg.getContent(), msg.getConversationId()));
    }

    @PreAuthorize("hasAuthority('STUDENT')")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(value = "/message", params = "topicId")
    void sendMessage(int topicId,@RequestBody String content) {
        UserPrincipal principal = getPrincipal();
        int userId = getId(principal, true);
        String author;

        Conversation conversation = conversationRepo.findByStudentIdAndTopicId(studentRepo.findByUserId(principal.getId()).getId(),topicId);
        author = studentRepo.findById(userId).getName() + " " + studentRepo.findById(userId).getSurname();
        if(conversation==null){
            conversation = new Conversation(topicId,
                    studentRepo.findByUserId(principal.getId()).getId(),
                    topicRepo.findById(topicId).getLecturerId());

            conversation.setUnread_messages(1);
            conversationRepo.save(conversation);
        }
        else if (conversation.isLastMessageByStudent())
            conversation.setUnread_messages(conversation.getUnread_messages() + 1);
        else
            conversation.setUnread_messages(1);
            conversation.setLastMessageByStudent(true);

        conversationRepo.save(conversation);
        messageRepo.save(new Message(author, content, conversation.getId()));
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasAuthority('LECTURER')")
    @ResponseBody
    Dashboard info() {
        UserPrincipal userPrincipal = getPrincipal();
        int newMessages = 0;
        for (Topic topic : topicRepo.findAllByLecturerId(lecturerRepo.findByUserId(userPrincipal.getId()).getId())) {
            newMessages += getNewMessages(false, topic);
        }
        return new Dashboard(
                topicRepo.findAllByStatusAndLecturerId("Wolny", lecturerRepo.findByUserId(userPrincipal.getId()).getId()).size(),
                topicRepo.findAllByStatusAndLecturerId("W trakcie realizacji", lecturerRepo.findByUserId(userPrincipal.getId()).getId()).size(),
                topicRepo.findAllByStatusAndLecturerId("Wymaga potwierdzenia", lecturerRepo.findByUserId(userPrincipal.getId()).getId())
                        .size(),
                topicRepo.findAllByStatusAndLecturerId("Zakończony", lecturerRepo.findByUserId(userPrincipal.getId()).getId()).size(),
                newMessages);
    }

    @PostMapping("/changepwd")
    void changePassword(String oldPwd, String newPwd, String newPwdDuplicate) {
        UserPrincipal principal = getPrincipal();
        User user = userRepo.findById(principal.getId());
        if (!passwordEncoder.matches(oldPwd, user.getPassword()))
            throw new RuntimeException("Podane obecne hasło nie jest prawidłowe");
        if (!newPwd.equals(newPwdDuplicate))
            throw new RuntimeException("Podane dwa nowe hasła nie są identyczne");
        else {
            user.setPassword(passwordEncoder.encode(newPwd));
            userRepo.save(user);
        }
    }

    @GetMapping("/user")
    @ResponseBody
    UserType getUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String type = "GUEST";
        if (principal instanceof UserPrincipal) {
            type = ((UserPrincipal) principal).getUserType();
            type = type.toUpperCase();
        }
        return UserType.valueOf(type);
    }

    public UserPrincipal getPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal)
            return (((UserPrincipal) principal));
        else
            throw new RuntimeException("Wrong user type");

    }

    public List<RequestSender> getRequests(int id) {
        List<RequestSender> returnList = new ArrayList<>();
        for (AcceptanceRequest request : acceptanceRequestRepo.findAllByTopicId(id)) {
            Student student = studentRepo.findById(request.getStudentId());
            returnList.add(new RequestSender(request.getId(), request.getTopicId(), request.getDate(),
                    student.getName() + " " + student.getSurname()));
        }
        return returnList;
    }

    ConversationFull getConversation(Conversation conversation) {
        UserPrincipal principal = getPrincipal();
        boolean isStudent = isStudent(principal);
        if((!isStudent && conversation.isLastMessageByStudent()) || isStudent &&!conversation.isLastMessageByStudent() ){
            conversation.setUnread_messages(0);
            List<Message>msgList = messageRepo.findAllByConversationIdAndIsRead(conversation.getId(),false);
            for(Message message:msgList){
                message.setIsRead(true);
                messageRepo.save(message);
            }
            conversationRepo.save(conversation);
        }

        Lecturer lecturer = lecturerRepo.findById(conversation.getLecturerId());
        Student student = studentRepo.findById(conversation.getStudentId());
        Topic topic = topicRepo.findById(conversation.getTopicId());
        return new ConversationFull(conversation.getId(), conversation.getTopicId(), topic.getTopic(),
                student.getName() + " " + student.getSurname(), lecturer.getName(), conversation.getUnread_messages(),
                getMessageList(conversation.getId()));
    }

    public List<Conversation> findAllConversations(int id, boolean isStudent) {
        List<Conversation> list;
        if (isStudent) {
            list = conversationRepo.findAllByStudentId(id);
        } else {
            list = conversationRepo.findAllByLecturerId(id);
        }
        return list;
    }

    public List<Message> getMessageList(int id) {
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyy-MM-dd[ HH:mm]")
                .toFormatter();
        List<Message> list = new ArrayList<>();
        for (Message message : messageRepo.findAll()) {
            if (message.getConversationId() == id) {
                message.setDate(LocalDateTime.parse(message.getDate().toString().replace('T', ' ').substring(0,16),formatter));
                list.add(message);
            }
        }

        return list;
    }

    public int getId(UserPrincipal principal, boolean isStudent) {
        if (isStudent)
            return studentRepo.findByUserId(principal.getId()).getId();
        else
            return lecturerRepo.findByUserId(principal.getId()).getId();
    }

    public boolean isStudent(UserPrincipal principal) {
        return principal.getUserType().equalsIgnoreCase("student");
    }

    public int getNewMessages(boolean isStudent, Topic topic) {
        int newMessages = 0;
        if (isStudent) {
            Conversation conversation = conversationRepo.findByStudentIdAndTopicId(topic.getStudentId(), topic.getId());
            if (!conversation.isLastMessageByStudent())
                newMessages = conversation.getUnread_messages();
        } else {
            for (Conversation conversation : conversationRepo.findAllByLecturerIdAndTopicId(topic.getLecturerId(), topic.getId())) {
                if (conversation.isLastMessageByStudent())
                    newMessages += conversation.getUnread_messages();
            }
        }
        return newMessages;
    }

    public static void main(String[] args) {
        SpringApplication.run(MainController.class, args);
    }
}
