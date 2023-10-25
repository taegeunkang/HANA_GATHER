<%@ page import="javax.xml.xpath.XPath" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>로그인</title>
    <link rel="stylesheet" href="${path}/resources/style/styles.css" />

</head>
<body>
<div class="container">
    <%@ include file="nav.jsp" %>

    <div class="content-container">

        <%@ include file="loginHeader.jsp" %>

        <div class="content">
            <form class="login-form" method="post" action="/admin/login">
                <div class="form-title">로그인</div>
                <div class="input-container">
                    <label for="id" class="input-title">아이디</label>
                    <input type="text" id="id" name="id" class="input-box" />
                </div>

                <div class="input-container">
                    <label for="password" class="input-title">비밀번호</label>
                    <input
                            type="password"
                            id="password"
                            name="password"
                            class="input-box"
                    />
                </div>
                <input type="submit" value="로그인" class="submit-btn" />
            </form>
        </div>
    </div>
</div>
</body>
</html>
