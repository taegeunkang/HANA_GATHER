package com.kopo.hanaGatherBackend.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kopo.hanaGatherBackend.security.dto.ErrorDto;
import com.kopo.hanaGatherBackend.security.exception.EmptyTokenException;
import com.kopo.hanaGatherBackend.security.exception.InvalidTokenException;
import com.kopo.hanaGatherBackend.security.exception.TokenExpiredException;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class ExceptionHandlerFilter  extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            filterChain.doFilter(request, response);
        } catch (InvalidTokenException ex) {
            setErrorResponse(new Date(), HttpStatus.BAD_REQUEST, "U03", "invalid token", response);
        } catch (TokenExpiredException ex) {
            setErrorResponse(new Date(), HttpStatus.BAD_REQUEST, "U08", "token expired", response);
        } catch (EmptyTokenException ex) {
            setErrorResponse(new Date(), HttpStatus.BAD_REQUEST, "U09", "header is empty", response);
        } catch (NullPointerException ex) {
            setErrorResponse(new Date(), HttpStatus.BAD_REQUEST, "U09", "header is empty", response);
        }

    }


    private void setErrorResponse(Date date, HttpStatus httpStatus, String code, String message, HttpServletResponse response) {
        response.setStatus(httpStatus.value());
        response.setContentType("application/json");
        ErrorDto errorDto = new ErrorDto(date, httpStatus.value(), code, message);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            response.getWriter().write(objectMapper.writeValueAsString(errorDto));
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
