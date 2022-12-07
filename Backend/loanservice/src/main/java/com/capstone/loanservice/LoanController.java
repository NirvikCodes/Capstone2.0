package com.capstone.loanservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loan")
public class LoanController {

    @Autowired
    private LoanRepository lr;

    @PostMapping("/create")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createLoan(@RequestBody Loan loan){
        this.lr.save(loan);
        System.out.println("Loan Created");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void deleteLoan(@PathVariable(value = "id") int id){
        Loan loan = lr.findByLoanId(id);
        this.lr.delete(loan);
        System.out.println("Loan Deleted");
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.FOUND)
    public Loan getLoan(@PathVariable(value = "id") int id){
        return lr.findByLoanId(id);
    }

    @GetMapping("name/{name}")
    @ResponseStatus(code = HttpStatus.FOUND)
    public Loan getByName(@PathVariable(value="name") String name){
        return lr.findByLoanName(name);
    }

    @GetMapping("/user/{id}")
    @ResponseStatus(code = HttpStatus.FOUND)
    public Loan[] getAllLoanByUserId(@PathVariable(value = "id") int id){
        Loan[] loans = lr.findAllByUserId(id);
        return loans;
    }

    @GetMapping("/user/{id}/isNotCompleted")
    @ResponseStatus(code = HttpStatus.FOUND)
    public Loan[] getNotCompletedLoan(@PathVariable(value = "id") int id){
        Loan[] loans = lr.findAllByisCompletedAndUserId(false,id);
        return loans;
    }

    @GetMapping("/user/{id}/isCompleted")
    @ResponseStatus(code = HttpStatus.FOUND)
    public Loan[] getCompletedLoan(@PathVariable(value = "id") int id){
        Loan[] loans = lr.findAllByisCompletedAndUserId(true,id);
        return loans;
    }

    @GetMapping("/user/{id}/isStarted")
    @ResponseStatus(code = HttpStatus.FOUND)
    public Loan[] getStartedLoans(@PathVariable(value = "id") int id){
        Loan[] loans = lr.findAllByIsStartedAndUserId(true,id);
        return loans;
    }

    @GetMapping("/user/{id}/isNotStarted")
    @ResponseStatus(code = HttpStatus.FOUND)
    public Loan[] getNotStartedLoans(@PathVariable(value = "id") int id){
        Loan[] loans = lr.findAllByIsStartedAndUserId(false,id);
        return loans;
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void updateLoan(@PathVariable(value = "id") int id, @RequestBody Loan loan){
        Loan updateLoan = lr.findByLoanId(id);
        System.out.println(updateLoan.toString());

        updateLoan.setLoanName(loan.getLoanName());
        updateLoan.setLoanType(loan.getLoanType());
        updateLoan.setLoanAmount(loan.getLoanAmount());
        updateLoan.setInterest(loan.getInterest());
        updateLoan.setInterestStart(loan.getInterestStart());
        updateLoan.setIsStarted(loan.getIsStarted());
        updateLoan.setIsCompleted(loan.getIsCompleted());
        updateLoan.setUserId(loan.getUserId());

        lr.save(updateLoan);

        System.out.println("Loan Updated");
    }




}
