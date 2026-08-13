// Profit (fixed-income fund) daily compounding calculator
(function(){
  function $(id){return document.getElementById(id)}
  function parseNumber(str){if(!str) return 0; return Number(String(str).replace(/[^0-9.-]+/g,''))}
  function fmt(n){ if(typeof n !== 'number') n = Number(n)||0; return n.toLocaleString('en-US'); }

  function attachFormatting(id){
    var el = $(id); if(!el) return;
    el.addEventListener('focus', function(){ var v = parseNumber(this.value); this.value = v?String(v):'' });
    el.addEventListener('blur', function(){ var v = parseNumber(this.value); if(v||v===0) this.value = fmt(v); });
  }

  function calc(){
    var P = parseNumber($('principal').value);
    var annual = parseFloat($('annual-rate').value) || 0;
    var days = parseInt(parseNumber($('days-held').value)) || 0;
    var r = (annual/100)/365;
    var amount = P * Math.pow(1 + r, days);
    var profit = amount - P;
    var effectiveAnnual = Math.pow(1 + r, 365) - 1; // as decimal

    // display
    $('out-principal').textContent = fmt(P) + ' تومان';
    $('out-days').textContent = days + ' روز';
    $('out-rate').textContent = (annual||0) + ' %';
    $('out-amount').textContent = fmt(Math.round(amount)) + ' تومان';
    $('out-profit').textContent = fmt(Math.round(profit)) + ' تومان';
    $('out-effective-rate').textContent = (effectiveAnnual*100).toFixed(3) + ' %';
    var modal = $('profit-result'); modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false');
  }

  document.addEventListener('DOMContentLoaded', function(){
    attachFormatting('principal');
    attachFormatting('days-held');
    // attach calculate
    var btn = $('calculate-profit'); if(btn) btn.addEventListener('click', function(e){ e.preventDefault(); calc(); });
    // close button for modal
    var close = $('close-profit'); if(close) close.addEventListener('click', function(){ var m=$('profit-result'); m.style.display='none'; m.setAttribute('aria-hidden','true'); });
    // click backdrop to close
    var modal = $('profit-result'); if(modal) modal.addEventListener('click', function(e){ if(e.target===this){ this.style.display='none'; this.setAttribute('aria-hidden','true'); }});
  });

})();
