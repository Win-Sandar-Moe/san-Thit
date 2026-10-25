package org.example.santhit.product.dao;

import org.example.santhit.product.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserDao extends JpaRepository<User, UUID> {
    @Query("""
            select u from User u where u.username=:username or u.email=:username
            """)
    Optional<User> findByUsernameOrEmail(@Param( "username")String usernameEmail);
}
