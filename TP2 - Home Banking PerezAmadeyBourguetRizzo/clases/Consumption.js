let idSavingBank = 1;

class SavingBank {
    constructor  (idUsd, balance, overdraft, overdraftlimit, debitCard, history, alias, cbu){
        this.savingBank = idSavingBank;
        idSavingBank++;

        this.idUsd = idUsd;
        this.balance = balance;
        if (idUsd) {
            this.overdraft = 0;
            this.overdraftlimit = 0;
        } else {
            this.overdraft = overdraft;
            this.overdraftlimit = overdraftlimit;
        }
        this.debitCard = debitCard;
        this.history = history;
        this.alias = alias;
        this.cbu = cbu;
    }
    }
