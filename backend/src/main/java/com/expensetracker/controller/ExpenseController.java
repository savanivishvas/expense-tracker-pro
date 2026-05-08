package com.expensetracker.controller;

import com.expensetracker.dto.ExpenseDTO;
import com.expensetracker.dto.SummaryDTO;
import com.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> getAll(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(expenseService.getExpenses(category, startDate, endDate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @PostMapping
    public ResponseEntity<ExpenseDTO> create(@Valid @RequestBody ExpenseDTO dto) {
        return new ResponseEntity<>(expenseService.createExpense(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDTO> update(@PathVariable Long id, @Valid @RequestBody ExpenseDTO dto) {
        return ResponseEntity.ok(expenseService.updateExpense(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<SummaryDTO> getSummary() {
        return ResponseEntity.ok(expenseService.getSummary());
    }
}
