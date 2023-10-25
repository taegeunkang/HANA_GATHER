package com.kopo.hanaGatherBackend.security;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.kopo.hanaGatherBackend.security.exception.TokenExpiredException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClaims;
import io.jsonwebtoken.impl.DefaultJws;

import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWTUtil {
    private final String secret = "hana-gather-hana-finance-ti-secret-key";
    // 토큰 만기일 1일 -> 60 * 24
    private final long expire = 60 * 24;
    // 리프레시 토큰 만기일 30일
    private final long refreshTokenExpire = 60 * 24 * 30;

    //토큰 생성
    public String generate(String content, long expire) {
        return Jwts.builder().setIssuedAt(new Date())
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(expire).toInstant()))
                .claim("sub", content)
                .signWith(SignatureAlgorithm.HS256, secret.getBytes(StandardCharsets.UTF_8))
                .compact();
    }

    //토큰 생성
    public Map<String, String> generateTokens(String content) {
        String token = generate(content, expire);
        String refreshToken = generate(content, refreshTokenExpire);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("token", token);
        tokens.put("refreshToken", refreshToken);
        return tokens;
    }
    // 토큰 만기일 추출
    public Date getExp(String tokenStr) {

        try {
            DefaultJws defaultJws = (DefaultJws) Jwts.parser().setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(tokenStr);

            DefaultClaims defaultClaims = (DefaultClaims) defaultJws.getBody();
            Date exp = defaultClaims.getExpiration();
            return exp;

        } catch(ExpiredJwtException ex) {
            throw new TokenExpiredException();
        }
    }

    // 토큰 검증
    public Boolean validToken(String token) {
        String content = getSubject(token);
        return !content.isEmpty();

    }
    public String getSubject(String token) {
        try {
            DefaultJws defaultJws = (DefaultJws) Jwts.parser().setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(token);
            DefaultClaims defaultClaims = (DefaultClaims) defaultJws.getBody();
            return defaultClaims.getSubject();
        } catch(ExpiredJwtException ex) {
            throw new TokenExpiredException();
        } catch (JwtException ex) {
            ex.printStackTrace();
        }

        return null;
    }

    public Map<String, Object> getNonce(String token)  {
        try {
            String[] check = token.split("\\.");
            Base64.Decoder decoder = Base64.getDecoder();
            String payload = new String(decoder.decode(check[1]));

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> returnMap = mapper.readValue(payload, Map.class);
            return returnMap;
        } catch (Exception ex ) {
            ex.printStackTrace();
        }
        return null;
    }

}
