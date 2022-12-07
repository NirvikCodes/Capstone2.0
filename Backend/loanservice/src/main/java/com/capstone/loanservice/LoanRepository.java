package com.capstone.loanservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepository extends JpaRepository<Loan,Integer> {

    Loan findByLoanId(Integer loanId);

    Loan[] findAllByUserId(int userId);

    Loan[] findAllByisCompletedAndUserId(Boolean isCompleted,int userId);

    Loan[] findAllByIsStartedAndUserId(boolean isStarted, int userId);

    Loan findByLoanName(String loanName);

}


