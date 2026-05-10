package com.internship.backend.repository;

import com.internship.backend.entity.PolicyException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PolicyExceptionRepository
        extends JpaRepository<PolicyException, Long> {

    long countByStatus(String status);

    @Query("""
        SELECT p FROM PolicyException p
        WHERE (:q IS NULL OR :q = '' OR
               LOWER(p.title) LIKE LOWER(CONCAT('%', :q, '%')))
        AND (:status IS NULL OR :status = '' OR
             p.status = :status)
    """)
    List<PolicyException> filterExceptions(
            @Param("q") String q,
            @Param("status") String status
    );
}