package com.expensetracker.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SummaryDTO {
    private Double totalSpending;
    private Long expenseCount;
    private Double averageExpense;
    private Map<String, Double> categoryBreakdown;
    private String highestCategory;
    private List<MonthlyTotal> monthlyTotals;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MonthlyTotal {
        private String month;
        private Double amount;
    }
}
