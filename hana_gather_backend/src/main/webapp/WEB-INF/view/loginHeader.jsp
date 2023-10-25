<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="login-container">



  <c:choose>
    <c:when test="${sessionScope.sessionId == null}">

      <div class="login-btn" onclick="window.location.href='/admin/login'">로그인</div>
    </c:when>
    <c:otherwise>
      <div class="login-btn" onclick="window.location.href='/admin/logout'">로그아웃</div>
    </c:otherwise>
  </c:choose>


</div>