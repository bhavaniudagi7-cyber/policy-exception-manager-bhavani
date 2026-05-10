package com.internship.backend.controller;

import com.internship.backend.entity.PolicyException;
import com.internship.backend.repository.PolicyExceptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/exceptions")
@CrossOrigin("*")
public class PolicyExceptionController {

    @Autowired
    private PolicyExceptionRepository repository;

    @GetMapping
    public List<PolicyException> getAll() {
        return repository.findAll();
    }

    @GetMapping("/filter")
    public List<PolicyException> filter(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String status) {

        return repository.filterExceptions(q, status);
    }

    @PostMapping
    public PolicyException create(
            @RequestBody PolicyException exception) {

        return repository.save(exception);
    }

    @GetMapping("/{id}")
    public PolicyException getById(@PathVariable Long id) {

        return repository.findById(id).orElseThrow();
    }

    @PutMapping("/{id}")
    public PolicyException update(
            @PathVariable Long id,
            @RequestBody PolicyException updated) {

        PolicyException existing =
                repository.findById(id).orElseThrow();

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setStatus(updated.getStatus());

        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        repository.deleteById(id);
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {

        long total = repository.count();

        long approved = repository.countByStatus("APPROVED");
        long rejected = repository.countByStatus("REJECTED");
        long open = repository.countByStatus("OPEN");

        Map<String, Long> stats = new HashMap<>();

        stats.put("total", total);
        stats.put("approved", approved);
        stats.put("rejected", rejected);
        stats.put("open", open);

        return stats;
    }
}