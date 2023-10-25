<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Error Page</title>
</head>
<body>
<script>
    alert("에러 메시지: ${exception}");
    window.location.href = "/admin";
</script>
</body>
</html>
