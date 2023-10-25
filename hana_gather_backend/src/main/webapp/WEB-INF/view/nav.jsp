<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="currentUrl" value="${pageContext.request.requestURI}" />
<c:set var="path" value="${pageContext.request.contextPath}"/>

<div class="nav-container">
    <div class="logo" onclick="window.location.href='/admin/home'">
        <img
                src="${path}/resources/images/appLogo.png"
                alt="로고"
                style="width: 35px; height: 35px; margin-right: 5px;"
        />
        <span class="title">하나모여</span>
        <span class="sub-title">관리자</span>
    </div>
    <div class="menu-container">
        <c:choose>
            <c:when test="${currentUrl == '/WEB-INF/view/operationStatus.jsp'}">

                <div class="menu menu-active">운영현황</div>
            </c:when>
            <c:otherwise>
                <div class="menu menu-not-active" onclick="window.location.href='/admin/home'">운영현황</div>
            </c:otherwise>
        </c:choose>
        <c:choose>
            <c:when test="${currentUrl == '/WEB-INF/view/manageMember.jsp'}">

                <div class="menu menu-active">회원관리</div>
            </c:when>
            <c:otherwise>
                <div class="menu menu-not-active" onclick="window.location.href='/admin/report'">회원관리</div>
            </c:otherwise>
        </c:choose>
    </div>
</div>
