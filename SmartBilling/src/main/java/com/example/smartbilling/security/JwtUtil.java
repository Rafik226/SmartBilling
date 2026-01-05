package com.example.smartbilling.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret:ChangeThisSecretForProd}")
    private String secret;

    @Value("${app.jwt.expiration-ms:3600000}")
    private long expirationMs;

    private Key getSigningKey() {
        try {
            byte[] keyBytes = secret.getBytes();
            // If provided secret is base64-like (contains '=' or longer), try decode
            try {
                // attempt Base64 decode if looks encoded
                if (secret.matches("^[A-Za-z0-9+/=\\r\\n]+$") && secret.length() >= 44) {
                    keyBytes = java.util.Base64.getDecoder().decode(secret);
                }
            } catch (IllegalArgumentException ignored) {
                // not base64, fall back
            }

            // Ensure key is at least 256 bits (32 bytes)
            if (keyBytes.length < 32) {
                java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-256");
                keyBytes = md.digest(secret.getBytes());
            }

            return Keys.hmacShaKeyFor(keyBytes);
        } catch (Exception ex) {
            // fallback to a generated key (should not happen in normal flow)
            return Keys.secretKeyFor(SignatureAlgorithm.HS256);
        }
    }

    public String generateToken(String username) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
            return claims.getExpiration().after(new Date());
        } catch (Exception ex) {
            return false;
        }
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
        return claimsResolver.apply(claims);
    }
}
