package com.expensetracker.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseDTO {

    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must not exceed 100 characters")
    private String title;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double amount;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private String description;
    private LocalDateTime createdAt;
}
