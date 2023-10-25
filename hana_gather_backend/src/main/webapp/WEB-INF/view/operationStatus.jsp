<%@ page import="javax.xml.xpath.XPath" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>운영현황</title>
    <link rel="stylesheet" href="${path}/resources/style/styles.css" />
    <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>

    <script>
        console.log("렌더링댐");
        window.onload = () => {
            const chart = LightweightCharts.createChart(document.getElementById("content"), { width: 1000, height: 500,layout: {
                    textColor: "#d1d4dc",
                    backgroundColor: "#000000",
                },
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.3,
                        bottom: 0.25,
                    },
                },
                crosshair: {
                    vertLine: {
                        width: 5,
                        color: "rgba(224, 227, 235, 0.1)",
                        style: 0,
                    },
                    horzLine: {
                        visible: false,
                        labelVisible: false,
                    },
                },
                grid: {
                    vertLines: {
                        color: "rgba(42, 46, 57, 0)",
                    },
                    horzLines: {
                        color: "rgba(42, 46, 57, 0)",
                    },
                }, });
            chart.applyOptions({
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true,
                },
            });
            const lineSeries = chart.addAreaSeries({
                topColor: "rgba(27, 195, 135, 0.56)",
                bottomColor: "rgba(27, 195, 135, 0.04)",
                lineColor: "rgba(27, 195, 135, 1)",
                lineWidth: 2,
                crossHairMarkerVisible: false,
            });

            // 2022년 10월 16일부터 2023년 10월 16일까지의 랜덤 데이터 생성
            const startDate = new Date("2022-10-16");
            const endDate = new Date("2023-10-16");
            const dateValues = [];

            for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
                const randomValue = Math.random() * 100;
                dateValues.push({ time: currentDate.toISOString().slice(0, 10), value: randomValue });
            }

            lineSeries.setData(dateValues);



            return () => {
                chart.remove();
            }
        }
    </script>

</head>
<body>
<div class="container">
    <%@ include file="nav.jsp" %>

    <div class="content-container">

        <%@ include file="loginHeader.jsp" %>
        <div style="width: 100%; display: flex; justify-content: center;">
            <div style=" width:1000px;font-family: 'SpoqaHanSansNeo-Bold';
        font-size: 32px;">일별 거래량</div>
        </div>

         <div id="content" style="width: 100%; height: 100%; display: flex; align-items: flex-start; justify-content: center;">

         </div>
    </div>
</div>

</body>
</html>
