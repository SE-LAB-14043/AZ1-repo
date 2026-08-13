// Loan calculator logic (copied from profit.js)
(function(){
  function $(id){return document.getElementById(id)}

  function parseNumber(str){if(!str) return 0; return Number(String(str).replace(/[^0-9.-]+/g,''))}
  function fmt(n){
    if(typeof n !== 'number') n = Number(n)||0;
    return n.toLocaleString('en-US');
  }

  // format inputs on blur (thousands separator) and clear on focus
  function attachInputFormatting(id){
    var el = $(id);
    if(!el) return;
    el.addEventListener('focus', function(){
      var v = parseNumber(this.value);
      this.value = v ? String(v) : '';
    });
    el.addEventListener('blur', function(){
      var v = parseNumber(this.value);
      if(v || v === 0) this.value = fmt(v);
    });
  }

  function periodsPerYear(interval){
    switch(interval){
      case 'month': return 12;
      case 'quarter': return 4;
      case 'year': return 1;
      default: return 12;
    }
  }

  // annuity payment formula
  function annuityPayment(P, annualRatePct, n, k){
    if(n<=0) return 0;
    var r = (annualRatePct/100)/k;
    if(r === 0){
      return P / n;
    }
    var payment = P * r / (1 - Math.pow(1 + r, -n));
    return payment;
  }

  function showResult(vals){
    $('out-principal').textContent = fmt(vals.P) + ' تومان';
    $('out-rate').textContent = vals.annualRate + ' %';
    $('out-n').textContent = vals.n + ' قسط';
    $('out-interval').textContent = vals.intervalLabel;
    $('out-payment').textContent = fmt(Math.round(vals.payment)) + ' تومان';
    $('out-total').textContent = fmt(Math.round(vals.total)) + ' تومان';
    $('out-interest').textContent = fmt(Math.round(vals.interest)) + ' تومان';
    var modal = $('result-modal'); modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false');
  }

  function hideResult(){var modal=$('result-modal'); modal.style.display='none'; modal.setAttribute('aria-hidden','true')}

  document.addEventListener('DOMContentLoaded', function(){
    // attach formatting for amount and installments
    attachInputFormatting('loan-amount');
    attachInputFormatting('installments');

    var btn = $('calculate');
    if(!btn) return;
    btn.addEventListener('click', function(e){
      e.preventDefault();
      var P = parseNumber($('loan-amount').value);
      var annualRate = parseFloat($('annual-rate').value) || 0;
      var n = parseInt(parseNumber($('installments').value)) || 0;
      var interval = $('interval').value;
      var k = periodsPerYear(interval);

      var payment = annuityPayment(P, annualRate, n, k);
      var total = payment * n;
      var interest = total - P;

      var intervalLabel = ({month:'ماه',quarter:'فصل',year:'سال'})[interval] || 'دوره';

      showResult({P,annualRate,n,intervalLabel,payment,total,interest});
    });

    $('close-result').addEventListener('click', function(){ hideResult() });
    // close when clicking backdrop
    $('result-modal').addEventListener('click', function(e){ if(e.target===this) hideResult() });
  });

})();
