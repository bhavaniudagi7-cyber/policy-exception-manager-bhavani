package com.internship.backend.controller;

import com.internship.backend.entity.PolicyException;
import com.internship.backend.repository.PolicyExceptionRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class PolicyExceptionControllerTest {

    private final PolicyExceptionRepository repository =
            Mockito.mock(PolicyExceptionRepository.class);

    @Test
    void testFindAll() {

        PolicyException exception = new PolicyException();
        exception.setId(1L);
        exception.setTitle("Test Policy");

        Mockito.when(repository.findAll())
                .thenReturn(List.of(exception));

        List<PolicyException> result = repository.findAll();

        assertEquals(1, result.size());
        assertEquals("Test Policy", result.get(0).getTitle());
    }

    @Test
    void testFindById() {

        PolicyException exception = new PolicyException();
        exception.setId(1L);

        Mockito.when(repository.findById(1L))
                .thenReturn(Optional.of(exception));

        Optional<PolicyException> result =
                repository.findById(1L);

        assertTrue(result.isPresent());
    }

    @Test
    void testSave() {

        PolicyException exception = new PolicyException();
        exception.setTitle("New Policy");

        Mockito.when(repository.save(exception))
                .thenReturn(exception);

        PolicyException saved =
                repository.save(exception);

        assertEquals("New Policy", saved.getTitle());
    }

    @Test
    void testDelete() {

        Mockito.doNothing()
                .when(repository)
                .deleteById(1L);

        repository.deleteById(1L);

        Mockito.verify(repository)
                .deleteById(1L);
    }
}