package com.expensetracker.service;

import com.expensetracker.dto.ExpenseDTO;
import com.expensetracker.dto.SummaryDTO;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public List<ExpenseDTO> getExpenses(String category, LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findWithFilters(category, startDate, endDate)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ExpenseDTO getExpenseById(Long id) {
        return toDTO(expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id)));
    }

    public ExpenseDTO createExpense(ExpenseDTO dto) {
        return toDTO(expenseRepository.save(toEntity(dto)));
    }

    public ExpenseDTO updateExpense(Long id, ExpenseDTO dto) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        existing.setTitle(dto.getTitle());
        existing.setAmount(dto.getAmount());
        existing.setCategory(dto.getCategory());
        existing.setDate(dto.getDate());
        existing.setDescription(dto.getDescription());
        return toDTO(expenseRepository.save(existing));
    }

    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Expense not found with id: " + id);
        }
        expenseRepository.deleteById(id);
    }

    public SummaryDTO getSummary() {
        Double total = expenseRepository.getTotalSpending();
        Long count = expenseRepository.getExpenseCount();

        // Category breakdown
        Map<String, Double> breakdown = new LinkedHashMap<>();
        String highestCategory = null;
        double maxAmount = 0;
        for (Object[] row : expenseRepository.getCategoryTotals()) {
            String cat = (String) row[0];
            Double amount = ((Number) row[1]).doubleValue();
            breakdown.put(cat, amount);
            if (amount > maxAmount) { maxAmount = amount; highestCategory = cat; }
        }

        // Monthly totals
        String[] months = {"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"};
        List<SummaryDTO.MonthlyTotal> monthlyTotals = new ArrayList<>();
        for (Object[] row : expenseRepository.getMonthlyTotalsCurrentYear()) {
            int monthNum = ((Number) row[0]).intValue();
            Double amount = ((Number) row[1]).doubleValue();
            monthlyTotals.add(SummaryDTO.MonthlyTotal.builder()
                    .month(months[monthNum - 1])
                    .amount(amount)
                    .build());
        }

        return SummaryDTO.builder()
                .totalSpending(total != null ? total : 0.0)
                .expenseCount(count != null ? count : 0L)
                .averageExpense(count != null && count > 0 ? total / count : 0.0)
                .categoryBreakdown(breakdown)
                .highestCategory(highestCategory)
                .monthlyTotals(monthlyTotals)
                .build();
    }

    private ExpenseDTO toDTO(Expense e) {
        return ExpenseDTO.builder()
                .id(e.getId()).title(e.getTitle()).amount(e.getAmount())
                .category(e.getCategory()).date(e.getDate())
                .description(e.getDescription()).createdAt(e.getCreatedAt())
                .build();
    }

    private Expense toEntity(ExpenseDTO dto) {
        return Expense.builder()
                .title(dto.getTitle()).amount(dto.getAmount())
                .category(dto.getCategory()).date(dto.getDate())
                .description(dto.getDescription())
                .build();
    }
}
