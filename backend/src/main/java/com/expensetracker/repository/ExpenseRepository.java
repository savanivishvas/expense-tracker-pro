package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT e FROM Expense e WHERE " +
           "(:category IS NULL OR LOWER(e.category) = LOWER(:category)) AND " +
           "(:startDate IS NULL OR e.date >= :startDate) AND " +
           "(:endDate IS NULL OR e.date <= :endDate) " +
           "ORDER BY e.date DESC")
    List<Expense> findWithFilters(
            @Param("category") String category,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("SELECT e.category, SUM(e.amount) FROM Expense e GROUP BY e.category ORDER BY SUM(e.amount) DESC")
    List<Object[]> getCategoryTotals();

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e")
    Double getTotalSpending();

    @Query("SELECT COUNT(e) FROM Expense e")
    Long getExpenseCount();

    @Query("SELECT FUNCTION('MONTH', e.date) as month, SUM(e.amount) FROM Expense e " +
           "WHERE FUNCTION('YEAR', e.date) = FUNCTION('YEAR', CURRENT_DATE) " +
           "GROUP BY FUNCTION('MONTH', e.date) ORDER BY FUNCTION('MONTH', e.date)")
    List<Object[]> getMonthlyTotalsCurrentYear();
}
