<%@ page import="javax.xml.xpath.XPath" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>회원관리</title>
  <link rel="stylesheet" href="${path}/resources/style/styles.css" />
  <style>

    table {
      width: 1000px;
      height: 600px;
      background-color: #ffffff;
      border: 5px solid #f5f8f9;
      margin-top: 100px;
      border-radius: 12px;
    }
    thead {
      font-family: "SpoqaHanSansNeo-Bold";
      font-size: 22px;
      color: #353c49;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    tbody{
      display: flex;
      flex-direction: column;
    }

    th {
      height: 65px;
    }
    td {
      text-align: center;
      font-family: "SpoqaHanSansNeo-Medium";
      font-size: 20px;
      color: #505866;
      height: 40px;


    }
    .report-btn1{
      width: 65px;
      height: 40px;
      background-color: #00857F;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      font-size: 15px;
      color: #ffffff;
    }
    .report-btn2{
      width: 65px;
      height: 40px;
      background-color: #CDFEEC;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      font-size: 16px;
      color: #00857F;
    }
    .report-btn1:hover, .report-btn2:hover {
      cursor: pointer;
    }
  </style>

  <script>

    const remove = async (id) => {
      const response = await fetch(`https://dev-dean.com/admin/report/remove?id=` + id, {method: "POST"});
      switch (response.status) {
        case 200:
          window.location.reload();
          break;
      }
    }
  </script>
</head>
<body>
<div class="container">
  <%@ include file="nav.jsp" %>

  <div class="content-container">

    <%@ include file="loginHeader.jsp" %>

      <div style="width: 100%; height: 100%;display: flex; align-items: flex-start; justify-content: center; ">

          <table>
            <thead>
              <th style="width: 50px;">ID</th>
              <th style="width: 60px;">종류</th>
              <th style="width: 190px;">내용</th>
              <th style="width: 300px;">사용자</th>
              <th style="width: 400px;">일자</th>
            </thead>
            <tbody>
            <c:forEach items="${reportList}" var="report">
              <tr style="width:100%;height: 50px; display: flex; align-items: center;">
                <td><div style="width:50px; height: 45px; display: flex; justify-content: center; align-items: center;">${report.id}</div></td>
                <td><div style="width:60px; height: 45px; display: flex; justify-content: center; align-items: center;">${report.reportType}</div></td>
                <td><div style="width:190px; height: 45px; display: flex; justify-content: center; align-items: center;">${report.message}</div></td>
                <td><div style="width:300px; height: 45px; display: flex; justify-content: center; align-items: center;">${report.memberId}</div></td>
                <td><div style="width: 400px; height: 45px; display: flex; justify-content: center; align-items: center;">${report.createdDate}</div></td>
                <td><div><div class="report-btn1" onclick="remove(${report.id})">계정 정지</div></div> </td>
                <td><div style="margin-left: 10px;"><div class="report-btn2" onclick="remove(${report.id})">삭제</div></div> </td>
              </tr>
            </c:forEach>
            </tbody>
          </table>
      </div>
  </div>
</div>
</body>
</html>
