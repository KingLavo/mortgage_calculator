

document.addEventListener("DOMContentLoaded", ()=>{

    const form = document.getElementById("form");

    let numberFormat = document.getElementById("mortgage_amount")

      //formatting user input on the mortage amount
    numberFormat.onkeyup = function(){
            let val = this.value.replace (/[^0-9]/g, "")
            this.value = val
            let formatNum = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            this.value = formatNum
            return this.formatNum

        }
 

    form.addEventListener("submit", (e)=>{
        e.preventDefault()  
        
        let mortgageAmount = numberFormat.value.replace(/,/g, "")
        let mortgageTerm = document.getElementById("mortgage_term").value.trim()
        let mortgageRate = document.getElementById("interest_rate").value.trim()
        const error_mg = document.querySelectorAll(".error_mg");
        const span_err_mg = document.querySelectorAll(".span_err_mg")
        const border_mg = document.querySelectorAll(".border") 
        const result_output = document.getElementById("result_output")
        const right_container_sub = document.getElementById("right_container_sub")
        const monthly = document.getElementById('monthly')
        const total = document.getElementById("total")
        

        if(mortgageAmount === "" && mortgageTerm === "" && mortgageRate === ""){
            error_mg.forEach( mg =>{ 
                mg.innerHTML = 'The field is required'; 
            })
            span_err_mg.forEach(mg => mg.classList.add('err_bg'))
            border_mg.forEach(mg => mg.classList.add('border_mg'))
         }
        
         if(!mortgageAmount == "" && !mortgageTerm == "" && !mortgageRate == ""){
            span_err_mg.forEach(mg => mg.classList.remove('err_bg'))
            border_mg.forEach(mg => mg.classList.remove('border_mg'))
            error_mg.forEach( mg => mg.innerHTML = '')
            result_output.style.display = "block"
            right_container_sub.style.display = "none"

         }  
         
          //Type casting values for arithmetic operation
        mortgageTerm = parseFloat(mortgageTerm)
        mortgageRate = parseFloat(mortgageRate)

        //calling the payment function 
        payment( mortgageAmount, mortgageRate, mortgageTerm, monthly, total)       

    })

    //Mortgage calculatior function//It calculate the mortgage
const payment = (amount, rate, term, monthly, totalPay)=>{
         document.querySelectorAll('.checkbox').forEach( item =>{
            const paymentMessage = document.getElementById("paymentMessage")
             if(item.checked === true){
                 if( item.value === "interest"){
                    //Interesting rate has to be divide by 100 to get the actual interest rate
                    let r = rate / 100;
                    let a =    (1 - ( 1 + (r / 12))  ** (- 12 * term))
                    let repayMortgageMonthly = (amount*( r / 12) / a)
                    let interestRate  = (repayMortgageMonthly * 12 * term) - amount;
                    let totalInterest = interestRate.toFixed(2)
                    paymentMessage.innerHTML = "Your Total interest"
                    monthly.innerHTML = `£${new Intl.NumberFormat("en-GB").format(totalInterest)}`
                
                 }else{
                             
                        let r = rate / 100;
                        let a =    (1 - ( 1 + (r / 12))  ** (- 12 * term))
                        let repayMortgageMonthly = (amount*( r / 12) / a)
                        let result = repayMortgageMonthly.toFixed(2)
                        paymentMessage.innerHTML = "Your monthly repayment"
                        monthly.innerHTML = `£${new Intl.NumberFormat("en-GB").format(result)}`

                        //total repayment of the loan
                        let total = ((repayMortgageMonthly*12)*term)
                        let totalRes = total.toFixed(2)
                        totalPay.innerHTML = `£${new Intl.NumberFormat("en-GB").format(totalRes)}`

                 }
                        
            } 
        })
    }

    // clear button to clear input/reset the form
    const clearBtn = document.getElementById("clear")
    clearBtn.addEventListener("click", ()=>{
        const result_output = document.getElementById("result_output")
        const right_container_sub = document.getElementById("right_container_sub")
        result_output.style.display = "none"
        right_container_sub.style.display = "block"
        form.reset()
    })

     

})