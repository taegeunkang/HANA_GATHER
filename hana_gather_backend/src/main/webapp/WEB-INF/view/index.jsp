<%@ page import="javax.xml.xpath.XPath" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>하나모여</title>
    <style>
     body {
         margin: 0;
     }
    </style>
    <link rel="stylesheet" href="${path}/resources/style/styles.css" />

</head>
<body>

    <div style="width: 250px; height: 250px; display: flex; align-items: center; justify-content: center;">
        <img
                src="${path}/resources/images/appLogo.png"
                alt="로고"
                style="width: 100px; height: 100px; margin-right: 5px;"
        />
        <div>
            <span class="title" style="font-size: 36px;">하나모여</span>
        </div>
    </div>

</body>
</html>
