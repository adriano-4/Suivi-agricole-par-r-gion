package com.example.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class MailController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send-mail")
    public String sendMail(@RequestParam("email") String email,
                           @RequestParam("file") MultipartFile file) throws MessagingException, IOException {

        File tempFile = File.createTempFile("formation_", ".xlsx");
        file.transferTo(tempFile);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email);
        helper.setSubject("Informations sur la formation");
        helper.setText("Veuillez trouver ci-joint le fichier Excel de la formation.");
        helper.addAttachment(file.getOriginalFilename(), new FileSystemResource(tempFile));

        mailSender.send(message);

        tempFile.delete();

        return "E-mail envoyé avec succès à " + email + " ✅";
    }
}
